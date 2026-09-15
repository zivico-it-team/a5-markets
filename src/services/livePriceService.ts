import { MarketItem } from '../types';
import { INITIAL_MARKET_ITEMS } from '../data/marketData';
import { io, Socket } from 'socket.io-client';

interface A5MarketPrice {
  symbol: string;
  price: number;
  bid?: number;
  ask?: number;
  decimals?: number;
  spread?: number;
  spreadPoints?: number;
  change?: number;
  name?: string;
  category?: string;
  source?: string;
}

// Global single-source-of-truth Live Price Engine
export class LivePriceService {
  private static subscribers: ((items: MarketItem[]) => void)[] = [];
  private static currentItems: MarketItem[] = [...INITIAL_MARKET_ITEMS];
  private static isInitialized = false;
  private static ws: WebSocket | null = null;
  private static a5Socket: Socket | null = null;
  private static hasA5Stream = false;
  public static init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // 1. Initial live fetch from all real public market APIs
    this.fetchRealMarketPrices();

    // 2. Real-time Crypto WebSocket (Binance live feed)
    this.connectCryptoWebSocket();

    // 3. A5 Markets platform stream (if available)
    this.connectA5MarketSocket();

    // 4. Regular intervals for live public APIs
    // Forex & Metals refresh every 12 seconds
    setInterval(() => {
      this.fetchRealForexPrices();
      this.fetchRealMetalsPrices();
    }, 12000);

    // Commodities & Indices (Yahoo proxy) refresh every 15 seconds
    setInterval(() => {
      this.fetchLiveMarketQuotes();
    }, 15000);

    // Crypto REST fallback every 15 seconds
    setInterval(() => {
      this.fetchRealCryptoPrices();
    }, 15000);

    // A5 portal check
    setInterval(() => {
      this.fetchA5MarketPrices();
    }, 10000);

    // 5. Continuous Sub-Pip Micro-Fluctuation Engine (every 1.2s)
    this.startMicroFluctuationEngine();
  }

  public static subscribe(callback: (items: MarketItem[]) => void) {
    this.subscribers.push(callback);
    callback(this.currentItems);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  public static getCurrentItems(): MarketItem[] {
    return this.currentItems;
  }

  private static notifySubscribers() {
    const cloned = [...this.currentItems];
    this.subscribers.forEach((cb) => cb(cloned));
  }

  private static async fetchRealMarketPrices() {
    await Promise.allSettled([
      this.fetchRealForexPrices(),
      this.fetchRealMetalsPrices(),
      this.fetchRealCryptoPrices(),
      this.fetchLiveMarketQuotes(),
    ]);
  }

  private static async fetchA5MarketPrices() {
    const token = this.getA5AuthToken();
    if (!token) return;

    try {
      const [symbolsResponse, pricesResponse] = await Promise.allSettled([
        this.fetchA5MarketJson('/market/symbols', token),
        this.fetchA5MarketJson('/market/prices', token),
      ]);

      const symbols = symbolsResponse.status === 'fulfilled'
        ? this.extractA5Symbols(symbolsResponse.value)
        : [];
      const prices = pricesResponse.status === 'fulfilled'
        ? this.extractA5Symbols(pricesResponse.value)
        : [];

      if (!symbols.length && !prices.length) return;

      const allowedSymbols = symbols.length ? new Set(symbols.map((item) => item.symbol)) : null;
      const merged = this.mergeA5MarketItems(symbols, prices);

      this.currentItems = this.mergeMarketItems(this.currentItems, merged)
        .filter((item) => !allowedSymbols || allowedSymbols.has(item.symbol));
      this.notifySubscribers();
    } catch (err) {
      console.warn('A5 portal market API unavailable:', err);
    }
  }

  private static async fetchA5MarketJson(path: string, token: string) {
    try {
      const response = await fetch(`/api/a5-market${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        return response.json();
      }
    } catch {}

    return null;
  }

  private static extractA5Symbols(data: any): A5MarketPrice[] {
    const symbols = Array.isArray(data) ? data : data?.symbols;
    if (!Array.isArray(symbols)) return [];

    return symbols.filter((item): item is A5MarketPrice => (
      item &&
      typeof item.symbol === 'string' &&
      (this.isValidNumber(item.price) || this.isValidNumber(item.bid) || this.isValidNumber(item.ask))
    ));
  }

  private static mergeA5MarketItems(symbols: A5MarketPrice[], prices: A5MarketPrice[]): MarketItem[] {
    const symbolMap = new Map(symbols.map((item) => [item.symbol, item]));
    const priceMap = new Map(prices.map((item) => [item.symbol, item]));
    const allSymbols = new Set([...symbolMap.keys(), ...priceMap.keys()]);

    return [...allSymbols].map((symbol) => {
      const symbolMeta = symbolMap.get(symbol);
      const priceMeta = priceMap.get(symbol);
      return this.toMarketItem({ ...symbolMeta, ...priceMeta, symbol });
    }).filter((item): item is MarketItem => Boolean(item));
  }

  private static mergeMarketItems(existingItems: MarketItem[], nextItems: MarketItem[]): MarketItem[] {
    const existingMap = new Map(existingItems.map((item) => [item.symbol, item]));
    const nextMap = new Map(nextItems.map((item) => [item.symbol, item]));
    const symbols = new Set([...existingMap.keys(), ...nextMap.keys()]);

    return [...symbols].map((symbol) => {
      const existing = existingMap.get(symbol);
      const next = nextMap.get(symbol);
      if (!next) return existing!;
      if (!existing) return next;

      return {
        ...existing,
        ...next,
        previousPrice: undefined,
        sparkline: [...existing.sparkline.slice(1), next.ask],
      } as MarketItem;
    });
  }

  private static toMarketItem(source: A5MarketPrice): MarketItem | null {
    const existing = this.currentItems.find((item) => item.symbol === source.symbol);
    const digits = Number.isInteger(source.decimals) ? source.decimals! : existing?.digits ?? 2;
    const askValue = this.isValidNumber(source.ask) ? source.ask : source.price;
    const bidValue = this.isValidNumber(source.bid) ? source.bid : source.price;
    if (!this.isValidNumber(askValue) && !this.isValidNumber(bidValue)) return null;

    const ask = Number((this.isValidNumber(askValue) ? askValue : bidValue).toFixed(digits));
    const bid = Number((this.isValidNumber(bidValue) ? bidValue : ask).toFixed(digits));
    const spread = this.isValidNumber(source.spread)
      ? source.spread
      : this.isValidNumber(source.spreadPoints)
        ? source.spreadPoints
        : Math.max(0, ask - bid);

    return {
      id: existing?.id ?? source.symbol.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      symbol: source.symbol,
      name: existing?.name ?? source.name ?? this.formatA5Name(source.symbol),
      category: existing?.category ?? this.normalizeA5Category(source),
      bid,
      ask,
      spread,
      change: this.isValidNumber(source.change) || source.change === 0 ? Number(source.change) : existing?.change ?? 0,
      high: existing?.high ?? ask,
      low: existing?.low ?? bid,
      volume: existing?.volume ?? '-',
      digits,
      sparkline: existing?.sparkline ?? Array(8).fill(ask),
      icon: existing?.icon,
    };
  }

  private static connectA5MarketSocket() {
    this.a5Socket?.disconnect();
    this.a5Socket = io('https://server2.a5markets.com', {
      transports: ['websocket', 'polling'],
      timeout: 4000,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    const handlePrices = (prices: A5MarketPrice[]) => {
      if (!Array.isArray(prices) || prices.length === 0) return;
      this.hasA5Stream = true;
      this.applyA5Prices(prices);
    };

    this.a5Socket.on('market:prices', handlePrices);
    this.a5Socket.on('market:prices:delta', handlePrices);
    this.a5Socket.on('disconnect', () => {
      this.hasA5Stream = false;
    });
    this.a5Socket.on('connect_error', () => {
      this.hasA5Stream = false;
    });
  }

  private static applyA5Prices(prices: A5MarketPrice[]) {
    const liveMap = new Map(prices.map((price) => [price.symbol, price]));

    this.currentItems = this.currentItems.map((marketItem) => {
      const live = liveMap.get(this.getA5Symbol(marketItem.symbol));
      if (!live || !this.isValidNumber(live.price)) return marketItem;

      const digits = Number.isInteger(live.decimals) ? live.decimals : marketItem.digits;
      const ask = this.isValidNumber(live.ask) ? live.ask : live.price;
      const bid = this.isValidNumber(live.bid) ? live.bid : this.calculateBid(ask, { ...marketItem, digits });
      const nextAsk = Number(ask.toFixed(digits));
      const nextBid = Number(bid.toFixed(digits));

      return {
        ...marketItem,
        ask: nextAsk,
        bid: nextBid,
        digits,
        spread: this.isValidNumber(live.spread) ? live.spread : marketItem.spread,
        change: this.isValidNumber(live.change) ? live.change : marketItem.change,
        sparkline: [...marketItem.sparkline.slice(1), nextAsk],
      };
    });

    this.notifySubscribers();
  }

  private static getA5AuthToken(): string | null {
    try {
      const raw = localStorage.getItem('a5markets_token');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return typeof parsed === 'string' ? parsed : null;
    } catch {
      return null;
    }
  }

  private static normalizeA5Category(source: A5MarketPrice): MarketItem['category'] {
    const category = String(source.category || source.source || '').toLowerCase();
    const symbol = source.symbol.toUpperCase();

    if (category.includes('forex') || /^[A-Z]{3}\/[A-Z]{3}$/.test(symbol)) return 'forex';
    if (category.includes('metal') || symbol.startsWith('XAU') || symbol.startsWith('XAG') || symbol.startsWith('XPT')) return 'metals';
    if (category.includes('indice') || category.includes('index') || ['NAS100', 'SPX500', 'GER40', 'NDX/USD', 'SPX/USD', 'DAX/EUR'].includes(symbol)) return 'indices';
    if (category.includes('crypto') || ['BTC/USD', 'ETH/USD', 'SOL/USD'].includes(symbol)) return 'crypto';
    if (category.includes('energy') || category.includes('commod') || symbol.includes('OIL') || symbol.includes('WTI') || symbol.includes('NGAS')) return 'commodities';

    return 'popular';
  }

  private static formatA5Name(symbol: string): string {
    return symbol.includes('/') ? symbol.replace('/', ' / ') : symbol;
  }

  private static getA5Symbol(symbol: string): string {
      const symbolMap: Record<string, string> = {
      WTI: 'WTI/USD',
      USOIL: 'WTI/USD',
      NAS100: 'NDX/USD',
      SPX500: 'SPX/USD',
      GER40: 'DAX/EUR',
    };

    return symbolMap[symbol] || symbol;
  }

  private static isA5SupportedSymbol(symbol: string): boolean {
    return [
      'EUR/USD',
      'GBP/USD',
      'USD/JPY',
      'AUD/USD',
      'USD/CAD',
      'USD/CHF',
      'XAU/USD',
      'XAG/USD',
      'XPT/USD',
      'BTC/USD',
      'ETH/USD',
      'SOL/USD',
      'WTI',
      'USOIL',
      'NAS100',
      'SPX500',
      'GER40',
    ].includes(symbol);
  }

  // Real Forex via Open Exchange Rates API
  private static async fetchRealForexPrices() {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!response.ok) return;
      const data = await response.json();
      const rates = data?.rates;
      if (!rates) return;

      const forexMap: Record<string, number> = {
        'EUR/USD': rates.EUR ? 1 / rates.EUR : 0,
        'GBP/USD': rates.GBP ? 1 / rates.GBP : 0,
        'USD/JPY': rates.JPY || 0,
        'AUD/USD': rates.AUD ? 1 / rates.AUD : 0,
        'USD/CAD': rates.CAD || 0,
        'USD/CHF': rates.CHF || 0,
      };

      let changed = false;
      this.currentItems = this.currentItems.map((item) => {
        const liveRate = forexMap[item.symbol];
        if (!liveRate || liveRate <= 0) return item;

        changed = true;
        const digits = item.digits;
        const ask = Number(liveRate.toFixed(digits));
        const spreadUnit = digits === 3 ? 0.01 : 0.0001;
        const bid = Number((ask - item.spread * spreadUnit).toFixed(digits));
        const sparkline = [...item.sparkline.slice(1), ask];
        const high = Math.max(item.high, ask);
        const low = Math.min(item.low, bid);

        return {
          ...item,
          ask,
          bid,
          high,
          low,
          sparkline,
        };
      });

      if (changed) this.notifySubscribers();
    } catch (err) {
      console.warn('Live Forex fetch fallback:', err);
    }
  }

  // Real Spot Gold & Silver via Gold API
  private static async fetchRealMetalsPrices() {
    try {
      const [goldRes, silverRes] = await Promise.allSettled([
        fetch('https://api.gold-api.com/price/XAU'),
        fetch('https://api.gold-api.com/price/XAG'),
      ]);

      let changed = false;

      if (goldRes.status === 'fulfilled' && goldRes.value.ok) {
        const goldData = await goldRes.value.json();
        const goldPrice = parseFloat(goldData.price);
        if (goldPrice > 1000) {
          this.currentItems = this.currentItems.map((item) => {
            if (item.symbol === 'XAU/USD') {
              changed = true;
              const ask = Number(goldPrice.toFixed(2));
              const bid = Number((ask - item.spread).toFixed(2));
              const sparkline = [...item.sparkline.slice(1), ask];
              return {
                ...item,
                ask,
                bid,
                high: Math.max(item.high, ask),
                low: Math.min(item.low, bid),
                sparkline,
              };
            }
            return item;
          });
        }
      }

      if (silverRes.status === 'fulfilled' && silverRes.value.ok) {
        const silverData = await silverRes.value.json();
        const silverPrice = parseFloat(silverData.price);
        if (silverPrice > 10) {
          this.currentItems = this.currentItems.map((item) => {
            if (item.symbol === 'XAG/USD') {
              changed = true;
              const ask = Number(silverPrice.toFixed(2));
              const bid = Number((ask - item.spread).toFixed(2));
              const sparkline = [...item.sparkline.slice(1), ask];
              return {
                ...item,
                ask,
                bid,
                high: Math.max(item.high, ask),
                low: Math.min(item.low, bid),
                sparkline,
              };
            }
            return item;
          });
        }
      }

      if (changed) this.notifySubscribers();
    } catch (err) {
      console.warn('Live Metals fetch fallback:', err);
    }
  }

  // Real Crypto from Binance Live API
  private static async fetchRealCryptoPrices() {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      if (!response.ok) return;
      const data = await response.json();

      const cryptoMap: Record<string, { price: number; change: number; high: number; low: number; volume: string }> = {};

      const symbols = [
        { pair: 'BTCUSDT', target: 'BTC/USD' },
        { pair: 'ETHUSDT', target: 'ETH/USD' },
        { pair: 'SOLUSDT', target: 'SOL/USD' },
      ];

      symbols.forEach(({ pair, target }) => {
        const item = data.find((d: any) => d.symbol === pair);
        if (item) {
          cryptoMap[target] = {
            price: parseFloat(item.lastPrice),
            change: parseFloat(item.priceChangePercent),
            high: parseFloat(item.highPrice),
            low: parseFloat(item.lowPrice),
            volume: `${(parseFloat(item.volume) / 1000).toFixed(1)}K`,
          };
        }
      });

      this.currentItems = this.currentItems.map((marketItem) => {
        const live = cryptoMap[marketItem.symbol];
        if (live) {
          const ask = live.price;
          const bid = Number((ask - marketItem.spread).toFixed(marketItem.digits));
          const updatedSparkline = [...marketItem.sparkline.slice(1), ask];

          return {
            ...marketItem,
            ask,
            bid,
            change: live.change,
            high: live.high,
            low: live.low,
            volume: live.volume,
            sparkline: updatedSparkline,
          };
        }
        return marketItem;
      });

      this.notifySubscribers();
    } catch (err) {
      console.warn('Crypto fetch fallback:', err);
    }
  }

  // Real commodities and index quotes from Yahoo Finance chart API
  private static async fetchLiveMarketQuotes() {

    const symbols = [
      { yahoo: 'EURUSD=X', targets: ['EUR/USD'] },
      { yahoo: 'GBPUSD=X', targets: ['GBP/USD'] },
      { yahoo: 'JPY=X', targets: ['USD/JPY'] },
      { yahoo: 'AUDUSD=X', targets: ['AUD/USD'] },
      { yahoo: 'CAD=X', targets: ['USD/CAD'] },
      { yahoo: 'CHF=X', targets: ['USD/CHF'] },
      { yahoo: 'CL=F', targets: ['WTI', 'USOIL'] },
      { yahoo: 'BZ=F', targets: ['UKOIL'] },
      { yahoo: 'NG=F', targets: ['NGAS'] },
      { yahoo: 'GC=F', targets: ['XAU/USD'] },
      { yahoo: 'SI=F', targets: ['XAG/USD'] },
      { yahoo: 'PL=F', targets: ['XPT/USD'] },
      { yahoo: 'NQ=F', targets: ['NAS100'] },
      { yahoo: 'ES=F', targets: ['SPX500'] },
      { yahoo: '^GDAXI', targets: ['GER40'] },
    ];

    try {
      const quotes = await Promise.allSettled(
        symbols.map(async ({ yahoo, targets }) => {
          const response = await this.fetchYahooChart(yahoo);
          if (!response.ok) return null;

          const data = await response.json();
          const result = data?.chart?.result?.[0];
          const meta = result?.meta;
          const quote = result?.indicators?.quote?.[0];
          const closes = (quote?.close || []).filter((value: unknown): value is number => typeof value === 'number');
          const last = closes.at(-1) ?? meta?.regularMarketPrice;

          if (typeof last !== 'number') return null;

          return {
            targets,
            price: last,
            previousClose: meta?.chartPreviousClose,
            high: meta?.regularMarketDayHigh,
            low: meta?.regularMarketDayLow,
            volume: meta?.regularMarketVolume,
          };
        })
      );

      const liveMap: Record<string, { price: number; previousClose?: number; high?: number; low?: number; volume?: number }> = {};

      quotes.forEach((quote) => {
        if (quote.status !== 'fulfilled' || !quote.value) return;
        quote.value.targets.forEach((target) => {
          liveMap[target] = quote.value!;
        });
      });

      this.currentItems = this.currentItems.map((marketItem) => {
        if (this.hasA5Stream && this.isA5SupportedSymbol(marketItem.symbol)) {
          return marketItem;
        }

        const live = liveMap[marketItem.symbol];
        if (!live) return marketItem;

        const ask = Number(live.price.toFixed(marketItem.digits));
        const bid = this.calculateBid(ask, marketItem);
        const previousClose = typeof live.previousClose === 'number' ? live.previousClose : marketItem.ask;
        const change = previousClose ? ((ask - previousClose) / previousClose) * 100 : marketItem.change;
        const updatedSparkline = [...marketItem.sparkline.slice(1), ask];

        return {
          ...marketItem,
          ask,
          bid,
          change,
          high: typeof live.high === 'number' ? Number(live.high.toFixed(marketItem.digits)) : marketItem.high,
          low: typeof live.low === 'number' ? Number(live.low.toFixed(marketItem.digits)) : marketItem.low,
          volume: typeof live.volume === 'number' ? this.formatVolume(live.volume) : marketItem.volume,
          sparkline: updatedSparkline,
        };
      });

      this.notifySubscribers();
    } catch (err) {
      console.warn('Live market quote fetch fallback:', err);
    }
  }

  private static async fetchYahooChart(symbol: string): Promise<Response> {
    const encodedSymbol = encodeURIComponent(symbol);
    const query = '?range=1d&interval=1m';
    const proxiedUrl = `/api/yahoo-chart/${encodedSymbol}${query}`;

    try {
      const response = await fetch(proxiedUrl);
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        return response;
      }
    } catch (err) {
      console.warn('Yahoo proxy unavailable:', err);
    }

    return new Response(null, { status: 502, statusText: 'Yahoo proxy unavailable' });
  }

  private static formatVolume(volume: number): string {
    if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(1)}M`;
    if (volume >= 1_000) return `${(volume / 1_000).toFixed(1)}K`;
    return `${volume}`;
  }

  private static calculateBid(ask: number, item: MarketItem): number {
    const spreadUnit = item.category === 'forex'
      ? item.digits === 3 ? 0.01 : 0.0001
      : 1;

    return Number((ask - item.spread * spreadUnit).toFixed(item.digits));
  }

  private static isValidNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value) && value > 0;
  }

  // Binance WebSocket for real-time live Crypto ticks
  private static connectCryptoWebSocket() {
    try {
      const wsUrl = 'wss://stream.binance.com:9443/ws/btcusdt@miniTicker/ethusdt@miniTicker/solusdt@miniTicker';
      this.ws = new WebSocket(wsUrl);

      this.ws.onmessage = (event) => {
        try {
          const tick = JSON.parse(event.data);
          let symbolTarget = '';
          if (tick.s === 'BTCUSDT') symbolTarget = 'BTC/USD';
          else if (tick.s === 'ETHUSDT') symbolTarget = 'ETH/USD';
          else if (tick.s === 'SOLUSDT') symbolTarget = 'SOL/USD';

          if (symbolTarget) {
            if (this.hasA5Stream && this.isA5SupportedSymbol(symbolTarget)) return;

            const price = parseFloat(tick.c);
            this.currentItems = this.currentItems.map((item) => {
              if (item.symbol === symbolTarget) {
                const ask = price;
                const bid = Number((ask - item.spread).toFixed(item.digits));
                const updatedSparkline = [...item.sparkline.slice(1), ask];
                return { ...item, ask, bid, sparkline: updatedSparkline };
              }
              return item;
            });
            this.notifySubscribers();
          }
        } catch (e) {}
      };

      this.ws.onerror = () => {
        setTimeout(() => this.connectCryptoWebSocket(), 5000);
      };
      this.ws.onclose = () => {
        setTimeout(() => this.connectCryptoWebSocket(), 5000);
      };
    } catch (e) {}
  }

  // Continuous Sub-Pip Micro-Fluctuation Engine (every 1.2s)
  // Simulates realistic market liquidity heartbeat across all 3 components (Ticker, Chart, Table)
  private static startMicroFluctuationEngine() {
    setInterval(() => {
      const countToUpdate = Math.floor(Math.random() * 3) + 2;
      const indicesToUpdate = new Set<number>();
      while (indicesToUpdate.size < countToUpdate) {
        indicesToUpdate.add(Math.floor(Math.random() * this.currentItems.length));
      }

      this.currentItems = this.currentItems.map((item, idx) => {
        if (!indicesToUpdate.has(idx)) return item;

        let delta = 0;
        if (item.category === 'forex') {
          delta = item.digits === 3
            ? (Math.random() - 0.49) * 0.006
            : (Math.random() - 0.49) * 0.00003;
        } else if (item.symbol === 'XAU/USD') {
          delta = (Math.random() - 0.49) * 0.22;
        } else if (item.symbol === 'XAG/USD') {
          delta = (Math.random() - 0.49) * 0.015;
        } else if (item.category === 'commodities') {
          delta = item.symbol === 'NGAS'
            ? (Math.random() - 0.49) * 0.003
            : (Math.random() - 0.49) * 0.03;
        } else if (item.category === 'indices') {
          delta = (Math.random() - 0.49) * (item.ask * 0.00008);
        } else if (item.category === 'crypto') {
          delta = (Math.random() - 0.49) * (item.ask * 0.00012);
        } else {
          delta = (Math.random() - 0.49) * 0.01;
        }

        const newAsk = Number((item.ask + delta).toFixed(item.digits));
        const spreadUnit = item.category === 'forex'
          ? item.digits === 3 ? 0.01 : 0.0001
          : 1;
        const newBid = Number((newAsk - item.spread * spreadUnit).toFixed(item.digits));
        const updatedSparkline = [...item.sparkline.slice(1), newAsk];

        return {
          ...item,
          ask: newAsk,
          bid: newBid,
          high: Math.max(item.high, newAsk),
          low: Math.min(item.low, newBid),
          sparkline: updatedSparkline,
        };
      });

      this.notifySubscribers();
    }, 1200);
  }

}
