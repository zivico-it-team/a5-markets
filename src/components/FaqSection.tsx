import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the minimum deposit to start trading with A5 Markets?',
      a: 'You can open a live Standard Trading Account starting from $200 with up to 500:1 leverage, raw spreads, and zero commissions. If you prefer structured wealth management, our official Investment Plans start from $3,000 with returns up to 150%.',
    },
    {
      q: 'How do the A5 Markets Investment Plans work?',
      a: 'Our structured 4-month Investment Plans ($3,000, $5,000, and $10,000) offer predictable returns from 75% to 150%. You receive monthly cash distributions in Month 1, Month 2, and Month 3 (M1, M2, M3), and in Month 4 (M4) your initial investment capital is returned alongside your final profit distribution.',
    },
    {
      q: 'What trading platform does A5 Markets use?',
      a: 'A5 Markets operates on its own high-speed proprietary trading platform — A5 WebTrader and the A5 Mobile App (iOS & Android). It features zero third-party lag, sub-8ms execution, 70+ built-in technical indicators, and intuitive one-click order placement.',
    },
    {
      q: 'What spreads and leverage are offered?',
      a: 'We offer leverage up to 1:500 on major currency pairs, metals, and indices. Spreads start from 0.0 raw pips on ECN accounts and from 1.3 pips on zero-commission Standard accounts.',
    },
    {
      q: 'How fast are deposit and withdrawal requests processed?',
      a: 'Crypto deposits (USDT, BTC, ETH) and credit/debit card transactions are processed instantly. Withdrawals are processed by our automated risk engine and typically settled within 15 to 45 minutes.',
    },
    {
      q: 'Are client funds segregated and safe?',
      a: 'Yes, 100% of client funds are held in segregated Tier-1 bank accounts completely separate from operational company finances. We also provide automated Negative Balance Protection.',
    },
    {
      q: 'Can I use High-Speed Scalping and Hedging on the A5 platform?',
      a: 'Yes! All trading styles including rapid news scalping, grid strategies, and multi-position hedging are fully supported with zero restrictions and no requotes on the A5 platform.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#060a10] border-t border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Find answers to commonly asked questions about trading, investment plans, funding, and the A5 platform.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-brand-green transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`p-1 rounded-full text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? 'rotate-180 text-brand-green' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-[#1a273f]/60 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
