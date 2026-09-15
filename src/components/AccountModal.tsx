import React, { useState, useEffect } from 'react';
import { X, Check, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDemo?: boolean;
  initialAccountType?: string;
  initialAmount?: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  isDemo = false,
  initialAccountType = 'Standard',
  initialAmount = '200',
}) => {
  const [accountType, setAccountType] = useState<string>(initialAccountType);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    depositAmount: initialAmount,
    leverage: '1:500',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialAccountType) {
      setAccountType(initialAccountType);
    }
    if (initialAmount) {
      setFormData((prev) => ({ ...prev, depositAmount: initialAmount }));
    }
  }, [initialAccountType, initialAmount, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d26a', '#00b4d8', '#38bdf8', '#fbbf24'],
      });
    } catch (e) {}
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const accountOptions = [
    { label: 'Standard ($200)', value: 'Standard', defaultDeposit: '200' },
    { label: 'Pro ($500)', value: 'Pro', defaultDeposit: '500' },
    { label: 'Raw ECN ($1k)', value: 'ECN', defaultDeposit: '1000' },
    { label: '75% Plan ($3k)', value: 'Investment Plan 75%', defaultDeposit: '3000' },
    { label: '100% Plan ($5k)', value: 'Investment Plan 100%', defaultDeposit: '5000' },
    { label: '150% Plan ($10k)', value: 'Investment Plan 150%', defaultDeposit: '10000' },
  ];

  const handleSelectType = (val: string, defaultDep: string) => {
    setAccountType(val);
    setFormData((prev) => ({ ...prev, depositAmount: defaultDep }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] p-6 sm:p-8 shadow-2xl overflow-hidden transition-all max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-6 animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-brand-green border-2 border-emerald-400 dark:border-emerald-500/50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 font-sans">
              {isDemo ? 'Demo Account Activated!' : 'Welcome to A5 Markets!'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Your <strong>{accountType}</strong> has been created with institutional terms.
              Access instructions and login credentials have been sent to <strong>{formData.email || 'your email'}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#080d17] border border-gray-200 dark:border-[#1a273f] mb-6 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Account ID:</span>
                <span className="text-gray-900 dark:text-white font-bold">A5-8849201</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Selected Option:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{accountType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Platform:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">A5 WebTrader & Mobile</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Initial Deposit:</span>
                <span className="text-emerald-600 dark:text-brand-green font-bold">
                  ${isDemo ? '10,000.00 (Demo)' : `${Number(formData.depositAmount).toLocaleString()}.00`}
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 text-sm font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all cursor-pointer"
            >
              Launch A5 WebTrader
            </button>
          </div>
        ) : (
          /* Multi-step Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isDemo ? 'Free $10,000 Demo' : 'A5 Markets Official Registration'}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-sans">
                {isDemo ? 'Open Free Demo Account' : 'Open Trading / Investment Account'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Institutional-grade security, segregated accounts, and direct liquidity access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account / Plan Type Selector */}
              {!isDemo && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-2">
                    Select Account or Investment Plan
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {accountOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectType(opt.value, opt.defaultDeposit)}
                        className={`py-2 px-2.5 text-[11px] font-bold rounded-xl border transition-all text-center cursor-pointer ${
                          accountType === opt.value
                            ? 'border-brand-green bg-brand-green/15 text-emerald-600 dark:text-brand-green font-extrabold ring-1 ring-brand-green/30'
                            : 'border-gray-300 dark:border-[#1a273f] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                  Full Legal Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alexander Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-brand-green"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="trader@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              {!isDemo && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                    Deposit Amount (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="100"
                      value={formData.depositAmount}
                      onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm py-2.5 pl-8 pr-3.5 rounded-xl focus:outline-none focus:border-brand-green font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {/* Agreement */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  required
                  type="checkbox"
                  id="agree"
                  className="mt-0.5 rounded border-gray-300 dark:border-gray-700 text-brand-green focus:ring-brand-green cursor-pointer"
                />
                <label htmlFor="agree" className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">
                  I agree to the Terms & Conditions, Privacy Policy and confirm I am 18+ years of age.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 text-sm font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{isDemo ? 'Create Free Demo Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
