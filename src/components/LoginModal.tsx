import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, UserCheck, Eye, EyeOff } from 'lucide-react';
import { PORTAL_LOGIN_URL, PORTAL_REGISTER_URL } from '../constants/portalLinks';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = PORTAL_LOGIN_URL;
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

        {isLoggedIn ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-brand-green border-2 border-emerald-400 dark:border-emerald-500/50 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <UserCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Authenticated Successfully!
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Connecting to A5 Markets secure server...</p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                Trader Portal Login
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Access your A5 Markets dashboard, web terminal and account funds.
              </p>
            </div>

            {/* Live vs Demo Server Switch */}
            <div className="flex items-center bg-gray-100 dark:bg-[#121c30] p-1 rounded-xl border border-gray-300 dark:border-[#1a273f] mb-5">
              <button
                type="button"
                onClick={() => setIsDemo(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  !isDemo
                    ? 'bg-brand-green text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Live Account
              </button>
              <button
                type="button"
                onClick={() => setIsDemo(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  isDemo
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Demo Account
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                  Email or Account Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="text"
                    placeholder="trader@example.com or 884920"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm py-2.5 pl-9 pr-3.5 rounded-xl focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                  Trading Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#121c30] border border-gray-300 dark:border-[#1a273f] text-gray-900 dark:text-white text-sm py-2.5 pl-9 pr-10 rounded-xl focus:outline-none focus:border-brand-green"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-700 text-brand-green focus:ring-brand-green" />
                  <span>Remember Me</span>
                </label>
                <a href="#" className="text-emerald-600 dark:text-brand-green hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 text-sm font-extrabold text-black bg-brand-green hover:bg-brand-green-hover rounded-xl shadow-glow-green transition-all flex items-center justify-center gap-2"
              >
                <span>Login to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-[#1a273f] text-center text-xs text-gray-500 dark:text-gray-400">
              Don't have an A5 Markets account?{' '}
              <button
                onClick={() => {
                  onClose();
                  window.location.href = PORTAL_REGISTER_URL;
                }}
                className="font-bold text-emerald-600 dark:text-brand-green hover:underline ml-1"
              >
                Open $20 Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
