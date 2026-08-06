import { Link } from 'react-router-dom';
import {
  Zap, Clock, TrendingUp, Activity, Anchor, ArrowRight, BookOpen,
  LineChart as LineChartIcon, Star, GraduationCap, Wallet, ShieldCheck, Trophy,
} from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { Disclaimer, DemoBadge } from '@/components/Disclaimer';
import { formatINR } from '@/utils/format';
import { INSTRUMENTS } from '@/data/instruments';
import { useQuotes } from '@/hooks/useQuotes';
import { Link as LinkIcon } from 'lucide-react';

const TRADING_TYPES = [
  { icon: Zap, key: 'scalping', color: 'var(--color-down)' },
  { icon: Clock, key: 'intraday', color: 'var(--color-accent)' },
  { icon: TrendingUp, key: 'swing', color: 'var(--color-up)' },
  { icon: Activity, key: 'momentum', color: 'var(--color-warning)' },
  { icon: Anchor, key: 'position', color: '#8b5cf6' },
];

const FEATURES = [
  { icon: GraduationCap, en: 'Structured lessons in Hindi & English', hi: 'हिंदी और अंग्रेजी में संरचित पाठ' },
  { icon: Wallet, en: 'Virtual ₹1,00,000 demo account', hi: 'आभासी ₹1,00,000 डेमो खाता' },
  { icon: LineChartIcon, en: 'Simulated Indian stocks & live-looking prices', hi: 'सिम्युलेटेड भारतीय स्टॉक और लाइव जैसे मूल्य' },
  { icon: ShieldCheck, en: 'Quizzes with instant feedback', hi: 'तुरंत फीडबैक वाले क्विज़' },
  { icon: BookOpen, en: 'Searchable bilingual glossary', hi: 'खोज योग्य द्विभाषी शब्दावली' },
  { icon: Trophy, en: 'Progress & performance tracking', hi: 'प्रगति और प्रदर्शन ट्रैकिंग' },
];

export default function Home() {
  const { lang, t } = useLang();
  const { account, currentValue, totalTrades } = useAccount();
  const quotes = useQuotes();
  const topMovers = [...INSTRUMENTS.filter(i => i.kind === 'stock')]
    .sort((a, b) => Math.abs(quotes.get(b.symbol)?.changePercent ?? 0) - Math.abs(quotes.get(a.symbol)?.changePercent ?? 0))
    .slice(0, 4);

  const totalEquity = account.cashBalance + currentValue;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-surface-2)] p-6 md:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-[var(--color-up)]/10 blur-3xl" />
        <div className="relative">
          <DemoBadge />
          <h1 className={`mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-4xl ${lang === 'hi' ? 'deva' : ''}`}>
            {t('hero_title')}
          </h1>
          <p className={`mt-3 max-w-2xl text-base text-[var(--color-text-dim)] md:text-lg ${lang === 'hi' ? 'deva' : ''}`}>
            {t('hero_sub')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/learn" className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-white transition hover:brightness-110">
              <BookOpen size={18} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('cta_learn')}</span>
            </Link>
            <Link to="/market" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-up)]/40 bg-[var(--color-up-soft)] px-5 py-3 text-sm font-bold text-[var(--color-up)] transition hover:brightness-125">
              <Wallet size={18} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('cta_trade')}</span>
            </Link>
          </div>

          {/* mini account summary */}
          <div className="mt-7 grid grid-cols-3 gap-3 max-w-md">
            <Stat label={t('available_balance')} value={formatINR(account.cashBalance)} />
            <Stat label={t('current_value')} value={formatINR(currentValue)} />
            <Stat label={t('total_trades')} value={String(totalTrades)} />
          </div>
          <div className="mt-3 text-xs text-[var(--color-text-muted)]">
            {lang === 'hi' ? 'कुल इक्विटी' : 'Total Equity'}: <span className="font-semibold text-[var(--color-text)]">{formatINR(totalEquity)}</span>
            <span className="ml-2 text-[var(--color-demo)]">● {t('simulated')}</span>
          </div>
        </div>
      </section>

      <Disclaimer />

      {/* Trading types */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className={`text-xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('trading_types_title')}</h2>
            <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('trading_types_sub')}</p>
          </div>
          <Link to="/learn/m2" className="hidden items-center gap-1 text-xs text-[var(--color-accent)] hover:underline sm:flex">
            <span className={lang === 'hi' ? 'deva' : ''}>{t('view_all')}</span> <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TRADING_TYPES.map(({ icon: Icon, key, color }) => (
            <div key={key} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${color}22`, color }}>
                <Icon size={20} />
              </div>
              <div className={`text-sm font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t(`tt_${key}`)}</div>
              <div className={`mt-1 text-xs leading-relaxed text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{t(`tt_${key}_d`)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top movers preview */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className={`text-xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? 'आज के टॉप मूवर्स' : "Today's Top Movers"}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">● {t('simulated')}</p>
          </div>
          <Link to="/market" className="flex items-center gap-1 text-xs text-[var(--color-accent)] hover:underline">
            <span className={lang === 'hi' ? 'deva' : ''}>{t('view_all')}</span> <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {topMovers.map(inst => {
            const q = quotes.get(inst.symbol);
            if (!q) return null;
            const up = q.change >= 0;
            return (
              <Link key={inst.symbol} to={`/stock/${inst.symbol}`} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 transition hover:border-[var(--color-text-muted)]">
                <div>
                  <div className="text-sm font-bold">{inst.symbol}</div>
                  <div className={`text-[11px] text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? inst.nameHi : inst.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatINR(q.price)}</div>
                  <div className={`text-xs font-medium ${up ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>
                    {up ? '+' : ''}{q.change.toFixed(2)} ({q.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features grid */}
      <section>
        <h2 className={`mb-4 text-xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('features_title')}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, en, hi }) => (
            <div key={en} className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Icon size={18} />
              </div>
              <div className={`text-sm text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? hi : en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-[var(--color-surface-2)] to-[var(--color-surface)] p-6 sm:flex-row">
        <div>
          <h3 className={`text-lg font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? 'अभी सीखना शुरू करें' : 'Start learning now'}</h3>
          <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? 'चार मॉड्यूल, क्विज़, और डेमो ट्रेडिंग — सब मुफ़्त।' : 'Four modules, quizzes, and demo trading — all free.'}</p>
        </div>
        <Link to="/learn" className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
          <BookOpen size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('cta_learn')}</span>
        </Link>
      </section>
      <div className="h-2" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[var(--color-surface-2)] p-3">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</div>
      <div className="mt-0.5 text-sm font-bold">{value}</div>
    </div>
  );
}

void LinkIcon;
