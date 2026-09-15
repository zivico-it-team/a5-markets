export type Theme = 'dark' | 'light';

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  category: 'popular' | 'forex' | 'metals' | 'indices' | 'commodities' | 'crypto';
  bid: number;
  ask: number;
  spread: number;
  change: number; // percentage e.g. +0.38, -0.47
  high: number;
  low: number;
  volume: string;
  sparkline: number[];
  icon?: string;
  digits: number; // decimals e.g. 5 for EUR/USD, 2 for Gold/Crypto
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export type TimeFrame = '1M' | '5M' | '15M' | '1H' | '4H' | '1D' | '1W';

export interface MarketCategory {
  id: string;
  name: string;
  count: string;
  subtext: string;
  color: string;
  sparkline: number[];
  categoryKey: MarketItem['category'];
}

export interface TradeOrder {
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number; // lot size e.g. 0.1
  openPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  leverage: number;
  timestamp: string;
}

export interface UserAccount {
  name: string;
  email: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage: string;
  accountType: 'Demo' | 'Standard' | 'Pro' | 'ECN';
  accountNumber: string;
  isLoggedIn: boolean;
}
