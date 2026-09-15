import React from 'react';
import { Gift, Zap, Shield, Sparkles, ArrowRight, Percent, Flame } from 'lucide-react';

interface PromotionsSectionProps {
  onClaimPromo: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onClaimPromo }) => {
  const promos = [
    {
      badge: 'LIMITED TIME OFFER',
      title: '100% Deposit Match Bonus',
      highlight: 'Up to $5,000',
      description: 'Double your trading margin instantly on your first deposit. Boost your purchasing power and trade larger volumes.',
      icon: Gift,
      color: 'from-emerald-500/20 to-emerald-500/5 text-brand-green border-emerald-500/30',
      tag: 'HOT',
    },
    {
      badge: 'WEALTH ACCELERATOR',
      title: 'Structured Investment Yield',
      highlight: 'Up to 150% Return',
      description: 'Join our 4-month structured investment tiers from $3,000 to $10,000 with monthly payouts (M1-M4) and capital return.',
      icon: Flame,
      color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
      tag: 'FEATURED',
    },
    {
      badge: 'RELIGIOUS COMPLIANCE',
      title: 'Swap-Free Islamic Trading',
      highlight: '0 Overnight Rollovers',
      description: '100% Shariah-compliant trading accounts with zero overnight interest fees on Forex, Gold, and Commodities.',
      icon: Shield,
      color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
      tag: 'ETHICAL',
    },
  ];

  return (
    <section id="promotions" className="py-16 sm:py-20 bg-white dark:bg-[#070b12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-500/20 mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Exclusive Rewards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            Promotions & Special Offers
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Maximize your trading potential with our generous bonus structures and zero-fee conditions.
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] hover:border-brand-green/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold tracking-wider text-emerald-600 dark:text-brand-green px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20">
                      {p.badge}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${p.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {p.title}
                  </h3>
                  <div className="font-mono text-2xl font-extrabold text-brand-green mb-3">
                    {p.highlight}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <button
                  onClick={onClaimPromo}
                  className="w-full py-3 text-xs sm:text-sm font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Claim Promotion</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
