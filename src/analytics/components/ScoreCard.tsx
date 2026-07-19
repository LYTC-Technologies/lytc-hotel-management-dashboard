import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ScoreCardProps {
  key?: number | string;
  name: string;
  score: number;
  description: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export default function ScoreCard({
  name,
  score,
  description,
  color,
  trend,
  trendValue
}: ScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-[#090909] border border-gray-900 rounded-xl hover:border-[#D4AF37]/30 transition duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">{name}</h3>
        <div className="flex items-center gap-1">
          {getTrendIcon()}
          <span className={`text-xs font-bold ${
            trend === 'up' ? 'text-emerald-400' : 
            trend === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {Math.abs(trendValue)}%
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#1a1a1a"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-white">{animatedScore}</span>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 text-center">{description}</p>
    </motion.div>
  );
}
