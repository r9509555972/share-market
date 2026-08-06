import { Link } from 'react-router-dom';
import {
  GraduationCap, Trophy, TrendingUp, Wallet, CheckCircle2, ArrowRight, BookOpen,
} from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { useProgress } from '@/hooks/useProgress';
import { MODULES } from '@/data/content';
import { Disclaimer } from '@/components/Disclaimer';
import { formatINR, formatPct } from '@/utils/format';

export default function Progress() {
  const { lang, t } = useLang();
  const { progress } = useProgress();
  const { totalTrades, currentValue, totalPnl, totalPnlPercent, account } = useAccount();

  const completed = progress.completedModules.length;
  const total = MODULES.length;
  const learnPct = Math.round((completed / total) * 100);

  const quizScores = Object.values(progress.quizScores);
  const quizAvg = quizScores.length > 0
    ? Math.round((quizScores.reduce((a, s) => a + (s.score / s.total), 0) / quizScores.length) * 100)
    : null;

  const totalEquity = account.cashBalance + currentValue;
  const returnPct = account.startingBalance > 0 ? ((totalEquity - account.startingBalance) / account.startingBalance) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('progress_title')}</h1>
        <p className="text-sm text-[var(--color-demo)]">● {t('simulated')}</p>
      </div>

      {/* Big stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <BigStat
          icon={<GraduationCap size={18} />}
          label={t('modules_completed')}
          value={`${completed}/${total}`}
          sub={`${learnPct}%`}
          color="var(--color-accent)"
        />
        <BigStat
          icon={<Trophy size={18} />}
          label={t('avg_quiz')}
          value={quizAvg !== null ? `${quizAvg}%` : '—'}
          sub={`${quizScores.length} ${lang === 'hi' ? 'क्विज़' : 'quizzes'}`}
          color="var(--color-warning)"
        />
        <BigStat
          icon={<TrendingUp size={18} />}
          label={t('total_trades')}
          value={String(totalTrades)}
          sub={`${account.orders.filter(o => o.status === 'PENDING').length} ${lang === 'hi' ? 'लंबित' : 'pending'}`}
          color="var(--color-up)"
        />
        <BigStat
          icon={<Wallet size={18} />}
          label={t('portfolio_value')}
          value={formatINR(totalEquity)}
          sub={formatPct(returnPct)}
          color={returnPct >= 0 ? 'var(--color-up)' : 'var(--color-down)'}
        />
      </div>

      {/* Learning progress detail */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('overall_progress')}</h2>
          <span className="text-sm font-bold">{learnPct}%</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--color-surface-3)]">
          <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-up)] transition-all" style={{ width: `${learnPct}%` }} />
        </div>

        <div className="mt-4 space-y-2">
          {MODULES.map((m, i) => {
            const done = progress.completedModules.includes(m.id);
            const quiz = progress.quizScores[m.id];
            return (
              <Link
                key={m.id}
                to={`/learn/${m.id}`}
                className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3 transition hover:border-[var(--color-text-muted)]"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${done ? 'bg-[var(--color-up-soft)] text-[var(--color-up)]' : 'bg-[var(--color-surface-3)] text-[var(--color-text-muted)]'}`}>
                  {done ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-medium ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? m.title.hi : m.title.en}</div>
                  {quiz && (
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {t('quiz_score')}: <span className="font-semibold text-[var(--color-warning)]">{quiz.score}/{quiz.total}</span>
                    </div>
                  )}
                </div>
                <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trading performance */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className={`text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? 'डेमो ट्रेडिंग प्रदर्शन' : 'Demo Trading Performance'}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStat label={t('starting_balance')} value={formatINR(account.startingBalance)} />
          <MiniStat label={lang === 'hi' ? 'वर्तमान इक्विटी' : 'Current Equity'} value={formatINR(totalEquity)} />
          <MiniStat
            label={t('total_pnl')}
            value={`${totalPnl >= 0 ? '+' : ''}${formatINR(totalPnl)}`}
            color={totalPnl >= 0 ? 'var(--color-up)' : 'var(--color-down)'}
          />
          <MiniStat
            label={lang === 'hi' ? 'रिटर्न %' : 'Return %'}
            value={formatPct(returnPct)}
            color={returnPct >= 0 ? 'var(--color-up)' : 'var(--color-down)'}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/learn" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
          <BookOpen size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('cta_learn')}</span>
        </Link>
        <Link to="/market" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-up)]/40 bg-[var(--color-up-soft)] px-4 py-2.5 text-sm font-bold text-[var(--color-up)] transition hover:brightness-125">
          <TrendingUp size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('trade_now')}</span>
        </Link>
      </div>

      <Disclaimer />
    </div>
  );
}

function BigStat({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
        <span style={{ color }}>{icon}</span>{label}
      </div>
      <div className="mt-1.5 text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-[var(--color-text-muted)]">{sub}</div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg bg-[var(--color-surface-2)] p-3">
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{label}</div>
      <div className="mt-0.5 text-sm font-bold" style={color ? { color } : undefined}>{value}</div>
    </div>
  );
}
