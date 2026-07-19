import React from 'react';
import { motion } from 'motion/react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  color?: string;
}

export default function SummaryCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  color = '#D4AF37'
}: SummaryCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-[#090909] border border-gray-900 rounded-xl hover:border-[#D4AF37]/30 transition duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#121212] rounded-lg" style={{ color }}>
          {icon}
        </div>
        {trend && trendValue && (
          <div className={`text-xs font-bold ${getTrendColor()} flex items-center gap-1`}>
            <span>{getTrendIcon()}</span>
            <span>{Math.abs(trendValue)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-xs text-gray-500 font-bold">{title}</h3>
        <p className="text-2xl font-black text-white">{value}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}
