import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { AIInsight } from '../types';

interface InsightCardProps {
  insight: AIInsight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  const getPriorityIcon = () => {
    switch (insight.priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'medium':
        return <Target className="w-5 h-5 text-amber-400" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getPriorityColor = () => {
    switch (insight.priority) {
      case 'high':
        return 'bg-red-950/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-950/20 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-emerald-950/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const getPriorityText = () => {
    switch (insight.priority) {
      case 'high':
        return 'عالي';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'منخفض';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-5 bg-[#090909] border border-gray-900 rounded-xl hover:border-[#D4AF37]/30 transition duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#D4AF37]" />
          <h4 className="text-sm font-bold text-white">{insight.title}</h4>
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor()}`}>
          {getPriorityIcon()}
          <span>{getPriorityText()}</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 mb-3">{insight.description}</p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">التأثير المتوقع:</span>
        <span className="text-gray-400">{insight.expectedImpact}</span>
      </div>
      
      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-gray-500">مستوى الثقة:</span>
        <span className="text-gray-400">{insight.confidenceScore}%</span>
      </div>
    </motion.div>
  );
}
