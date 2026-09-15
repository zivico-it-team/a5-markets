import React from 'react';
import { UserCheck, Layers, Globe, ArrowRight } from 'lucide-react';

interface JourneyWorkflowProps {
  onOpenAccount: () => void;
}

export const JourneyWorkflow: React.FC<JourneyWorkflowProps> = ({ onOpenAccount }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#060a10] border-y border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Journey Info */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4 font-sans">
              Start Your Journey <br className="hidden sm:inline" />
              with <span className="text-brand-green">A5 Markets</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Create an account in minutes. Choose between direct high-speed trading on A5 WebTrader or monthly distributions through our structured Investment Plans.
            </p>
            <button
              onClick={onOpenAccount}
              className="px-6 py-3.5 text-sm sm:text-base font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group cursor-pointer"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Side: 3-Step Interactive Workflow */}
          <div className="lg:col-span-7 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/90 shadow-xl">
              
              {/* Step 1: Register Account */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-400 dark:border-emerald-500/40 text-emerald-600 dark:text-brand-green group-hover:scale-110 group-hover:border-brand-green shadow-sm transition-all duration-300">
                  <UserCheck className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white mt-3">
                  Step 01
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Register Account
                </span>
              </div>

              {/* Connecting Line / Arrow 1 */}
              <div className="flex-1 flex items-center justify-center w-full sm:w-auto">
                <div className="flex items-center w-full max-w-[120px] text-gray-400 dark:text-gray-500">
                  <div className="flex-1 border-t-2 border-dashed border-emerald-400 dark:border-emerald-500/40" />
                  <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-brand-green -ml-1 flex-shrink-0 animate-pulse" />
                </div>
              </div>

              {/* Step 2: Choose Account / Plan */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-cyan-50 dark:bg-cyan-500/10 border-2 border-cyan-400 dark:border-cyan-500/40 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 shadow-sm transition-all duration-300">
                  <Layers className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white mt-3">
                  Step 02
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Select Plan or Fund
                </span>
              </div>

              {/* Connecting Line / Arrow 2 */}
              <div className="flex-1 flex items-center justify-center w-full sm:w-auto">
                <div className="flex items-center w-full max-w-[120px] text-gray-400 dark:text-gray-500">
                  <div className="flex-1 border-t-2 border-dashed border-cyan-400 dark:border-cyan-500/40" />
                  <ArrowRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400 -ml-1 flex-shrink-0 animate-pulse" />
                </div>
              </div>

              {/* Step 3: Global Markets & Returns */}
              <div className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 border-2 border-blue-400 dark:border-blue-500/40 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:border-blue-400 shadow-sm transition-all duration-300">
                  <Globe className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white mt-3">
                  Step 03
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Trade & Earn
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
