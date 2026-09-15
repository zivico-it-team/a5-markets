import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Zap, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! 👋 Welcome to A5 Markets. How can I assist you today? You can ask about our standard accounts, 75%-150% structured investment plans, spreads, or A5 WebTrader.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickQuestions = [
    'How do Investment Plans work?',
    'What are the account types?',
    'What are the raw spreads?',
    'How does A5 WebTrader work?',
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'Thank you for contacting A5 Markets. We offer institutional-grade trading accounts from $200 and high-yield structured investment plans up to 150% return.';
      const query = userText.toLowerCase();

      if (query.includes('plan') || query.includes('invest') || query.includes('return') || query.includes('percentage') || query.includes('3000')) {
        botResponse = 'Our 4-month structured Investment Plans offer high yields: $3,000 tier (75% return, $6,150 total), $5,000 tier (100% return, $11,500 total), and $10,000 tier (150% return, $29,500 total) with monthly distributions (M1-M4) and capital return!';
      } else if (query.includes('deposit') || query.includes('fund') || query.includes('account type')) {
        botResponse = 'We offer Standard accounts ($200 min deposit), Pro accounts ($500), Raw ECN accounts ($1,000), and Investment Plans ($3,000+). Deposits are instant with 0% fees via USDT, Cards, BTC, and Bank Wire!';
      } else if (query.includes('leverage') || query.includes('margin')) {
        botResponse = 'A5 Markets offers flexible leverage up to 1:500 on Forex, Gold, and Indices, allowing you to maximize market exposure with low margin requirements.';
      } else if (query.includes('spread') || query.includes('fee') || query.includes('commission')) {
        botResponse = 'Our Raw ECN accounts offer institutional spreads from 0.0 pips with direct Tier-1 bank liquidity, while our Standard accounts offer zero-commission trading from 1.3 pips.';
      } else if (query.includes('platform') || query.includes('webtrader') || query.includes('app') || query.includes('terminal')) {
        botResponse = 'We operate our own custom A5 WebTrader and A5 Mobile App (iOS & Android). It runs seamlessly with sub-8ms ultra-low latency execution and zero third-party software installation required!';
      } else if (query.includes('partner') || query.includes('ib') || query.includes('affiliate')) {
        botResponse = 'Our Introducing Broker (IB) program pays up to $15 per lot with daily payouts and multi-tier sub-IB commission overrides!';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-brand-green text-black font-extrabold shadow-glow-green hover:scale-105 transition-all duration-300 group cursor-pointer"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-500 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm">24/7 Trader Support</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[480px] rounded-3xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424] shadow-2xl flex flex-col overflow-hidden animate-slide-up transition-all">
          
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-[#0d2238] dark:to-[#071322] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-green/20 border border-brand-green flex items-center justify-center text-brand-green">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                  <span>A5 Trading & Investment Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <span className="text-[11px] text-emerald-200 dark:text-gray-400 block">
                  Online • Typical reply under 1m
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50 dark:bg-[#070b12]/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-brand-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-brand-green text-black font-semibold rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-[#121c30] text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-[#1a273f] shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span
                    className={`text-[9px] mt-1 block text-right ${
                      m.sender === 'user' ? 'text-black/60' : 'text-gray-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-gray-400 text-xs italic">
                <Bot className="w-4 h-4 text-brand-green animate-spin" />
                <span>A5 Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white dark:bg-[#0d1424] border-t border-gray-100 dark:border-[#1a273f] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#121c30] hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-gray-700 dark:text-gray-300 hover:text-brand-green border border-gray-200 dark:border-[#1a273f] text-[10px] whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#0d1424] border-t border-gray-200 dark:border-[#1a273f] flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(input);
              }}
              className="flex-1 bg-gray-50 dark:bg-[#121c30] border border-gray-200 dark:border-[#1a273f] text-gray-900 dark:text-white text-xs py-2 px-3 rounded-xl focus:outline-none focus:border-brand-green"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2 rounded-xl bg-brand-green hover:bg-brand-green-hover text-black transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
