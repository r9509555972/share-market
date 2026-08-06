import { useLang } from '@/context/LangContext';

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  if (compact) {
    return (
      <div className="text-[10px] leading-tight text-[var(--color-text-muted)] px-3 py-1.5 border-t border-[var(--color-border)]">
        {t('disclaimer')}
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-4 py-2.5 text-xs leading-relaxed text-[var(--color-warning)]">
        {t('disclaimer')}
    </div>
  );
}

export function DemoBadge({ className = '' }: { className?: string }) {
  const { t } = useLang();
  return (
    <span className={`inline-flex items-center gap-1 rounded bg-[var(--color-demo)]/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[var(--color-demo)] ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-demo)] pulse-dot" />
      {t('demo_banner')}
    </span>
  );
}
