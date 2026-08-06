// Core domain types for ShareMarket Guru

export type Symbol = string;

export type InstrumentKind = 'stock' | 'index';

export interface Instrument {
  symbol: Symbol;
  name: string;        // English name
  nameHi: string;      // Hindi name
  kind: InstrumentKind;
  sector?: string;
  sectorHi?: string;
  basePrice: number;
  volatility: number;  // relative per-tick volatility
  tickIntervalMs: number;
}

export interface Quote {
  symbol: Symbol;
  price: number;
  prevClose: number;       // previous simulated "day" close
  open: number;
  dayHigh: number;
  dayLow: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  change: number;          // price - prevClose
  changePercent: number;
  lastTickDir: 'up' | 'down' | 'flat';
  updatedAt: number;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type ProductType = 'CNC' | 'MIS';   // CNC = delivery, MIS = intraday

export type OrderStatus = 'EXECUTED' | 'PENDING' | 'CANCELLED' | 'REJECTED';

export interface Order {
  id: string;
  symbol: Symbol;
  side: OrderSide;
  type: OrderType;
  product: ProductType;
  quantity: number;
  price: number;           // limit price or executed price
  status: OrderStatus;
  createdAt: number;
  executedAt?: number;
  note?: string;           // educational tip key
}

export interface Holding {
  symbol: Symbol;
  quantity: number;
  avgPrice: number;
  product: ProductType;
}

export interface Position extends Holding {
  // intraday positions — same shape, separated for clarity
}

export interface Account {
  cashBalance: number;
  startingBalance: number;
  holdings: Holding[];
  positions: Position[];
  orders: Order[];
  watchlist: Symbol[];
  createdAt: number;
}

export interface LearningProgress {
  completedModules: string[];
  quizScores: Record<string, { score: number; total: number; takenAt: number }>;
}

export interface AppProgress {
  learning: LearningProgress;
  language: Lang;
}

export type Lang = 'en' | 'hi';
