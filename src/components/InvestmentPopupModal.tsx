import React, { useState, useEffect } from 'react';
import { X, TrendingUp, ShieldCheck, ArrowRight, Sparkles, Check, Award } from 'lucide-react';

interface InvestmentPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string, amount: string) => void;
}

export const InvestmentPopupModal: React.FC<InvestmentPopupModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [selectedTier, setSelectedTier] = useState<'3000' | '5000' | '10000'>('5000');

  if (!isOpen) return null;

  const tiers = [
    {
      amount: '3000',
      label: '$3,000',
      percentage: '75%',
      monthly: '$300/mo',
      total: '$6,150',
      tag: 'Starter Tier',
      popular: false,
    },
    {
      amount: '5000',
      label: '$5,000',
      percentage: '100%',
      monthly: '$500/mo',
      total: '$11,500',
      tag: 'Most Popular',
      popular: true,
    },
    {
      amount: '10000',
      label: '$10,000',
      percentage: '150%',
      monthly: '$1,500/mo',
      total: '$29,500',
      tag: 'VIP Elite',
      popular: false,
    },
  ];

  const handleInvestClick = () => {
    const matched = tiers.find((t) => t.amount === selectedTier) || tiers[1];
    onSelectPlan(`Investment Plan ${matched.percentage}`, matched.amount);
    onClose();
  };

  const handleScrollToSection = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('investments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-400/40 bg-white dark:bg-[#0a1220] p-6 sm:p-8 shadow-2xl overflow-hidden transition-all text-gray-900 dark:text-white max-h-[92vh] overflow-y-auto">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon & Slogan */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/30 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-serif italic font-semibold">Your Growth, Our Priority</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
            A5 Markets <span className="text-cyan-500 dark:text-cyan-400">Investment Plans</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-md mx-auto">
            Earn fixed high-yield returns from <strong>75% up to 150%</strong> with monthly distributions and guaranteed capital return in Month 4.
          </p>
        </div>

        {/* 3 Interactive Plan Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {tiers.map((t) => (
            <div
              key={t.amount}
              onClick={() => setSelectedTier(t.amount as any)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                selectedTier === t.amount
                  ? 'border-cyan-500 bg-gradient-to-b from-cyan-50/70 via-white to-cyan-50/40 dark:from-[#0d2a45]/90 dark:via-[#091a2e] dark:to-[#0a1220] shadow-glow-cyan'
                  : 'border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-[#0c1626]/60 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold text-[9px] uppercase tracking-wider shadow-sm">
                  {t.tag}
                </span>
              )}

              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                  {t.tag}
                </span>
                <div className="font-mono text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {t.label}
                </div>
                <div className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/20">
                  {t.percentage} Return
                </div>
                
                <div className="mt-3 text-xs space-y-1 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly:</span>
                    <strong className="font-mono">{t.monthly}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <strong className="font-mono text-cyan-600 dark:text-cyan-400 font-extrabold">{t.total}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-gray-800 text-center">
                <span className={`text-[11px] font-extrabold flex items-center justify-center gap-1 ${selectedTier === t.amount ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-400'}`}>
                  {selectedTier === t.amount ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                  <span>{selectedTier === t.amount ? 'Selected' : 'Click to Select'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Perks List */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0c1626] border border-gray-200 dark:border-gray-800">
            <TrendingUp className="w-4 h-4 text-cyan-500 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">Monthly Payouts</span>
            <span className="text-[10px] text-gray-500">M1, M2, M3 direct</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0c1626] border border-gray-200 dark:border-gray-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">Capital Return</span>
            <span className="text-[10px] text-gray-500">Full return in M4</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0c1626] border border-gray-200 dark:border-gray-800">
            <Award className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">Fixed Rates</span>
            <span className="text-[10px] text-gray-500">Zero hidden fees</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#0c1626] border border-gray-200 dark:border-gray-800">
            <Sparkles className="w-4 h-4 text-purple-500 mx-auto mb-1" />
            <span className="font-bold block text-[11px]">Tier-1 Safety</span>
            <span className="text-[10px] text-gray-500">Segregated bank custody</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleInvestClick}
            className="w-full sm:flex-1 py-3.5 text-sm font-extrabold rounded-xl bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] hover:from-cyan-400 hover:to-teal-500 text-white shadow-glow-cyan transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Invest in Selected Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleScrollToSection}
            className="w-full sm:w-auto px-5 py-3.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-cyan-500 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            View Full Matrix Table
          </button>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-gray-500 dark:text-gray-400 text-center mt-4">
          A5 Markets Official Investment Initiative • Limited allocations available per cycle
        </p>

      </div>
    </div>
  );
};
