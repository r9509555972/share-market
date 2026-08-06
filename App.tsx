import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Learn from '@/pages/Learn';
import ModuleDetail from '@/pages/ModuleDetail';
import Quiz from '@/pages/Quiz';
import MarketWatch from '@/pages/MarketWatch';
import StockDetail from '@/pages/StockDetail';
import Portfolio from '@/pages/Portfolio';
import Watchlist from '@/pages/Watchlist';
import Glossary from '@/pages/Glossary';
import Settings from '@/pages/Settings';
import Progress from '@/pages/Progress';
import { usePriceEngine } from '@/hooks/useQuotes';

export default function App() {
  usePriceEngine();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:id" element={<ModuleDetail />} />
          <Route path="/learn/:id/quiz" element={<Quiz />} />
          <Route path="/market" element={<MarketWatch />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
