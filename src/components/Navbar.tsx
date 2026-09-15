import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowRight, ChevronDown, TrendingUp } from 'lucide-react';

interface NavbarProps {
  onOpenAccount: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAccount, onOpenLogin }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const megaMenus = [
    {
      title: 'Trading',
      items: [
        { name: 'Standard, Pro & ECN Accounts', href: '#accounts', icon: '💎', desc: 'Choose your ideal account conditions' },
        { name: 'A5 WebTrader & Mobile App', href: '#platforms', icon: '💻', desc: 'Proprietary high-speed trading terminal' },
        { name: 'Deposits & Withdrawals (0% Fee)', href: '#funding', icon: '💳', desc: 'Instant funding via Crypto & Cards' },
        { name: 'Promotions & Rebates', href: '#promotions', icon: '🎁', desc: 'Boost your trading capital' },
      ],
    },
    {
      title: 'Investment Plans',
      items: [
        { name: '75% Return Plan ($3,000)', href: '#investments', icon: '🥉', desc: 'Monthly $300 payouts • Total $6,150' },
        { name: '100% Return Plan ($5,000)', href: '#investments', icon: '🥈', desc: 'Monthly $500 payouts • Total $11,500' },
        { name: '150% VIP Return Plan ($10,000)', href: '#investments', icon: '🥇', desc: 'Monthly $1,500 payouts • Total $29,500' },
      ],
    },
    {
      title: 'Market',
      items: [
        { name: 'Forex (60+ Major & Minor Pairs)', href: '#markets', icon: '💶', desc: 'Ultra-low raw spreads from 0.0' },
        { name: 'Spot Metals (Gold & Silver)', href: '#markets', icon: '🪙', desc: 'XAU/USD with 500:1 leverage' },
        { name: 'Indices (US30, NAS100, SPX500)', href: '#markets', icon: '📈', desc: 'Global stock market indices' },
        { name: 'Commodities (WTI & Brent Oil)', href: '#markets', icon: '🛢️', desc: 'Energy & industrial metals' },
        { name: 'Cryptocurrencies (BTC, ETH, SOL)', href: '#markets', icon: '₿', desc: '24/7 crypto CFD trading' },
      ],
    },
    {
      title: 'Trading Tools',
      items: [
        { name: 'Live Market Watch Table', href: '#table', icon: '📊', desc: 'Real-time quotes and depth' },
        { name: 'Live Economic Calendar', href: '#calendar', icon: '📅', desc: 'Macro data releases & volatility timers' },
        { name: 'Profit & Pip Calculator', href: '#calculator', icon: '🧮', desc: 'Margin and profit risk calculator' },
      ],
    },
    {
      title: 'Partners',
      items: [
        { name: 'Introducing Broker (IB) Program', href: '#partners', icon: '🤝', desc: 'Earn up to $15/lot daily payouts' },
        { name: 'Sub-Affiliate Multi-Tier Rewards', href: '#partners', icon: '👑', desc: 'Passive network overrides' },
      ],
    },
    {
      title: 'About Us',
      items: [
        { name: 'Why A5 Markets', href: '#about', icon: '🛡️', desc: 'Security of funds & execution speed' },
        { name: 'Frequently Asked Questions', href: '#faqs', icon: '❓', desc: 'Instant trader answers & guides' },
      ],
    },
  ];

  const scrollToInvestments = () => {
    const el = document.getElementById('investments');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 dark:bg-[#070b12]/95 border-b border-gray-200 dark:border-[#1a273f] transition-colors duration-300">
      
      {/* Top Notification Bar (Updated to promote Investment Plans) */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-black text-[11px] font-extrabold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="bg-black text-cyan-300 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono">High Yield</span>
        <span>A5 Markets Structured Investment Plans: Earn 75% to 150% Returns with Monthly Payouts!</span>
        <button onClick={scrollToInvestments} className="underline hover:text-white ml-2 cursor-pointer font-bold">Explore Plans →</button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center group">
              <img 
                src="/assets/a5-logo.png" 
                alt="A5 Markets" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter dark:brightness-125 brightness-100" 
              />
            </a>
          </div>

          {/* Desktop Mega Navigation Menus */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {megaMenus.map((menu) => (
              <div
                key={menu.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-brand-green rounded-lg transition-colors flex items-center gap-1 group"
                >
                  <span>{menu.title}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === menu.title ? 'rotate-180 text-brand-green' : 'text-gray-400'}`} />
                </button>

                {/* Dropdown Menu Box */}
                {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 w-80 rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] shadow-2xl p-2.5 animate-slide-up transition-all z-50">
                    <div className="space-y-1">
                      {menu.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#16233b] transition-colors group"
                        >
                          <span className="text-lg mt-0.5">{item.icon}</span>
                          <div>
                            <h5 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors">
                              {item.name}
                            </h5>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all duration-300 bg-gray-100 dark:bg-[#111b2d] border-gray-300 dark:border-[#223354] text-gray-800 dark:text-gray-200 hover:border-brand-green"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  <span>Light</span>
                </>
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white border border-gray-300 dark:border-[#223354] rounded-lg transition-all duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-[#16233b]"
            >
              Login
            </button>

            {/* Open Account Button */}
            <button
              onClick={onOpenAccount}
              className="px-5 py-2 text-sm font-extrabold text-white bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] hover:from-cyan-400 hover:to-teal-500 rounded-lg shadow-glow-cyan transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Open Account</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 border-b border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0c121e] animate-slide-up shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {megaMenus.map((menu) => (
              <div key={menu.title} className="border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                  {menu.title}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {menu.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-2 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-brand-green flex items-center gap-2"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
              >
                Login to Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full py-2.5 text-center text-sm font-extrabold text-white bg-gradient-to-r from-cyan-500 via-[#00a2b8] to-[#17a2b8] hover:from-cyan-400 hover:to-teal-500 rounded-lg shadow-glow-cyan cursor-pointer"
              >
                Open Live Account
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
