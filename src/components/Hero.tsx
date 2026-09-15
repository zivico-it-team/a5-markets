import React from 'react';
import { MarketItem } from '../types';
import { LiveChart } from './LiveChart';
import { ArrowRight, TrendingUp, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  selectedItem: MarketItem;
  allItems: MarketItem[];
  onSelectSymbol: (symbol: string) => void;
  onOpenAccount: () => void;
  onOpenDemo: () => void;
  onQuickTrade: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedItem,
  allItems,
  onSelectSymbol,
  onOpenAccount,
  onOpenDemo,
  onQuickTrade,
}) => {
  const scrollToInvestments = () => {
    const el = document.getElementById('investments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:py-16 bg-gradient-to-b from-white via-cyan-50/20 to-white dark:from-[#070b12] dark:via-[#091524] dark:to-[#070b12] transition-colors duration-300">
      
      {/* Background Decorative Glows aligned to A5 Logo colors */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[320px] bg-blue-600/10 dark:bg-[#163b65]/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 mb-6 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-serif italic font-semibold text-xs sm:text-sm">Your Growth, Our Priority</span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="uppercase tracking-wider font-mono text-[11px]">A5 Markets</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5 font-sans">
              UNLOCK THE WORLD <br />
              OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] drop-shadow-[0_0_25px_rgba(0,180,216,0.35)]">FOREX TRADING</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed max-w-xl mb-8">
              Experience institutional execution on the custom A5 Terminal, or accelerate wealth with our high-yield structured <strong className="text-cyan-600 dark:text-cyan-400">Investment Plans (75% to 150% return)</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenAccount}
                className="w-full sm:w-auto px-8 py-3.5 text-base font-extrabold text-white bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] hover:from-cyan-400 hover:to-teal-500 rounded-xl shadow-glow-cyan transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Open Live Account</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToInvestments}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50/70 dark:bg-[#0c1d33] border border-cyan-300 dark:border-cyan-500/40 hover:border-cyan-500 rounded-xl transition-all duration-200 hover:bg-cyan-100 dark:hover:bg-[#112a4a] flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
              >
                <TrendingUp className="w-4 h-4 text-cyan-500 transition-transform group-hover:scale-110" />
                <span>Explore Investment Plans</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Tier-1 Bank Custody</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Up to 500:1 Leverage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Raw Spreads from 0.0</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Trading Candlestick Chart */}
          <div className="lg:col-span-6 w-full">
            <LiveChart
              selectedItem={selectedItem}
              allItems={allItems}
              onSelectSymbol={onSelectSymbol}
              onTradeClick={onQuickTrade}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
