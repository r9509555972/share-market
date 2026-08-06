import { Link } from 'react-router-dom';
import { GraduationCap, Repeat, ChartLine as LineChart, Target, ArrowRight, CircleCheck as CheckCircle2, Trophy, BookOpen } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useProgress } from '@/hooks/useProgress';
import { MODULES } from '@/data/content';
import { Disclaimer } from '@/components/Disclaimer';

const ICONS: Record<string, any> = { GraduationCap, Repeat, LineChart, Target };

export default function Learn() {
  const { lang, t } = useLang();
  const { progress } = useProgress();

  const completed = progress.completedModules.length;
  const total = MODULES.length;
  const pct = Math.round((completed / total) * 100);

  const quizAvg = (() => {
    const scores = Object.values(progress.quizScores);
    if (scores.length === 0) return null;
    const sum = scores.reduce((a, s) => a + (s.score / s.total), 0);
    return Math.round((sum / scores.length) * 100);
  })();

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('learn_title')}</h1>
        <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('learn_sub')}</p>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between text-sm">
          <span className={lang === 'hi' ? 'deva' : ''}>{t('overall_progress')}</span>
          <span className="font-bold">{completed}/{total} · {pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-surface-3)]">
          <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-up)] transition-all" style={{ width: `${pct}%` }} />
        </div>
        {quizAvg !== null && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <Trophy size={14} className="text-[var(--color-warning)]" />
            {t('avg_quiz')}: <span className="font-semibold text-[var(--color-text)]">{quizAvg}%</span>
          </div>
        )}
      </div>

      {/* Module cards */}
      <div className="space-y-3">
        {MODULES.map((m, i) => {
          const Icon = ICONS[m.icon] ?? BookOpen;
          const done = progress.completedModules.includes(m.id);
          const quiz = progress.quizScores[m.id];
          return (
            <Link
              key={m.id}
              to={`/learn/${m.id}`}
              className="group flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:border-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Icon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)]">MODULE {i + 1}</span>
                  {done && <CheckCircle2 size={14} className="text-[var(--color-up)]" />}
                  {quiz && <span className="rounded bg-[var(--color-warning)]/15 px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-warning)]">{quiz.score}/{quiz.total}</span>}
                </div>
                <div className={`text-base font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? m.title.hi : m.title.en}</div>
                <div className={`truncate text-sm text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? m.summary.hi : m.summary.en}</div>
              </div>
              <ArrowRight size={18} className="shrink-0 text-[var(--color-text-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/glossary" className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:border-[var(--color-text-muted)]">
          <BookOpen size={20} className="text-[var(--color-accent)]" />
          <div>
            <div className={`text-sm font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('glossary_title')}</div>
            <div className={`text-xs text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('glossary_sub')}</div>
          </div>
        </Link>
        <Link to="/progress" className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:border-[var(--color-text-muted)]">
          <Trophy size={20} className="text-[var(--color-warning)]" />
          <div>
            <div className={`text-sm font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('progress_title')}</div>
            <div className={`text-xs text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? 'अपनी सीखने की प्रगति देखें' : 'View your learning progress'}</div>
          </div>
        </Link>
      </div>

      <Disclaimer />
    </div>
  );
}
