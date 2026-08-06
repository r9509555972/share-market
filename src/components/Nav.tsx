import { NavLink } from 'react-router-dom';
import { Hop as Home, GraduationCap, ChartLine as LineChart, Wallet, Star, Settings as SettingsIcon } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { Languages } from 'lucide-react';

const NAV = [
  { to: '/', en: 'Home', hi: 'होम', icon: Home },
  { to: '/learn', en: 'Learn', hi: 'सीखें', icon: GraduationCap },
  { to: '/market', en: 'Market', hi: 'मार्केट', icon: LineChart },
  { to: '/portfolio', en: 'Portfolio', hi: 'पोर्टफोलियो', icon: Wallet },
  { to: '/watchlist', en: 'Watchlist', hi: 'वॉचलिस्ट', icon: Star },
];

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${className}`}
      aria-label="Toggle language"
    >
      <Languages size={14} />
      <span className={lang === 'en' ? 'font-bold' : 'opacity-60'}>EN</span>
      <span className="text-[var(--color-text-muted)]">/</span>
      <span className={`deva ${lang === 'hi' ? 'font-bold' : 'opacity-60'}`}>हिं</span>
    </button>
  );
}

export function BottomNav() {
  const { lang } = useLang();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur md:hidden">
      <div className="flex items-stretch justify-around">
        {NAV.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] transition ${
                  isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'
                }`
              }
            >
              <Icon size={20} />
              <span className={lang === 'hi' ? 'deva' : ''}>{lang === 'hi' ? item.hi : item.en}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export function Sidebar() {
  const { lang, t } = useLang();
  const items = [
    { to: '/', icon: Home, label: t('nav_home') },
    { to: '/learn', icon: GraduationCap, label: t('nav_learn') },
    { to: '/market', icon: LineChart, label: t('nav_market') },
    { to: '/portfolio', icon: Wallet, label: t('nav_portfolio') },
    { to: '/watchlist', icon: Star, label: t('nav_watchlist') },
    { to: '/settings', icon: SettingsIcon, label: t('nav_settings') },
  ];
  return (
    <aside className="hidden w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] md:flex md:flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white font-bold text-sm">SG</div>
        <div className="leading-tight">
          <div className="text-sm font-bold">{t('app_name')}</div>
          <div className="text-[10px] text-[var(--color-text-muted)]">{t('app_tagline')}</div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-dim)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text)]'
                }`
              }
            >
              <Icon size={18} />
              <span className={lang === 'hi' ? 'deva' : ''}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
