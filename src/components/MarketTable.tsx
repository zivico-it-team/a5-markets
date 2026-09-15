import React, { useState } from 'react';
import { MarketItem } from '../types';
import { Search } from 'lucide-react';

interface MarketTableProps {
  items: MarketItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectSymbol: (symbol: string) => void;
  onTradeClick: (item: MarketItem) => void;
}

export const MarketTable: React.FC<MarketTableProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  onSelectSymbol,
  onTradeClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'popular', label: 'Popular' },
    { id: 'forex', label: 'Forex' },
    { id: 'metals', label: 'Metals' },
    { id: 'indices', label: 'Indices' },
    { id: 'commodities', label: 'Commodities' },
    { id: 'crypto', label: 'Crypto' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'popular'
        ? item.category === 'popular' || ['EUR/USD', 'GBP/USD', 'XAU/USD', 'BTC/USD', 'WTI'].includes(item.symbol)
        : item.category === selectedCategory;
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/95 p-4 sm:p-6 shadow-xl transition-all duration-300">
      
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-[#1a273f]">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gray-200 dark:bg-[#1a273f] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-48">
          <input
            type="text"
            placeholder="Search pair..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-xs py-1.5 pl-7 pr-3 rounded-lg focus:outline-none focus:border-brand-green"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#1a273f]/60">
              <th className="py-3 px-3">Symbol</th>
              <th className="py-3 px-3 text-right">Bid</th>
              <th className="py-3 px-3 text-right">Ask</th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">Spread</th>
              <th className="py-3 px-3 text-right">Change</th>
              <th className="py-3 px-3 text-center hidden md:table-cell">Chart</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#1a273f]/40">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  No symbols found. Try another category or search query.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isPositive = item.change >= 0;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectSymbol(item.symbol)}
                    className="hover:bg-gray-50 dark:hover:bg-[#121c30]/60 cursor-pointer transition-colors duration-150 group"
                  >
                    {/* Symbol & Name */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.icon || '🪙'}</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors">
                            {item.symbol}
                          </span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:inline">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Bid */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-gray-800 dark:text-gray-200">
                      {item.bid.toFixed(item.digits)}
                    </td>

                    {/* Ask */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-gray-800 dark:text-gray-200">
                      {item.ask.toFixed(item.digits)}
                    </td>

                    {/* Spread */}
                    <td className="py-3 px-3 text-right font-mono text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                      {item.spread.toFixed(item.digits === 5 ? 1 : (item.digits === 3 ? 2 : 1))}
                    </td>

                    {/* Change % */}
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`inline-flex items-center font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                          isPositive
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                            : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
                        }`}
                      >
                        {isPositive ? '+' : ''}{item.change.toFixed(2)}%
                      </span>
                    </td>

                    {/* Mini Sparkline Chart Canvas */}
                    <td className="py-3 px-3 text-center hidden md:table-cell">
                      <div className="flex justify-center">
                        <svg className="w-16 h-5 overflow-visible" viewBox="0 0 60 20">
                          <polyline
                            fill="none"
                            stroke={isPositive ? '#00d26a' : '#f43f5e'}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={generatePoints(item.sparkline, 60, 20)}
                          />
                        </svg>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onTradeClick(item)}
                        className="px-3 py-1 text-xs font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-[#1a273f] hover:bg-brand-green dark:hover:bg-brand-green hover:text-black dark:hover:text-black border border-gray-300 dark:border-[#223354] rounded-md transition-all duration-200"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

function generatePoints(data: number[], width: number, height: number): string {
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
