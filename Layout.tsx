import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Sidebar, BottomNav, LanguageToggle } from '@/components/Nav';
import { Disclaimer, DemoBadge } from '@/components/Disclaimer';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { formatINR } from '@/utils/format';
import { useQuote } from '@/hooks/useQuotes';

export default function Layout() {
  const { t } = useLang();
  const { account, currentValue, totalPnl } = useAccount();
  const location = useLocation();
  const nifty = useQuote('NIFTY50');

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-2.5">
            {/* mobile brand */}
            <Link to="/" className="flex items-center gap-2 md:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white font-bold text-xs">SG</div>
              <span className="text-sm font-bold">{t('app_name')}</span>
            </Link>

            {/* live nifty ticker */}
            {nifty && (
              <Link to="/market" className="hidden items-center gap-2 rounded-md bg-[var(--color-surface-2)] px-3 py-1.5 text-xs sm:flex">
                <TrendingUp size={14} className={nifty.change >= 0 ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'} />
                <span className="font-semibold">NIFTY 50</span>
                <span className="text-[var(--color-text-dim)]">{formatINR(nifty.price)}</span>
                <span className={nifty.change >= 0 ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}>
                  {nifty.change >= 0 ? '+' : ''}{nifty.change.toFixed(2)} ({nifty.changePercent.toFixed(2)}%)
                </span>
                <span className="text-[9px] text-[var(--color-demo)]">● {t('simulated')}</span>
              </Link>
            )}

            <div className="ml-auto flex items-center gap-2">
              <DemoBadge className="hidden sm:inline-flex" />
              <Link to="/portfolio" className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1.5 text-xs">
                <span className="text-[var(--color-text-muted)]">₹ </span>
                <span className="font-semibold">{formatINR(account.cashBalance + currentValue, 'en')}</span>
                <span className={`ml-1.5 ${totalPnl >= 0 ? 'text-[var(--color-up)]' : 'text-[var(--color-down)]'}`}>
                  {totalPnl >= 0 ? '+' : ''}{formatINR(totalPnl)}
                </span>
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </header>

        <main key={location.pathname} className="fade-in-up flex-1 px-4 pb-20 pt-4 md:px-6 md:pb-6">
          <Outlet />
        </main>

        <Disclaimer compact />
        <BottomNav />
      </div>
    </div>
  );
}
