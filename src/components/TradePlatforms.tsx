import React from 'react';
import { Smartphone, Monitor, Globe, Check, Zap, ShieldCheck } from 'lucide-react';

interface TradePlatformsProps {
  onOpenAccount: () => void;
}

export const TradePlatforms: React.FC<TradePlatformsProps> = ({ onOpenAccount }) => {
  return (
    <div
      id="platforms"
      className="w-full h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0d1424] dark:via-[#090e18] dark:to-[#0d1424] shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Top Header info */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/20 mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>A5 Proprietary Trading Suite</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
          Trade Anywhere, <br className="hidden sm:inline" />
          Anytime on A5 Terminal
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          Experience our custom-engineered A5 proprietary trading platform. Built for blazing speed, institutional-grade liquidity, and advanced charting across all devices.
        </p>

        {/* Feature bullets */}
        <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-brand-green/20 flex items-center justify-center text-emerald-600 dark:text-brand-green">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>A5 WebTrader:</strong> Zero installation, trade directly in any browser</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-brand-green/20 flex items-center justify-center text-emerald-600 dark:text-brand-green">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>A5 Mobile App:</strong> Fast touch execution for iOS and Android</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-brand-green/20 flex items-center justify-center text-emerald-600 dark:text-brand-green">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span><strong>Ultra-Fast Execution:</strong> Fiber connection with &lt;8ms order latency</span>
          </div>
        </div>
      </div>

      {/* Center 3D Interactive Device Mockup Visual */}
      <div className="relative z-10 my-4 py-4 flex items-center justify-center">
        <div className="relative w-full max-w-[340px] h-[190px] flex items-center justify-center">
          
          {/* Main Tablet Mockup */}
          <div className="absolute left-4 top-2 w-[220px] h-[150px] rounded-xl bg-[#080d17] border-2 border-gray-700 shadow-2xl p-2.5 flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1 text-[9px] text-gray-400">
              <span className="font-bold text-white">A5 WebTrader</span>
              <span className="text-emerald-400 font-mono">LIVE FEED</span>
            </div>
            <div className="h-16 flex items-end justify-between px-1 py-1 gap-1">
              {[40, 65, 50, 80, 70, 90, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-[1px] h-full bg-emerald-500/40" />
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-sm ${i % 3 === 0 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-gray-800 text-[8px]">
              <span className="bg-emerald-500 text-black font-bold px-2 py-0.5 rounded">BUY</span>
              <span className="bg-rose-500 text-white font-bold px-2 py-0.5 rounded">SELL</span>
            </div>
          </div>

          {/* Mobile Phone Mockup */}
          <div className="absolute right-4 bottom-0 w-[110px] h-[170px] rounded-2xl bg-[#05080f] border-2 border-emerald-500/60 shadow-glow-green/30 p-2 flex flex-col justify-between transform rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
            <div className="w-10 h-1.5 bg-gray-800 rounded-full mx-auto" />
            <div className="my-auto text-center">
              <div className="text-[9px] font-extrabold text-white">A5 MOBILE</div>
              <div className="text-[8px] text-emerald-400 font-mono font-bold">$20 DEPOSIT</div>
              <div className="w-full h-8 mt-1 flex items-center justify-center">
                <svg className="w-full h-6" viewBox="0 0 50 20">
                  <polyline
                    fill="none"
                    stroke="#00d26a"
                    strokeWidth="2"
                    points="0,15 10,12 20,16 30,8 40,10 50,4"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full py-1 bg-brand-green rounded text-black text-[8px] font-black text-center">
              TRADE NOW
            </div>
          </div>

        </div>
      </div>

      {/* Bottom CTA & Platform Badges */}
      <div className="relative z-10 pt-4 border-t border-gray-200 dark:border-[#1a273f] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-700 dark:text-gray-300" title="A5 Desktop">
            <Monitor className="w-4 h-4" />
          </div>
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-700 dark:text-gray-300" title="A5 Mobile">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-700 dark:text-gray-300" title="A5 WebTrader">
            <Globe className="w-4 h-4" />
          </div>
        </div>

        <button
          onClick={onOpenAccount}
          className="px-4 py-2 text-xs font-bold text-black bg-brand-green hover:bg-brand-green-hover rounded-lg shadow-glow-green transition-all"
        >
          Launch A5 WebTrader
        </button>
      </div>

    </div>
  );
};
