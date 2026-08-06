import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LangProvider } from '@/context/LangContext';
import { AccountProvider } from '@/context/AccountContext';
import { ToastProvider } from '@/components/Toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <AccountProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AccountProvider>
    </LangProvider>
  </StrictMode>
);
