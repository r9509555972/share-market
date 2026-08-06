import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Account, Holding, OptionPosition, Order, OrderSide, OrderType, ProductType, Symbol } from '@/types';
import { priceEngine } from '@/services/priceEngine';

const STARTING_BALANCE = 10000000; // ₹1 Crore
const ACCOUNT_KEY = 'smg.account.v1';
const LANG_KEY = 'smg.lang.v1';
const PROGRESS_KEY = 'smg.progress.v1';

function loadAccount(): Account {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Account>;
      // Migrate old accounts: reset to ₹1 Crore and add optionPositions
      return {
        cashBalance: STARTING_BALANCE,
        startingBalance: STARTING_BALANCE,
        holdings: parsed.holdings ?? [],
        positions: parsed.positions ?? [],
        orders: parsed.orders ?? [],
        watchlist: parsed.watchlist ?? [],
        optionPositions: parsed.optionPositions ?? [],
        createdAt: parsed.createdAt ?? Date.now(),
      };
    }
  } catch {}
  return {
    cashBalance: STARTING_BALANCE,
    startingBalance: STARTING_BALANCE,
    holdings: [],
    positions: [],
    orders: [],
    watchlist: [],
    optionPositions: [],
    createdAt: Date.now(),
  };
}

function saveAccount(a: Account) {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(a));
}

export interface OrderRequest {
  symbol: Symbol;
  side: OrderSide;
  type: OrderType;
  product: ProductType;
  quantity: number;
  price?: number; // for LIMIT orders
}

export interface OrderResult {
  ok: boolean;
  order?: Order;
  error?: string;
  tipKey?: string;
}

export interface OptionOrderRequest {
  symbol: Symbol;
  strike: number;
  type: 'CE' | 'PE';
  side: 'BUY' | 'SELL';
  lots: number;
  lotSize: number;
  premium: number;
  expiry: number;
}

interface AccountContextValue {
  account: Account;
  placeOrder: (req: OrderRequest) => OrderResult;
  resetAccount: () => void;
  toggleWatch: (symbol: Symbol) => void;
  placeOptionOrder: (req: OptionOrderRequest) => OrderResult;
  squareOffOption: (id: string) => void;
  // live portfolio metrics derived from current prices
  invested: number;
  currentValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  totalTrades: number;
  optionsPnl: number;
}

const AccountContext = createContext<AccountContextValue | null>(null);

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function findHolding(list: Holding[], symbol: Symbol): Holding | undefined {
  return list.find(h => h.symbol === symbol && h.quantity > 0);
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account>(loadAccount);
  const accountRef = useRef(account);
  accountRef.current = account;

  // persist on every account change
  useEffect(() => { saveAccount(account); }, [account]);

  // process pending limit orders against live prices
  useEffect(() => {
    const unsub = priceEngine.subscribe(() => {
      const a = accountRef.current;
      const pending = a.orders.filter(o => o.status === 'PENDING');
      if (pending.length === 0) return;
      let changed = false;
      const updatedOrders = a.orders.map(o => {
        if (o.status !== 'PENDING') return o;
        const q = priceEngine.getQuote(o.symbol);
        if (!q) return o;
        const fills = o.side === 'BUY' ? q.price <= o.price : q.price >= o.price;
        if (fills) {
          changed = true;
          return executeOrder(o, q.price, a);
        }
        return o;
      });
      if (changed) {
        setAccount(prev => ({ ...accountRef.current, orders: updatedOrders }));
      }
    });
    return unsub;
  }, []);

  const placeOrder = useCallback((req: OrderRequest): OrderResult => {
    const a = accountRef.current;
    const quote = priceEngine.getQuote(req.symbol);
    if (!quote) return { ok: false, error: 'no_quote' };

    const execPrice = req.type === 'MARKET' ? quote.price : (req.price ?? quote.price);
    const cost = execPrice * req.quantity;

    // pre-validate
    if (req.side === 'BUY' && req.type === 'MARKET' && cost > a.cashBalance) {
      return { ok: false, error: 'insufficient_funds' };
    }
    if (req.side === 'SELL') {
      const list = req.product === 'MIS' ? a.positions : a.holdings;
      const h = findHolding(list, req.symbol);
      if (!h || h.quantity < req.quantity) return { ok: false, error: 'insufficient_shares' };
    }

    const order: Order = {
      id: uid(),
      symbol: req.symbol,
      side: req.side,
      type: req.type,
      product: req.product,
      quantity: req.quantity,
      price: execPrice,
      status: req.type === 'LIMIT' ? 'PENDING' : 'EXECUTED',
      createdAt: Date.now(),
      executedAt: req.type === 'LIMIT' ? undefined : Date.now(),
    };

    if (req.type === 'LIMIT') {
      setAccount(prev => ({ ...prev, orders: [order, ...prev.orders] }));
      return { ok: true, order, tipKey: 'buy_limit' };
    }

    const executed = executeOrder(order, execPrice, a);
    setAccount(prev => ({ ...prev, orders: [executed, ...prev.orders] }));
    const tipKey = pickTip(req);
    return { ok: true, order: executed, tipKey };
  }, []);

  const resetAccount = useCallback(() => {
    setAccount({
      cashBalance: STARTING_BALANCE,
      startingBalance: STARTING_BALANCE,
      holdings: [],
      positions: [],
      orders: [],
      watchlist: [],
      optionPositions: [],
      createdAt: Date.now(),
    });
  }, []);

  const toggleWatch = useCallback((symbol: Symbol) => {
    setAccount(prev => {
      const has = prev.watchlist.includes(symbol);
      return {
        ...prev,
        watchlist: has ? prev.watchlist.filter(s => s !== symbol) : [...prev.watchlist, symbol],
      };
    });
  }, []);

  const placeOptionOrder = useCallback((req: OptionOrderRequest): OrderResult => {
    const a = accountRef.current;
    const totalQty = req.lots * req.lotSize;
    const cost = req.premium * totalQty;

    if (req.side === 'BUY' && cost > a.cashBalance) {
      return { ok: false, error: 'insufficient_funds' };
    }

    const pos: OptionPosition = {
      id: uid(),
      symbol: req.symbol,
      strike: req.strike,
      type: req.type,
      side: req.side,
      lots: req.lots,
      lotSize: req.lotSize,
      entryPremium: req.premium,
      currentPremium: req.premium,
      expiry: req.expiry,
      createdAt: Date.now(),
    };

    setAccount(prev => {
      const newBalance = req.side === 'BUY'
        ? round2(prev.cashBalance - cost)
        : round2(prev.cashBalance + cost);
      return {
        ...prev,
        cashBalance: newBalance,
        optionPositions: [...prev.optionPositions, pos],
      };
    });

    return { ok: true };
  }, []);

  const squareOffOption = useCallback((id: string) => {
    setAccount(prev => {
      const pos = prev.optionPositions.find(p => p.id === id);
      if (!pos || pos.squaredOff) return prev;
      const totalQty = pos.lots * pos.lotSize;
      const pnl = (pos.side === 'BUY' ? pos.currentPremium - pos.entryPremium : pos.entryPremium - pos.currentPremium) * totalQty;
      const updated = prev.optionPositions.map(p =>
        p.id === id ? { ...p, squaredOff: true, pnl: round2(pnl) } : p
      );
      return {
        ...prev,
        cashBalance: round2(prev.cashBalance + pnl),
        optionPositions: updated,
      };
    });
  }, []);

  // derive live metrics
  const { invested, currentValue, totalPnl, totalPnlPercent, totalTrades, optionsPnl } = useMemo(() => {
    const all = [...account.holdings, ...account.positions].filter(h => h.quantity > 0);
    let inv = 0, cur = 0;
    for (const h of all) {
      const q = priceEngine.getQuote(h.symbol);
      const cp = q?.price ?? h.avgPrice;
      inv += h.avgPrice * h.quantity;
      cur += cp * h.quantity;
    }
    const pnl = cur - inv;
    // options P&L from open positions
    let optPnl = 0;
    for (const p of account.optionPositions) {
      if (p.squaredOff) { optPnl += p.pnl ?? 0; continue; }
      const totalQty = p.lots * p.lotSize;
      optPnl += (p.side === 'BUY' ? p.currentPremium - p.entryPremium : p.entryPremium - p.currentPremium) * totalQty;
    }
    return {
      invested: inv,
      currentValue: cur,
      totalPnl: pnl,
      totalPnlPercent: inv > 0 ? (pnl / inv) * 100 : 0,
      totalTrades: account.orders.filter(o => o.status === 'EXECUTED').length,
      optionsPnl: round2(optPnl),
    };
  }, [account.holdings, account.positions, account.orders, account.optionPositions]);

  const value: AccountContextValue = {
    account,
    placeOrder,
    resetAccount,
    toggleWatch,
    placeOptionOrder,
    squareOffOption,
    invested,
    currentValue,
    totalPnl,
    totalPnlPercent,
    totalTrades,
    optionsPnl,
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

// mutate a copy of account to apply an executed order, return the executed order
function executeOrder(order: Order, execPrice: number, acct: Account): Order {
  const executed: Order = { ...order, status: 'EXECUTED', price: execPrice, executedAt: Date.now() };
  const isBuy = order.side === 'BUY';
  const list = order.product === 'MIS' ? acct.positions : acct.holdings;
  const otherList = order.product === 'MIS' ? acct.holdings : acct.positions;

  if (isBuy) {
    const cost = execPrice * order.quantity;
    acct.cashBalance = round2(acct.cashBalance - cost);
    const existing = list.find(h => h.symbol === order.symbol);
    if (existing) {
      const totalQty = existing.quantity + order.quantity;
      existing.avgPrice = round2((existing.avgPrice * existing.quantity + execPrice * order.quantity) / totalQty);
      existing.quantity = totalQty;
    } else {
      list.push({ symbol: order.symbol, quantity: order.quantity, avgPrice: execPrice, product: order.product });
    }
  } else {
    const proceeds = execPrice * order.quantity;
    acct.cashBalance = round2(acct.cashBalance + proceeds);
    const existing = list.find(h => h.symbol === order.symbol);
    if (existing) {
      existing.quantity -= order.quantity;
      if (existing.quantity <= 0) {
        const idx = list.indexOf(existing);
        if (idx >= 0) list.splice(idx, 1);
      }
    }
    // ignore otherList for sells (we don't cross products)
    void otherList;
  }
  return executed;
}

function pickTip(req: OrderRequest): string | undefined {
  if (req.side === 'BUY' && req.type === 'MARKET' && Math.random() < 0.45) return 'buy_without_check';
  if (req.side === 'BUY' && req.type === 'MARKET') return 'buy_market';
  if (req.side === 'SELL') return 'sell_market';
  if (req.product === 'MIS') return 'mis_intraday';
  if (req.product === 'CNC') return 'cnc_delivery';
  return undefined;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');
  return ctx;
}

// Language persistence helpers
export function loadLang(): 'en' | 'hi' {
  try {
    const v = localStorage.getItem(LANG_KEY);
    if (v === 'en' || v === 'hi') return v;
  } catch {}
  return 'en';
}
export function saveLang(lang: 'en' | 'hi') {
  localStorage.setItem(LANG_KEY, lang);
}

// Progress persistence
export function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedModules: [], quizScores: {} };
}
export function saveProgress(p: any) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}
