import React, { useState } from 'react';
import { Users, DollarSign, Award, ArrowRight, ShieldCheck, Share2, Sparkles } from 'lucide-react';

interface PartnershipSectionProps {
  onOpenPartnerModal: () => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onOpenPartnerModal }) => {
  const [lotsTraded, setLotsTraded] = useState<number>(350);
  const rebatePerLot = 12; // $12 per lot average
  const monthlyEarnings = lotsTraded * rebatePerLot;

  return (
    <section id="partners" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#060a10] border-t border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20 mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>IB & Affiliate Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            Partner with A5 Markets
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Earn industry-leading rebates of up to <strong className="text-brand-green">$15 per lot</strong> with daily automated payouts, real-time tracking, and dedicated marketing materials.
          </p>
        </div>

        {/* 2 Column Layout: Benefits & Rebate Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3 Benefit Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-brand-green border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  High-Yield Volume Rebates
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Earn progressive commission tiers up to $15/lot on Forex and Metals with zero earning caps.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  Multi-Tier Sub-IB Structure
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Expand your network and receive passive secondary overrides from sub-affiliates you introduce.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-500/30 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                  Daily Payouts & IB Portal
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Withdraw commissions instantly in Crypto, USD, or Bank Wire with detailed live client analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive IB Commission Calculator */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] shadow-xl">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                Estimate Your Monthly Partner Earnings
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
                Drag the slider to calculate potential earnings based on your referred monthly trading volume.
              </p>

              {/* Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Client Volume (Lots):</span>
                  <span className="font-mono text-base text-brand-green">{lotsTraded} Lots</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={lotsTraded}
                  onChange={(e) => setLotsTraded(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-green"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                  <span>20 Lots</span>
                  <span>500 Lots</span>
                  <span>1,000 Lots</span>
                  <span>2,000+ Lots</span>
                </div>
              </div>

              {/* Earnings Result Card */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-[#091522] border border-emerald-200 dark:border-emerald-500/30 text-center mb-6">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Estimated Monthly Commission
                </span>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-brand-green mt-1">
                  ${monthlyEarnings.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ month</span>
                </div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 block">
                  Based on ${rebatePerLot}/lot average across standard major pairs
                </span>
              </div>

              {/* Register CTA */}
              <button
                onClick={onOpenPartnerModal}
                className="w-full py-3.5 text-sm font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all flex items-center justify-center gap-2"
              >
                <span>Become an A5 Markets Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
