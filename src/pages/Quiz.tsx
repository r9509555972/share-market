import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CircleCheck as CheckCircle2, Circle as XCircle, Trophy, RotateCcw } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useProgress } from '@/hooks/useProgress';
import { MODULES } from '@/data/content';
import { Disclaimer } from '@/components/Disclaimer';

export default function Quiz() {
  const { id = '' } = useParams();
  const { lang, t } = useLang();
  const { completeModule, recordQuiz } = useProgress();
  const mod = MODULES.find(m => m.id === id);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  if (!mod) {
    return <div className="mx-auto max-w-2xl py-12 text-center text-[var(--color-text-muted)]">Not found. <Link to="/learn" className="text-[var(--color-accent)]">Back</Link></div>;
  }
  const M = mod; // non-null captured for closures

  const q = M.quiz[current];
  const total = M.quiz.length;

  function pick(i: number) {
    if (revealed) return;
    setSelected(i);
  }

  function reveal() {
    if (selected === null) return;
    setRevealed(true);
    setAnswers(prev => [...prev, selected]);
  }

  function next() {
    if (current + 1 >= total) {
      const score = [...answers, selected!].filter((a, i) => a === M.quiz[i].answer).length;
      recordQuiz(M.id, score, total);
      completeModule(M.id);
      setDone(true);
      return;
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setRevealed(false);
  }

  function reset() {
    setCurrent(0); setSelected(null); setRevealed(false); setAnswers([]); setDone(false);
  }

  if (done) {
    const score = answers.filter((a, i) => a === M.quiz[i].answer).length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <Trophy size={48} className="mx-auto text-[var(--color-warning)]" />
          <h1 className={`mt-3 text-xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('quiz_score')}</h1>
          <div className="my-3 text-4xl font-bold" style={{ color: pct >= 60 ? 'var(--color-up)' : 'var(--color-down)' }}>{score}/{total}</div>
          <div className="text-sm text-[var(--color-text-muted)]">{pct}%</div>
        </div>

        {/* Review */}
        <div className="space-y-2">
          {M.quiz.map((qq, i) => {
            const userAns = answers[i];
            const correct = userAns === qq.answer;
            return (
              <div key={i} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                <div className={`flex items-start gap-2 text-sm ${lang === 'hi' ? 'deva' : ''}`}>
                  {correct ? <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-up)]" /> : <XCircle size={16} className="mt-0.5 shrink-0 text-[var(--color-down)]" />}
                  <span>{lang === 'hi' ? qq.q.hi : qq.q.en}</span>
                </div>
                <div className={`mt-1.5 pl-6 text-xs text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>
                  {lang === 'hi' ? qq.explanation.hi : qq.explanation.en}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-bold text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)]">
            <RotateCcw size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('quiz_retake')}</span>
          </button>
          <Link to="/learn" className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-white hover:brightness-110">
            <ArrowLeft size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('quiz_back')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link to={`/learn/${M.id}`} className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
        <ArrowLeft size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{lang === 'hi' ? M.title.hi : M.title.en}</span>
      </Link>

      {/* progress */}
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-3)]">
          <div className="h-full bg-[var(--color-accent)] transition-all" style={{ width: `${((current + (revealed ? 1 : 0)) / total) * 100}%` }} />
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">{current + 1}/{total}</span>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h1 className={`text-lg font-bold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? q.q.hi : q.q.en}</h1>
        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            const isCorrect = i === q.answer;
            let cls = 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]';
            if (revealed) {
              if (isCorrect) cls = 'border-[var(--color-up)] bg-[var(--color-up-soft)]';
              else if (isSel) cls = 'border-[var(--color-down)] bg-[var(--color-down-soft)]';
              else cls = 'border-[var(--color-border)] opacity-50';
            } else if (isSel) {
              cls = 'border-[var(--color-accent)] bg-[var(--color-accent-soft)]';
            }
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={revealed}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${cls}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                <span className={lang === 'hi' ? 'deva' : ''}>{lang === 'hi' ? opt.hi : opt.en}</span>
                {revealed && isCorrect && <CheckCircle2 size={16} className="ml-auto text-[var(--color-up)]" />}
                {revealed && isSel && !isCorrect && <XCircle size={16} className="ml-auto text-[var(--color-down)]" />}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-4 rounded-lg bg-[var(--color-surface-2)] p-3 fade-in-up">
            <div className={`flex items-center gap-2 text-sm font-bold ${selected === q.answer ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>
              {selected === q.answer ? <><CheckCircle2 size={16} /> {t('correct')}</> : <><XCircle size={16} /> {t('incorrect')}</>}
            </div>
            <div className={`mt-1.5 text-xs leading-relaxed text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>
              <span className="font-semibold text-[var(--color-text-muted)]">{t('explanation')}: </span>
              {lang === 'hi' ? q.explanation.hi : q.explanation.en}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        {!revealed ? (
          <button onClick={reveal} disabled={selected === null} className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40">
            {t('submit_quiz')}
          </button>
        ) : (
          <button onClick={next} className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
            {current + 1 >= total ? t('submit_quiz') : t('next_q')}
          </button>
        )}
      </div>

      <Disclaimer />
    </div>
  );
}
