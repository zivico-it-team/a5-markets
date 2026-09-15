import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';

interface AccountTypesComparisonProps {
  onOpenAccount: () => void;
}

export const AccountTypesComparison: React.FC<AccountTypesComparisonProps> = ({ onOpenAccount }) => {
  const accounts = [
    {
      name: 'Standard Account',
      deposit: '$200',
      depositNote: 'Ideal for beginner & retail traders',
      popular: true,
      spread: 'From 1.3 Pips',
      leverage: 'Up to 1:500',
      commission: '$0 (Zero Commission)',
      minLot: '0.01 Micro Lots',
      instruments: 'Forex, Metals, Indices, Crypto, Commodities',
      execution: 'Market Execution (<15ms)',
      support: '24/5 Dedicated Desk',
      features: [
        'Accessible standard entry from $200',
        'Zero commission on all trades',
        'A5 WebTrader & Mobile App access',
        'Hedging & Scalping permitted',
        'Negative balance protection',
      ],
    },
    {
      name: 'Pro Account',
      deposit: '$500',
      depositNote: 'For experienced active traders',
      popular: false,
      spread: 'From 0.6 Pips',
      leverage: 'Up to 1:500',
      commission: '$0 Zero Commission',
      minLot: '0.01 Lots',
      instruments: '100+ Multi-Asset Instruments',
      execution: 'Ultra-low latency (<10ms)',
      support: '24/5 Priority Support',
      features: [
        'Tight raw-like spreads from 0.6 pips',
        'Zero commission structure',
        'Advanced A5 Charting & Indicator Tools',
        'Free automated VPS hosting',
        'Daily institutional technical briefings',
      ],
    },
    {
      name: 'Raw ECN Account',
      deposit: '$1,000',
      depositNote: 'Institutional Grade Trading',
      popular: false,
      spread: 'From 0.0 Raw Pips',
      leverage: 'Up to 1:500',
      commission: '$3.50 per lot / side',
      minLot: '0.01 Lots',
      instruments: 'All 150+ Global Markets',
      execution: 'Direct Interbank Tier-1 (<5ms)',
      support: '24/7 VIP Senior Trader',
      features: [
        'Raw interbank spread from 0.0 pips',
        'Direct Tier-1 bank liquidity pool',
        'Zero markup on bid/ask quotes',
        'Ideal for high-frequency algorithmic scalpers',
        'Custom A5 FIX API connection available',
      ],
    },
    {
      name: 'VIP Elite Account',
      deposit: '$10,000',
      depositNote: 'Professional & High Net Worth',
      popular: false,
      spread: 'From 0.0 Pips + Rebates',
      leverage: 'Up to 1:500',
      commission: 'Discounted VIP rates',
      minLot: '0.10 Standard Lots',
      instruments: 'Unrestricted full asset catalog',
      execution: 'Dedicated Fiber Cross-Connect (<2ms)',
      support: 'Personal Chief Market Strategist',
      features: [
        'Tailored institutional trading terms',
        'Exclusive monthly cashback rebates',
        'Personal 1-on-1 strategy consultations',
        'A5 Private Desktop Terminal access',
        'Private VIP events & quarterly briefings',
      ],
    },
  ];

  return (
    <section id="accounts" className="py-16 sm:py-24 bg-white dark:bg-[#070b12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 mb-3">
            <Star className="w-3.5 h-3.5" />
            <span>Trading Conditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            Standard Trading Accounts
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Tailored trading accounts designed for every strategy on the custom A5 proprietary platform.
          </p>
        </div>

        {/* Account Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accounts.map((acc, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border transition-all duration-300 ${
                acc.popular
                  ? 'border-brand-green bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 dark:from-[#0f2438] dark:via-[#0d1626] dark:to-[#070b12] shadow-xl ring-2 ring-brand-green/30'
                  : 'border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 hover:border-gray-300 dark:hover:border-gray-600 shadow-md'
              }`}
            >
              {acc.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-green text-black font-extrabold text-[11px] shadow-glow-green uppercase tracking-wider">
                  Standard Choice
                </div>
              )}

              <div>
                {/* Account Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {acc.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {acc.depositNote}
                </p>

                {/* Deposit Price */}
                <div className="mt-4 mb-6 pb-6 border-b border-gray-100 dark:border-[#1a273f]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                      {acc.deposit}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">Min Deposit</span>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="space-y-3 mb-6 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Spread:</span>
                    <strong className="text-gray-900 dark:text-white font-mono">{acc.spread}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Max Leverage:</span>
                    <strong className="text-emerald-600 dark:text-brand-green font-mono">{acc.leverage}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Commission:</span>
                    <strong className="text-gray-900 dark:text-white font-mono">{acc.commission}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Execution:</span>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">{acc.execution}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-gray-100 dark:border-[#1a273f] space-y-2 mb-8">
                  {acc.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onOpenAccount}
                className={`w-full py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  acc.popular
                    ? 'bg-brand-green hover:bg-brand-green-hover text-black shadow-glow-green'
                    : 'bg-gray-100 dark:bg-[#1a273f] hover:bg-brand-green hover:text-black dark:hover:bg-brand-green dark:hover:text-black text-gray-900 dark:text-white border border-gray-300 dark:border-[#223354]'
                }`}
              >
                <span>Open {acc.name.replace(' Account', '')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
