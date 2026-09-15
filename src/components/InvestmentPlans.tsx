import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Globe, Headphones, Award, ArrowRight, Sparkles, CheckCircle2, Eye, Flame, Check } from 'lucide-react';

interface InvestmentPlansProps {
  onSelectPlan: (planName: string, amount: string) => void;
}

export const InvestmentPlans: React.FC<InvestmentPlansProps> = ({ onSelectPlan }) => {
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [activePlanTier, setActivePlanTier] = useState<number>(1); // default $5,000

  const plans = [
    {
      investment: '$3,000',
      numericAmount: '3000',
      percentage: '75%',
      m1: '$300',
      m2: '$300',
      m3: '$300',
      m4: '$5,250',
      total: '$6,150',
      badge: 'Starter Tier',
      popular: false,
      profit: '+$3,150 Net Profit',
    },
    {
      investment: '$5,000',
      numericAmount: '5000',
      percentage: '100%',
      m1: '$500',
      m2: '$500',
      m3: '$500',
      m4: '$10,000',
      total: '$11,500',
      badge: 'Most Popular',
      popular: true,
      profit: '+$6,500 Net Profit',
    },
    {
      investment: '$10,000',
      numericAmount: '10000',
      percentage: '150%',
      m1: '$1,500',
      m2: '$1,500',
      m3: '$1,500',
      m4: '$25,000',
      total: '$29,500',
      badge: 'VIP Elite Tier',
      popular: false,
      profit: '+$19,500 Net Profit',
    },
  ];

  const features = [
    {
      title: 'Attractive Returns',
      desc: 'Predictable high-yield growth from 75% up to 150%',
      icon: TrendingUp,
      color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    },
    {
      title: 'Secure Platform',
      desc: 'Tier-1 segregated funds & automated capital protection',
      icon: ShieldCheck,
      color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    },
    {
      title: 'Global Market Access',
      desc: 'Diversified liquidity pool across Forex, Metals & Indices',
      icon: Globe,
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Dedicated Support',
      desc: '24/7 priority portfolio managers & institutional reporting',
      icon: Headphones,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Your Financial Freedom',
      desc: 'Automated monthly payouts directly to your wallet',
      icon: Award,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <section id="investments" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-cyan-50/20 to-slate-50 dark:from-[#060a10] dark:via-[#091524] dark:to-[#060a10] transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span className="font-serif italic font-semibold text-sm">Your Growth, Our Priority</span>
          </div>

          {/* Investment Plan Title Banner (styled precisely to official logo colors) */}
          <div className="relative inline-block mt-2 mb-4">
            <div className="px-8 sm:px-14 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-[#0e3150] via-[#008ba3] to-[#00b4d8] text-white shadow-glow-cyan transform -skew-x-3 border border-cyan-300/40">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wider transform skew-x-3 flex items-center justify-center gap-3 uppercase font-sans">
                <span>Investment Plan</span>
                <span className="text-cyan-200 font-light">//</span>
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mt-2">
            Accelerate your capital growth with A5 Markets high-yield investment tiers. Earn up to <strong className="text-cyan-600 dark:text-cyan-400">150% fixed returns</strong> with automated monthly distributions and full principal return in Month 4.
          </p>

          {/* Official Flyer Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowFlyerModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-teal-400 underline cursor-pointer transition-colors px-3 py-1 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Official Promotional Artwork Flyer</span>
            </button>
          </div>
        </div>

        {/* 3 High-Impact Visual Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((p, idx) => {
            const isSelected = activePlanTier === idx;
            return (
              <div
                key={idx}
                onClick={() => setActivePlanTier(idx)}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                  p.popular
                    ? 'border-cyan-500 bg-gradient-to-b from-cyan-50/70 via-white to-cyan-50/30 dark:from-[#0d2a45] dark:via-[#091b2e] dark:to-[#071322] shadow-glow-cyan ring-2 ring-cyan-400/30 -translate-y-1'
                    : 'border-gray-200 dark:border-[#1a2d47] bg-white dark:bg-[#0c1626] hover:border-cyan-400/50 hover:shadow-xl'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold text-[11px] shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-black" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {p.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-brand-green bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20">
                      {p.profit}
                    </span>
                  </div>

                  {/* Plan Price */}
                  <div className="font-mono text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight my-2">
                    {p.investment}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-4">
                    4-Month Fixed Investment Cycle
                  </span>

                  {/* Percentage Return Banner */}
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-teal-500/10 to-transparent border border-cyan-400/30 mb-5 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Total Return:</span>
                    <span className="font-mono text-lg font-black text-cyan-600 dark:text-cyan-400">
                      {p.percentage} ({p.total})
                    </span>
                  </div>

                  {/* Monthly Breakdown */}
                  <div className="space-y-2 mb-6 text-xs text-gray-600 dark:text-gray-300 font-mono">
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 font-sans">Month 1 (M1):</span>
                      <strong className="text-gray-900 dark:text-white">{p.m1}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 font-sans">Month 2 (M2):</span>
                      <strong className="text-gray-900 dark:text-white">{p.m2}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 font-sans">Month 3 (M3):</span>
                      <strong className="text-gray-900 dark:text-white">{p.m3}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 font-bold">
                      <span className="text-cyan-600 dark:text-cyan-400 font-sans">Month 4 (M4 Final + Capital):</span>
                      <strong className="text-cyan-600 dark:text-cyan-400">{p.m4}</strong>
                    </div>
                  </div>
                </div>

                {/* Invest CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlan(`Investment Plan ${p.percentage}`, p.numericAmount);
                  }}
                  className={`w-full py-3.5 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    p.popular
                      ? 'bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] hover:from-cyan-400 hover:to-teal-500 text-white shadow-glow-cyan'
                      : 'bg-gray-100 dark:bg-[#12233b] hover:bg-cyan-500 hover:text-white text-gray-900 dark:text-white border border-gray-300 dark:border-[#1d3557]'
                  }`}
                >
                  <span>Invest in {p.investment} Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* The Matrix Table Card (Faithful to artwork) */}
        <div className="rounded-3xl border-2 border-cyan-500/30 bg-white dark:bg-[#0d1424] shadow-2xl overflow-hidden mb-12">
          
          <div className="p-4 sm:p-6 bg-[#0e3150] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-black flex items-center gap-2 font-sans">
                <span>Official Return Schedule Matrix</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono">Verified Payouts</span>
              </h3>
              <p className="text-xs text-cyan-200 mt-0.5">
                Exact payout timeline across all 4 months for each investment level.
              </p>
            </div>
            <div className="font-serif italic text-cyan-300 text-sm hidden sm:block">
              Invest Today, Build Tomorrow
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                  <th className="py-4 px-4 sm:px-6 bg-[#0e3150] text-left border-r border-white/10">
                    Investment
                  </th>
                  <th className="py-4 px-3 sm:px-4 bg-[#0a5275] border-r border-white/10">
                    Percentage
                  </th>
                  <th className="py-4 px-3 sm:px-4 bg-[#08678c] border-r border-white/10">
                    M1
                  </th>
                  <th className="py-4 px-3 sm:px-4 bg-[#08678c] border-r border-white/10">
                    M2
                  </th>
                  <th className="py-4 px-3 sm:px-4 bg-[#08678c] border-r border-white/10">
                    M3
                  </th>
                  <th className="py-4 px-3 sm:px-4 bg-[#087799] border-r border-white/10">
                    M4 (Final)
                  </th>
                  <th className="py-4 px-4 sm:px-6 bg-[#00a2b8] text-right">
                    Total Return
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#1a273f] text-xs sm:text-sm font-bold">
                {plans.map((p, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      p.popular
                        ? 'bg-cyan-50/60 dark:bg-[#10243c]/80 hover:bg-cyan-50 dark:hover:bg-[#142944]'
                        : 'hover:bg-gray-50 dark:hover:bg-[#0f192b]'
                    }`}
                  >
                    {/* Investment Column */}
                    <td className="py-5 px-4 sm:px-6 text-left border-r border-gray-100 dark:border-[#1a273f]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0e3150] text-white flex items-center justify-center font-mono font-extrabold text-sm sm:text-base shadow-sm flex-shrink-0">
                          {p.investment.replace('$', '')}
                        </div>
                        <div>
                          <div className="font-mono text-base sm:text-xl font-extrabold text-gray-900 dark:text-white">
                            {p.investment}
                          </div>
                          <span className="text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                            {p.badge}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Percentage */}
                    <td className="py-5 px-3 sm:px-4 border-r border-gray-100 dark:border-[#1a273f]">
                      <span className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-500/30">
                        {p.percentage}
                      </span>
                    </td>

                    {/* M1 */}
                    <td className="py-5 px-3 sm:px-4 font-mono font-bold text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-[#1a273f]">
                      {p.m1}
                    </td>

                    {/* M2 */}
                    <td className="py-5 px-3 sm:px-4 font-mono font-bold text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-[#1a273f]">
                      {p.m2}
                    </td>

                    {/* M3 */}
                    <td className="py-5 px-3 sm:px-4 font-mono font-bold text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-[#1a273f]">
                      {p.m3}
                    </td>

                    {/* M4 */}
                    <td className="py-5 px-3 sm:px-4 font-mono font-extrabold text-cyan-600 dark:text-cyan-400 border-r border-gray-100 dark:border-[#1a273f]">
                      {p.m4}
                    </td>

                    {/* Total & Action */}
                    <td className="py-5 px-4 sm:px-6 text-right">
                      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-3">
                        <div className="font-mono text-base sm:text-xl font-black text-[#00a2b8] dark:text-cyan-400">
                          {p.total}
                        </div>
                        <button
                          onClick={() => onSelectPlan(`Investment Plan ${p.percentage}`, p.numericAmount)}
                          className="px-4 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] hover:from-cyan-400 hover:to-teal-500 text-white shadow-sm hover:shadow-glow-cyan transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>Invest</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer */}
          <div className="p-4 sm:p-5 bg-gray-50 dark:bg-[#090e18] border-t border-gray-200 dark:border-[#1a273f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span>Initial principal returned in full during Month 4 alongside final payout.</span>
            </div>
            <div className="font-serif italic text-cyan-600 dark:text-cyan-400 text-sm">
              Invest Today, Build Tomorrow
            </div>
          </div>

        </div>

        {/* 5 Core Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${f.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white mb-1">
                  {f.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Official Artwork Flyer Modal */}
      {showFlyerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-cyan-500/40 shadow-glow-cyan p-2.5">
            <button
              onClick={() => setShowFlyerModal(false)}
              className="absolute top-4 right-4 z-10 px-3.5 py-1.5 bg-black/80 hover:bg-black text-white text-xs font-bold rounded-full border border-white/20 transition-all cursor-pointer"
            >
              ✕ Close
            </button>
            <img
              src="/assets/investment-plan.jpeg"
              alt="A5 Markets Official Investment Plan Artwork"
              className="w-full h-auto rounded-2xl object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}

    </section>
  );
};
