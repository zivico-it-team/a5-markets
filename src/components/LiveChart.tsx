import React, { useState, useEffect, useRef } from 'react';
import { MarketItem, CandleData, TimeFrame } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, BarChart2, Zap } from 'lucide-react';

interface LiveChartProps {
  selectedItem: MarketItem;
  allItems: MarketItem[];
  onSelectSymbol: (symbol: string) => void;
  onTradeClick?: () => void;
}

function getChartVolatility(item: MarketItem): number {
  if (item.category === 'forex') return item.digits === 3 ? 0.035 : 0.00035;
  if (item.symbol.includes('BTC')) return Math.max(item.ask * 0.0018, 90);
  if (item.symbol.includes('ETH')) return Math.max(item.ask * 0.002, 5);
  if (item.symbol.includes('XAU')) return 3.5;
  if (item.category === 'indices') return Math.max(item.ask * 0.0009, 4);
  if (item.category === 'commodities') return Math.max(item.ask * 0.004, 0.25);
  return Math.max(item.ask * 0.001, 0.1);
}

// Generate a calm, price-anchored sequence that ends exactly at the current live price.
function generateHistoricalCandles(item: MarketItem, count: number = 36): CandleData[] {
  const candles: CandleData[] = [];
  const now = new Date();
  const volatility = getChartVolatility(item);
  const drift = volatility * count * 0.12;

  let prevClose = item.ask - drift;

  for (let i = count; i >= 0; i--) {
    const candleTime = new Date(now.getTime() - i * 60 * 1000);
    const timeStr = candleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const progressTarget = item.ask - (volatility * i * 0.12);
    const open = prevClose;
    const close = i === 0
      ? item.ask
      : progressTarget + (Math.random() - 0.5) * volatility * 1.4;
    const high = Math.max(open, close) + Math.random() * volatility * 0.7;
    const low = Math.min(open, close) - Math.random() * volatility * 0.7;

    candles.push({
      time: timeStr,
      open: Number(open.toFixed(item.digits)),
      high: Number(high.toFixed(item.digits)),
      low: Number(low.toFixed(item.digits)),
      close: Number(close.toFixed(item.digits)),
      volume: Math.floor(Math.random() * 500) + 100,
    });

    prevClose = close;
  }

  return candles;
}

export const LiveChart: React.FC<LiveChartProps> = ({
  selectedItem,
  allItems,
  onSelectSymbol,
  onTradeClick,
}) => {
  const { theme } = useTheme();
  const [timeframe, setTimeframe] = useState<TimeFrame>('1M');
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize candles when symbol or timeframe changes, anchored to selectedItem.ask.
  useEffect(() => {
    const initial = generateHistoricalCandles(selectedItem, 36);
    setCandles(initial);
  }, [selectedItem.symbol, selectedItem.digits, timeframe]);

  // Synchronize the latest candle with the live price. If the source jumps from stale
  // fallback data to a real quote, rebuild the series instead of drawing a giant candle.
  useEffect(() => {
    setCandles((prevCandles) => {
      if (prevCandles.length === 0) return prevCandles;
      const previousClose = prevCandles[prevCandles.length - 1].close;
      const jumpSize = Math.abs(selectedItem.ask - previousClose);
      const maxNormalMove = getChartVolatility(selectedItem) * 8;

      if (jumpSize > maxNormalMove) {
        return generateHistoricalCandles(selectedItem, 36);
      }

      const updated = [...prevCandles];
      const lastIndex = updated.length - 1;
      const last = { ...updated[lastIndex] };

      last.close = Number(selectedItem.ask.toFixed(selectedItem.digits));
      last.high = Number(Math.max(last.high, selectedItem.ask).toFixed(selectedItem.digits));
      last.low = Number(Math.min(last.low, selectedItem.ask).toFixed(selectedItem.digits));
      updated[lastIndex] = last;

      return updated;
    });
  }, [selectedItem]);

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    if (candles.length === 0) return;

    let minPrice = Math.min(...candles.map((c) => c.low));
    let maxPrice = Math.max(...candles.map((c) => c.high));
    const range = maxPrice - minPrice || 1;
    minPrice -= range * 0.05;
    maxPrice += range * 0.05;
    const finalRange = maxPrice - minPrice;

    const chartPaddingRight = 65;
    const chartPaddingBottom = 25;
    const chartWidth = width - chartPaddingRight;
    const chartHeight = height - chartPaddingBottom;

    const candleCount = candles.length;
    const candleSlotWidth = chartWidth / candleCount;
    const candleBodyWidth = Math.max(candleSlotWidth * 0.65, 4);

    const isDark = theme === 'dark';

    // Draw horizontal grid lines and price axis labels
    const gridLines = 5;
    ctx.lineWidth = 1;
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'left';

    for (let i = 0; i <= gridLines; i++) {
      const y = (chartHeight / gridLines) * i;
      const priceVal = maxPrice - (i / gridLines) * finalRange;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      ctx.fillText(
        priceVal.toFixed(selectedItem.digits),
        chartWidth + 8,
        y + 3
      );
    }

    if (chartType === 'line') {
      ctx.beginPath();
      const points: { x: number; y: number }[] = [];

      candles.forEach((candle, index) => {
        const x = index * candleSlotWidth + candleSlotWidth / 2;
        const y = chartHeight - ((candle.close - minPrice) / finalRange) * chartHeight;
        points.push({ x, y });
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      const lastPoint = points[points.length - 1];
      const fillGradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
      fillGradient.addColorStop(0, 'rgba(0, 210, 106, 0.25)');
      fillGradient.addColorStop(1, 'rgba(0, 210, 106, 0.0)');

      ctx.strokeStyle = '#00d26a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.lineTo(lastPoint.x, chartHeight);
      ctx.lineTo(points[0].x, chartHeight);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();
    } else {
      candles.forEach((candle, index) => {
        const xCenter = index * candleSlotWidth + candleSlotWidth / 2;
        const isUp = candle.close >= candle.open;
        const candleColor = isUp ? '#00d26a' : '#ef4444';

        const yOpen = chartHeight - ((candle.open - minPrice) / finalRange) * chartHeight;
        const yClose = chartHeight - ((candle.close - minPrice) / finalRange) * chartHeight;
        const yHigh = chartHeight - ((candle.high - minPrice) / finalRange) * chartHeight;
        const yLow = chartHeight - ((candle.low - minPrice) / finalRange) * chartHeight;

        // Wick
        ctx.strokeStyle = candleColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(xCenter, yHigh);
        ctx.lineTo(xCenter, yLow);
        ctx.stroke();

        // Body
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);
        const bodyLeft = xCenter - candleBodyWidth / 2;

        ctx.fillStyle = candleColor;
        ctx.fillRect(bodyLeft, bodyTop, candleBodyWidth, bodyHeight);
      });
    }

    // Active 100% exact live price line
    const activeLivePrice = selectedItem.ask;
    const activeY = chartHeight - ((activeLivePrice - minPrice) / finalRange) * chartHeight;

    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#00d26a';
    ctx.lineWidth = 1.5;
    ctx.moveTo(0, activeY);
    ctx.lineTo(chartWidth, activeY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Live Price Badge on Right Axis
    ctx.fillStyle = '#00d26a';
    ctx.fillRect(chartWidth + 2, activeY - 9, 60, 18);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 9px JetBrains Mono, monospace';
    ctx.fillText(activeLivePrice.toFixed(selectedItem.digits), chartWidth + 5, activeY + 3);

    // Bottom timeline labels
    ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
    ctx.font = '10px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    const timeLabels = candles
      .filter((_, index) => index % Math.max(1, Math.floor(candles.length / 4)) === 0)
      .slice(0, 5);
    timeLabels.forEach((candle, idx) => {
      const xPos = (chartWidth / Math.max(1, timeLabels.length - 1)) * idx;
      ctx.fillText(candle.time, Math.max(18, Math.min(xPos, chartWidth - 18)), height - 6);
    });

    // Crosshair
    if (mousePos && mousePos.x >= 0 && mousePos.x <= chartWidth && mousePos.y >= 0 && mousePos.y <= chartHeight) {
      ctx.setLineDash([2, 2]);
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(mousePos.x, 0);
      ctx.lineTo(mousePos.x, chartHeight);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, mousePos.y);
      ctx.lineTo(chartWidth, mousePos.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [candles, chartType, theme, selectedItem.digits, selectedItem.ask, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const chartPaddingRight = 65;
    const chartWidth = rect.width - chartPaddingRight;
    const candleSlotWidth = chartWidth / candles.length;
    const index = Math.floor(x / candleSlotWidth);

    if (index >= 0 && index < candles.length) {
      setHoveredCandle(candles[index]);
    }
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredCandle(null);
  };

  const isPositive = selectedItem.change >= 0;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col w-full h-[360px] sm:h-[420px] rounded-2xl border border-gray-200 dark:border-[#1a273f] bg-white dark:bg-[#0d1424]/95 p-4 sm:p-5 shadow-xl transition-all duration-300"
    >
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200 dark:border-[#1a273f]">
        
        {/* Left: Currency Pair Selector & Exact Synchronized Live Price */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              aria-label="Select Trading Instrument"
              value={selectedItem.symbol}
              onChange={(e) => onSelectSymbol(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-[#121c30] border border-gray-300 dark:border-[#223354] text-gray-900 dark:text-white font-bold text-sm sm:text-base py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:border-brand-green"
            >
              {allItems.slice(0, 8).map((item) => (
                <option key={item.id} value={item.symbol} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  {item.symbol}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Exact Live Price Tag (100% matching Ticker) */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-base sm:text-lg font-extrabold tracking-tight text-gray-900 dark:text-white">
              {selectedItem.ask.toFixed(selectedItem.digits)}
            </span>
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                isPositive
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20'
                  : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/20'
              }`}
            >
              {isPositive ? '+' : ''}{selectedItem.change.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Right: Timeframes & Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-[#121c30] p-0.5 rounded-lg border border-gray-200 dark:border-[#1a273f]">
            {(['1M', '5M', '1H', '1D', '1W'] as TimeFrame[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  timeframe === tf
                    ? 'bg-brand-green text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setChartType(chartType === 'candles' ? 'line' : 'candles')}
            title="Switch Chart Type"
            className="p-1.5 rounded-lg border border-gray-300 dark:border-[#223354] text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-brand-green hover:border-brand-green transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hover Info Tooltip Bar */}
      {hoveredCandle && (
        <div className="absolute top-16 left-5 z-20 flex items-center gap-3 text-[11px] font-mono bg-white/95 dark:bg-[#070b12]/90 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 shadow-md">
          <span className="text-gray-500">O: <strong className="text-black dark:text-white">{hoveredCandle.open.toFixed(selectedItem.digits)}</strong></span>
          <span className="text-gray-500">H: <strong className="text-emerald-600 dark:text-emerald-400">{hoveredCandle.high.toFixed(selectedItem.digits)}</strong></span>
          <span className="text-gray-500">L: <strong className="text-rose-600 dark:text-rose-400">{hoveredCandle.low.toFixed(selectedItem.digits)}</strong></span>
          <span className="text-gray-500">C: <strong className="text-black dark:text-white">{hoveredCandle.close.toFixed(selectedItem.digits)}</strong></span>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="relative flex-1 w-full mt-2">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full cursor-crosshair"
        />
      </div>

      {/* Quick Trade Fast Action Footer */}
      {onTradeClick && (
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-gray-200 dark:border-[#1a273f]/60">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>A5 Real-Time Market Feed Connected</span>
          </div>
          <button
            onClick={onTradeClick}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-brand-green hover:underline cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Trade</span>
          </button>
        </div>
      )}
    </div>
  );
};
