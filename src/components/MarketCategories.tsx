import React from 'react';
import { MARKET_CATEGORIES } from '../data/marketData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MarketCategoriesProps {
  onSelectCategory: (categoryKey: string) => void;
  onTradeNow: (categoryKey: string) => void;
}

export const MarketCategories: React.FC<MarketCategoriesProps> = ({
  onSelectCategory,
  onTradeNow,
}) => {
  return (
    <section id="markets" className="py-16 sm:py-20 bg-white dark:bg-[#070b12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Asset Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            Trade 100+ Markets
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Forex, Gold, Indices, Commodities, Crypto & More
          </p>
        </div>

        {/* 5 Asset Cards Grid (matching mockup) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {MARKET_CATEGORIES.map((cat) => {
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.categoryKey)}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-gradient-to-b dark:from-[#0d1424]/90 dark:to-[#080d17]/90 hover:border-emerald-400 dark:hover:border-gray-500 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer"
              >
                {/* Card Top: Title & Count */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5 block">
                    {cat.count}
                  </span>
                </div>

                {/* Center: Glowing SVG Sparkline Curve */}
                <div className="py-6 sm:py-8 flex items-center justify-center">
                  <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id={`gradient-${cat.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={cat.color} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={cat.color} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area under sparkline */}
                    <path
                      d={`${generateSmoothPath(cat.sparkline, 100, 40)} L 100 40 L 0 40 Z`}
                      fill={`url(#gradient-${cat.id})`}
                    />
                    
                    {/* Line */}
                    <path
                      d={generateSmoothPath(cat.sparkline, 100, 40)}
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Card Bottom: Trade Now CTA */}
                <div className="pt-2 border-t border-gray-100 dark:border-[#1a273f]/60 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTradeNow(cat.categoryKey);
                    }}
                    className="flex items-center text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors"
                  >
                    <span>Trade Now</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

function generateSmoothPath(data: number[], width: number, height: number): string {
  if (!data || data.length === 0) return 'M 0 20 L 100 20';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;

  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return { x, y };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    path += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
  }
  path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
  return path;
}
