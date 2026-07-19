import React from 'react';
import { motion } from 'motion/react';

interface LoadingStateProps {
  message?: string;
  estimatedTime?: string;
}

export default function LoadingState({
  message = 'جاري تحميل البيانات...',
  estimatedTime = '30 ثانية'
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative w-16 h-16 border-4 border-gray-800 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-lg font-bold text-white mb-2"
      >
        {message}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="text-sm text-gray-400"
      >
        الوقت المتوقع: {estimatedTime}
      </motion.p>
      
      <div className="mt-6 w-64 h-2 bg-gray-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-l from-[#AA7B30] to-[#D4AF37] rounded-full"
        />
      </div>
    </div>
  );
}
