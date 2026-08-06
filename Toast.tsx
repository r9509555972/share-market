import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { TIPS } from '@/data/content';
import { tr } from '@/i18n/translations';

type ToastKind = 'success' | 'error' | 'tip' | 'info';

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  tipKey?: string;
}

interface ToastCtx {
  push: (kind: ToastKind, message: string, tipKey?: string) => void;
}

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { lang } = useLang();

  const push = useCallback((kind: ToastKind, message: string, tipKey?: string) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, kind, message, tipKey }]);
    const ttl = kind === 'tip' ? 9000 : 4000;
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), ttl);
  }, []);

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-20 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 md:bottom-4">
        {toasts.map(t => {
          const tip = t.tipKey ? TIPS[t.tipKey] : undefined;
          const Icon = t.kind === 'success' ? CheckCircle2 : t.kind === 'error' ? XCircle : Info;
          const accent = t.kind === 'success' ? 'var(--color-up)' : t.kind === 'error' ? 'var(--color-down)' : t.kind === 'tip' ? 'var(--color-warning)' : 'var(--color-accent)';
          return (
            <div
              key={t.id}
              className="scale-in rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-3)] p-3 shadow-2xl"
              style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
            >
              <div className="flex items-start gap-2">
                <Icon size={18} style={{ color: accent }} className="mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-medium ${lang === 'hi' ? 'deva' : ''}`}>{t.message}</div>
                  {tip && (
                    <div className="mt-2 border-t border-[var(--color-border)] pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-warning)]">{tr(lang, 'tip_title')}</div>
                      <div className={`text-xs font-semibold ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? tip.title.hi : tip.title.en}</div>
                      <div className={`mt-0.5 text-xs leading-relaxed text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>
                        {lang === 'hi' ? tip.body.hi : tip.body.en}
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={() => dismiss(t.id)} className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
