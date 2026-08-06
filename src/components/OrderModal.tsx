import { useEffect, useState } from 'react';
import { X, Info } from 'lucide-react';
import type { OrderSide, OrderType, ProductType, Symbol } from '@/types';
import { getInstrument } from '@/data/instruments';
import { useQuote } from '@/hooks/useQuotes';
import { useAccount, type OrderRequest } from '@/context/AccountContext';
import { useLang } from '@/context/LangContext';
import { useToast } from '@/components/Toast';
import { tr } from '@/i18n/translations';
import { formatINR, formatNum } from '@/utils/format';
import { Disclaimer } from '@/components/Disclaimer';

interface Props {
  symbol: Symbol;
  side: OrderSide;
  onClose: () => void;
}

export function OrderModal({ symbol, side, onClose }: Props) {
  const { lang, t } = useLang();
  const { account, placeOrder } = useAccount();
  const toast = useToast();
  const quote = useQuote(symbol);
  const inst = getInstrument(symbol);

  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [product, setProduct] = useState<ProductType>('CNC');
  const [qty, setQty] = useState(1);
  const [limitPrice, setLimitPrice] = useState(quote?.price ?? 0);

  useEffect(() => {
    if (quote) setLimitPrice(prev => prev === 0 ? quote.price : prev);
  }, [quote]);

  if (!inst || !quote) return null;

  const isBuy = side === 'BUY';
  const execPrice = orderType === 'MARKET' ? quote.price : limitPrice;
  const cost = execPrice * qty;
  const canBuy = cost <= account.cashBalance;

  const holding = [...account.holdings, ...account.positions].find(h => h.symbol === symbol);
  const maxSell = holding?.quantity ?? 0;

  const disabled = isBuy ? (orderType === 'MARKET' && !canBuy) : qty > maxSell;

  function submit() {
    const req: OrderRequest = { symbol, side, type: orderType, product, quantity: qty, price: orderType === 'LIMIT' ? limitPrice : undefined };
    const res = placeOrder(req);
    if (!res.ok) {
      const msg = res.error === 'insufficient_funds' ? t('insufficient_funds') : res.error === 'insufficient_shares' ? t('insufficient_shares') : t('order_rejected');
      toast.push('error', msg);
      return;
    }
    if (res.order?.status === 'PENDING') {
      toast.push('info', t('limit_pending'), 'buy_limit');
    } else {
      const verb = isBuy ? t('buy') : t('sell');
      toast.push('success', `${t('order_placed')}: ${verb} ${qty} ${symbol} @ ${formatINR(execPrice)}`, res.tipKey);
    }
    onClose();
  }

  const accent = isBuy ? 'var(--color-up)' : 'var(--color-down)';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="scale-in w-full max-w-md rounded-t-2xl border border-[var(--color-border)] bg-[var(--color-surface)] sm:rounded-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3" style={{ borderTopColor: accent, borderTopWidth: 3 }}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{symbol}</span>
              <span className={`rounded px-2 py-0.5 text-xs font-bold text-white`} style={{ background: accent }}>
                {isBuy ? t('buy') : t('sell')}
              </span>
              <span className="text-[10px] font-semibold text-[var(--color-demo)]">● {t('simulated')}</span>
            </div>
            <div className={`text-xs text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>
              {lang === 'hi' ? inst.nameHi : inst.name} · LTP {formatINR(quote.price)}
            </div>
          </div>
          <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"><X size={18} /></button>
        </div>

        <div className="space-y-4 p-4">
          {/* product type */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-dim)]">{t('product_type')}</label>
            <div className="grid grid-cols-2 gap-2">
              {(['CNC', 'MIS'] as ProductType[]).map(p => (
                <button
                  key={p}
                  onClick={() => setProduct(p)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    product === p
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                      : 'border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <div className={lang === 'hi' ? 'deva' : ''}>{p === 'CNC' ? t('cnc') : t('mis')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* order type */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-dim)]">{t('order_type')}</label>
            <div className="grid grid-cols-2 gap-2">
              {(['MARKET', 'LIMIT'] as OrderType[]).map(o => (
                <button
                  key={o}
                  onClick={() => setOrderType(o)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    orderType === o
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                      : 'border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <div className={lang === 'hi' ? 'deva' : ''}>{o === 'MARKET' ? t('market_order') : t('limit_order')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* quantity */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-dim)]">{t('quantity')}</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 rounded-lg border border-[var(--color-border)] text-lg font-bold text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)]">−</button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="h-9 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 text-center text-sm font-semibold"
              />
              <button onClick={() => setQty(qty + 1)} className="h-9 w-9 rounded-lg border border-[var(--color-border)] text-lg font-bold text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)]">+</button>
            </div>
            <div className="mt-1.5 flex gap-1.5">
              {[10, 25, 50, 100].map(n => (
                <button key={n} onClick={() => setQty(n)} className="rounded border border-[var(--color-border)] px-2 py-0.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)]">{n}</button>
              ))}
            </div>
          </div>

          {/* price (limit only) */}
          {orderType === 'LIMIT' && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-dim)]">{t('price')}</label>
              <input
                type="number"
                step="0.05"
                value={limitPrice}
                onChange={e => setLimitPrice(parseFloat(e.target.value) || 0)}
                className="h-9 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 text-sm font-semibold"
              />
            </div>
          )}

          {/* summary */}
          <div className="rounded-lg bg-[var(--color-surface-2)] p-3 text-sm">
            <div className="flex justify-between py-0.5">
              <span className="text-[var(--color-text-muted)]">{t('price')}</span>
              <span className="font-medium">{formatINR(execPrice)} {orderType === 'MARKET' && <span className="text-[10px] text-[var(--color-text-muted)]">(LTP)</span>}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-[var(--color-text-muted)]">{t('quantity')}</span>
              <span className="font-medium">{qty}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--color-border)] pt-1.5 mt-1.5">
              <span className="text-[var(--color-text-dim)]">{isBuy ? t('estimated_cost') : t('current_value')}</span>
              <span className="font-bold">{formatINR(cost)}</span>
            </div>
          </div>

          {/* validation hint */}
          {isBuy && orderType === 'MARKET' && !canBuy && (
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-down-soft)] px-3 py-2 text-xs text-[var(--color-down)]">
              <Info size={14} /> {t('insufficient_funds')} ({formatINR(account.cashBalance)})
            </div>
          )}
          {!isBuy && qty > maxSell && (
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-down-soft)] px-3 py-2 text-xs text-[var(--color-down)]">
              <Info size={14} /> {t('insufficient_shares')} ({maxSell})
            </div>
          )}
          {!isBuy && maxSell > 0 && (
            <div className="text-[11px] text-[var(--color-text-muted)]">You hold {maxSell} shares of {symbol}.</div>
          )}

          {/* balance */}
          <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
            <span>{t('available_balance')}</span>
            <span className="font-medium text-[var(--color-text)]">{formatINR(account.cashBalance)}</span>
          </div>

          <button
            onClick={submit}
            disabled={disabled}
            className="h-11 w-full rounded-lg font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: accent }}
          >
            {isBuy ? t('buy') : t('sell')} {qty} {symbol} · {formatINR(cost)}
          </button>
        </div>

        <div className="px-4 pb-3">
          <Disclaimer compact />
        </div>
      </div>
    </div>
  );
}

// silence unused import warning in some build setups
void formatNum;
