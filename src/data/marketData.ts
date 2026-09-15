import { MarketItem, MarketCategory, CandleData } from '../types';

export const INITIAL_MARKET_ITEMS: MarketItem[] = [
  {
    id: 'eurusd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'popular',
    bid: 1.15961,
    ask: 1.15976,
    spread: 0.15,
    change: 0.42,
    high: 1.16250,
    low: 1.15680,
    volume: '184.2K',
    digits: 5,
    sparkline: [1.1572, 1.1580, 1.1576, 1.1589, 1.1584, 1.1592, 1.1595, 1.15976],
    icon: '💶'
  },
  {
    id: 'gbpusd',
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar',
    category: 'popular',
    bid: 1.35212,
    ask: 1.35230,
    spread: 0.18,
    change: 0.35,
    high: 1.35620,
    low: 1.34880,
    volume: '136.7K',
    digits: 5,
    sparkline: [1.3495, 1.3508, 1.3502, 1.3516, 1.3511, 1.3520, 1.3518, 1.35230],
    icon: '💷'
  },
  {
    id: 'xauusd',
    symbol: 'XAU/USD',
    name: 'Gold / US Dollar',
    category: 'popular',
    bid: 4292.15,
    ask: 4292.50,
    spread: 0.35,
    change: 0.68,
    high: 4310.20,
    low: 4278.40,
    volume: '342.1K',
    digits: 2,
    sparkline: [4280.5, 4284.2, 4282.0, 4288.5, 4286.1, 4290.8, 4291.5, 4292.50],
    icon: '🪙'
  },
  {
    id: 'btcusd',
    symbol: 'BTC/USD',
    name: 'Bitcoin / US Dollar',
    category: 'popular',
    bid: 77748.67,
    ask: 77753.67,
    spread: 5.00,
    change: 1.26,
    high: 78450.00,
    low: 76820.00,
    volume: '682.4K',
    digits: 2,
    sparkline: [76950, 77200, 77100, 77450, 77320, 77650, 77580, 77753.67],
    icon: '₿'
  },
  {
    id: 'wti',
    symbol: 'WTI',
    name: 'Crude Oil (WTI)',
    category: 'popular',
    bid: 103.15,
    ask: 103.18,
    spread: 0.03,
    change: 0.85,
    high: 104.20,
    low: 102.40,
    volume: '315.8K',
    digits: 2,
    sparkline: [102.5, 102.8, 102.7, 103.0, 102.9, 103.1, 103.15, 103.18],
    icon: '📈'
  },

  // Forex
  {
    id: 'usdjpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    bid: 153.598,
    ask: 153.612,
    spread: 0.14,
    change: -0.18,
    high: 154.250,
    low: 153.200,
    volume: '158.4K',
    digits: 3,
    sparkline: [153.9, 153.8, 153.7, 153.65, 153.58, 153.63, 153.612],
    icon: '💴'
  },
  {
    id: 'audusd',
    symbol: 'AUD/USD',
    name: 'Australian Dollar / US Dollar',
    category: 'forex',
    bid: 0.71538,
    ask: 0.71553,
    spread: 0.15,
    change: 0.32,
    high: 0.71800,
    low: 0.71250,
    volume: '92.6K',
    digits: 5,
    sparkline: [0.7130, 0.7138, 0.7142, 0.7149, 0.7146, 0.7152, 0.71553],
    icon: '🇦🇺'
  },
  {
    id: 'usdcad',
    symbol: 'USD/CAD',
    name: 'US Dollar / Canadian Dollar',
    category: 'forex',
    bid: 1.38615,
    ask: 1.38631,
    spread: 0.16,
    change: -0.12,
    high: 1.38950,
    low: 1.38400,
    volume: '84.3K',
    digits: 5,
    sparkline: [1.3880, 1.3875, 1.3870, 1.3868, 1.3865, 1.3862, 1.38631],
    icon: '🇨🇦'
  },
  {
    id: 'usdchf',
    symbol: 'USD/CHF',
    name: 'US Dollar / Swiss Franc',
    category: 'forex',
    bid: 0.81642,
    ask: 0.81658,
    spread: 0.16,
    change: 0.08,
    high: 0.81900,
    low: 0.81450,
    volume: '63.5K',
    digits: 5,
    sparkline: [0.8150, 0.8155, 0.8158, 0.8162, 0.8160, 0.8164, 0.81658],
    icon: '🇨🇭'
  },

  // Metals
  {
    id: 'xagusd',
    symbol: 'XAG/USD',
    name: 'Silver / US Dollar',
    category: 'metals',
    bid: 63.01,
    ask: 63.04,
    spread: 0.03,
    change: 1.15,
    high: 63.80,
    low: 62.40,
    volume: '124.8K',
    digits: 2,
    sparkline: [62.5, 62.7, 62.6, 62.9, 62.8, 63.0, 63.04],
    icon: '⚪'
  },
  {
    id: 'xptusd',
    symbol: 'XPT/USD',
    name: 'Platinum / US Dollar',
    category: 'metals',
    bid: 1768.80,
    ask: 1770.00,
    spread: 1.20,
    change: 0.72,
    high: 1785.00,
    low: 1755.00,
    volume: '41.2K',
    digits: 2,
    sparkline: [1758, 1762, 1760, 1766, 1764, 1769, 1770.0],
    icon: '🥈'
  },

  // Indices
  {
    id: 'nas100',
    symbol: 'NAS100',
    name: 'US Tech 100 / Nasdaq',
    category: 'indices',
    bid: 28948.50,
    ask: 28950.50,
    spread: 2.00,
    change: 1.45,
    high: 29120.00,
    low: 28750.00,
    volume: '580.2K',
    digits: 2,
    sparkline: [28780, 28840, 28820, 28910, 28890, 28940, 28950.5],
    icon: '💻'
  },
  {
    id: 'spx500',
    symbol: 'SPX500',
    name: 'S&P 500 Index',
    category: 'indices',
    bid: 7614.90,
    ask: 7615.50,
    spread: 0.60,
    change: 0.82,
    high: 7640.00,
    low: 7580.00,
    volume: '512.4K',
    digits: 2,
    sparkline: [7585, 7594, 7602, 7610, 7608, 7614, 7615.5],
    icon: '📊'
  },
  {
    id: 'ger40',
    symbol: 'GER40',
    name: 'Germany 40 / DAX',
    category: 'indices',
    bid: 25442.72,
    ask: 25444.72,
    spread: 2.00,
    change: -0.12,
    high: 25580.00,
    low: 25360.00,
    volume: '235.8K',
    digits: 2,
    sparkline: [25510, 25480, 25490, 25460, 25470, 25440, 25444.72],
    icon: '🇩🇪'
  },

  // Commodities
  {
    id: 'usoil',
    symbol: 'USOIL',
    name: 'Crude Oil (WTI)',
    category: 'commodities',
    bid: 103.15,
    ask: 103.18,
    spread: 0.03,
    change: 0.85,
    high: 104.20,
    low: 102.40,
    volume: '315.8K',
    digits: 2,
    sparkline: [102.5, 102.8, 102.7, 103.0, 102.9, 103.1, 103.18],
    icon: '🛢️'
  },
  {
    id: 'ukoil',
    symbol: 'UKOIL',
    name: 'Brent Crude Oil',
    category: 'commodities',
    bid: 108.22,
    ask: 108.26,
    spread: 0.04,
    change: 0.94,
    high: 109.50,
    low: 107.40,
    volume: '298.5K',
    digits: 2,
    sparkline: [107.6, 107.9, 108.0, 108.3, 108.1, 108.24, 108.26],
    icon: '⛽'
  },
  {
    id: 'ngas',
    symbol: 'NGAS',
    name: 'Natural Gas',
    category: 'commodities',
    bid: 2.892,
    ask: 2.897,
    spread: 0.005,
    change: -0.85,
    high: 2.940,
    low: 2.860,
    volume: '142.3K',
    digits: 3,
    sparkline: [2.93, 2.91, 2.92, 2.90, 2.91, 2.895, 2.897],
    icon: '🔥'
  },

  // Crypto
  {
    id: 'ethusd',
    symbol: 'ETH/USD',
    name: 'Ethereum / US Dollar',
    category: 'crypto',
    bid: 2509.20,
    ask: 2510.41,
    spread: 1.21,
    change: 1.18,
    high: 2560.00,
    low: 2470.00,
    volume: '445.6K',
    digits: 2,
    sparkline: [2480, 2492, 2488, 2504, 2498, 2508, 2510.41],
    icon: '⟠'
  },
  {
    id: 'solusd',
    symbol: 'SOL/USD',
    name: 'Solana / US Dollar',
    category: 'crypto',
    bid: 101.28,
    ask: 101.43,
    spread: 0.15,
    change: 1.62,
    high: 104.50,
    low: 98.80,
    volume: '265.4K',
    digits: 2,
    sparkline: [99.2, 100.1, 99.8, 100.8, 100.5, 101.2, 101.43],
    icon: '◎'
  }
];

export const MARKET_CATEGORIES: MarketCategory[] = [
  {
    id: 'forex',
    name: 'Forex',
    count: '60+ Pairs',
    subtext: 'Major, Minor & Exotic currencies',
    color: '#00d26a', // Green
    sparkline: [20, 25, 22, 35, 30, 45, 40, 60, 55, 75, 80],
    categoryKey: 'forex'
  },
  {
    id: 'gold',
    name: 'Gold',
    count: 'Spot Metals',
    subtext: 'Gold, Silver, Platinum & Palladium',
    color: '#f59e0b', // Amber / Gold
    sparkline: [30, 28, 40, 38, 50, 48, 65, 60, 70, 68, 85],
    categoryKey: 'metals'
  },
  {
    id: 'indices',
    name: 'Indices',
    count: '10+ Indices',
    subtext: 'NAS100, SPX500, DAX40 & more',
    color: '#00b4d8', // Cyan
    sparkline: [15, 30, 25, 40, 35, 55, 50, 68, 62, 78, 88],
    categoryKey: 'indices'
  },
  {
    id: 'commodities',
    name: 'Commodities',
    count: 'Energy & Metals',
    subtext: 'WTI Oil, Brent, Natural Gas & Copper',
    color: '#a855f7', // Purple
    sparkline: [40, 35, 48, 42, 58, 52, 66, 60, 75, 70, 90],
    categoryKey: 'commodities'
  },
  {
    id: 'crypto',
    name: 'Crypto',
    count: '20+ Coins',
    subtext: 'Bitcoin, Ethereum, Solana & top altcoins',
    color: '#f97316', // Orange
    sparkline: [25, 38, 32, 50, 45, 65, 58, 76, 70, 86, 95],
    categoryKey: 'crypto'
  }
];

// Generates realistic candlestick historical data for any instrument
export function generateCandleHistory(symbol: string, count: number = 40): CandleData[] {
  let basePrice = 1.1590;
  let volatility = 0.0008;

  if (symbol.includes('BTC')) {
    basePrice = 77700;
    volatility = 320;
  } else if (symbol.includes('XAU')) {
    basePrice = 4290;
    volatility = 5.5;
  } else if (symbol.includes('WTI') || symbol.includes('USOIL')) {
    basePrice = 103;
    volatility = 0.65;
  } else if (symbol.includes('GBP')) {
    basePrice = 1.3520;
    volatility = 0.0010;
  } else if (symbol.includes('NAS100')) {
    basePrice = 28950;
    volatility = 60;
  } else if (symbol.includes('SPX500')) {
    basePrice = 7615;
    volatility = 15;
  }

  const candles: CandleData[] = [];
  const now = new Date();
  
  let currentClose = basePrice;

  for (let i = count; i >= 0; i--) {
    const candleTime = new Date(now.getTime() - i * 5 * 60 * 1000);
    const timeStr = candleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const open = currentClose;
    const delta = (Math.random() - 0.47) * volatility * 2;
    const close = Math.max(open + delta, basePrice * 0.5);
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    const volume = Math.floor(Math.random() * 500) + 100;

    candles.push({
      time: timeStr,
      open,
      high,
      low,
      close,
      volume
    });

    currentClose = close;
  }

  return candles;
}
