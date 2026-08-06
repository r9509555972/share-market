import { useState } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { useAccount } from '@/context/AccountContext';
import { useToast } from '@/components/Toast';
import { Disclaimer } from '@/components/Disclaimer';
import { formatINR } from '@/utils/format';

export default function Settings() {
  const { lang, t } = useLang();
  const { account, resetAccount } = useAccount();
  const toast = useToast();
  const [confirming, setConfirming] = useState(false);

  function doReset() {
    resetAccount();
    setConfirming(false);
    toast.push('success', t('reset_done'));
  }

  const totalHoldings = [...account.holdings, ...account.positions].reduce((a, h) => a + h.quantity, 0);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className={`text-2xl font-bold ${lang === 'hi' ? 'deva' : ''}`}>{t('settings_title')}</h1>
        <p className="text-sm text-[var(--color-demo)]">● {t('simulated')} · {t('demo_banner')}</p>
      </div>

      {/* Account summary */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className={`text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] ${lang === 'hi' ? 'deva' : ''}`}>{lang === 'hi' ? 'डेमो खाता सारांश' : 'Demo Account Summary'}</h2>
        <div className="mt-3 space-y-2 text-sm">
          <Row label={t('starting_balance')} value={formatINR(account.startingBalance)} />
          <Row label={t('available_balance')} value={formatINR(account.cashBalance)} />
          <Row label={lang === 'hi' ? 'कुल होल्डिंग्स' : 'Total Holdings'} value={`${totalHoldings} ${lang === 'hi' ? 'शेयर' : 'shares'}`} />
          <Row label={lang === 'hi' ? 'कुल ऑर्डर' : 'Total Orders'} value={String(account.orders.length)} />
          <Row label={lang === 'hi' ? 'वॉचलिस्ट स्टॉक्स' : 'Watchlist Stocks'} value={String(account.watchlist.length)} />
          <Row label={lang === 'hi' ? 'खाता बनाया गया' : 'Account Created'} value={new Date(account.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} />
        </div>
      </div>

      {/* Reset section */}
      <div className="rounded-xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-[var(--color-warning)]" />
          <div className="flex-1">
            <h2 className={`text-base font-bold text-[var(--color-warning)] ${lang === 'hi' ? 'deva' : ''}`}>{t('reset_account')}</h2>
            <p className={`mt-1 text-sm text-[var(--color-text-dim)] ${lang === 'hi' ? 'deva' : ''}`}>{t('reset_account_d')}</p>

            {!confirming ? (
              <button
                onClick={() => setConfirming(true)}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--color-warning)]/50 px-4 py-2 text-sm font-bold text-[var(--color-warning)] transition hover:bg-[var(--color-warning)]/10"
              >
                <RotateCcw size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('reset_btn')}</span>
              </button>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={doReset}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-down)] px-4 py-2 text-sm font-bold text-white transition hover:brightness-110"
                >
                  <CheckCircle2 size={16} /> <span className={lang === 'hi' ? 'deva' : ''}>{t('yes')}</span>
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-bold text-[var(--color-text-dim)] transition hover:bg-[var(--color-surface-2)]"
                >
                  <span className={lang === 'hi' ? 'deva' : ''}>{t('cancel')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 last:border-0 last:pb-0">
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

