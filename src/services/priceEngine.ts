import type { Candle, Instrument, Quote, Symbol } from '@/types';
import { getInstrument, INSTRUMENTS, INDEX_CONSTITUENTS } from '@/data/instruments';

const SEED_HISTORY_DAYS = 90;
const CANDLES_PER_DAY = 8;

export type Timeframe = '1m' | '5m' | '15m' | '1H' | '1D' | '1W';

export const TIMEFRAMES: Timeframe[] = ['1m', '5m', '15m', '1H', '1D', '1W'];

const TF_MS: Record<Timeframe, number> = {
  '1m': 60 * 1000,
  '5m': 5 * 60 * 1000,
  '15m': 15 * 60 * 1000,
  '1H': 60 * 60 * 1000,
  '1D': 24 * 60 * 60 * 1000,
  '1W': 7 * 24 * 60 * 60 * 1000,
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

interface InternalState {
  quote: Quote;
  candles: Candle[];
  currentCandle: Candle;
  rng: () => number;
}

class PriceEngine {
  private state = new Map<Symbol, InternalState>();
  private listeners = new Set<(quotes: Map<Symbol, Quote>) => void>();
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.init();
  }

  private init() {
    const now = Date.now();
    for (const inst of INSTRUMENTS) {
      const rng = mulberry32(hashStr(inst.symbol));
      const candles = this.generateHistory(inst, rng, now);
      const lastClose = candles[candles.length - 1].close;
      const prevClose = candles[candles.length - 2]?.close ?? lastClose;
      const dayOpen = candles[candles.length - 1].open;

      const yearHigh = Math.max(...candles.map(c => c.high)) * 1.04;
      const yearLow = Math.min(...candles.map(c => c.low)) * 0.96;

      const quote: Quote = {
        symbol: inst.symbol,
        price: lastClose,
        prevClose,
        open: dayOpen,
        dayHigh: Math.max(lastClose, candles[candles.length - 1].high),
        dayLow: Math.min(lastClose, candles[candles.length - 1].low),
        yearHigh: Math.round(yearHigh * 100) / 100,
        yearLow: Math.round(yearLow * 100) / 100,
        volume: this.randVolume(inst, rng),
        change: lastClose - prevClose,
        changePercent: ((lastClose - prevClose) / prevClose) * 100,
        lastTickDir: 'flat',
        updatedAt: now,
      };

      this.state.set(inst.symbol, {
        quote,
        candles: candles.slice(0, -1),
        currentCandle: candles[candles.length - 1],
        rng,
      });
    }
  }

  private generateHistory(inst: Instrument, rng: () => number, now: number): Candle[] {
    const candles: Candle[] = [];
    let price = inst.basePrice * 0.82;
    const bucketMs = (24 * 60 * 60 * 1000) / CANDLES_PER_DAY;
    const totalBuckets = SEED_HISTORY_DAYS * CANDLES_PER_DAY;

    for (let i = totalBuckets; i >= 0; i--) {
      const time = now - i * bucketMs;
      const open = price;
      const drift = (inst.basePrice - price) * 0.004;
      const steps = 4;
      let high = open;
      let low = open;
      let close = open;
      for (let s = 0; s < steps; s++) {
        const shock = (rng() - 0.5) * 2 * inst.volatility * inst.basePrice;
        close = Math.max(1, close + shock + drift / steps);
        high = Math.max(high, close);
        low = Math.min(low, close);
      }
      const volume = this.randVolume(inst, rng);
      candles.push({
        time,
        open: round2(open),
        high: round2(high),
        low: round2(low),
        close: round2(close),
        volume,
      });
      price = close;
    }
    return candles;
  }

  private randVolume(inst: Instrument, rng: () => number): number {
    const base = inst.kind === 'index' ? 0 : 500000 + rng() * 4000000;
    return Math.round(base);
  }

  tick() {
    const now = Date.now();
    for (const [symbol, st] of this.state) {
      const inst = getInstrument(symbol)!;
      const q = st.quote;
      const prevPrice = q.price;
      const shock = (st.rng() - 0.5) * 2 * inst.volatility * q.price;
      const newPrice = Math.max(1, round2(prevPrice + shock));

      st.currentCandle = {
        ...st.currentCandle,
        close: newPrice,
        high: Math.max(st.currentCandle.high, newPrice),
        low: Math.min(st.currentCandle.low, newPrice),
        volume: st.currentCandle.volume + (inst.kind === 'stock' ? Math.round(st.rng() * 5000) : 0),
      };

      q.price = newPrice;
      q.dayHigh = Math.max(q.dayHigh, newPrice);
      q.dayLow = Math.min(q.dayLow, newPrice);
      q.change = round2(newPrice - q.prevClose);
      q.changePercent = round2(((newPrice - q.prevClose) / q.prevClose) * 100);
      q.lastTickDir = newPrice > prevPrice ? 'up' : newPrice < prevPrice ? 'down' : 'flat';
      q.updatedAt = now;
      q.volume = inst.kind === 'stock' ? q.volume + Math.round(st.rng() * 8000) : 0;
    }
    this.emit();
  }

  private emit() {
    const quotes = new Map<Symbol, Quote>();
    for (const [symbol, st] of this.state) quotes.set(symbol, { ...st.quote });
    for (const l of this.listeners) l(quotes);
  }

  start(intervalMs = 1200) {
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), intervalMs);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  subscribe(fn: (quotes: Map<Symbol, Quote>) => void): () => void {
    this.listeners.add(fn);
    fn(this.getAllQuotes());
    return () => this.listeners.delete(fn);
  }

  getQuote(symbol: Symbol): Quote | undefined {
    return this.state.get(symbol)?.quote ? { ...this.state.get(symbol)!.quote } : undefined;
  }

  getAllQuotes(): Map<Symbol, Quote> {
    const m = new Map<Symbol, Quote>();
    for (const [s, st] of this.state) m.set(s, { ...st.quote });
    return m;
  }

  getCandles(symbol: Symbol, count = 60): Candle[] {
    const st = this.state.get(symbol);
    if (!st) return [];
    return [...st.candles.slice(-count), st.currentCandle];
  }

  getSeries(symbol: Symbol, count = 80): Candle[] {
    return this.getCandles(symbol, count);
  }

  /** Aggregate base candles into the requested timeframe. */
  getCandlesForTimeframe(symbol: Symbol, tf: Timeframe, count = 100): Candle[] {
    const st = this.state.get(symbol);
    if (!st) return [];

    const all = [...st.candles, st.currentCandle];
    if (tf === '1m') return all.slice(-count);

    const tfMs = TF_MS[tf];
    const aggregated: Candle[] = [];
    let bucket: Candle | null = null;
    let bucketStart = 0;

    for (const c of all) {
      const cBucket = Math.floor(c.time / tfMs) * tfMs;
      if (!bucket || cBucket !== bucketStart) {
        if (bucket) aggregated.push(bucket);
        bucketStart = cBucket;
        bucket = { ...c, time: cBucket };
      } else {
        bucket.high = Math.max(bucket.high, c.high);
        bucket.low = Math.min(bucket.low, c.low);
        bucket.close = c.close;
        bucket.volume += c.volume;
      }
    }
    if (bucket) aggregated.push(bucket);
    return aggregated.slice(-count);
  }

  /** Index value derived from constituent stocks' average movement. */
  getIndexValue(symbol: Symbol): number | undefined {
    const constituents = INDEX_CONSTITUENTS[symbol];
    if (!constituents) return undefined;
    let sum = 0;
    let n = 0;
    for (const s of constituents) {
      const q = this.getQuote(s);
      if (q) { sum += q.price; n++; }
    }
    if (n === 0) return undefined;
    const avg = sum / n;
    // Scale to index base price
    const inst = getInstrument(symbol)!;
    const ratio = avg / (constituents.reduce((acc, s) => {
      const ci = getInstrument(s);
      return acc + (ci ? ci.basePrice : 0);
    }, 0) / constituents.length);
    return round2(inst.basePrice * ratio);
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export const priceEngine = new PriceEngine();
