import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Coffee, DollarSign, CheckCircle2, Utensils, Filter, Plus, X, 
  Loader2, ChefHat, Clock, AlertCircle, Package
} from 'lucide-react';
import { RestaurantOrder } from '../types';
import CreateOrderModal from './CreateOrderModal';
import CreateMenuItemModal from './CreateMenuItemModal';
import { apiService } from '../services/api';

interface OrdersSectionProps {
  orders?: RestaurantOrder[];
  onUpdateOrderStatus?: (orderId: string, status: RestaurantOrder['status']) => void;
}

// Backend statuses: PENDING, COMPLETED, CANCELLED
const STATUS_LABELS: Record<string, string> = {
  'PENDING': 'قيد الانتظار',
  'COMPLETED': 'مكتمل',
  'CANCELLED': 'ملغي',
};

const STATUS_COLORS: Record<string, string> = {
  'PENDING': 'bg-amber-50 text-amber-700 border-amber-200',
  'COMPLETED': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'CANCELLED': 'bg-red-50 text-red-700 border-red-200',
};

const CATEGORY_LABELS: Record<string, string> = {
  'FOOD': 'طعام',
  'DRINK': 'مشروبات',
  'SERVICE': 'خدمات',
};

const CATEGORY_ICONS: Record<string, string> = {
  'FOOD': '🍽️',
  'DRINK': '🥤',
  'SERVICE': '⭐',
};

export default function OrdersSection({ orders: initialOrders = [] }: OrdersSectionProps) {
  const [viewMode, setViewMode] = useState<'orders' | 'menu'>('orders');
  const [filter, setFilter] = useState<string>('all');
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isCreateMenuItemModalOpen, setIsCreateMenuItemModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadMenu();
    loadOrders();
  }, []);

  const loadStats = async () => {
    try {
      const response = await apiService.getRestaurantStats();
      setStats(response);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadMenu = async () => {
    try {
      const response = await apiService.getRestaurantMenu(0, 100);
      setMenuItems(response.content || []);
    } catch (error) {
      setMenuItems([]);
    }
  };

  const loadOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getRestaurantPendingOrders();
      const rawOrders = Array.isArray(response) ? response : [];
      const transformedOrders = rawOrders.map((order: any) => ({
        id: String(order.orderId),
        roomNumber: order.roomNumber || '-',
        guestName: order.guestName || '',
        category: order.category || 'FOOD',
        items: Array.isArray(order.items) ? order.items.map((item: any) => ({
          name: item.itemName || item.name || '',
          quantity: item.quantity || 1,
          price: parseFloat(item.unitPrice) || item.price || 0,
          category: order.category || 'FOOD',
          menuItemId: item.menuItemId || 0,
        })) : [],
        status: (order.orderStatus || order.status || 'PENDING').toUpperCase(),
        total: parseFloat(order.totalAmount) || 0,
        createdAt: order.createdAt || '',
      }));
      setOrders(transformedOrders);
    } catch (error: any) {
      console.error('Failed to load orders:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrderSuccess = (newOrder?: any) => {
    if (newOrder) {
      // Add new order to local state immediately
      setOrders(prev => [newOrder, ...prev]);
    }
    // Reload from backend in background
    setTimeout(() => {
      loadOrders();
      loadStats();
    }, 500);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Only send valid backend statuses
      const backendStatus = ['PENDING', 'COMPLETED', 'CANCELLED'].includes(newStatus) ? newStatus : 'PENDING';
      await apiService.updateRestaurantOrderStatus(parseInt(orderId), backendStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: backendStatus } : o));
      loadStats();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  // Use local order counts as primary (stats API may return zeros)
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const completedCount = orders.filter(o => o.status === 'COMPLETED').length;
  const cancelledCount = orders.filter(o => o.status === 'CANCELLED').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-black text-gray-900">الطلبات</h1>
          <p className="text-sm mt-1 text-gray-500">تتبع طلبات الطعام ومراقبة حالة المطبخ والمبيعات.</p>
        </div>
        <div className="flex gap-2">
          {viewMode === 'orders' && (
            <button 
              onClick={() => setIsCreateOrderModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-white font-bold text-sm rounded-xl shadow-lg transition duration-200 hover:shadow-xl"
            >
              <Plus size={18} />
              <span>إنشاء طلب</span>
            </button>
          )}
          {viewMode === 'menu' && (
            <button 
              onClick={() => setIsCreateMenuItemModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-white font-bold text-sm rounded-xl shadow-lg transition duration-200 hover:shadow-xl"
            >
              <Plus size={18} />
              <span>إضافة عنصر</span>
            </button>
          )}
        </div>
      </div>

      {/* View Mode Toggles */}
      <div className="flex flex-wrap items-center gap-2 border border-gray-200 p-3 rounded-xl bg-white">
        {[
          { id: 'orders', label: 'الطلبات', icon: <Utensils size={16} /> },
          { id: 'menu', label: 'القائمة', icon: <ChefHat size={16} /> }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition border ${
              viewMode === mode.id ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {mode.icon}
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">إجمالي الطلبات</span>
            <div className="text-2xl font-black font-mono text-gray-900">{totalOrdersCount}</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-emerald-50 text-emerald-600 w-fit">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">قيد الانتظار</span>
            <div className="text-2xl font-black font-mono text-gray-900">{pendingCount}</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-amber-50 text-amber-600 w-fit">
            <Clock size={20} />
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">المكتملة</span>
            <div className="text-2xl font-black font-mono text-gray-900">{completedCount}</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-purple-50 text-purple-600 w-fit">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">ملغاة</span>
            <div className="text-2xl font-black font-mono text-gray-900">{cancelledCount}</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-red-50 text-red-600 w-fit">
            <AlertCircle size={20} />
          </div>
        </div>
      </div>

      {/* Status Filter */}
      {viewMode === 'orders' && (
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="text-[#D4AF37] w-4 h-4" />
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition ${
              filter === 'all' ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900'
            }`}
          >
            الكل ({orders.length})
          </button>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition ${
                filter === key ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900'
              }`}
            >
              {label} ({orders.filter(o => o.status === key).length})
            </button>
          ))}
        </div>
      )}

      {/* Orders View */}
      {viewMode === 'orders' && (
        <>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={28} className="text-[#D4AF37] animate-spin" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
              <Utensils size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm font-bold mb-4">لا توجد طلبات حالياً</p>
              <button
                onClick={() => setIsCreateOrderModalOpen(true)}
                className="px-5 py-2 bg-[#D4AF37] text-white font-bold text-sm rounded-xl"
              >
                إنشاء طلب
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl hover:border-[#D4AF37]/35 transition duration-300 flex flex-col bg-white overflow-hidden">
                  {/* Status Bar */}
                  <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${STATUS_COLORS[order.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                    <span className="text-sm text-gray-400 font-bold">
                      {CATEGORY_LABELS[order.category] || order.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Time & Room */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900 block">غرفة {order.roomNumber}</span>
                        <span className="text-sm text-gray-500 font-bold block mt-0.5">{order.createdAt ? new Date(order.createdAt).toLocaleString('ar-SA', { hour: '2-digit', minute: '2-digit', calendar: 'gregory' }) : '—'}</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 mb-4 flex-1">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{CATEGORY_ICONS[item.category] || '🍽️'}</span>
                            <div>
                              <span className="text-sm font-bold text-gray-800 block">{item.name}</span>
                              <span className="text-xs text-gray-400">{CATEGORY_LABELS[item.category] || ''}</span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-500">x{item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-2">لا توجد عناصر</p>
                      )}
                    </div>

                    {/* Total & Status Select */}
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-bold text-gray-400 block">الإجمالي</span>
                        <span className="text-xl font-black font-mono text-[#AA7B30]">
                          {(order.total || 0).toLocaleString('ar-SA', { maximumFractionDigits: 0 })} <span className="text-sm font-sans">ريال</span>
                        </span>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-2 rounded-lg text-sm font-bold border ${STATUS_COLORS[order.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Menu View */}
      {viewMode === 'menu' && (
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <h3 className="text-lg font-bold mb-4 text-gray-900">قائمة الطعام</h3>
          {menuItems.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm font-bold">لا توجد عناصر في القائمة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex justify-between items-start">
                    <span className="text-base font-bold text-gray-900">{item.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-600">{CATEGORY_LABELS[item.category] || item.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.description || 'بدون وصف'}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-base font-black font-mono text-[#AA7B30]">{item.price} ريال</span>
                    <span className={`text-sm font-bold ${item.available ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.available ? 'متوفر' : 'غير متوفر'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Order Modal */}
      <CreateOrderModal
        isOpen={isCreateOrderModalOpen}
        onClose={() => setIsCreateOrderModalOpen(false)}
        onSuccess={handleCreateOrderSuccess}
        roomNumber="101"
      />

      {/* Create Menu Item Modal */}
      <CreateMenuItemModal
        isOpen={isCreateMenuItemModalOpen}
        onClose={() => setIsCreateMenuItemModalOpen(false)}
        onSuccess={() => { loadMenu(); setIsCreateMenuItemModalOpen(false); }}
      />
    </div>
  );
}
