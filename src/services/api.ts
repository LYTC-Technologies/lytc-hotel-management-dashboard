// API Service for LYTC Hotel Management Dashboard
// Base URL: https://lytc-hotel-backend.onrender.com

const API_BASE_URL = 'https://lytc-hotel-backend.onrender.com';

// Types based on OpenAPI specification
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
  userId: number;
  username: string;
  tokenType: string;
}

interface CreateSpecialOfferRequest {
  title: string;
  description: string;
}

interface SpecialOfferResponse {
  id: number;
  title: string;
  description: string;
}

interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  preparationTime?: number;
  imageUrl?: string;
}

interface CreateOrderRequest {
  category: 'FOOD' | 'DRINK' | 'SERVICE';
  items: OrderItemRequest[];
}

interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
  notes?: string;
}

interface MenuItemResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  available: boolean;
  preparationTime?: number;
  imageUrl?: string;
}

// API Service Class
class APIService {
  private baseURL: string;
  private token: string | null = null;
  private isRefreshing: boolean = false;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  // Helper method to get headers
  private getHeaders(includeAuth: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Helper method to handle response with automatic token refresh
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Helper method to make authenticated requests with automatic token refresh
  private async authenticatedFetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const makeRequest = async (): Promise<Response> => {
      return fetch(url, {
        ...options,
        headers: this.getHeaders(true),
      });
    };

    let response = await makeRequest();

    // If 401 and not already refreshing, try to refresh token
    if (response.status === 401 && this.token && !this.isRefreshing) {
      this.isRefreshing = true;
      try {
        await this.refreshToken();
        this.isRefreshing = false;
        // Retry the request with new token
        response = await makeRequest();
      } catch (refreshError) {
        this.isRefreshing = false;
        // If refresh fails, clear token and redirect to login
        this.clearToken();
        window.location.href = '/';
        throw new Error('Session expired. Please login again.');
      }
    }

    return this.handleResponse<T>(response);
  }

  // Set authentication token
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  // Clear authentication token
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // ==================== AUTHENTICATION APIs ====================

  /**
   * Login API
   * POST /api/auth/login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(false),
      body: JSON.stringify(credentials),
    });

    const data = await this.handleResponse<LoginResponse>(response);
    
    // Store token if present in response
    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  /**
   * Refresh Token API
   * POST /api/auth/refresh
   */
  async refreshToken(): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
      method: 'POST',
      headers: this.getHeaders(false),
      credentials: 'include', // For cookies
    });

    const data = await this.handleResponse<LoginResponse>(response);
    
    // Update token if present in response
    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  /**
   * Logout API
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    const response = await fetch(`${this.baseURL}/api/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(true),
    });

    await this.handleResponse<void>(response);
    
    // Clear token from storage
    this.clearToken();
  }

  // ==================== SPECIAL OFFERS APIs ====================

  /**
   * Create Special Offer API
   * POST /api/dashboard/front-desk/special-offers
   */
  async createSpecialOffer(offer: CreateSpecialOfferRequest): Promise<SpecialOfferResponse> {
    return this.authenticatedFetch<SpecialOfferResponse>(
      `${this.baseURL}/api/dashboard/front-desk/special-offers`,
      {
        method: 'POST',
        body: JSON.stringify(offer),
      }
    );
  }

  /**
   * Update Special Offer API
   * PUT /api/dashboard/front-desk/special-offers/{id}
   */
  async updateSpecialOffer(id: number, offer: { title?: string; description?: string }): Promise<SpecialOfferResponse> {
    return this.authenticatedFetch<SpecialOfferResponse>(
      `${this.baseURL}/api/dashboard/front-desk/special-offers/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(offer),
      }
    );
  }

  /**
   * Patch Special Offer API (partial update)
   * PATCH /api/dashboard/front-desk/special-offers/{id}
   */
  async patchSpecialOffer(id: number, offer: { title?: string; description?: string }): Promise<SpecialOfferResponse> {
    return this.authenticatedFetch<SpecialOfferResponse>(
      `${this.baseURL}/api/dashboard/front-desk/special-offers/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(offer),
      }
    );
  }

  /**
   * Get Special Offers for Guest
   * GET /api/guest/special-offers
   */
  async getSpecialOffers(page: number = 0, size: number = 10): Promise<any> {
    return this.authenticatedFetch<any>(
      `${this.baseURL}/api/guest/special-offers?page=${page}&size=${size}`,
      {
        method: 'GET',
      }
    );
  }

  // ==================== MENU ITEMS APIs ====================

  /**
   * Create Menu Item for Room Service
   * POST /api/dashboard/room-service/menu
   */
  async createRoomServiceMenuItem(item: CreateMenuItemRequest): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/room-service/menu`,
      {
        method: 'POST',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Create Menu Item for Restaurant
   * POST /api/dashboard/restaurant/menu
   */
  async createRestaurantMenuItem(item: CreateMenuItemRequest): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/restaurant/menu`,
      {
        method: 'POST',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Create Menu Item for Cafe
   * POST /api/dashboard/cafe/menu
   */
  async createCafeMenuItem(item: CreateMenuItemRequest): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/cafe/menu`,
      {
        method: 'POST',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Update Menu Item for Room Service
   * PUT /api/dashboard/room-service/menu/{id}
   */
  async updateRoomServiceMenuItem(id: number, item: Partial<CreateMenuItemRequest>): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/room-service/menu/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Update Menu Item for Restaurant
   * PUT /api/dashboard/restaurant/menu/{id}
   */
  async updateRestaurantMenuItem(id: number, item: Partial<CreateMenuItemRequest>): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/restaurant/menu/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Update Menu Item for Cafe
   * PUT /api/dashboard/cafe/menu/{id}
   */
  async updateCafeMenuItem(id: number, item: Partial<CreateMenuItemRequest>): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/cafe/menu/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Patch Menu Item for Room Service (partial update)
   * PATCH /api/dashboard/room-service/menu/{id}
   */
  async patchRoomServiceMenuItem(id: number, item: Partial<CreateMenuItemRequest>): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/room-service/menu/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Patch Menu Item for Restaurant (partial update)
   * PATCH /api/dashboard/restaurant/menu/{id}
   */
  async patchRestaurantMenuItem(id: number, item: Partial<CreateMenuItemRequest>): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/restaurant/menu/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(item),
      }
    );
  }

  /**
   * Patch Menu Item for Cafe (partial update)
   * PATCH /api/dashboard/cafe/menu/{id}
   */
  async patchCafeMenuItem(id: number, item: Partial<CreateMenuItemRequest>): Promise<MenuItemResponse> {
    return this.authenticatedFetch<MenuItemResponse>(
      `${this.baseURL}/api/dashboard/cafe/menu/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(item),
      }
    );
  }

  // ==================== ORDER APIs ====================

  /**
   * Create Order for Guest
   * POST /api/guest/orders
   */
  async createGuestOrder(roomNumber: string, order: CreateOrderRequest): Promise<any> {
    return this.authenticatedFetch<any>(
      `${this.baseURL}/api/guest/orders?roomNumber=${roomNumber}`,
      {
        method: 'POST',
        body: JSON.stringify(order),
      }
    );
  }

  /**
   * Get Guest Orders
   * GET /api/guest/orders
   */
  async getGuestOrders(roomNumber: string, page: number = 0, size: number = 10): Promise<any> {
    return this.authenticatedFetch<any>(
      `${this.baseURL}/api/guest/orders?roomNumber=${roomNumber}&page=${page}&size=${size}`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Cancel Order
   * POST /api/guest/orders/{orderId}/cancel
   */
  async cancelOrder(orderId: number, roomNumber: string): Promise<any> {
    return this.authenticatedFetch<any>(
      `${this.baseURL}/api/guest/orders/${orderId}/cancel?roomNumber=${roomNumber}`,
      {
        method: 'POST',
      }
    );
  }

  /**
   * Get Order Details
   * GET /api/guest/orders/{orderId}
   */
  async getOrderDetails(orderId: number, roomNumber: string): Promise<any> {
    return this.authenticatedFetch<any>(
      `${this.baseURL}/api/guest/orders/${orderId}?roomNumber=${roomNumber}`,
      {
        method: 'GET',
      }
    );
  }
}

// Export singleton instance
export const apiService = new APIService(API_BASE_URL);

// Export types for use in components
export type {
  LoginRequest,
  LoginResponse,
  CreateSpecialOfferRequest,
  SpecialOfferResponse,
  CreateMenuItemRequest,
  MenuItemResponse,
  CreateOrderRequest,
  OrderItemRequest,
};
