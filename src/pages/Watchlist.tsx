import { Link } from 'react-router-dom';
import { Star, Inbox } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { useQuotes } from '@/hooks/useQuotes';
import { getInstrument } from '@/data/instruments';
import { formatINR, formatPct } from '@/utils/format';
import { Disclaimer } from '@/components/Disclaimer';

export default function Watchlist() {
  const { lang, t } = useLang();
  const { account, toggleWatch } = useAccount();
  const quotes = useQuotes();

  const items = account.watchlist
    .map(s => ({ inst: getInstrument(s)!, quote: quotes.get(s) }))
    .filter(x => x.inst && x.quote);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('nav_watchlist')}</h1>
        <p className="text-sm text-[var(--color-demo)]">● {t('simulated')}</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] py-12 text-center">
          <Inbox size={28} className="text-[var(--color-text-muted)]" />
          <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('empty_watch')}</p>
          <Link to="/market" className="mt-1 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-white hover:brightness-110">
            <span className={lang === 'hi' ? 'deva' : ''}>{t('nav_market')}</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          {items.map(({ inst, quote }) => {
            if (!inst || !quote) return null;
            const up = quote.change >= 0;
            return (
              <div key={inst.symbol} className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 last:border-0 hover:bg-[var(--color-surface-2)]">
                <Link to={`/stock/${inst.symbol}`} className="min-w-0 flex-1">
                  <div className="font-bold">{inst.symbol}</div>
                  <div className={`truncate text-xs text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst.nameHi : inst.name}</div>
                </Link>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatINR(quote.price)}</div>
                  <div className={`text-xs ${up ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>{formatPct(quote.changePercent)}</div>
                </div>
                <button onClick={() => toggleWatch(inst.symbol)} className="ml-3 text-[var(--color-text-muted)] hover:text-[var(--color-warning)]">
                  <Star size={18} fill="currentColor" className="text-[var(--color-warning)]" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Disclaimer />
    </div>
  );
}
