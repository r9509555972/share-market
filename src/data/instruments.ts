import type { Instrument, InstrumentKind, MarketCap, Sector } from '@/types';

// Broad simulated Indian stock universe — NOT real market data.
// Organized by market cap and sector for realistic categorization.

export const INSTRUMENTS: Instrument[] = [
  // ============ LARGE CAP (Nifty 50 type) ============
  { symbol: 'RELIANCE', name: 'Reliance Industries', nameHi: 'रिलायंस इंडस्ट्रीज', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'large', basePrice: 2850, volatility: 0.0015, tickIntervalMs: 2000, fno: true },
  { symbol: 'TCS', name: 'Tata Consultancy Services', nameHi: 'टाटा कंसल्टेंसी सर्विसेज', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'large', basePrice: 4120, volatility: 0.0012, tickIntervalMs: 2200, fno: true },
  { symbol: 'INFY', name: 'Infosys', nameHi: 'इन्फोसिस', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'large', basePrice: 1840, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', nameHi: 'एचडीएफसी बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', cap: 'large', basePrice: 1680, volatility: 0.0011, tickIntervalMs: 2100, fno: true },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', nameHi: 'आईसीआईसीआई बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', cap: 'large', basePrice: 1120, volatility: 0.0012, tickIntervalMs: 2300, fno: true },
  { symbol: 'SBIN', name: 'State Bank of India', nameHi: 'स्टेट बैंक ऑफ इंडिया', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', cap: 'large', basePrice: 820, volatility: 0.0014, tickIntervalMs: 1900, fno: true },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', nameHi: 'हिंदुस्तान यूनिलीवर', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'large', basePrice: 2480, volatility: 0.0009, tickIntervalMs: 2500, fno: true },
  { symbol: 'ITC', name: 'ITC Limited', nameHi: 'आईटीसी लिमिटेड', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'large', basePrice: 460, volatility: 0.001, tickIntervalMs: 2500, fno: true },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', nameHi: 'भारती एयरटेल', kind: 'stock', sector: 'Telecom', sectorHi: 'दूरसंचार', cap: 'large', basePrice: 1380, volatility: 0.0013, tickIntervalMs: 2200, fno: true },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', nameHi: 'कोटक महिंद्रा बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', cap: 'large', basePrice: 1780, volatility: 0.0011, tickIntervalMs: 2300, fno: true },
  { symbol: 'LT', name: 'Larsen & Toubro', nameHi: 'लार्सन एंड टौब्रो', kind: 'stock', sector: 'Infra', sectorHi: 'इंफ्रा', cap: 'large', basePrice: 3580, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'AXISBANK', name: 'Axis Bank', nameHi: 'एक्सिस बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', cap: 'large', basePrice: 1140, volatility: 0.0013, tickIntervalMs: 2100, fno: true },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', nameHi: 'एशियन पेंट्स', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'large', basePrice: 2920, volatility: 0.0011, tickIntervalMs: 2400, fno: true },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', nameHi: 'मारुति सुजुकी', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', cap: 'large', basePrice: 12650, volatility: 0.0012, tickIntervalMs: 2200, fno: true },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', nameHi: 'सन फार्मास्युटिकल', kind: 'stock', sector: 'Pharma', sectorHi: 'फार्मा', cap: 'large', basePrice: 1720, volatility: 0.0013, tickIntervalMs: 2300, fno: true },
  { symbol: 'TITAN', name: 'Titan Company', nameHi: 'टाइटन कंपनी', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'large', basePrice: 3450, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', nameHi: 'बजाज फाइनांस', kind: 'stock', sector: 'NBFC', sectorHi: 'एनबीएफसी', cap: 'large', basePrice: 7300, volatility: 0.0016, tickIntervalMs: 2300, fno: true },
  { symbol: 'WIPRO', name: 'Wipro', nameHi: 'विप्रो', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'large', basePrice: 540, volatility: 0.0012, tickIntervalMs: 2400, fno: true },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', nameHi: 'अल्ट्राटेक सीमेंट', kind: 'stock', sector: 'Cement', sectorHi: 'सीमेंट', cap: 'large', basePrice: 11800, volatility: 0.0012, tickIntervalMs: 2300, fno: true },
  { symbol: 'NESTLEIND', name: 'Nestle India', nameHi: 'नेस्ले इंडिया', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'large', basePrice: 2580, volatility: 0.001, tickIntervalMs: 2500, fno: true },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', nameHi: 'टाटा मोटर्स', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', cap: 'large', basePrice: 980, volatility: 0.0018, tickIntervalMs: 2000, fno: true },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', nameHi: 'अडानी एंटरप्राइजेज', kind: 'stock', sector: 'Conglomerate', sectorHi: 'समूह', cap: 'large', basePrice: 2950, volatility: 0.0022, tickIntervalMs: 2100, fno: true },
  { symbol: 'TATASTEEL', name: 'Tata Steel', nameHi: 'टाटा स्टील', kind: 'stock', sector: 'Metals', sectorHi: 'धातु', cap: 'large', basePrice: 165, volatility: 0.0017, tickIntervalMs: 2000, fno: true },
  { symbol: 'JSWSTEEL', name: 'JSW Steel', nameHi: 'जेएसडब्ल्यू स्टील', kind: 'stock', sector: 'Metals', sectorHi: 'धातु', cap: 'large', basePrice: 940, volatility: 0.0016, tickIntervalMs: 2200, fno: true },
  { symbol: 'HCLTECH', name: 'HCL Technologies', nameHi: 'एचसीएल टेक्नोलॉजीज', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'large', basePrice: 1640, volatility: 0.0012, tickIntervalMs: 2300, fno: true },
  { symbol: 'TECHM', name: 'Tech Mahindra', nameHi: 'टेक महिंद्रा', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'large', basePrice: 1480, volatility: 0.0013, tickIntervalMs: 2300, fno: true },
  { symbol: 'COALINDIA', name: 'Coal India', nameHi: 'कोल इंडिया', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'large', basePrice: 480, volatility: 0.0014, tickIntervalMs: 2400, fno: true },
  { symbol: 'NTPC', name: 'NTPC', nameHi: 'एनटीपीसी', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'large', basePrice: 360, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'POWERGRID', name: 'Power Grid Corporation', nameHi: 'पावर ग्रिड कॉर्पोरेशन', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'large', basePrice: 320, volatility: 0.0012, tickIntervalMs: 2500, fno: true },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', nameHi: 'ओएनजीसी', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'large', basePrice: 280, volatility: 0.0015, tickIntervalMs: 2300, fno: true },
  { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv', nameHi: 'बजाज फिनसर्व', kind: 'stock', sector: 'NBFC', sectorHi: 'एनबीएफसी', cap: 'large', basePrice: 1680, volatility: 0.0014, tickIntervalMs: 2300, fno: true },
  { symbol: 'GRASIM', name: 'Grasim Industries', nameHi: 'ग्रासिम इंडस्ट्रीज', kind: 'stock', sector: 'Cement', sectorHi: 'सीमेंट', cap: 'large', basePrice: 2650, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'CIPLA', name: 'Cipla', nameHi: 'सिप्ला', kind: 'stock', sector: 'Pharma', sectorHi: 'फार्मा', cap: 'large', basePrice: 1520, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'DRREDDY', name: 'Dr Reddys Laboratories', nameHi: 'डॉ रेड्डीज लैब्स', kind: 'stock', sector: 'Pharma', sectorHi: 'फार्मा', cap: 'large', basePrice: 1320, volatility: 0.0013, tickIntervalMs: 2400, fno: true },
  { symbol: 'EICHERMOT', name: 'Eicher Motors', nameHi: 'ऐशर मोटर्स', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', cap: 'large', basePrice: 4850, volatility: 0.0014, tickIntervalMs: 2300, fno: true },
  { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp', nameHi: 'हीरो मोटोकॉर्प', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', cap: 'large', basePrice: 4820, volatility: 0.0014, tickIntervalMs: 2300, fno: true },
  { symbol: 'M&M', name: 'Mahindra & Mahindra', nameHi: 'महिंद्रा एंड महिंद्रा', kind: 'stock', sector: 'Auto', sectorHi: 'ऑटो', cap: 'large', basePrice: 2980, volatility: 0.0014, tickIntervalMs: 2200, fno: true },
  { symbol: 'DIVISLAB', name: 'Divis Laboratories', nameHi: 'डिविस लैब्स', kind: 'stock', sector: 'Pharma', sectorHi: 'फार्मा', cap: 'large', basePrice: 5850, volatility: 0.0014, tickIntervalMs: 2400, fno: true },
  { symbol: 'BRITANNIA', name: 'Britannia Industries', nameHi: 'ब्रिटानिया इंडस्ट्रीज', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'large', basePrice: 5120, volatility: 0.0011, tickIntervalMs: 2500, fno: true },
  { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance', nameHi: 'एचडीएफसी लाइफ', kind: 'stock', sector: 'NBFC', sectorHi: 'एनबीएफसी', cap: 'large', basePrice: 680, volatility: 0.0012, tickIntervalMs: 2400, fno: true },
  { symbol: 'SBILIFE', name: 'SBI Life Insurance', nameHi: 'एसबीआई लाइफ', kind: 'stock', sector: 'NBFC', sectorHi: 'एनबीएफसी', cap: 'large', basePrice: 1480, volatility: 0.0012, tickIntervalMs: 2400, fno: true },

  // ============ MID CAP ============
  { symbol: 'PAGEIND', name: 'Page Industries', nameHi: 'पेज इंडस्ट्रीज', kind: 'stock', sector: 'FMCG', sectorHi: 'एफएमसीजी', cap: 'mid', basePrice: 38500, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'GODREJPROP', name: 'Godrej Properties', nameHi: 'गोदरेज प्रॉपर्टीज', kind: 'stock', sector: 'Realty', sectorHi: 'रियल एस्टेट', cap: 'mid', basePrice: 2680, volatility: 0.0017, tickIntervalMs: 2300, fno: false },
  { symbol: 'INDHOTEL', name: 'Indian Hotels Company', nameHi: 'इंडियन होटल्स', kind: 'stock', sector: 'Services', sectorHi: 'सेवाएं', cap: 'mid', basePrice: 680, volatility: 0.0016, tickIntervalMs: 2400, fno: false },
  { symbol: 'TRENT', name: 'Trent Limited', nameHi: 'ट्रेंट लिमिटेड', kind: 'stock', sector: 'Retail', sectorHi: 'रिटेल', cap: 'mid', basePrice: 4850, volatility: 0.0017, tickIntervalMs: 2300, fno: false },
  { symbol: 'PERSISTENT', name: 'Persistent Systems', nameHi: 'पर्सिस्टेंट सिस्टम्स', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'mid', basePrice: 1120, volatility: 0.0016, tickIntervalMs: 2300, fno: false },
  { symbol: 'ASTRAL', name: 'Astral Limited', nameHi: 'एस्ट्रल लिमिटेड', kind: 'stock', sector: 'Plastics', sectorHi: 'प्लास्टिक', cap: 'mid', basePrice: 2480, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'PIIND', name: 'PI Industries', nameHi: 'पीआई इंडस्ट्रीज', kind: 'stock', sector: 'Chemicals', sectorHi: 'रसायन', cap: 'mid', basePrice: 3850, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'BEL', name: 'Bharat Electronics', nameHi: 'भारत इलेक्ट्रॉनिक्स', kind: 'stock', sector: 'Defence', sectorHi: 'रक्षा', cap: 'mid', basePrice: 280, volatility: 0.0016, tickIntervalMs: 2200, fno: false },
  { symbol: 'BATAINDIA', name: 'Bata India', nameHi: 'बाटा इंडिया', kind: 'stock', sector: 'Retail', sectorHi: 'रिटेल', cap: 'mid', basePrice: 1380, volatility: 0.0014, tickIntervalMs: 2400, fno: false },
  { symbol: 'JUBLFOOD', name: 'Jubilant FoodWorks', nameHi: 'जुबिलेंट फूडवर्क्स', kind: 'stock', sector: 'Services', sectorHi: 'सेवाएं', cap: 'mid', basePrice: 680, volatility: 0.0016, tickIntervalMs: 2400, fno: false },
  { symbol: 'LTI', name: 'LTIMindtree', nameHi: 'एलटीआईमाइंडट्री', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'mid', basePrice: 6200, volatility: 0.0014, tickIntervalMs: 2400, fno: false },
  { symbol: 'MPHASIS', name: 'Mphasis', nameHi: 'एमफैसिस', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'mid', basePrice: 2850, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'COFORGE', name: 'Coforge', nameHi: 'कोफोर्ज', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'mid', basePrice: 6800, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'ACC', name: 'ACC Limited', nameHi: 'एसीसी लिमिटेड', kind: 'stock', sector: 'Cement', sectorHi: 'सीमेंट', cap: 'mid', basePrice: 2480, volatility: 0.0014, tickIntervalMs: 2400, fno: false },
  { symbol: 'AMBUJACEM', name: 'Ambuja Cements', nameHi: 'अंबुजा सीमेंट', kind: 'stock', sector: 'Cement', sectorHi: 'सीमेंट', cap: 'mid', basePrice: 620, volatility: 0.0014, tickIntervalMs: 2400, fno: false },
  { symbol: 'RAMCOCEM', name: 'Ramco Cements', nameHi: 'रामको सीमेंट', kind: 'stock', sector: 'Cement', sectorHi: 'सीमेंट', cap: 'mid', basePrice: 880, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'OBEROIRLTY', name: 'Oberoi Realty', nameHi: 'ओबेरॉय रियल्टी', kind: 'stock', sector: 'Realty', sectorHi: 'रियल एस्टेट', cap: 'mid', basePrice: 1680, volatility: 0.0016, tickIntervalMs: 2400, fno: false },
  { symbol: 'LODHA', name: 'Macrotech Developers', nameHi: 'मैक्रोटेक डेवलपर्स', kind: 'stock', sector: 'Realty', sectorHi: 'रियल एस्टेट', cap: 'mid', basePrice: 1180, volatility: 0.0017, tickIntervalMs: 2400, fno: false },
  { symbol: 'MAXHEALTH', name: 'Max Healthcare', nameHi: 'मैक्स हेल्थकेयर', kind: 'stock', sector: 'Healthcare', sectorHi: 'स्वास्थ्य', cap: 'mid', basePrice: 880, volatility: 0.0015, tickIntervalMs: 2400, fno: false },
  { symbol: 'ABFRL', name: 'Aditya Birla Fashion', nameHi: 'आदित्य बिड़ला फैशन', kind: 'stock', sector: 'Retail', sectorHi: 'रिटेल', cap: 'mid', basePrice: 320, volatility: 0.0017, tickIntervalMs: 2400, fno: false },

  // ============ SMALL CAP ============
  { symbol: 'SUZLON', name: 'Suzlon Energy', nameHi: 'सुज़लॉन एनर्जी', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'small', basePrice: 68, volatility: 0.0025, tickIntervalMs: 2000, fno: false },
  { symbol: 'YESBANK', name: 'Yes Bank', nameHi: 'यस बैंक', kind: 'stock', sector: 'Banking', sectorHi: 'बैंकिंग', cap: 'small', basePrice: 24, volatility: 0.002, tickIntervalMs: 2000, fno: false },
  { symbol: 'IDEA', name: 'Vodafone Idea', nameHi: 'वोडाफोन आइडिया', kind: 'stock', sector: 'Telecom', sectorHi: 'दूरसंचार', cap: 'small', basePrice: 18, volatility: 0.0022, tickIntervalMs: 2000, fno: false },
  { symbol: 'ZOMATO', name: 'Zomato', nameHi: 'ज़ोमैटो', kind: 'stock', sector: 'Services', sectorHi: 'सेवाएं', cap: 'small', basePrice: 180, volatility: 0.002, tickIntervalMs: 2000, fno: false },
  { symbol: 'NYKAA', name: 'FSN E-Commerce (Nykaa)', nameHi: 'एफएसएन ई-कॉमर्स', kind: 'stock', sector: 'Retail', sectorHi: 'रिटेल', cap: 'small', basePrice: 220, volatility: 0.002, tickIntervalMs: 2100, fno: false },
  { symbol: 'PAYTM', name: 'One97 (Paytm)', nameHi: 'वन97 (पेटीएम)', kind: 'stock', sector: 'Fintech', sectorHi: 'फिनटेक', cap: 'small', basePrice: 480, volatility: 0.0022, tickIntervalMs: 2000, fno: false },
  { symbol: 'POLICYBZR', name: 'PolicyBazaar (PB Fintech)', nameHi: 'पॉलिसीबाजार', kind: 'stock', sector: 'Fintech', sectorHi: 'फिनटेक', cap: 'small', basePrice: 680, volatility: 0.002, tickIntervalMs: 2100, fno: false },
  { symbol: 'LATENTV', name: 'Latent View Analytics', nameHi: 'लेटेंट व्यू एनालिटिक्स', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'small', basePrice: 580, volatility: 0.002, tickIntervalMs: 2200, fno: false },
  { symbol: 'ROUTE', name: 'Route Mobile', nameHi: 'रूट मोबाइल', kind: 'stock', sector: 'IT', sectorHi: 'आईटी', cap: 'small', basePrice: 1680, volatility: 0.002, tickIntervalMs: 2200, fno: false },
  { symbol: 'ANGELONE', name: 'Angel One', nameHi: 'एंजल वन', kind: 'stock', sector: 'Fintech', sectorHi: 'फिनटेक', cap: 'small', basePrice: 2850, volatility: 0.002, tickIntervalMs: 2100, fno: false },
  { symbol: 'CDSL', name: 'Central Depository Services', nameHi: 'सीडीएसएल', kind: 'stock', sector: 'Fintech', sectorHi: 'फिनटेक', cap: 'small', basePrice: 1820, volatility: 0.002, tickIntervalMs: 2200, fno: false },
  { symbol: 'MAZDOCK', name: 'Mazagon Dock Shipbuilders', nameHi: 'माजगांव डॉक', kind: 'stock', sector: 'Defence', sectorHi: 'रक्षा', cap: 'small', basePrice: 4200, volatility: 0.0022, tickIntervalMs: 2000, fno: false },
  { symbol: 'HAL', name: 'Hindustan Aeronautics', nameHi: 'हिंदुस्तान एरोनॉटिक्स', kind: 'stock', sector: 'Defence', sectorHi: 'रक्षा', cap: 'small', basePrice: 4800, volatility: 0.0019, tickIntervalMs: 2100, fno: false },
  { symbol: 'IREDA', name: 'Indian Renewable Energy', nameHi: 'आईरेडा', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'small', basePrice: 180, volatility: 0.0024, tickIntervalMs: 2000, fno: false },
  { symbol: 'TATAPOWER', name: 'Tata Power', nameHi: 'टाटा पावर', kind: 'stock', sector: 'Energy', sectorHi: 'ऊर्जा', cap: 'small', basePrice: 420, volatility: 0.0019, tickIntervalMs: 2100, fno: false },

  // ============ INDICES ============
  { symbol: 'NIFTY50', name: 'Nifty 50', nameHi: 'निफ्टी 50', kind: 'index', basePrice: 24200, volatility: 0.0008, tickIntervalMs: 1800, fno: true },
  { symbol: 'SENSEX', name: 'BSE Sensex', nameHi: 'बीएसई सेंसेक्स', kind: 'index', basePrice: 79800, volatility: 0.0008, tickIntervalMs: 1900, fno: false },
  { symbol: 'BANKNIFTY', name: 'Bank Nifty', nameHi: 'बैंक निफ्टी', kind: 'index', basePrice: 51800, volatility: 0.001, tickIntervalMs: 2000, fno: true },
  { symbol: 'NIFTYIT', name: 'Nifty IT', nameHi: 'निफ्टी आईटी', kind: 'index', basePrice: 38500, volatility: 0.001, tickIntervalMs: 2000, fno: true },
  { symbol: 'NIFTYPHARMA', name: 'Nifty Pharma', nameHi: 'निफ्टी फार्मा', kind: 'index', basePrice: 19800, volatility: 0.001, tickIntervalMs: 2000, fno: true },
  { symbol: 'NIFTYAUTO', name: 'Nifty Auto', nameHi: 'निफ्टी ऑटो', kind: 'index', basePrice: 22800, volatility: 0.001, tickIntervalMs: 2000, fno: true },
  { symbol: 'NIFTYFMCG', name: 'Nifty FMCG', nameHi: 'निफ्टी एफएमसीजी', kind: 'index', basePrice: 56800, volatility: 0.0008, tickIntervalMs: 2000, fno: false },
  { symbol: 'NIFTYMETAL', name: 'Nifty Metal', nameHi: 'निफ्टी मेटल', kind: 'index', basePrice: 9200, volatility: 0.0012, tickIntervalMs: 2000, fno: false },
  { symbol: 'NIFTYENERGY', name: 'Nifty Energy', nameHi: 'निफ्टी एनर्जी', kind: 'index', basePrice: 41200, volatility: 0.001, tickIntervalMs: 2000, fno: false },
  { symbol: 'NIFTYREALTY', name: 'Nifty Realty', nameHi: 'निफ्टी रियल्टी', kind: 'index', basePrice: 980, volatility: 0.0014, tickIntervalMs: 2000, fno: false },
];

// Derived index definitions: which stocks make up each index
export const INDEX_CONSTITUENTS: Record<string, string[]> = {
  NIFTYIT: ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'TECHM', 'LTI'],
  NIFTYPHARMA: ['SUNPHARMA', 'CIPLA', 'DRREDDY', 'DIVISLAB'],
  NIFTYAUTO: ['MARUTI', 'TATAMOTORS', 'EICHERMOT', 'HEROMOTOCO', 'M&M'],
  NIFTYFMCG: ['HINDUNILVR', 'ITC', 'NESTLEIND', 'BRITANNIA', 'ASIANPAINT', 'TITAN'],
  NIFTYMETAL: ['TATASTEEL', 'JSWSTEEL'],
  NIFTYENERGY: ['RELIANCE', 'COALINDIA', 'NTPC', 'POWERGRID', 'ONGC'],
  NIFTYREALTY: ['GODREJPROP', 'OBEROIRLTY', 'LODHA'],
};

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

export const SECTORS: Sector[] = [
  'Banking', 'IT', 'Pharma', 'Auto', 'FMCG', 'Energy', 'Metals',
  'Realty', 'Infra', 'Cement', 'Telecom', 'NBFC', 'Defence',
  'Retail', 'Services', 'Chemicals', 'Healthcare', 'Fintech',
  'Plastics', 'Conglomerate',
];

export const CAPS: { id: MarketCap; label: string; labelHi: string }[] = [
  { id: 'large', label: 'Large Cap', labelHi: 'लार्ज कैप' },
  { id: 'mid', label: 'Mid Cap', labelHi: 'मिड कैप' },
  { id: 'small', label: 'Small Cap', labelHi: 'स्मॉल कैप' },
];

export const FNO_SYMBOLS = INSTRUMENTS.filter(i => i.fno).map(i => i.symbol);
