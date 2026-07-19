import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, AlertCircle, Wifi } from 'lucide-react';
import { PlatformStatus } from '../types';

interface PlatformCardProps {
  key?: number | string;
  name: string;
  logo: React.ReactNode;
  status: PlatformStatus;
  lastSync: string;
  apiHealth: string;
  lastSuccessfulUpdate: string;
}

export default function PlatformCard({
  name,
  logo,
  status,
  lastSync,
  apiHealth,
  lastSuccessfulUpdate
}: PlatformCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'not_connected':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'متصل';
      case 'not_connected':
        return 'غير متصل';
      case 'error':
        return 'خطأ';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-emerald-950/20 text-emerald-400 border-emerald-500/30';
      case 'not_connected':
        return 'bg-gray-900 text-gray-400 border-gray-700';
      case 'error':
        return 'bg-red-950/20 text-red-400 border-red-500/30';
    }
  };

  const isOnline = status === 'connected';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-[#090909] border border-gray-900 rounded-xl hover:border-[#D4AF37]/30 transition duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#121212] rounded-lg">
            {logo}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{name}</h3>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold mt-1 ${getStatusColor()}`}>
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>
        {isOnline && (
          <div className="relative">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75" />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">آخر مزامنة:</span>
          <span className="text-gray-400">{lastSync}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">صحة API:</span>
          <span className="text-gray-400">{apiHealth}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">آخر تحديث ناجح:</span>
          <span className="text-gray-400">{lastSuccessfulUpdate}</span>
        </div>
      </div>
    </motion.div>
  );
}
