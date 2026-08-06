// Core domain types for ShareMarket Guru

export type Symbol = string;

export type InstrumentKind = 'stock' | 'index';
export type MarketCap = 'large' | 'mid' | 'small';
export type Sector = string;

export interface Instrument {
  symbol: Symbol;
  name: string;
  nameHi: string;
  kind: InstrumentKind;
  sector?: Sector;
  sectorHi?: string;
  cap?: MarketCap;
  basePrice: number;
  volatility: number;
  tickIntervalMs: number;
  fno?: boolean;
}

export interface Quote {
  symbol: Symbol;
  price: number;
  prevClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  yearHigh: number;
  yearLow: number;
  volume: number;
  change: number;
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
export type ProductType = 'CNC' | 'MIS';

export type OrderStatus = 'EXECUTED' | 'PENDING' | 'CANCELLED' | 'REJECTED';

export interface Order {
  id: string;
  symbol: Symbol;
  side: OrderSide;
  type: OrderType;
  product: ProductType;
  quantity: number;
  price: number;
  status: OrderStatus;
  createdAt: number;
  executedAt?: number;
  note?: string;
}

export interface Holding {
  symbol: Symbol;
  quantity: number;
  avgPrice: number;
  product: ProductType;
}

export interface Position extends Holding {}

// Options types
export type OptionType = 'CE' | 'PE';
export type OptionSide = 'BUY' | 'SELL';

export interface OptionContract {
  symbol: Symbol;
  strike: number;
  type: OptionType;
  lotSize: number;
  expiry: number;
  premium: number;
  prevPremium: number;
  oi: number;
  volume: number;
  iv: number;
  change: number;
  updatedAt: number;
}

export interface OptionPosition {
  id: string;
  symbol: Symbol;
  strike: number;
  type: OptionType;
  side: OptionSide;
  lots: number;
  lotSize: number;
  entryPremium: number;
  currentPremium: number;
  expiry: number;
  createdAt: number;
  squaredOff?: boolean;
  pnl?: number;
}

export interface Account {
  cashBalance: number;
  startingBalance: number;
  holdings: Holding[];
  positions: Position[];
  orders: Order[];
  watchlist: Symbol[];
  optionPositions: OptionPosition[];
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
