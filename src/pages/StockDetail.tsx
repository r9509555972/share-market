import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { useQuote, useQuotes } from '@/hooks/useQuotes';
import { getInstrument } from '@/data/instruments';
import { priceEngine } from '@/services/priceEngine';
import { PriceChart } from '@/components/PriceChart';
import { OrderModal } from '@/components/OrderModal';
import { Disclaimer } from '@/components/Disclaimer';
import { formatINR, formatPct, formatVolume } from '@/utils/format';
import type { OrderSide } from '@/types';

export default function StockDetail() {
  const { symbol = '' } = useParams();
  const { lang, t } = useLang();
  const quote = useQuote(symbol);
  const { account, toggleWatch } = useAccount();
  const [modal, setModal] = useState<OrderSide | null>(null);
  const [candleCount, setCandleCount] = useState(60);

  const inst = getInstrument(symbol);
  const candles = useMemo(() => priceEngine.getCandles(symbol, candleCount), [symbol, candleCount, quote?.price]);
  const holding = [...account.holdings, ...account.positions].find(h => h.symbol === symbol);

  if (!inst || !quote) {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center text-[var(--color-text-muted)]">
        {t('loading')}
        <div className="mt-4"><Link to="/market" className="text-[var(--color-accent)] hover:underline">{t('back')}</Link></div>
      </div>
    );
  }

  const up = quote.change >= 0;
  const watched = account.watchlist.includes(symbol);
  const isIndex = inst.kind === 'index';

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link to="/market" className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        <ArrowLeft size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('back')}</span>
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{inst.symbol}</h1>
            <span className="rounded bg-[var(--color-demo)]/15 px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-demo)]">● {t('simulated')}</span>
            {!isIndex && (
              <button onClick={() => toggleWatch(symbol)} className={`ml-1 flex h-7 w-7 items-center justify-center rounded ${watched ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}>
                <Star size={16} fill={watched ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
          <div className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst.nameHi : inst.name}</div>
          {inst.sector && <div className={`mt-0.5 inline-block rounded bg-[var(--color-surface-2)] px-2 py-0.5 text-[10px] text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst.sectorHi : inst.sector}</div>}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{formatINR(quote.price)}</div>
          <div className={`flex items-center justify-end gap-1 text-sm font-medium ${up ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>
            {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {up ? '+' : ''}{quote.change.toFixed(2)} ({formatPct(quote.changePercent)})
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className={`text-sm font-semibold ${lang === 'hi' ? 'deva' : ''}`}>{t('chart_title')}</h2>
          <div className="flex gap-1">
            {[30, 60, 90].map(n => (
              <button
                key={n}
                onClick={() => setCandleCount(n)}
                className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${
                  candleCount === n ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                {n}D
              </button>
            ))}
          </div>
        </div>
        <PriceChart candles={candles} height={320} showVolume={!isIndex} currentPrice={quote.price} />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBox label={t('col_dayhigh')} value={formatINR(quote.dayHigh)} color="var(--color-up)" />
        <StatBox label={t('col_daylow')} value={formatINR(quote.dayLow)} color="var(--color-down)" />
        <StatBox label={t('col_52high')} value={formatINR(quote.yearHigh)} />
        <StatBox label={t('col_52low')} value={formatINR(quote.yearLow)} />
        {!isIndex && (
          <>
            <StatBox label={lang === 'hi' ? 'पिछली बंद' : 'Prev Close'} value={formatINR(quote.prevClose)} />
            <StatBox label={lang === 'hi' ? 'ओपन' : 'Open'} value={formatINR(quote.open)} />
            <StatBox label={t('col_volume')} value={formatVolume(quote.volume)} />
            <StatBox label={lang === 'hi' ? 'आपकी होल्डिंग' : 'Your Holding'} value={holding ? `${holding.quantity} qty` : '—'} />
          </>
        )}
      </div>

      {/* Buy/Sell */}
      {!isIndex ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setModal('BUY')}
            className="h-12 rounded-lg bg-[var(--color-up)] text-base font-bold text-white transition hover:brightness-110"
          >
            {t('buy')}
          </button>
          <button
            onClick={() => setModal('SELL')}
            disabled={!holding}
            className="h-12 rounded-lg bg-[var(--color-down)] text-base font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('sell')}
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 text-center text-sm text-[var(--color-text-muted)]">
          {lang === 'hi' ? 'सूचकांक केवल ट्रैकिंग के लिए हैं — ट्रेड नहीं किए जा सकते।' : 'Indices are for tracking only — cannot be traded.'}
        </div>
      )}

      <Disclaimer />

      {modal && <OrderModal symbol={symbol} side={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</div>
      <div className="mt-0.5 text-sm font-semibold" style={color ? { color } : undefined}>{value}</div>
    </div>
  );
}
