import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Printer, Share, Copy } from 'lucide-react';

interface ExportButtonsProps {
  onExportPDF?: () => void;
  onExportDOCX?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
  onCopySummary?: () => void;
}

export default function ExportButtons({
  onExportPDF,
  onExportDOCX,
  onPrint,
  onShare,
  onCopySummary
}: ExportButtonsProps) {
  const buttons = [
    { icon: <FileText className="w-4 h-4" />, label: 'تصدير PDF', onClick: onExportPDF },
    { icon: <Download className="w-4 h-4" />, label: 'تصدير DOCX', onClick: onExportDOCX },
    { icon: <Printer className="w-4 h-4" />, label: 'طباعة', onClick: onPrint },
    { icon: <Share className="w-4 h-4" />, label: 'مشاركة', onClick: onShare },
    { icon: <Copy className="w-4 h-4" />, label: 'نسخ الملخص', onClick: onCopySummary }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button, index) => (
        button.onClick && (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.onClick}
            className="flex items-center gap-2 px-4 py-2 bg-[#121212] border border-gray-800 hover:border-[#D4AF37]/50 text-white font-bold text-xs rounded-xl transition duration-200"
          >
            {button.icon}
            <span>{button.label}</span>
          </motion.button>
        )
      ))}
    </div>
  );
}
