import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { AnalyticsNotification } from '../types';

interface NotificationToastProps {
  notification: AnalyticsNotification;
  onClose: () => void;
}

export default function NotificationToast({ notification, onClose }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-emerald-500/30';
      case 'error':
        return 'border-red-500/30';
      case 'warning':
        return 'border-amber-500/30';
      case 'info':
        return 'border-blue-500/30';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        className={`p-4 bg-[#090909] border ${getBorderColor()} rounded-xl shadow-lg`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1">
            <p className="text-sm text-gray-300">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-500 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
