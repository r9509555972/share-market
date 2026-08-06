import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { GLOSSARY } from '@/data/content';
import { Disclaimer } from '@/components/Disclaimer';

export default function Glossary() {
  const { lang, t } = useLang();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(g => g.term.toLowerCase().includes(q) || g.termHi.includes(q) || g.def.en.toLowerCase().includes(q) || g.def.hi.includes(q));
  }, [query]);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('glossary_title')}</h1>
        <p className={`text-sm text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{t('glossary_sub')}</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={lang === 'hi' ? 'शब्द खोजें…' : 'Search terms…'}
          className={`h-10 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-3 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none ${lang === 'hi' ? 'deva' : ''}`}
        />
      </div>

      <div className="space-y-2">
        {filtered.map(g => (
          <div key={g.term} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold">{g.term}</span>
              <span className={`text-sm font-medium text-[var(--color-accent)] ${lang === 'hi' ? 'deva' : ''}`}>{g.termHi}</span>
            </div>
            <p className={`mt-1.5 text-sm leading-relaxed text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>
              {lang === 'hi' ? g.def.hi : g.def.en}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-[var(--color-border)] py-10 text-center text-sm text-[var(--color-text-muted)]">
            {lang === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No results found.'}
          </div>
        )}
      </div>

      <Disclaimer />
    </div>
  );
}
