import React from 'react';
import { MarketItem } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketTickerProps {
  items: MarketItem[];
  onSelectSymbol: (symbol: string) => void;
  selectedSymbol: string;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({
  items,
  onSelectSymbol,
  selectedSymbol,
}) => {
  const tickerItems = items.slice(0, 5);

  return (
    <section className="w-full border-b border-gray-200 dark:border-[#1a273f]/80 bg-slate-50 dark:bg-[#080d17]/90 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4">
          {tickerItems.map((item) => {
            const isPositive = item.change >= 0;
            const isSelected = selectedSymbol === item.symbol;

            return (
              <div
                key={item.id}
                onClick={() => onSelectSymbol(item.symbol)}
                className={`flex flex-col p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-brand-green/70 bg-brand-green/10 shadow-sm'
                    : 'border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0e1626]/80 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                {/* Top Row: Symbol & Change */}
                <div className="flex items-center justify-between gap-1 text-[11px] sm:text-xs">
                  <span className="font-bold tracking-wider text-gray-800 dark:text-gray-200">
                    {item.symbol}
                  </span>
                  <div
                    className={`flex items-center font-mono font-bold text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded ${
                      isPositive
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                        : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    ) : (
                      <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                    )}
                    <span>{isPositive ? '+' : ''}{item.change.toFixed(2)}%</span>
                  </div>
                </div>

                {/* Bottom Row: Price & Mini Sparkline */}
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white">
                    {item.ask.toLocaleString(undefined, {
                      minimumFractionDigits: item.digits,
                      maximumFractionDigits: item.digits,
                    })}
                  </span>

                  {/* Mini Sparkline SVG */}
                  <svg className="w-12 sm:w-14 h-4 overflow-visible" viewBox="0 0 60 20">
                    <polyline
                      fill="none"
                      stroke={isPositive ? '#00d26a' : '#f43f5e'}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={generateSvgPoints(item.sparkline, 60, 20)}
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function generateSvgPoints(data: number[], width: number, height: number): string {
  if (!data || data.length === 0) return '0,10 60,10';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  return data
    .map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}
