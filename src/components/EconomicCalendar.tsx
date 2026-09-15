import React, { useState } from 'react';
import { Calendar, Filter, Clock, AlertTriangle, ArrowUpRight, TrendingUp } from 'lucide-react';

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  flag: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  actual?: string;
  forecast: string;
  previous: string;
}

export const EconomicCalendar: React.FC = () => {
  const [filterImpact, setFilterImpact] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const events: EconomicEvent[] = [
    {
      id: '1',
      time: '12:30 GMT',
      currency: 'USD',
      flag: '🇺🇸',
      event: 'Core CPI (MoM) Inflation Rate',
      impact: 'high',
      actual: '0.3%',
      forecast: '0.3%',
      previous: '0.2%',
    },
    {
      id: '2',
      time: '13:00 GMT',
      currency: 'EUR',
      flag: '🇪🇺',
      event: 'ECB Monetary Policy Decision & Press Conference',
      impact: 'high',
      actual: '3.75%',
      forecast: '3.75%',
      previous: '4.00%',
    },
    {
      id: '3',
      time: '14:30 GMT',
      currency: 'USD',
      flag: '🇺🇸',
      event: 'Non-Farm Payrolls (NFP) & Unemployment',
      impact: 'high',
      actual: '215K',
      forecast: '190K',
      previous: '175K',
    },
    {
      id: '4',
      time: '15:15 GMT',
      currency: 'GBP',
      flag: '🇬🇧',
      event: 'Bank of England Gov Bailey Speech',
      impact: 'medium',
      actual: '-',
      forecast: '-',
      previous: '-',
    },
    {
      id: '5',
      time: '16:00 GMT',
      currency: 'CAD',
      flag: '🇨🇦',
      event: 'BoC Interest Rate Statement',
      impact: 'high',
      actual: '4.50%',
      forecast: '4.50%',
      previous: '4.75%',
    },
    {
      id: '6',
      time: '17:30 GMT',
      currency: 'USD',
      flag: '🇺🇸',
      event: 'EIA Crude Oil Stocks Change',
      impact: 'medium',
      actual: '-2.45M',
      forecast: '-1.80M',
      previous: '+1.20M',
    },
    {
      id: '7',
      time: '23:50 GMT',
      currency: 'JPY',
      flag: '🇯🇵',
      event: 'Bank of Japan (BoJ) Summary of Opinions',
      impact: 'medium',
      actual: '-',
      forecast: '-',
      previous: '-',
    },
    {
      id: '8',
      time: '01:30 GMT',
      currency: 'AUD',
      flag: '🇦🇺',
      event: 'RBA Meeting Minutes & Retail Sales',
      impact: 'low',
      actual: '0.4%',
      forecast: '0.3%',
      previous: '0.1%',
    },
  ];

  const filteredEvents = events.filter((e) => {
    if (filterImpact === 'all') return true;
    return e.impact === filterImpact;
  });

  return (
    <section id="calendar" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070b12] border-t border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/20 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Real-Time Market Releases</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Live Economic Calendar
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Track global macro data, interest rate decisions, and high-impact volatility events.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-white dark:bg-[#0d1424] p-1 rounded-xl border border-gray-200 dark:border-[#1a273f] shadow-sm">
            {(['all', 'high', 'medium', 'low'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterImpact(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                  filterImpact === f
                    ? 'bg-brand-green text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {f === 'all' ? 'All Impacts' : `${f} Impact`}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Table Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#080d17] border-b border-gray-200 dark:border-[#1a273f]">
                  <th className="py-3.5 px-4">Time (GMT)</th>
                  <th className="py-3.5 px-3">Currency</th>
                  <th className="py-3.5 px-4">Impact</th>
                  <th className="py-3.5 px-4">Event Description</th>
                  <th className="py-3.5 px-3 text-right">Actual</th>
                  <th className="py-3.5 px-3 text-right">Forecast</th>
                  <th className="py-3.5 px-3 text-right">Previous</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#1a273f]/40">
                {filteredEvents.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-[#121c30]/50 transition-colors"
                  >
                    {/* Time */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.time}</span>
                    </td>

                    {/* Currency & Flag */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                        <span className="text-base">{item.flag}</span>
                        <span>{item.currency}</span>
                      </div>
                    </td>

                    {/* Impact Badge */}
                    <td className="py-3.5 px-4">
                      {item.impact === 'high' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                          HIGH
                        </span>
                      )}
                      {item.impact === 'medium' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          MED
                        </span>
                      )}
                      {item.impact === 'low' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          LOW
                        </span>
                      )}
                    </td>

                    {/* Event Name */}
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                      {item.event}
                    </td>

                    {/* Actual */}
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.actual}
                    </td>

                    {/* Forecast */}
                    <td className="py-3.5 px-3 text-right font-mono text-gray-600 dark:text-gray-400">
                      {item.forecast}
                    </td>

                    {/* Previous */}
                    <td className="py-3.5 px-3 text-right font-mono text-gray-500 dark:text-gray-500">
                      {item.previous}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
