import React from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'لا يوجد أي تقرير حتى الآن',
  description = 'اضغط على "إنشاء التقرير الذكي" لإنشاء أول تقرير شامل',
  actionText = 'إنشاء التقرير الذكي',
  onAction
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl" />
        <div className="relative p-8 bg-[#090909] border border-gray-900 rounded-full">
          <FileText className="w-16 h-16 text-[#D4AF37]" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 text-center max-w-md">{description}</p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] hover:from-[#C59740] hover:to-[#D4AF37] text-black font-extrabold text-sm rounded-xl shadow-lg transition duration-200"
        >
          <Sparkles className="w-5 h-5" />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  );
}
