import React, { useState } from 'react';
import { MarketItem } from '../types';
import { Calculator, ArrowRight } from 'lucide-react';

interface ProfitCalculatorProps {
  items: MarketItem[];
  onOpenAccount: () => void;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ items, onOpenAccount }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [lots, setLots] = useState<number>(0.1);
  const leverage = 500;

  const currentItem = items.find((i) => i.symbol === selectedSymbol) || items[0];

  const [entryPrice, setEntryPrice] = useState<number>(currentItem.ask);
  const [exitPrice, setExitPrice] = useState<number>(currentItem.ask * 1.002);

  const handleSymbolChange = (sym: string) => {
    setSelectedSymbol(sym);
    const item = items.find((i) => i.symbol === sym) || items[0];
    setEntryPrice(item.ask);
    setExitPrice(Number((item.ask * 1.002).toFixed(item.digits)));
  };

  const isForex = currentItem.category === 'forex' || ['EUR/USD', 'GBP/USD'].includes(currentItem.symbol);
  const contractSize = isForex ? 100000 : (currentItem.symbol.includes('XAU') ? 100 : (currentItem.symbol.includes('BTC') ? 1 : 10));

  const priceDiff = tradeType === 'BUY' ? exitPrice - entryPrice : entryPrice - exitPrice;
  const profitUSD = lots * contractSize * priceDiff;
  const marginUSD = (entryPrice * contractSize * lots) / leverage;
  const pipValue = contractSize * (currentItem.digits === 5 ? 0.0001 : (currentItem.digits === 3 ? 0.01 : 0.1)) * lots;

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white dark:bg-[#070b12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-[#1a273f]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Trading Tools</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Profit & Pip Calculator
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Estimate your trade margin, pip value and potential profit before execution.
              </p>
            </div>

            {/* Buy / Sell switch */}
            <div className="flex items-center bg-gray-100 dark:bg-[#121c30] p-1 rounded-xl border border-gray-300 dark:border-[#1a273f]">
              <button
                onClick={() => setTradeType('BUY')}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'BUY'
                    ? 'bg-brand-green text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                BUY (Long)
              </button>
              <button
                onClick={() => setTradeType('SELL')}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  tradeType === 'SELL'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                SELL (Short)
              </button>
            </div>
          </div>

          {/* Calculator Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            
            {/* Instrument Select */}
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Instrument
              </label>
              <select
                value={selectedSymbol}
                onChange={(e) => handleSymbolChange(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:border-brand-green"
              >
                {items.map((item) => (
                  <option key={item.id} value={item.symbol} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    {item.symbol} ({item.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Lot Size */}
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Lot Size (Volume)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="50"
                value={lots}
                onChange={(e) => setLots(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white font-mono text-sm font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:border-brand-green"
              />
            </div>

            {/* Entry Price */}
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Open Price
              </label>
              <input
                type="number"
                step="0.0001"
                value={entryPrice}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white font-mono text-sm font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:border-brand-green"
              />
            </div>

            {/* Exit Price */}
            <div>
              <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
                Close Price
              </label>
              <input
                type="number"
                step="0.0001"
                value={exitPrice}
                onChange={(e) => setExitPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white font-mono text-sm font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:border-brand-green"
              />
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-[#090e18] border border-gray-200 dark:border-[#1a273f]">
            
            {/* Required Margin */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Required Margin (500:1)</span>
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                ${marginUSD.toFixed(2)}
              </span>
            </div>

            {/* Pip Value */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Pip Value</span>
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">
                ${pipValue.toFixed(2)}
              </span>
            </div>

            {/* Estimated Profit/Loss */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Estimated Profit / Loss</span>
              <span
                className={`font-mono text-xl sm:text-2xl font-extrabold mt-1 ${
                  profitUSD >= 0 ? 'text-emerald-600 dark:text-brand-green' : 'text-rose-500'
                }`}
              >
                {profitUSD >= 0 ? '+' : ''}${profitUSD.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Action CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              *Calculations are for educational purposes. Leverage up to 500:1 available on standard accounts.
            </span>
            <button
              onClick={onOpenAccount}
              className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all flex items-center justify-center gap-1.5"
            >
              <span>Trade This Instrument</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
