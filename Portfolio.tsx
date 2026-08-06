import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, History, Inbox } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { useQuotes } from '@/hooks/useQuotes';
import { getInstrument } from '@/data/instruments';
import { formatINR, formatPct, formatNum, formatTime } from '@/utils/format';
import { Disclaimer } from '@/components/Disclaimer';
import { OrderModal } from '@/components/OrderModal';
import type { Holding, OrderSide, Symbol } from '@/types';

type Tab = 'holdings' | 'positions' | 'orders';

export default function Portfolio() {
  const { lang, t } = useLang();
  const { account, invested, currentValue, totalPnl, totalPnlPercent } = useAccount();
  const quotes = useQuotes();
  const [tab, setTab] = useState<Tab>('holdings');
  const [sellSymbol, setSellSymbol] = useState<Symbol | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'holdings', label: t('tab_holdings') },
    { id: 'positions', label: t('tab_positions') },
    { id: 'orders', label: t('tab_orders') },
  ];

  const totalEquity = account.cashBalance + currentValue;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('port_title')}</h1>
        <p className="text-sm text-[var(--color-demo)]">● {t('simulated')} · {t('demo_banner')}</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label={t('available_balance')} value={formatINR(account.cashBalance)} icon={<Wallet size={16} />} />
        <SummaryCard label={t('invested')} value={formatINR(invested)} />
        <SummaryCard label={t('current_value')} value={formatINR(currentValue)} />
        <SummaryCard
          label={t('total_pnl')}
          value={`${totalPnl >= 0 ? '+' : ''}${formatINR(totalPnl)}`}
          sub={formatPct(totalPnlPercent)}
          tone={totalPnl >= 0 ? 'up' : 'down'}
          icon={totalPnl >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        />
      </div>

      {/* Total equity strip */}
      <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm">
        <span className="text-[var(--color-text-muted)]">{lang === 'hi' ? 'कुल इक्विटी' : 'Total Equity'}</span>
        <span className="font-bold">{formatINR(totalEquity)}</span>
        <span className="text-xs text-[var(--color-text-muted)]">{lang === 'hi' ? 'प्रारंभिक' : 'Started'}: {formatINR(account.startingBalance)}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--color-border)]">
        {tabs.map(tb => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`relative px-4 py-2.5 text-sm font-medium transition ${
              tab === tb.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <span className={lang === 'hi' ? 'deva' : ''}>{tb.label}</span>
            {tab === tb.id && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--color-accent)]" />}
          </button>
        ))}
      </div>

      {tab === 'holdings' && (
        <HoldingsTable holdings={account.holdings} quotes={quotes} lang={lang} t={t} onSell={setSellSymbol} empty={t('no_holdings')} />
      )}
      {tab === 'positions' && (
        <HoldingsTable holdings={account.positions} quotes={quotes} lang={lang} t={t} onSell={setSellSymbol} empty={t('no_positions')} />
      )}
      {tab === 'orders' && <OrdersTable orders={account.orders} lang={lang} t={t} empty={t('no_orders')} />}

      <Disclaimer />

      {sellSymbol && <OrderModal symbol={sellSymbol} side="SELL" onClose={() => setSellSymbol(null)} />}
    </div>
  );
}

function SummaryCard({ label, value, sub, tone, icon }: { label: string; value: string; sub?: string; tone?: 'up' | 'down'; icon?: React.ReactNode }) {
  const color = tone === 'up' ? 'var(--color-up)' : tone === 'down' ? 'var(--color-down)' : 'var(--color-text)';
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
        {icon}{label}
      </div>
      <div className="mt-1 text-lg font-bold" style={{ color }}>{value}</div>
      {sub && <div className="text-xs" style={{ color }}>{sub}</div>}
    </div>
  );
}

function HoldingsTable({ holdings, quotes, lang, t, onSell, empty }: {
  holdings: Holding[];
  quotes: Map<Symbol, any>;
  lang: 'en' | 'hi';
  t: (k: string) => string;
  onSell: (s: Symbol) => void;
  empty: string;
}) {
  const active = holdings.filter(h => h.quantity > 0);
  if (active.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] py-12 text-center">
        <Inbox size={28} className="text-[var(--color-text-muted)]" />
        <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{empty}</p>
        <Link to="/market" className="mt-1 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-white hover:brightness-110">
          <span className={lang === 'hi' ? 'deva' : ''}>{t('nav_market')}</span>
        </Link>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
            <th className="px-3 py-2">{t('col_symbol')}</th>
            <th className="px-3 py-2 text-right">{t('col_qty')}</th>
            <th className="px-3 py-2 text-right">{t('col_avg')}</th>
            <th className="px-3 py-2 text-right">{t('col_cur')}</th>
            <th className="px-3 py-2 text-right">{t('col_value')}</th>
            <th className="px-3 py-2 text-right">{t('col_pnl')}</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {active.map(h => {
            const q = quotes.get(h.symbol);
            const cur = q?.price ?? h.avgPrice;
            const value = cur * h.quantity;
            const pnl = (cur - h.avgPrice) * h.quantity;
            const pnlPct = h.avgPrice > 0 ? ((cur - h.avgPrice) / h.avgPrice) * 100 : 0;
            const inst = getInstrument(h.symbol);
            const up = pnl >= 0;
            return (
              <tr key={h.symbol + h.product} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-2)]">
                <td className="px-3 py-3">
                  <Link to={`/stock/${h.symbol}`} className="font-bold hover:text-[var(--color-accent)]">{h.symbol}</Link>
                  <div className={`text-[10px] text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst?.nameHi : inst?.name}</div>
                  <span className="mt-0.5 inline-block rounded bg-[var(--color-surface-3)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--color-text-dim)]">{h.product}</span>
                </td>
                <td className="px-3 py-3 text-right font-medium">{h.quantity}</td>
                <td className="px-3 py-3 text-right">{formatNum(h.avgPrice)}</td>
                <td className="px-3 py-3 text-right">{formatNum(cur)}</td>
                <td className="px-3 py-3 text-right font-medium">{formatINR(value)}</td>
                <td className="px-3 py-3 text-right font-medium" style={{ color: up ? 'var(--color-up)' : 'var(--color-down)' }}>
                  {up ? '+' : ''}{formatINR(pnl)}
                  <div className="text-[11px]">{formatPct(pnlPct)}</div>
                </td>
                <td className="px-3 py-3 text-right">
                  <button onClick={() => onSell(h.symbol)} className="rounded bg-[var(--color-down-soft)] px-2.5 py-1 text-xs font-bold text-[var(--color-down)] transition hover:brightness-125">
                    {t('sell')}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function OrdersTable({ orders, lang, t, empty }: { orders: any[]; lang: 'en' | 'hi'; t: (k: string) => string; empty: string }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] py-12 text-center">
        <History size={28} className="text-[var(--color-text-muted)]" />
        <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{empty}</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
            <th className="px-3 py-2">{lang === 'hi' ? 'समय' : 'Time'}</th>
            <th className="px-3 py-2">{t('col_symbol')}</th>
            <th className="px-3 py-2">{lang === 'hi' ? 'प्रकार' : 'Side'}</th>
            <th className="px-3 py-2 text-right">{t('col_qty')}</th>
            <th className="px-3 py-2 text-right">{t('price')}</th>
            <th className="px-3 py-2">{lang === 'hi' ? 'ऑर्डर' : 'Order'}</th>
            <th className="px-3 py-2">{lang === 'hi' ? 'स्थिति' : 'Status'}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-2)]">
              <td className="whitespace-nowrap px-3 py-2.5 text-xs text-[var(--color-text-muted)]">{formatTime(o.executedAt ?? o.createdAt)}</td>
              <td className="px-3 py-2.5"><Link to={`/stock/${o.symbol}`} className="font-bold hover:text-[var(--color-accent)]">{o.symbol}</Link></td>
              <td className="px-3 py-2.5">
                <span className={`font-bold ${o.side === 'BUY' ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>{o.side}</span>
              </td>
              <td className="px-3 py-2.5 text-right">{o.quantity}</td>
              <td className="px-3 py-2.5 text-right">{formatNum(o.price)}</td>
              <td className="px-3 py-2.5 text-xs text-[var(--color-text-dim)]">{o.type} · {o.product}</td>
              <td className="px-3 py-2.5">
                <StatusBadge status={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    EXECUTED: 'var(--color-up)',
    PENDING: 'var(--color-warning)',
    CANCELLED: 'var(--color-text-muted)',
    REJECTED: 'var(--color-down)',
  };
  return (
    <span className="rounded px-2 py-0.5 text-[10px] font-bold" style={{ background: `${map[status] ?? 'var(--color-text-muted)'}22`, color: map[status] ?? 'var(--color-text-muted)' }}>
      {status}
    </span>
  );
}
