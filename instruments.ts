import type { Instrument } from '@/types';

// Catalog of popular Indian stocks + indices with realistic base prices.
// All prices/volatility are educational mock values — not real market data.
export const INSTRUMENTS: Instrument[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', nameHi: 'रिलायंस इंडस्ट्रीज', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', basePrice: 2850, volatility: 0.0015, tickIntervalMs: 2000 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', nameHi: 'टाटा कंसल्टेंसी सर्विसेज', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', basePrice: 4120, volatility: 0.0012, tickIntervalMs: 2200 },
  { symbol: 'INFY', name: 'Infosys', nameHi: 'इन्फोसिस', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', basePrice: 1840, volatility: 0.0013, tickIntervalMs: 2400 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', nameHi: 'एचडीएफसी बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', basePrice: 1680, volatility: 0.0011, tickIntervalMs: 2100 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', nameHi: 'आईसीआईसीआई बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', basePrice: 1120, volatility: 0.0012, tickIntervalMs: 2300 },
  { symbol: 'SBIN', name: 'State Bank of India', nameHi: 'स्टेट बैंक ऑफ इंडिया', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', basePrice: 820, volatility: 0.0014, tickIntervalMs: 1900 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', nameHi: 'टाटा मोटर्स', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', basePrice: 980, volatility: 0.0018, tickIntervalMs: 2000 },
  { symbol: 'ITC', name: 'ITC Limited', nameHi: 'आईटीसी लिमिटेड', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', basePrice: 460, volatility: 0.001, tickIntervalMs: 2500 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', nameHi: 'बजाज फाइनांस', kind: 'stock', sector: 'NBFC', sectorHi: 'एनबीएफसी', basePrice: 7300, volatility: 0.0016, tickIntervalMs: 2300 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', nameHi: 'अडानी एंटरप्राइजेज', kind: 'stock', sector: 'Conglomerate', sectorHi: 'समूह', basePrice: 2950, volatility: 0.0022, tickIntervalMs: 2100 },
  { symbol: 'LT', name: 'Larsen & Toubro', nameHi: 'लार्सन एंड टौब्रो', kind: 'stock', sector: 'Infra', sectorHi: 'इंफ्रा', basePrice: 3580, volatility: 0.0013, tickIntervalMs: 2400 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', nameHi: 'मारुति सुजुकी', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', basePrice: 12650, volatility: 0.0012, tickIntervalMs: 2200 },
  { symbol: 'NIFTY50', name: 'Nifty 50', nameHi: 'निफ्टी 50', kind: 'index', basePrice: 24200, volatility: 0.0008, tickIntervalMs: 1800 },
  { symbol: 'SENSEX', name: 'BSE Sensex', nameHi: 'बीएसई सेंसेक्स', kind: 'index', basePrice: 79800, volatility: 0.0008, tickIntervalMs: 1900 },
  { symbol: 'BANKNIFTY', name: 'Bank Nifty', nameHi: 'बैंक निफ्टी', kind: 'index', basePrice: 51800, volatility: 0.001, tickIntervalMs: 2000 },
];

export const STOCK_SYMBOLS = INSTRUMENTS.filter(i => i.kind === 'stock').map(i => i.symbol);
export const INDEX_SYMBOLS = INSTRUMENTS.filter(i => i.kind === 'index').map(i => i.symbol);

export function getInstrument(symbol: string): Instrument | undefined {
  return INSTRUMENTS.find(i => i.symbol === symbol);
}

export function instrumentName(symbol: string, lang: 'en' | 'hi'): string {
  const inst = getInstrument(symbol);
  if (!inst) return symbol;
  return lang === 'hi' ? inst.nameHi : inst.name;
}
