import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { useQuotes } from '@/hooks/useQuotes';
import { INSTRUMENTS } from '@/data/instruments';
import { formatINR, formatVolume, formatPct } from '@/utils/format';
import { Disclaimer } from '@/components/Disclaimer';

export default function MarketWatch() {
  const { lang, t } = useLang();
  const quotes = useQuotes();
  const { account, toggleWatch } = useAccount();
  const [query, setQuery] = useState('');

  const indices = INSTRUMENTS.filter(i => i.kind === 'index');
  const stocks = INSTRUMENTS.filter(i => i.kind === 'stock');

  const filteredStocks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stocks;
    return stocks.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.nameHi.includes(q));
  }, [query, stocks]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('mw_title')}</h1>
          <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('mw_sub')} · ● {t('simulated')}</p>
        </div>
      </div>

      <Disclaimer />

      {/* Indices */}
      <section>
        <h2 className={`mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('indices')}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {indices.map(inst => {
            const q = quotes.get(inst.symbol);
            if (!q) return null;
            const up = q.change >= 0;
            return (
              <Link key={inst.symbol} to={`/stock/${inst.symbol}`} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:border-[var(--color-text-muted)]">
                <div className={`text-xs text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst.nameHi : inst.name}</div>
                <div className="mt-1 text-xl font-bold">{formatINR(q.price)}</div>
                <div className={`mt-0.5 flex items-center gap-1 text-sm font-medium ${up ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>
                  {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {up ? '+' : ''}{q.change.toFixed(2)} ({formatPct(q.changePercent)})
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('search_placeholder')}
          className={`h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-3 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none ${lang === 'hi' ? 'deva' : ''}`}
        />
      </div>

      {/* Stocks table */}
      <section>
        <h2 className={`mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('stocks')} ({filteredStocks.length})</h2>
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          {/* header */}
          <div className="hidden grid-cols-[1fr_auto_auto_auto_28px] items-center gap-3 border-b border-[var(--color-border)] px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-[var(--color-text-muted)] sm:grid">
            <span>{t('col_symbol')}</span>
            <span className="text-right">{t('col_price')}</span>
            <span className="w-24 text-right">{t('col_change')}</span>
            <span className="hidden w-20 text-right md:block">{t('col_volume')}</span>
            <span></span>
          </div>
          {filteredStocks.map(inst => {
            const q = quotes.get(inst.symbol);
            if (!q) return null;
            const up = q.change >= 0;
            const watched = account.watchlist.includes(inst.symbol);
            return (
              <div key={inst.symbol} className="group grid grid-cols-[1fr_auto] items-center gap-2 border-b border-[var(--color-border)] px-3 py-3 transition last:border-0 hover:bg-[var(--color-surface-2)] sm:grid-cols-[1fr_auto_auto_auto_28px] sm:px-4">
                <Link to={`/stock/${inst.symbol}`} className="min-w-0">
                  <div className="text-sm font-bold">{inst.symbol}</div>
                  <div className={`truncate text-[11px] text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst.nameHi : inst.name}</div>
                </Link>
                <Link to={`/stock/${inst.symbol}`} className="text-right text-sm font-semibold">
                  {formatINR(q.price)}
                </Link>
                <Link to={`/stock/${inst.symbol}`} className={`w-20 text-right text-sm font-medium sm:w-24 ${up ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>
                  <div>{up ? '+' : ''}{q.change.toFixed(2)}</div>
                  <div className="text-[11px]">{formatPct(q.changePercent)}</div>
                </Link>
                <Link to={`/stock/${inst.symbol}`} className="hidden w-20 text-right text-xs text-[var(--color-text-dim)] md:block">
                  {formatVolume(q.volume)}
                </Link>
                <button
                  onClick={() => toggleWatch(inst.symbol)}
                  className={`flex h-7 w-7 items-center justify-center rounded transition ${watched ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                  aria-label={watched ? t('remove_from_watch') : t('add_to_watch')}
                >
                  <Star size={16} fill={watched ? 'currentColor' : 'none'} />
                </button>
              </div>
            );
          })}
          {filteredStocks.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">{t('loading')}</div>
          )}
        </div>
      </section>
    </div>
  );
}
