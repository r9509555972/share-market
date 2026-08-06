import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from '@/types';
import { loadLang, saveLang } from '@/context/AccountContext';
import { tr } from '@/i18n/translations';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang);

  useEffect(() => {
    saveLang(lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    document.documentElement.classList.toggle('deva', lang === 'hi');
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState(prev => (prev === 'en' ? 'hi' : 'en'));
  const t = (key: string) => tr(lang, key);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
