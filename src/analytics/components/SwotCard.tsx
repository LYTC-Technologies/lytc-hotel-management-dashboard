import React from 'react';
import { motion } from 'motion/react';

interface SwotCardProps {
  title: string;
  items: string[];
  color: string;
  icon: React.ReactNode;
}

export default function SwotCard({ title, items, color, icon }: SwotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-[#090909] border border-gray-900 rounded-xl hover:border-[#D4AF37]/30 transition duration-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-[#121212] rounded-lg" style={{ color }}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-start gap-2 text-xs text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
