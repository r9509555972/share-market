import { useEffect, useState } from 'react';
import { priceEngine } from '@/services/priceEngine';
import type { Quote, Symbol } from '@/types';

/** Subscribe to live simulated quotes; re-renders on each tick. */
export function useQuotes(): Map<Symbol, Quote> {
  const [quotes, setQuotes] = useState<Map<Symbol, Quote>>(() => priceEngine.getAllQuotes());
  useEffect(() => {
    const unsub = priceEngine.subscribe(q => setQuotes(q));
    return unsub;
  }, []);
  return quotes;
}

/** Subscribe to a single symbol's quote. */
export function useQuote(symbol: Symbol): Quote | undefined {
  const [quote, setQuote] = useState<Quote | undefined>(() => priceEngine.getQuote(symbol));
  useEffect(() => {
    setQuote(priceEngine.getQuote(symbol));
    const unsub = priceEngine.subscribe(q => setQuote(q.get(symbol)));
    return unsub;
  }, [symbol]);
  return quote;
}

/** Start the price engine ticking on mount. */
export function usePriceEngine() {
  useEffect(() => {
    priceEngine.start(1200);
    return () => priceEngine.stop();
  }, []);
}
