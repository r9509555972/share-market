import type { Lang } from '@/types';

type Dict = Record<string, { en: string; hi: string }>;

export const T: Dict = {
  app_name: { en: 'ShareMarket Guru', hi: 'शेयरमार्केट गुरु' },
  app_tagline: { en: 'Learn stock trading. Practice risk-free.', hi: 'शेयर ट्रेडिंग सीखें। बिना जोखिम अभ्यास करें।' },
  demo_banner: { en: 'DEMO ACCOUNT — Virtual Money Only', hi: 'डेमो खाता — केवल आभासी पैसा' },
  disclaimer: {
    en: 'This app is for educational purposes only. All prices and trades are simulated with virtual money. It does not provide real financial/investment advice. Always consult a SEBI-registered financial advisor before real trading.',
    hi: 'यह ऐप केवल शैक्षणिक उद्देश्यों के लिए है। सभी कीमतें और ट्रेड आभासी पैसे से सिम्युलेटेड हैं। यह वास्तविक वित्तीय/निवेश सलाह नहीं देता। वास्तविक ट्रेडिंग से पहले हमेशा एसईबीआई-पंजीकृत वित्तीय सलाहकार से सलाह लें।',
  },
  simulated: { en: 'Simulated', hi: 'सिम्युलेटेड' },

  // nav
  nav_home: { en: 'Home', hi: 'होम' },
  nav_learn: { en: 'Learn', hi: 'सीखें' },
  nav_market: { en: 'Market Watch', hi: 'मार्केट वॉच' },
  nav_portfolio: { en: 'Portfolio', hi: 'पोर्टफोलियो' },
  nav_watchlist: { en: 'Watchlist', hi: 'वॉचलिस्ट' },
  nav_settings: { en: 'Settings', hi: 'सेटिंग्स' },

  // homepage
  hero_title: { en: 'Master the Stock Market — Step by Step', hi: 'शेयर बाजार में महारत हासिल करें — चरण दर चरण' },
  hero_sub: {
    en: 'Learn trading concepts in Hindi & English, then practice with a virtual ₹1,00,000 demo account. No real money, no risk.',
    hi: 'हिंदी और अंग्रेजी में ट्रेडिंग अवधारणाएँ सीखें, फिर आभासी ₹1,00,000 डेमो खाते से अभ्यास करें। कोई असली पैसा नहीं, कोई जोखिम नहीं।',
  },
  cta_learn: { en: 'Start Learning', hi: 'सीखना शुरू करें' },
  cta_trade: { en: 'Open Demo Trading Account', hi: 'डेमो ट्रेडिंग खाता खोलें' },
  trading_types_title: { en: '5 Types of Trading', hi: 'ट्रेडिंग के 5 प्रकार' },
  trading_types_sub: { en: 'Find the style that matches your time and risk appetite.', hi: 'अपने समय और जोखिम क्षमता से मेल खाता स्टाइल चुनें।' },
  features_title: { en: 'Everything you need to learn', hi: 'सीखने के लिए आवश्यक सब कुछ' },

  // trading types
  tt_scalping: { en: 'Scalping', hi: 'स्कैल्पिंग' },
  tt_scalping_d: { en: 'Seconds to minutes. Many small trades a day for tiny per-trade gains.', hi: 'सेकंड से मिनट। दिन में कई छोटे ट्रेड, हर ट्रेड पर छोटा लाभ।' },
  tt_intraday: { en: 'Intraday / Day Trading', hi: 'इंट्राडे / डे ट्रेडिंग' },
  tt_intraday_d: { en: 'Buy and sell the same day. No overnight positions.', hi: 'एक ही दिन खरीदें और बेचें। कोई रात भर की पोजीशन नहीं।' },
  tt_swing: { en: 'Swing Trading', hi: 'स्विंग ट्रेडिंग' },
  tt_swing_d: { en: 'Days to weeks. Capture short- to medium-term price swings.', hi: 'दिन से सप्ताह। छोटे से मध्यम अवधि के मूल्य उतार-चढ़ाव पकड़ें।' },
  tt_momentum: { en: 'Momentum Trading', hi: 'मोमेंटम ट्रेडिंग' },
  tt_momentum_d: { en: 'Ride stocks moving strongly in one direction with high volume.', hi: 'तेजी से एक दिशा में बढ़ रहे स्टॉक पर सवारी करें।' },
  tt_position: { en: 'Position Trading', hi: 'पोजीशन ट्रेडिंग' },
  tt_position_d: { en: 'Weeks to months. Follow long-term trends with patience.', hi: 'सप्ताह से महीने। धैर्य के साथ दीर्घकालिक रुख का पालन करें।' },

  // market watch
  mw_title: { en: 'Market Watch', hi: 'मार्केट वॉच' },
  mw_sub: { en: 'Simulated prices of popular Indian stocks & indices', hi: 'लोकप्रिय भारतीय स्टॉक और सूचकांकों के सिम्युलेटेड मूल्य' },
  indices: { en: 'Indices', hi: 'सूचकांक' },
  stocks: { en: 'Stocks', hi: 'स्टॉक' },
  col_symbol: { en: 'Symbol', hi: 'प्रतीक' },
  col_name: { en: 'Company', hi: 'कंपनी' },
  col_price: { en: 'Price', hi: 'मूल्य' },
  col_change: { en: 'Change', hi: 'बदलाव' },
  col_volume: { en: 'Volume', hi: 'वॉल्यूम' },
  col_dayhigh: { en: "Day's High", hi: "दिन का उच्च" },
  col_daylow: { en: "Day's Low", hi: "दिन का निम्न" },
  col_52high: { en: '52W High', hi: '52W उच्च' },
  col_52low: { en: '52W Low', hi: '52W निम्न' },
  add_to_watch: { en: 'Add to Watchlist', hi: 'वॉचलिस्ट में जोड़ें' },
  remove_from_watch: { en: 'Remove', hi: 'हटाएं' },
  in_watch: { en: 'In Watchlist', hi: 'वॉचलिस्ट में' },
  search_placeholder: { en: 'Search stock…', hi: 'स्टॉक खोजें…' },

  // stock detail
  buy: { en: 'BUY', hi: 'खरीदें' },
  sell: { en: 'SELL', hi: 'बेचें' },
  order_type: { en: 'Order Type', hi: 'ऑर्डर प्रकार' },
  market_order: { en: 'Market Order', hi: 'मार्केट ऑर्डर' },
  limit_order: { en: 'Limit Order', hi: 'लिमिट ऑर्डर' },
  product_type: { en: 'Product Type', hi: 'प्रोडक्ट प्रकार' },
  cnc: { en: 'CNC (Delivery)', hi: 'सीएनसी (डिलीवरी)' },
  mis: { en: 'MIS (Intraday)', hi: 'एमआईएस (इंट्राडे)' },
  quantity: { en: 'Quantity', hi: 'मात्रा' },
  price: { en: 'Price (₹)', hi: 'मूल्य (₹)' },
  estimated_cost: { en: 'Estimated Cost', hi: 'अनुमानित लागत' },
  place_order: { en: 'Place Order', hi: 'ऑर्डर दें' },
  chart_title: { en: 'Price Chart (Simulated)', hi: 'मूल्य चार्ट (सिम्युलेटेड)' },
  timeframe: { en: 'Timeframe', hi: 'समयावधि' },
  back: { en: 'Back', hi: 'वापस' },

  // order feedback
  order_placed: { en: 'Order placed successfully', hi: 'ऑर्डर सफलतापूर्वक दिया गया' },
  order_rejected: { en: 'Order rejected', hi: 'ऑर्डर अस्वीकृत' },
  insufficient_funds: { en: 'Insufficient balance for this order', hi: 'इस ऑर्डर के लिए अपर्याप्त राशि' },
  insufficient_shares: { en: 'Not enough shares to sell', hi: 'बेचने के लिए पर्याप्त शेयर नहीं' },
  limit_pending: { en: 'Limit order placed — will execute when price reaches target', hi: 'लिमिट ऑर्डर दिया गया — मूल्य लक्ष्य तक पहुँचने पर निष्पादित होगा' },

  // portfolio
  port_title: { en: 'Portfolio', hi: 'पोर्टफोलियो' },
  tab_holdings: { en: 'Holdings (CNC)', hi: 'होल्डिंग्स (सीएनसी)' },
  tab_positions: { en: 'Positions (Intraday)', hi: 'पोजीशन्स (इंट्राडे)' },
  tab_orders: { en: 'Order History', hi: 'ऑर्डर इतिहास' },
  available_balance: { en: 'Available Balance', hi: 'उपलब्ध राशि' },
  invested: { en: 'Invested Amount', hi: 'निवेशित राशि' },
  current_value: { en: 'Current Value', hi: 'वर्तमान मूल्य' },
  total_pnl: { en: "Today's P&L", hi: "आज का लाभ/हानि" },
  col_qty: { en: 'Qty', hi: 'मात्रा' },
  col_avg: { en: 'Avg. Price', hi: 'औसत मूल्य' },
  col_cur: { en: 'Current', hi: 'वर्तमान' },
  col_value: { en: 'Value', hi: 'मूल्य' },
  col_pnl: { en: 'P&L', hi: 'लाभ/हानि' },
  no_holdings: { en: 'No holdings yet. Buy a stock from Market Watch to start.', hi: 'अभी कोई होल्डिंग नहीं। मार्केट वॉच से स्टॉक खरीदें।' },
  no_positions: { en: 'No open intraday positions.', hi: 'कोई खुली इंट्राडे पोजीशन नहीं।' },
  no_orders: { en: 'No trades yet. Your trade book will appear here.', hi: 'अभी कोई ट्रेड नहीं। आपकी ट्रेड बुक यहाँ दिखेगी।' },
  empty_watch: { en: 'Your watchlist is empty. Add stocks from Market Watch.', hi: 'आपकी वॉचलिस्ट खाली है। मार्केट वॉच से स्टॉक जोड़ें।' },

  // settings
  settings_title: { en: 'Settings', hi: 'सेटिंग्स' },
  reset_account: { en: 'Reset Demo Account', hi: 'डेमो खाता रीसेट करें' },
  reset_account_d: { en: 'Restore virtual cash to ₹1,00,000 and clear all holdings & orders.', hi: 'आभासी राशि ₹1,00,000 पर रीसेट करें और सभी होल्डिंग्स व ऑर्डर हटाएं।' },
  reset_btn: { en: 'Reset Now', hi: 'अभी रीसेट करें' },
  reset_confirm: { en: 'Reset your demo account? All holdings and trade history will be cleared.', hi: 'डेमो खाता रीसेट करें? सभी होल्डिंग्स और ट्रेड इतिहास हट जाएंगे।' },
  reset_done: { en: 'Demo account reset to ₹1,00,000', hi: 'डेमो खाता ₹1,00,000 पर रीसेट हो गया' },
  starting_balance: { en: 'Starting Balance', hi: 'प्रारंभिक राशि' },

  // learn
  learn_title: { en: 'Learning Modules', hi: 'लर्निंग मॉड्यूल' },
  learn_sub: { en: 'Beginner-friendly lessons in Hindi & English', hi: 'हिंदी और अंग्रेजी में शुरुआती-अनुकूल पाठ' },
  mark_complete: { en: 'Mark as Complete', hi: 'पूर्ण चिह्नित करें' },
  completed: { en: 'Completed', hi: 'पूर्ण' },
  take_quiz: { en: 'Take Quiz', hi: 'क्विज़ दें' },
  quiz_title: { en: 'Module Quiz', hi: 'मॉड्यूल क्विज़' },
  quiz_score: { en: 'Your Score', hi: 'आपका स्कोर' },
  quiz_retake: { en: 'Retake Quiz', hi: 'क्विज़ पुनः दें' },
  quiz_back: { en: 'Back to Modules', hi: 'मॉड्यूल पर वापस' },
  next_q: { en: 'Next', hi: 'अगला' },
  submit_quiz: { en: 'Submit', hi: 'जमा करें' },
  correct: { en: 'Correct!', hi: 'सही!' },
  incorrect: { en: 'Incorrect', hi: 'गलत' },
  explanation: { en: 'Explanation', hi: 'व्याख्या' },

  // glossary
  glossary_title: { en: 'Glossary', hi: 'शब्दावली' },
  glossary_sub: { en: 'Search trading terms in Hindi & English', hi: 'ट्रेडिंग शब्द हिंदी और अंग्रेजी में खोजें' },

  // progress
  progress_title: { en: 'Your Progress', hi: 'आपीय प्रगति' },
  modules_completed: { en: 'Modules Completed', hi: 'पूर्ण मॉड्यूल' },
  avg_quiz: { en: 'Avg. Quiz Score', hi: 'औसत क्विज़ स्कोर' },
  total_trades: { en: 'Total Trades', hi: 'कुल ट्रेड' },
  portfolio_value: { en: 'Portfolio Value', hi: 'पोर्टफोलियो मूल्य' },
  overall_progress: { en: 'Overall Progress', hi: 'समग्र प्रगति' },

  // misc
  view_all: { en: 'View all', hi: 'सभी देखें' },
  open_chart: { en: 'Open Chart', hi: 'चार्ट खोलें' },
  trade_now: { en: 'Trade Now', hi: 'अभी ट्रेड करें' },
  loading: { en: 'Loading…', hi: 'लोड हो रहा है…' },
  yes: { en: 'Yes', hi: 'हां' },
  no: { en: 'No', hi: 'नहीं' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  close: { en: 'Close', hi: 'बंद करें' },
  tip_title: { en: 'Trading Tip', hi: 'ट्रेडिंग टिप' },
  educational_tip: { en: 'Educational Tip', hi: 'शैक्षणिक टिप' },
};

export function tr(lang: Lang, key: string): string {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang];
}

export function trBoth(key: string) {
  const entry = T[key];
  return entry ? { en: entry.en, hi: entry.hi } : { en: key, hi: key };
}
