import React from 'react';
import { TrendingUp, Layers, Zap, Headphones, ArrowUpRight } from 'lucide-react';

export const FeatureStats: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '75%-150%',
      label: 'Investment Yields',
      detail: 'Structured capital growth plans',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-brand-green border-emerald-300 dark:border-emerald-500/20',
    },
    {
      icon: Layers,
      value: '0.0',
      label: 'Low Spreads From',
      detail: 'Raw institutional grade pricing',
      iconBg: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-500/20',
    },
    {
      icon: Zap,
      value: '500:1',
      label: 'Max Leverage',
      detail: 'Flexible margin & high power',
      iconBg: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-500/20',
    },
    {
      icon: Headphones,
      value: '24/7',
      label: 'Expert Support',
      detail: 'Dedicated multilingual desk',
      iconBg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/20',
    },
  ];

  return (
    <section className="w-full py-8 bg-slate-50 dark:bg-[#070b12] border-y border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative flex items-center p-5 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/80 hover:border-emerald-400 dark:hover:border-brand-green/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="ml-4 flex flex-col">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors duration-200">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-0.5">
                    {stat.label}
                  </span>
                </div>

                <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-gray-600 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
