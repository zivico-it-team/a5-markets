import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAccount: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAccount }) => {
  return (
    <footer className="w-full bg-slate-950 dark:bg-[#05080f] text-gray-400 text-xs sm:text-sm pt-16 pb-12 border-t border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-10 mb-12 border-b border-gray-800 text-xs text-gray-300">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-brand-green border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Call Us 24/7</span>
              <a href="tel:+44 1227 390479" className="font-bold text-white hover:text-brand-green transition-colors font-mono">
                +44 1227 390479
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Official Inquiries</span>
              <a href="mailto:support@a5markets.com" className="font-bold text-white hover:text-brand-green transition-colors font-mono">
                support@a5markets.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Headquarters</span>
              <span className="font-bold text-white">82 Buckingham Palace Rd, London, UK</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <img
              src="/assets/a5-logo.png"
              alt="A5 Markets"
              className="h-10 sm:h-12 w-auto object-contain mb-4 filter brightness-125"
            />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-6">
              A5 Markets delivers institutional-grade trading infrastructure, raw spreads from 0.0, up to 500:1 leverage, ultra-fast proprietary A5 WebTrader execution, and structured high-yield Investment Plans.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Tier-1 Segregation</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Col 2: Markets */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Markets
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#markets" className="hover:text-brand-green transition-colors">Forex Major & Minor Pairs</a></li>
              <li><a href="#markets" className="hover:text-brand-green transition-colors">Spot Metals (XAU/USD Gold)</a></li>
              <li><a href="#markets" className="hover:text-brand-green transition-colors">Global Indices (US30, NAS100)</a></li>
              <li><a href="#markets" className="hover:text-brand-green transition-colors">Energy & Commodities (Oil/Gas)</a></li>
              <li><a href="#markets" className="hover:text-brand-green transition-colors">Crypto CFDs (BTC, ETH, SOL)</a></li>
            </ul>
          </div>

          {/* Col 3: Trading & Plans */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Trading & Plans
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#investments" className="hover:text-cyan-400 text-cyan-400 font-bold transition-colors">Investment Plans (75%-150%)</a></li>
              <li><a href="#accounts" className="hover:text-brand-green transition-colors">Standard $200 Retail Account</a></li>
              <li><a href="#accounts" className="hover:text-brand-green transition-colors">Pro Raw Spread Account</a></li>
              <li><a href="#accounts" className="hover:text-brand-green transition-colors">Direct Interbank ECN Account</a></li>
              <li><a href="#platforms" className="hover:text-brand-green transition-colors">A5 WebTrader & Mobile Terminal</a></li>
              <li><a href="#funding" className="hover:text-brand-green transition-colors">Deposits & Withdrawals</a></li>
            </ul>
          </div>

          {/* Col 4: Tools & Partners */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Tools & Partners
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#calendar" className="hover:text-brand-green transition-colors">Live Economic Calendar</a></li>
              <li><a href="#calculator" className="hover:text-brand-green transition-colors">Pip & Profit Calculator</a></li>
              <li><a href="#partners" className="hover:text-brand-green transition-colors">Introducing Broker (IB)</a></li>
              <li><a href="#faqs" className="hover:text-brand-green transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#about" className="hover:text-brand-green transition-colors">Why A5 Markets</a></li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Risk Disclaimer */}
        <div className="py-6 border-b border-gray-800 text-[11px] leading-relaxed text-gray-500">
          <p className="mb-2">
            <strong className="text-gray-400">High Risk Investment Warning:</strong> Trading Foreign Exchange (Forex) and Contracts for Difference (CFDs) on margin carries a high level of risk to your capital and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Please ensure you fully understand the risks involved and do not invest money you cannot afford to lose.
          </p>
          <p>
            A5 Markets operates with strict compliance standards, segregated accounts, and automated negative balance protection. Services are not directed at residents of jurisdictions where distribution would violate local statutory laws.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <div>
            © {new Date().getFullYear()} A5 Markets. All rights reserved. Unlock the World of Forex Trading.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Business</a>
            <a href="#" className="hover:text-gray-400">AML / KYC Policy</a>
            <a href="#" className="hover:text-gray-400">Risk Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
