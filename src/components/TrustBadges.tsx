import React from 'react';
import { ShieldCheck, Zap, Globe2, Scale } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Secure Funds',
      subtitle: 'Bank-level security',
      description: 'Tier-1 segregated bank accounts and negative balance protection.',
      iconColor: 'text-emerald-600 dark:text-brand-green bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/20',
    },
    {
      icon: Zap,
      title: 'Fast Execution',
      subtitle: 'No requotes',
      description: 'Ultra-low latency fiber-optic execution under 12 milliseconds.',
      iconColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-300 dark:border-cyan-500/20',
    },
    {
      icon: Globe2,
      title: 'Global Presence',
      subtitle: 'Trusted worldwide',
      description: 'Serving active traders across 120+ countries with local payment methods.',
      iconColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/20',
    },
    {
      icon: Scale,
      title: 'Regulated Broker',
      subtitle: 'Compliance & trust',
      description: 'Strict international regulatory standards and transparent pricing.',
      iconColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/20',
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-16 bg-slate-50 dark:bg-[#060a10] border-t border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/80 hover:border-emerald-400 dark:hover:border-brand-green/40 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.iconColor} transition-transform group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
