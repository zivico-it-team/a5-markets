import React, { useState } from 'react';
import { MarketItem, TradeOrder } from '../types';
import { X, Zap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MarketItem | null;
  onOrderPlaced: (order: TradeOrder) => void;
}

export const QuickTradeModal: React.FC<QuickTradeModalProps> = ({
  isOpen,
  onClose,
  item,
  onOrderPlaced,
}) => {
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [volume, setVolume] = useState<number>(0.1);
  const leverage = 500;
  const [stopLoss, setStopLoss] = useState<string>('');
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const currentPrice = orderType === 'BUY' ? item.ask : item.bid;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const order: TradeOrder = {
      symbol: item.symbol,
      type: orderType,
      volume,
      openPrice: currentPrice,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
      leverage,
      timestamp: new Date().toLocaleTimeString(),
    };

    onOrderPlaced(order);
    setOrderSuccess(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: orderType === 'BUY' ? ['#00d26a', '#34d399'] : ['#ef4444', '#f87171'],
      });
    } catch (e) {}

    setTimeout(() => {
      setOrderSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] p-6 sm:p-8 shadow-2xl transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderSuccess ? (
          <div className="text-center py-8 animate-slide-up">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${
                orderType === 'BUY'
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-brand-green border-emerald-500'
                  : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500'
              }`}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
              {orderType} Order Executed!
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Filled {volume} lots of {item.symbol} at {currentPrice.toFixed(item.digits)}
            </p>
          </div>
        ) : (
          <div>
            {/* Instrument Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200 dark:border-[#1a273f]">
              <span className="text-2xl">{item.icon || '🪙'}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.symbol}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.name} • Spread: {item.spread} pips
                </span>
              </div>
            </div>

            {/* Buy / Sell Selection Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setOrderType('BUY')}
                className={`py-3 px-4 rounded-xl font-extrabold text-sm flex flex-col items-center justify-center border transition-all ${
                  orderType === 'BUY'
                    ? 'bg-emerald-50 dark:bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-brand-green shadow-sm'
                    : 'bg-gray-50 dark:bg-[#121c30] border-gray-200 dark:border-[#1a273f] text-gray-500 dark:text-gray-400'
                }`}
              >
                <span className="text-xs font-semibold">BUY / LONG</span>
                <span className="font-mono text-base font-bold mt-0.5">
                  {item.ask.toFixed(item.digits)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('SELL')}
                className={`py-3 px-4 rounded-xl font-extrabold text-sm flex flex-col items-center justify-center border transition-all ${
                  orderType === 'SELL'
                    ? 'bg-rose-50 dark:bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400'
                    : 'bg-gray-50 dark:bg-[#121c30] border-gray-200 dark:border-[#1a273f] text-gray-500 dark:text-gray-400'
                }`}
              >
                <span className="text-xs font-semibold">SELL / SHORT</span>
                <span className="font-mono text-base font-bold mt-0.5">
                  {item.bid.toFixed(item.digits)}
                </span>
              </button>
            </div>

            <form onSubmit={handleExecute} className="space-y-4">
              {/* Volume / Lot Size */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-400">
                    Volume (Lots)
                  </label>
                  <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                    Pip value: ~${(volume * 10).toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 mb-2">
                  {[0.01, 0.05, 0.1, 0.5, 1.0].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVolume(v)}
                      className={`py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                        volume === v
                          ? 'border-brand-green bg-brand-green/20 text-emerald-600 dark:text-brand-green'
                          : 'border-gray-300 dark:border-[#1a273f] text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                  className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white font-mono text-sm py-2 px-3 rounded-xl focus:outline-none focus:border-brand-green"
                />
              </div>

              {/* SL / TP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                    Stop Loss (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="e.g. 1.08200"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white font-mono text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                    Take Profit (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="e.g. 1.09500"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white font-mono text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              {/* Leverage Info */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#10192a] border border-gray-200 dark:border-[#1a273f] text-xs flex justify-between items-center text-gray-500 dark:text-gray-400">
                <span>Account Leverage:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">1:500 (A5 Standard)</span>
              </div>

              {/* Submit Execution Button */}
              <button
                type="submit"
                className={`w-full py-3.5 text-sm font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  orderType === 'BUY'
                    ? 'bg-brand-green hover:bg-brand-green-hover text-black shadow-glow-green'
                    : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Execute Instant {orderType} Order</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
