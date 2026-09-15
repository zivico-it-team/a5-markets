import React from 'react';
import { CreditCard, DollarSign, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PaymentMethodsProps {
  onOpenDeposit: () => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onOpenDeposit }) => {
  const methods = [
    {
      name: 'Tether USDT',
      sub: 'TRC20 & ERC20',
      icon: '₮',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      speed: 'Instant (0-5 mins)',
      fee: '0% Deposit Fee',
      min: 'Instant Deposit',
    },
    {
      name: 'Visa & Mastercard',
      sub: 'Credit / Debit Cards',
      icon: '💳',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      speed: 'Instant (Real-time)',
      fee: '0% Deposit Fee',
      min: 'Instant Deposit',
    },
    {
      name: 'Bitcoin (BTC)',
      sub: 'Native Blockchain',
      icon: '₿',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      speed: '1 Confirmation (~10 mins)',
      fee: '0% Deposit Fee',
      min: 'Crypto Rail',
    },
    {
      name: 'Ethereum (ETH)',
      sub: 'ERC20 & Layer 2',
      icon: '⟠',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      speed: 'Instant (~2 mins)',
      fee: '0% Deposit Fee',
      min: 'Smart Contract',
    },
    {
      name: 'Litecoin & Doge',
      sub: 'Fast Altcoin Rails',
      icon: 'Ł',
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      speed: 'Instant (2-5 mins)',
      fee: '0% Deposit Fee',
      min: 'Low Gas Fee',
    },
    {
      name: 'Skrill & Neteller',
      sub: 'E-Wallets',
      icon: '👛',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      speed: 'Instant Transfer',
      fee: '0% Deposit Fee',
      min: 'E-Wallet',
    },
  ];

  return (
    <section id="funding" className="py-16 sm:py-20 bg-white dark:bg-[#070b12] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Instant & Secure Payments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3 font-sans">
            Deposits & Withdrawals
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Fund your trading account or investment plan seamlessly with 0% transaction fees and lightning-fast automated withdrawals.
          </p>
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {methods.map((m, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/80 hover:border-brand-green/40 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border ${m.color}`}>
                  {m.icon}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    {m.name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">
                    {m.sub}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-brand-green">{m.fee}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">{m.speed}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-gray-700 dark:text-gray-300 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                  {m.min}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white mb-1">
              Ready to fund your trading account or join an Investment Plan?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Zero deposit fees. Segregated Tier-1 accounts. Instant processing on all crypto and fiat rails.
            </p>
          </div>
          <button
            onClick={onOpenDeposit}
            className="w-full sm:w-auto px-7 py-3 text-sm font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Deposit & Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
