import { useEffect, useRef, useState, useCallback } from 'react';
import { apiService } from '../services/api';

export interface SSEEvent {
  type: string;
  data: any;
  timestamp: number;
}

export interface UseSSEOptions {
  enabled?: boolean;
  onEvent?: (event: SSEEvent) => void;
  onError?: (error: Error) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function useSSE(options: UseSSEOptions = {}) {
  const {
    enabled = true,
    onEvent,
    onError,
    onConnect,
    onDisconnect,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<SSEEvent | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const eventSource = apiService.subscribeToEvents((event) => {
        const sseEvent: SSEEvent = {
          type: event.type,
          data: event.data,
          timestamp: Date.now(),
        };
        setLastEvent(sseEvent);
        onEvent?.(sseEvent);
      });

      eventSourceRef.current = eventSource;
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
      onConnect?.();
    } catch (error) {
      console.error('SSE connection error:', error);
      onError?.(error as Error);
      setIsConnected(false);
      
      // Attempt reconnection
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectAttemptsRef.current++;
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, RECONNECT_DELAY);
      }
    }
  }, [onEvent, onError, onConnect]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setIsConnected(false);
    onDisconnect?.();
  }, [onDisconnect]);

  useEffect(() => {
    if (enabled) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  return {
    isConnected,
    lastEvent,
    connect,
    disconnect,
  };
}

// SSE Event Types based on Swagger
export const SSE_EVENT_TYPES = {
  STAY_CREATED: 'STAY_CREATED',
  STAY_UPDATED: 'STAY_UPDATED',
  STAY_CHECKED_IN: 'STAY_CHECKED_IN',
  STAY_CHECKED_OUT: 'STAY_CHECKED_OUT',
  ORDER_CREATED: 'ORDER_CREATED',
  ORDER_UPDATED: 'ORDER_UPDATED',
  ROOM_STATUS_CHANGED: 'ROOM_STATUS_CHANGED',
  RESERVATION_REQUEST_CREATED: 'RESERVATION_REQUEST_CREATED',
  RESERVATION_REQUEST_APPROVED: 'RESERVATION_REQUEST_APPROVED',
  RESERVATION_REQUEST_REJECTED: 'RESERVATION_REQUEST_REJECTED',
} as const;
