import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
}

export default function ErrorState({
  title = 'حدث خطأ أثناء تحميل البيانات',
  description = 'فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني',
  onRetry,
  onContactSupport
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl" />
        <div className="relative p-8 bg-[#090909] border border-red-500/30 rounded-full">
          <AlertCircle className="w-16 h-16 text-red-400" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 text-center max-w-md">{description}</p>
      
      <div className="flex gap-3">
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#C59740] text-black font-extrabold text-sm rounded-xl shadow-lg transition duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>إعادة المحاولة</span>
          </motion.button>
        )}
        
        {onContactSupport && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactSupport}
            className="flex items-center gap-2 px-6 py-3 bg-[#121212] border border-gray-800 hover:border-gray-700 text-white font-extrabold text-sm rounded-xl transition duration-200"
          >
            <MessageSquare className="w-5 h-5" />
            <span>تواصل مع الدعم</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
