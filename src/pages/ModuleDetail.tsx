import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CircleCheck as CheckCircle2, ArrowRight, Circle as HelpCircle } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useProgress } from '@/hooks/useProgress';
import { MODULES } from '@/data/content';
import { Disclaimer } from '@/components/Disclaimer';

export default function ModuleDetail() {
  const { id = '' } = useParams();
  const { lang, t } = useLang();
  const { progress, completeModule } = useProgress();
  const idx = MODULES.findIndex(m => m.id === id);
  const mod = MODULES[idx];
  if (!mod) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center text-[var(--color-text-muted)]">
        Module not found. <Link to="/learn" className="text-[var(--color-accent)] hover:underline">Back</Link>
      </div>
    );
  }
  const done = progress.completedModules.includes(mod.id);
  const next = MODULES[idx + 1];

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/learn" className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        <ArrowLeft size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('learn_title')}</span>
      </Link>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">{lang === 'hi' ? `मॉड्यूल ${idx + 1}` : `MODULE ${idx + 1}`}</div>
        <h1 className={`mt-1 text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? mod.title.hi : mod.title.en}</h1>
        <p className={`mt-1 text-sm text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? mod.summary.hi : mod.summary.en}</p>
      </div>

      <Disclaimer />

      {/* Sections */}
      <div className="space-y-3">
        {mod.sections.map((s, i) => (
          <div key={i} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className={`text-lg font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? s.heading.hi : s.heading.en}</h2>
            <p className={`mt-2 text-sm leading-relaxed text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? s.body.hi : s.body.en}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => completeModule(mod.id)}
          disabled={done}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition ${
            done
              ? 'cursor-default bg-[var(--color-up-soft)] text-[var(--color-up)]'
              : 'bg-[var(--color-up)] text-white hover:brightness-110'
          }`}
        >
          <CheckCircle2 size={16} />
          <span className={lang === 'hi' ? 'deva' : ''}>{done ? t('completed') : t('mark_complete')}</span>
        </button>
        <Link
          to={`/learn/${mod.id}/quiz`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
        >
          <HelpCircle size={16} />
          <span className={lang === 'hi' ? 'deva' : ''}>{t('take_quiz')}</span>
        </Link>
      </div>

      {next && (
        <Link to={`/learn/${next.id}`} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 transition hover:border-[var(--color-text-muted)]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">{lang === 'hi' ? 'अगला मॉड्यूल' : 'Next module'}</div>
            <div className={`text-sm font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? next.title.hi : next.title.en}</div>
          </div>
          <ArrowRight size={18} className="text-[var(--color-accent)]" />
        </Link>
      )}
    </div>
  );
}
