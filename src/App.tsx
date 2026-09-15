import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { MarketTicker } from './components/MarketTicker';
import { Hero } from './components/Hero';
import { FeatureStats } from './components/FeatureStats';
import { InvestmentPlans } from './components/InvestmentPlans';
import { InvestmentPopupModal } from './components/InvestmentPopupModal';
import { MarketCategories } from './components/MarketCategories';
import { JourneyWorkflow } from './components/JourneyWorkflow';
import { MarketTable } from './components/MarketTable';
import { TradePlatforms } from './components/TradePlatforms';
import { AccountTypesComparison } from './components/AccountTypesComparison';
import { EconomicCalendar } from './components/EconomicCalendar';
import { PaymentMethods } from './components/PaymentMethods';
import { ProfitCalculator } from './components/ProfitCalculator';
import { PartnershipSection } from './components/PartnershipSection';
import { PromotionsSection } from './components/PromotionsSection';
import { TrustBadges } from './components/TrustBadges';
import { FaqSection } from './components/FaqSection';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AccountModal } from './components/AccountModal';
import { QuickTradeModal } from './components/QuickTradeModal';
import { Footer } from './components/Footer';
import { INITIAL_MARKET_ITEMS } from './data/marketData';
import { MarketItem, TradeOrder } from './types';
import { LivePriceService } from './services/livePriceService';
import { CheckCircle2 } from 'lucide-react';

export function AppContent() {
  const [marketItems, setMarketItems] = useState<MarketItem[]>(INITIAL_MARKET_ITEMS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('EUR/USD');
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');

  // Modals state
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [modalAccountType, setModalAccountType] = useState('Standard');
  const [modalDepositAmount, setModalDepositAmount] = useState('200');
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Investment Welcome Popup (triggers when website opens)
  const [isInvestmentPopupOpen, setIsInvestmentPopupOpen] = useState(false);

  const [isQuickTradeOpen, setIsQuickTradeOpen] = useState(false);
  const [tradeModalItem, setTradeModalItem] = useState<MarketItem | null>(null);

  // Toast notifications for orders
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Real-Time Live Financial Price Engine
  useEffect(() => {
    LivePriceService.init();
    const unsubscribe = LivePriceService.subscribe((updatedItems) => {
      setMarketItems(updatedItems);
    });

    // Automatically trigger the Investment Plan Popup on website open (after 800ms)
    const popupTimer = setTimeout(() => {
      setIsInvestmentPopupOpen(true);
    }, 800);

    return () => {
      unsubscribe();
      clearTimeout(popupTimer);
    };
  }, []);

  const selectedItem = marketItems.find((i) => i.symbol === selectedSymbol) || marketItems[0];

  const handleOpenAccount = (accountType: string = 'Standard', amount: string = '200', demo: boolean = false) => {
    setModalAccountType(accountType);
    setModalDepositAmount(amount);
    setIsDemoMode(demo);
    setIsAccountModalOpen(true);
  };

  const handleOpenLogin = () => {
    handleOpenAccount('Standard', '200', false);
  };

  const handleSelectPlan = (planName: string, amount: string) => {
    handleOpenAccount(planName, amount, false);
  };

  const handleQuickTrade = (item?: MarketItem) => {
    setTradeModalItem(item || selectedItem);
    setIsQuickTradeOpen(true);
  };

  const handleOrderPlaced = (order: TradeOrder) => {
    setToastMessage(`Executed ${order.type} on ${order.symbol} (${order.volume} Lots) at ${order.openPrice}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070b12] text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#0d1424] border border-cyan-500/60 shadow-2xl backdrop-blur-md animate-slide-up text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
          <div className="w-7 h-7 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar with Mega Dropdowns */}
      <Navbar
        onOpenAccount={() => handleOpenAccount('Standard', '200')}
        onOpenLogin={handleOpenLogin}
      />

      {/* Live Market Ticker Strip (Real Prices from Live APIs) */}
      <MarketTicker
        items={marketItems}
        onSelectSymbol={(sym) => setSelectedSymbol(sym)}
        selectedSymbol={selectedSymbol}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Section with Headline & Live Candlestick Chart */}
        <Hero
          selectedItem={selectedItem}
          allItems={marketItems}
          onSelectSymbol={(sym) => setSelectedSymbol(sym)}
          onOpenAccount={() => handleOpenAccount('Standard', '200')}
          onOpenDemo={() => handleOpenAccount('Standard', '10000', true)}
          onQuickTrade={() => handleQuickTrade()}
        />

        {/* 2. Four Key Feature Stats Bar (Investment Yields 75%-150%, 0.0 Spreads, 500:1 Leverage) */}
        <FeatureStats />

        {/* 3. Official A5 Markets Investment Plans Matrix (75% to 150% Return) */}
        <InvestmentPlans onSelectPlan={handleSelectPlan} />

        {/* 4. Trade 100+ Markets (Forex, Gold, Indices, Commodities, Crypto) */}
        <MarketCategories
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('table');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onTradeNow={(cat) => {
            setSelectedCategory(cat);
            const matched = marketItems.find((i) => i.category === cat) || marketItems[0];
            handleQuickTrade(matched);
          }}
        />

        {/* 5. Start Your Trading Journey (3-Step Workflow) */}
        <JourneyWorkflow onOpenAccount={() => handleOpenAccount('Standard', '200')} />

        {/* 6. Standard Trading Accounts (Standard $200, Pro $500, Raw ECN $1,000, VIP Elite $10,000) */}
        <AccountTypesComparison onOpenAccount={() => handleOpenAccount('Standard', '200')} />

        {/* 7. Live Market Watch Table & Multi-Device Platforms Split Section */}
        <section id="table" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#070b12] border-t border-gray-200 dark:border-[#1a273f]/60 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
              
              {/* Left Column: Full Live Market Table */}
              <div className="lg:col-span-7 w-full">
                <div className="mb-4">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight font-sans">
                    Live Market Watch
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Real-time market depth with live interbank quotes and competitive spreads.
                  </p>
                </div>
                <MarketTable
                  items={marketItems}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => setSelectedCategory(cat)}
                  onSelectSymbol={(sym) => {
                    setSelectedSymbol(sym);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onTradeClick={(item) => handleQuickTrade(item)}
                />
              </div>

              {/* Right Column: Multi-Device Platforms Showcase */}
              <div className="lg:col-span-5 w-full h-full">
                <TradePlatforms onOpenAccount={() => handleOpenAccount('Standard', '200')} />
              </div>

            </div>
          </div>
        </section>

        {/* 8. Live Economic Calendar */}
        <EconomicCalendar />

        {/* 9. Deposits & Withdrawals (Payment Methods Showcase) */}
        <PaymentMethods onOpenDeposit={() => handleOpenAccount('Standard', '200')} />

        {/* 10. Interactive Profit & Pip Calculator */}
        <ProfitCalculator
          items={marketItems}
          onOpenAccount={() => handleOpenAccount('Standard', '200')}
        />

        {/* 11. Introducing Broker (IB) & Affiliate Partner Program */}
        <PartnershipSection onOpenPartnerModal={() => handleOpenAccount('Standard', '200')} />

        {/* 12. Promotions & Special Offers Hub */}
        <PromotionsSection onClaimPromo={() => handleOpenAccount('Standard', '200')} />

        {/* 13. Trust & Security Badges */}
        <TrustBadges />

        {/* 14. Frequently Asked Questions (FAQ) Accordion */}
        <FaqSection />

      </main>

      {/* Broker Footer with London Office & Full Regulatory Warning */}
      <Footer onOpenAccount={() => handleOpenAccount('Standard', '200')} />

      {/* Floating 24/7 AI Trader Support Assistant */}
      <LiveChatWidget />

      {/* Investment Plan Welcome Popup Modal (Triggers on website open) */}
      <InvestmentPopupModal
        isOpen={isInvestmentPopupOpen}
        onClose={() => setIsInvestmentPopupOpen(false)}
        onSelectPlan={handleSelectPlan}
      />

      {/* Interactive Account & Plan Registration Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        isDemo={isDemoMode}
        initialAccountType={modalAccountType}
        initialAmount={modalDepositAmount}
      />

      {/* Order Execution Quick Trade Modal */}
      <QuickTradeModal
        isOpen={isQuickTradeOpen}
        onClose={() => setIsQuickTradeOpen(false)}
        item={tradeModalItem}
        onOrderPlaced={handleOrderPlaced}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
