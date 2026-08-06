import type { Lang } from '@/types';

export interface LessonSection {
  heading: { en: string; hi: string };
  body: { en: string; hi: string };
}

export interface Module {
  id: string;
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  icon: string; // lucide icon name
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  q: { en: string; hi: string };
  options: { en: string; hi: string }[];
  answer: number; // index
  explanation: { en: string; hi: string };
}

export interface GlossaryTerm {
  term: string;
  termHi: string;
  def: { en: string; hi: string };
}

export const MODULES: Module[] = [
  {
    id: 'm1',
    title: { en: 'Stock Market Basics', hi: 'शेयर बाजार की मूल बातें' },
    summary: { en: 'What is a stock, share, index, demat account, and broker.', hi: 'स्टॉक, शेयर, सूचकांक, डीमैट खाता और ब्रोकर क्या हैं।' },
    icon: 'GraduationCap',
    sections: [
      {
        heading: { en: 'What is a stock / share?', hi: 'स्टॉक / शेयर क्या है?' },
        body: {
          en: 'A share is a small unit of ownership in a company. When you buy a share of Reliance, you own a tiny fraction of Reliance Industries. As the company grows, the value of your share can rise. "Stock" generally refers to shares of one or more companies collectively.',
          hi: 'शेयर किसी कंपनी के स्वामित्व का एक छोटा इकाई है। जब आप रिलायंस का शेयर खरीदते हैं, तो आप रिलायंस इंडस्ट्रीज का एक छोटा हिस्सा अपने नाम कर लेते हैं। जैसे-जैसे कंपनी बढ़ती है, आपके शेयर का मूल्य बढ़ सकता है। "स्टॉक" सामान्यतः एक या अधिक कंपनियों के शेयरों को मिलाकर कहा जाता है।',
        },
      },
      {
        heading: { en: 'What is an index? (Nifty 50, Sensex, Bank Nifty)', hi: 'सूचकांक क्या है? (निफ्टी 50, सेंसेक्स, बैंक निफ्टी)' },
        body: {
          en: 'An index measures the overall performance of a group of stocks. Nifty 50 tracks 50 large companies on the NSE. Sensex tracks 30 large companies on the BSE. Bank Nifty tracks major banking stocks. Indices help you gauge market direction at a glance.',
          hi: 'सूचकांक स्टॉक्स के समूह के समग्र प्रदर्शन को मापता है। निफ्टी 50 एनएसई पर 50 बड़ी कंपनियों को ट्रैक करता है। सेंसेक्स बीएसई पर 30 बड़ी कंपनियों को ट्रैक करता है। बैंक निफ्टी प्रमुख बैंकिंग स्टॉक्स को ट्रैक करता है। सूचकांक एक नज़र में बाजार की दिशा बताने में मदद करते हैं।',
        },
      },
      {
        heading: { en: 'Demat account & broker', hi: 'डीमैट खाता और ब्रोकर' },
        body: {
          en: 'A demat (dematerialised) account holds your shares in electronic form — like a bank account for stocks. A broker is the intermediary (e.g. Zerodha, Groww, Upstox) that connects you to the exchange so you can place buy/sell orders. You need both a demat account and a broker to trade.',
          hi: 'डीमैट (डीमैटेरियलाइज्ड) खाता आपके शेयरों को इलेक्ट्रॉनिक रूप में रखता है — जैसे स्टॉक के लिए बैंक खाता। ब्रोकर (जैसे ज़ेरोधा, ग्रो, अपस्टॉक्स) वह मध्यस्थ है जो आपको एक्सचेंज से जोड़ता है ताकि आप खरीद/बिक्री ऑर्डर दे सकें। ट्रेड करने के लिए आपको डीमैट खाता और ब्रोकर दोनों चाहिए।',
        },
      },
    ],
    quiz: [
      {
        q: { en: 'Buying one share of TCS means you…', hi: 'टीसीएस का एक शेयर खरीदने का अर्थ है कि आप…' },
        options: [
          { en: 'Own a small fraction of TCS', hi: 'टीसीएस का एक छोटा हिस्सा अपने नाम करते हैं' },
          { en: 'Lend money to TCS', hi: 'टीसीएस को ऋण देते हैं' },
          { en: 'Become a TCS employee', hi: 'टीसीएस कर्मचारी बन जाते हैं' },
          { en: 'Buy TCS products', hi: 'टीसीएस उत्पाद खरीदते हैं' },
        ],
        answer: 0,
        explanation: { en: 'A share represents partial ownership of the company.', hi: 'शेयर कंपनी के आंशिक स्वामित्व का प्रतिनिधित्व करता है।' },
      },
      {
        q: { en: 'How many companies does Nifty 50 track?', hi: 'निफ्टी 50 कितनी कंपनियों को ट्रैक करता है?' },
        options: [
          { en: '30', hi: '30' },
          { en: '50', hi: '50' },
          { en: '100', hi: '100' },
          { en: '500', hi: '500' },
        ],
        answer: 1,
        explanation: { en: 'Nifty 50 tracks 50 large-cap companies on the NSE.', hi: 'निफ्टी 50 एनएसई पर 50 लार्ज-कैप कंपनियों को ट्रैक करता है।' },
      },
      {
        q: { en: 'What does a demat account do?', hi: 'डीमैट खाता क्या करता है?' },
        options: [
          { en: 'Holds your shares electronically', hi: 'आपके शेयर इलेक्ट्रॉनिक रूप से रखता है' },
          { en: 'Gives you a salary', hi: 'आपको वेतन देता है' },
          { en: 'Pays your taxes', hi: 'आपका टैक्स भरता है' },
          { en: 'Insures your car', hi: 'आपकी कार का बीमा करता है' },
        ],
        answer: 0,
        explanation: { en: 'A demat account holds shares in electronic form.', hi: 'डीमैट खाता शेयरों को इलेक्ट्रॉनिक रूप में रखता है।' },
      },
      {
        q: { en: 'Which of these is a broker?', hi: 'इनमें से कौन सा ब्रोकर है?' },
        options: [
          { en: 'RBI', hi: 'आरबीआई' },
          { en: 'Zerodha', hi: 'ज़ेरोधा' },
          { en: 'Nifty', hi: 'निफ्टी' },
          { en: 'SEBI', hi: 'सेबी' },
        ],
        answer: 1,
        explanation: { en: 'Zerodha is a stock broker connecting you to the exchange.', hi: 'ज़ेरोधा एक स्टॉक ब्रोकर है जो आपको एक्सचेंज से जोड़ता है।' },
      },
      {
        q: { en: 'Sensex is associated with which exchange?', hi: 'सेंसेक्स किस एक्सचेंज से जुड़ा है?' },
        options: [
          { en: 'NSE', hi: 'एनएसई' },
          { en: 'BSE', hi: 'बीएसई' },
          { en: 'RBI', hi: 'आरबीआई' },
          { en: 'NASDAQ', hi: 'नैस्डैक' },
        ],
        answer: 1,
        explanation: { en: 'Sensex tracks 30 companies on the BSE.', hi: 'सेंसेक्स बीएसई पर 30 कंपनियों को ट्रैक करता है।' },
      },
    ],
  },
  {
    id: 'm2',
    title: { en: 'Types of Trading', hi: 'ट्रेडिंग के प्रकार' },
    summary: { en: 'Scalping, Intraday, Swing, Momentum, Position trading & comparison.', hi: 'स्कैल्पिंग, इंट्राडे, स्विंग, मोमेंटम, पोजीशन ट्रेडिंग और तुलना।' },
    icon: 'Repeat',
    sections: [
      {
        heading: { en: 'Scalping', hi: 'स्कैल्पिंग' },
        body: {
          en: 'Scalpers hold positions for seconds to minutes, aiming for many tiny profits through the day. It needs lightning-fast decisions, low brokerage, and high discipline. Very high stress, not for beginners.',
          hi: 'स्कैल्पर पोजीशन कुछ सेकंड से मिनट तक रखते हैं, दिन भर में कई छोटे लाभ कमाने का लक्ष्य रखते हैं। इसके लिए तेज निर्णय, कम ब्रोकरेज और उच्च अनुशासन चाहिए। बहुत तनावपूर्ण, शुरुआती लोगों के लिए नहीं।',
        },
      },
      {
        heading: { en: 'Intraday / Day Trading', hi: 'इंट्राडे / डे ट्रेडिंग' },
        body: {
          en: 'Positions are opened and closed the same trading day — no overnight risk. Uses the MIS product type in Indian brokers. Requires constant screen time and strict stop-losses.',
          hi: 'पोजीशन एक ही ट्रेडिंग दिन में खोली और बंद की जाती है — कोई रात भर का जोखिम नहीं। भारतीय ब्रोकर्स में एमआईएस प्रोडक्ट टाइप का उपयोग करता है। निरंतर स्क्रीन समय और सख्त स्टॉप-लॉस चाहिए।',
        },
      },
      {
        heading: { en: 'Swing Trading', hi: 'स्विंग ट्रेडिंग' },
        body: {
          en: 'Positions held for days to weeks to capture short- to medium-term price swings. Less screen time than intraday, but overnight risk exists. Good for those with a day job.',
          hi: 'पोजीशन कुछ दिन से सप्ताह तक रखी जाती है ताकि छोटे से मध्यम अवधि के मूल्य उतार-चढ़ाव पकड़े जा सकें। इंट्राडे से कम स्क्रीन समय, लेकिन रात भर का जोखिम रहता है। नौकरी करने वालों के लिए अच्छा।',
        },
      },
      {
        heading: { en: 'Momentum Trading', hi: 'मोमेंटम ट्रेडिंग' },
        body: {
          en: 'Buy stocks moving strongly upward with high volume, ride the trend, exit when momentum fades. Relies on identifying trending stocks and entering early in the move.',
          hi: 'तेजी से ऊपर बढ़ रहे और उच्च वॉल्यूम वाले स्टॉक खरीदें, रुख का लाभ उठाएं, और रुख थमने पर बाहर निकलें। ट्रेंडिंग स्टॉक पहचानने और जल्दी प्रवेश करने पर निर्भर करता है।',
        },
      },
      {
        heading: { en: 'Position Trading', hi: 'पोजीशन ट्रेडिंग' },
        body: {
          en: 'Positions held for weeks to months, following long-term trends. Patience is key; less affected by daily noise. Closest to long-term investing among active styles.',
          hi: 'पोजीशन कुछ सप्ताह से महीने तक रखी जाती हैं, दीर्घकालिक रुख का पालन करते हुए। धैर्य मुख्य है; दैनिक उतार-चढ़ाव से कम प्रभावित। सक्रिय स्टाइल में दीर्घकालिक निवेश के सबसे करीब।',
        },
      },
      {
        heading: { en: 'Comparison at a glance', hi: 'एक नज़र में तुलना' },
        body: {
          en: 'Holding period: Scalping (sec–min) < Intraday (1 day) < Momentum (days–weeks) < Swing (days–weeks) < Position (weeks–months). Risk: Scalping highest, Position lowest. Capital needed: Scalping/Intraday can start smaller but need experience; Swing/Position suit larger capital and patience.',
          hi: 'होल्डिंग अवधि: स्कैल्पिंग (सेकंड–मिनट) < इंट्राडे (1 दिन) < मोमेंटम (दिन–सप्ताह) < स्विंग (दिन–सप्ताह) < पोजीशन (सप्ताह–महीने)। जोखिम: स्कैल्पिंग सबसे अधिक, पोजीशन सबसे कम। पूंजी: स्कैल्पिंग/इंट्राडे छोटी शुरुआत कर सकते हैं लेकिन अनुभव चाहिए; स्विंग/पोजीशन बड़ी पूंजी और धैर्य के लिए।',
        },
      },
    ],
    quiz: [
      {
        q: { en: 'Which trading style holds positions for the shortest time?', hi: 'कौन सा स्टाइल सबसे कम समय पोजीशन रखता है?' },
        options: [
          { en: 'Position trading', hi: 'पोजीशन ट्रेडिंग' },
          { en: 'Swing trading', hi: 'स्विंग ट्रेडिंग' },
          { en: 'Scalping', hi: 'स्कैल्पिंग' },
          { en: 'Momentum trading', hi: 'मोमेंटम ट्रेडिंग' },
        ],
        answer: 2,
        explanation: { en: 'Scalping holds positions for seconds to minutes.', hi: 'स्कैल्पिंग पोजीशन कुछ सेकंड से मिनट तक रखती है।' },
      },
      {
        q: { en: 'Intraday trading requires you to…', hi: 'इंट्राडे ट्रेडिंग में आपको…' },
        options: [
          { en: 'Hold positions overnight', hi: 'रात भर पोजीशन रखनी होती है' },
          { en: 'Square off all positions the same day', hi: 'उसी दिन सभी पोजीशन बंद करनी होती हैं' },
          { en: 'Never use stop-loss', hi: 'स्टॉप-लॉस कभी नहीं लगाना' },
          { en: 'Only buy index options', hi: 'केवल इंडेक्स ऑप्शन खरीदना' },
        ],
        answer: 1,
        explanation: { en: 'Intraday positions must be closed before market close.', hi: 'इंट्राडे पोजीशन मार्केट बंद होने से पहले बंद करनी होती हैं।' },
      },
      {
        q: { en: 'Which style best suits someone with a full-time job?', hi: 'पूर्णकालिक नौकरी वाले के लिए कौन सा स्टाइल सबसे उपयुक्त है?' },
        options: [
          { en: 'Scalping', hi: 'स्कैल्पिंग' },
          { en: 'Intraday', hi: 'इंट्राडे' },
          { en: 'Swing trading', hi: 'स्विंग ट्रेडिंग' },
          { en: 'High-frequency scalping', hi: 'हाई-फ्रीक्वेंसी स्कैल्पिंग' },
        ],
        answer: 2,
        explanation: { en: 'Swing trading needs less screen time, suiting busy schedules.', hi: 'स्विंग ट्रेडिंग कम स्क्रीन समय चाहिए, व्यस्त कार्यक्रम के लिए उपयुक्त।' },
      },
      {
        q: { en: 'Momentum traders look for stocks with…', hi: 'मोमेंटम ट्रेडर किस प्रकार के स्टॉक ढूंढते हैं?' },
        options: [
          { en: 'Low volume and flat price', hi: 'कम वॉल्यूम और सपाट मूल्य' },
          { en: 'Strong directional move with high volume', hi: 'उच्च वॉल्यूम के साथ मजबूत दिशा' },
          { en: 'Falling prices only', hi: 'केवल गिरते मूल्य' },
          { en: 'No price change', hi: 'कोई मूल्य परिवर्तन नहीं' },
        ],
        answer: 1,
        explanation: { en: 'Momentum trading rides strong moves with volume confirmation.', hi: 'मोमेंटम ट्रेडिंग वॉल्यूम पुष्टि के साथ मजबूत चाल पर सवारी करती है।' },
      },
      {
        q: { en: 'Position trading is closest to…', hi: 'पोजीशन ट्रेडिंग सबसे करीब है…' },
        options: [
          { en: 'Day trading', hi: 'डे ट्रेडिंग' },
          { en: 'Long-term investing', hi: 'दीर्घकालिक निवेश' },
          { en: 'Scalping', hi: 'स्कैल्पिंग' },
          { en: 'Arbitrage', hi: 'आर्बिट्राज' },
        ],
        answer: 1,
        explanation: { en: 'Position trading follows long-term trends over weeks/months.', hi: 'पोजीशन ट्रेडिंग सप्ताह/महीनों के दीर्घकालिक रुख का पालन करती है।' },
      },
    ],
  },
  {
    id: 'm3',
    title: { en: 'How to Analyze Before Buying', hi: 'खरीदने से पहले विश्लेषण कैसे करें' },
    summary: { en: 'Candlesticks, support/resistance, volume, fundamental vs technical.', hi: 'कैंडलस्टिक, सपोर्ट/रेजिस्टेंस, वॉल्यूम, फंडामेंटल बनाम टेक्निकल।' },
    icon: 'LineChart',
    sections: [
      {
        heading: { en: 'Candlestick charts & price trends', hi: 'कैंडलस्टिक चार्ट और मूल्य रुख' },
        body: {
          en: 'A candle shows open, high, low, and close for a period. A green/white candle means close > open (bullish); red/black means close < open (bearish). A series of rising candles = uptrend; falling candles = downtrend. Reading the trend is step one before buying.',
          hi: 'एक कैंडल किसी अवधि के ओपन, हाई, लो, और क्लोज दिखाती है। हरी/सफेद कैंडल का अर्थ क्लोज > ओपन (बुलिश); लाल/काली का अर्थ क्लोज < ओपन (बेयरिश)। बढ़ती कैंडलें = अपट्रेंड; गिरती कैंडलें = डाउनट्रेंड। खरीदने से पहले रुख पहचानना पहला कदम है।',
        },
      },
      {
        heading: { en: 'Support & resistance (concept)', hi: 'सपोर्ट और रेजिस्टेंस (अवधारणा)' },
        body: {
          en: 'Support is a price level where a stock tends to stop falling — buyers step in. Resistance is where it tends to stop rising — sellers step in. Think of support as a floor and resistance as a ceiling. Prices often bounce between them until a breakout occurs.',
          hi: 'सपोर्ट वह मूल्य स्तर है जहाँ स्टॉक गिरना रोक देता है — खरीदार सक्रिय होते हैं। रेजिस्टेंस वह स्तर है जहाँ बढ़ना रुक जाता है — विक्रेता सक्रिय होते हैं। सपोर्ट को फर्श और रेजिस्टेंस को छत समझें। मूल्य अक्सर इनके बीच उछलते हैं जब तक ब्रेकआउट न हो।',
        },
      },
      {
        heading: { en: 'Volume analysis basics', hi: 'वॉल्यूम विश्लेषण की मूल बातें' },
        body: {
          en: 'Volume is the number of shares traded in a period. A price move on high volume is considered more reliable than one on low volume. Breakouts above resistance with strong volume are watched more closely than low-volume moves, which can be false signals.',
          hi: 'वॉल्यूम किसी अवधि में ट्रेड किए गए शेयरों की संख्या है। उच्च वॉल्यूम पर मूल्य चाल को कम वॉल्यूम से अधिक भरोसेमंद माना जाता है। रेजिस्टेंस से ऊपर मजबूत वॉल्यूम वाले ब्रेकआउट पर ध्यान दिया जाता है; कम वॉल्यूम वाले चाल फॉल्स सिग्नल हो सकते हैं।',
        },
      },
      {
        heading: { en: 'Fundamental vs technical analysis', hi: 'फंडामेंटल बनाम टेक्निकल विश्लेषण' },
        body: {
          en: 'Fundamental analysis studies a company\'s business — earnings, revenue, debt, P/E ratio, growth — to decide if a stock is worth holding long-term. Technical analysis studies price & volume charts to time entries and exits. Long-term investors lean fundamental; short-term traders lean technical. Many combine both.',
          hi: 'फंडामेंटल विश्लेषण कंपनी के व्यवसाय का अध्ययन करता है — आय, राजस्व, कर्ज, पी/ई अनुपात, वृद्धि — यह तय करने के लिए कि स्टॉक दीर्घकाल में रखने योग्य है या नहीं। टेक्निकल विश्लेषण मूल्य और वॉल्यूम चार्ट का अध्ययन करता है ताकि प्रवेश और निकास का समय तय हो। दीर्घकालिक निवेशक फंडामेंटल, अल्पकालिक ट्रेडर टेक्निकल पर निर्भर रहते हैं। अनेक दोनों मिलाते हैं।',
        },
      },
    ],
    quiz: [
      {
        q: { en: 'A green candle means…', hi: 'हरी कैंडल का अर्थ है…' },
        options: [
          { en: 'Close is below open', hi: 'क्लोज ओपन से नीचे' },
          { en: 'Close is above open', hi: 'क्लोज ओपन से ऊपर' },
          { en: 'No trading happened', hi: 'कोई ट्रेड नहीं हुआ' },
          { en: 'Price is suspended', hi: 'मूल्य निलंबित है' },
        ],
        answer: 1,
        explanation: { en: 'Green/bullish candle: close higher than open.', hi: 'हरी/बुलिश कैंडल: क्लोज ओपन से ऊपर।' },
      },
      {
        q: { en: 'Support acts like a…', hi: 'सपोर्ट कार्य करता है जैसे…' },
        options: [
          { en: 'Ceiling', hi: 'छत' },
          { en: 'Floor', hi: 'फर्श' },
          { en: 'Wall of fire', hi: 'आग की दीवार' },
          { en: 'Tax', hi: 'टैक्स' },
        ],
        answer: 1,
        explanation: { en: 'Support is a floor where prices tend to stop falling.', hi: 'सपोर्ट फर्श है जहाँ मूल्य गिरना रोक देते हैं।' },
      },
      {
        q: { en: 'A breakout on low volume is often…', hi: 'कम वॉल्यूम पर ब्रेकआउट अक्सर…' },
        options: [
          { en: 'More reliable', hi: 'अधिक भरोसेमंद' },
          { en: 'A possible false signal', hi: 'संभावित फॉल्स सिग्नल' },
          { en: 'Guaranteed profit', hi: 'गारंटीड लाभ' },
          { en: 'Illegal', hi: 'गैर-कानूनी' },
        ],
        answer: 1,
        explanation: { en: 'Low-volume breakouts can be false signals.', hi: 'कम वॉल्यूम वाले ब्रेकआउट फॉल्स सिग्नल हो सकते हैं।' },
      },
      {
        q: { en: 'Fundamental analysis focuses on…', hi: 'फंडामेंटल विश्लेषण किस पर केंद्रित है?' },
        options: [
          { en: 'Chart patterns only', hi: 'केवल चार्ट पैटर्न' },
          { en: 'Company earnings & business', hi: 'कंपनी की आय और व्यवसाय' },
          { en: 'Broker mood', hi: 'ब्रोकर का मूड' },
          { en: 'Astrology', hi: 'ज्योतिष' },
        ],
        answer: 1,
        explanation: { en: 'Fundamental analysis studies the business behind the stock.', hi: 'फंडामेंटल विश्लेषण स्टॉक के पीछे के व्यवसाय का अध्ययन करता है।' },
      },
      {
        q: { en: 'Technical analysis is mainly used to…', hi: 'टेक्निकल विश्लेषण मुख्य रूप से उपयोग होता है…' },
        options: [
          { en: 'Time entries & exits', hi: 'प्रवेश और निकास का समय तय करने' },
          { en: 'Audit a company', hi: 'कंपनी का ऑडिट' },
          { en: 'Pay dividends', hi: 'लाभांश देने' },
          { en: 'File taxes', hi: 'टैक्स भरने' },
        ],
        answer: 0,
        explanation: { en: 'Technical analysis helps time trades using charts.', hi: 'टेक्निकल विश्लेषण चार्ट से ट्रेड का समय तय करने में मदद करता है।' },
      },
    ],
  },
  {
    id: 'm4',
    title: { en: 'Entry & Exit Strategy Concepts', hi: 'प्रवेश और निकास रणनीति अवधारणाएँ' },
    summary: { en: 'Breakouts, targets, stop-loss, position sizing, risk-reward.', hi: 'ब्रेकआउट, लक्ष्य, स्टॉप-लॉस, पोजीशन साइजिंग, रिस्क-रिवॉर्ड।' },
    icon: 'Target',
    sections: [
      {
        heading: { en: 'Entry: breakout & trend confirmation', hi: 'प्रवेश: ब्रेकआउट और रुख पुष्टि' },
        body: {
          en: 'A breakout entry waits for price to cross above resistance (or below support) with volume, suggesting a new move has started. Trend confirmation waits for clear higher-highs and higher-lows before entering. These are general concepts — not guaranteed buy signals. Always combine with a stop-loss.',
          hi: 'ब्रेकआउट प्रवेश मूल्य के रेजिस्टेंस से ऊपर (या सपोर्ट से नीचे) वॉल्यूम के साथ टूटने की प्रतीक्षा करता है, जिससे नई चाल शुरू होने का संकेत मिलता है। रुख पुष्टि स्पष्ट उच्च-हाई और उच्च-लो की प्रतीक्षा करती है। ये सामान्य अवधारणाएँ हैं — गारंटीड खरीद सिग्नल नहीं। हमेशा स्टॉप-लॉस के साथ जोड़ें।',
        },
      },
      {
        heading: { en: 'Exit: target price & stop-loss', hi: 'निकास: लक्ष्य मूल्य और स्टॉप-लॉस' },
        body: {
          en: 'Before entering, decide your target (where you\'ll book profit) and stop-loss (where you\'ll exit to limit loss if wrong). A trailing stop-loss moves up as price moves in your favor, locking profit. Never enter a trade without knowing both exit points.',
          hi: 'प्रवेश से पहले अपना लक्ष्य (जहाँ लाभ बुक करेंगे) और स्टॉप-लॉस (गलत होने पर हानि सीमित करने के लिए निकास) तय करें। ट्रेलिंग स्टॉप-लॉस मूल्य अनुकूल बढ़ने पर ऊपर खिसकता है, लाभ सुरक्षित करता है। बिना दोनों निकास बिंदु जाने ट्रेड में प्रवेश न करें।',
        },
      },
      {
        heading: { en: 'Risk management: position sizing', hi: 'जोखिम प्रबंधन: पोजीशन साइजिंग' },
        body: {
          en: 'Position sizing decides how much capital to risk per trade. A common rule: risk only 1–2% of your total capital on a single trade. If your capital is ₹1,00,000 and stop-loss is ₹10 on 100 shares, the risk is ₹1,000 (1%). This keeps you in the game after inevitable losses.',
          hi: 'पोजीशन साइजिंग तय करती है कि प्रति ट्रेड कितनी पूंजी जोखिम में डालें। सामान्य नियम: एक ट्रेड में कुल पूंजी का केवल 1–2% जोखिम लें। यदि पूंजी ₹1,00,000 है और स्टॉप-लॉस 100 शेयर पर ₹10 है, तो जोखिम ₹1,000 (1%) है। यह अनिवार्य हानियों के बाद भी आपको खेल में रखता है।',
        },
      },
      {
        heading: { en: 'Risk-reward ratio', hi: 'रिस्क-रिवॉर्ड अनुपात' },
        body: {
          en: 'Risk-reward (R:R) compares potential loss to potential gain. A 1:2 ratio means you risk ₹1 to make ₹2. With a 1:2 R:R, you can be wrong more than half the time and still be profitable. Beginners should aim for at least 1:1.5 or 1:2.',
          hi: 'रिस्क-रिवॉर्ड (आर:आर) संभावित हानि की संभावित लाभ से तुलना करता है। 1:2 अनुपात का अर्थ है ₹1 जोखिम लेकर ₹2 कमाना। 1:2 आर:आर पर आप आधे से अधिक बार गलत होकर भी लाभदायक रह सकते हैं। शुरुआती को कम से कम 1:1.5 या 1:2 का लक्ष्य रखना चाहिए।',
        },
      },
    ],
    quiz: [
      {
        q: { en: 'A breakout entry waits for price to…', hi: 'ब्रेकआउट प्रवेश मूल्य के…' },
        options: [
          { en: 'Stay flat', hi: 'सपाट रहने' },
          { en: 'Cross a key level with volume', hi: 'वॉल्यूम के साथ मुख्य स्तर तोड़ने' },
          { en: 'Hit zero', hi: 'शून्य पर पहुँचने' },
          { en: 'Be suspended', hi: 'निलंबित होने' },
        ],
        answer: 1,
        explanation: { en: 'Breakouts need price to cross support/resistance with volume.', hi: 'ब्रेकआउट के लिए मूल्य का सपोर्ट/रेजिस्टेंस वॉल्यूम से टूटना जरूरी।' },
      },
      {
        q: { en: 'A trailing stop-loss…', hi: 'ट्रेलिंग स्टॉप-लॉस…' },
        options: [
          { en: 'Stays fixed forever', hi: 'हमेशा स्थिर रहता है' },
          { en: 'Moves in your favor to lock profit', hi: 'लाभ सुरक्षित करने अनुकूल खिसकता है' },
          { en: 'Is never used', hi: 'कभी उपयोग नहीं होता' },
          { en: 'Increases your losses', hi: 'हानि बढ़ाता है' },
        ],
        answer: 1,
        explanation: { en: 'Trailing stop-loss moves with price to lock gains.', hi: 'ट्रेलिंग स्टॉप-लॉस मूल्य के साथ खिसककर लाभ सुरक्षित करता है।' },
      },
      {
        q: { en: 'A common position-sizing rule is to risk…', hi: 'सामान्य पोजीशन-साइजिंग नियम के अनुसार जोखिम…' },
        options: [
          { en: '100% per trade', hi: 'प्रति ट्रेड 100%' },
          { en: '1–2% of capital per trade', hi: 'प्रति ट्रेड पूंजी का 1–2%' },
          { en: '0% always', hi: 'हमेशा 0%' },
          { en: '50% per trade', hi: 'प्रति ट्रेड 50%' },
        ],
        answer: 1,
        explanation: { en: 'Risking 1–2% per trade protects you from ruin.', hi: 'प्रति ट्रेड 1–2% जोखिम आपको बचाता है।' },
      },
      {
        q: { en: 'A 1:2 risk-reward ratio means…', hi: '1:2 रिस्क-रिवॉर्ड अनुपात का अर्थ है…' },
        options: [
          { en: 'Risk ₹2 to make ₹1', hi: '₹2 जोखिम लेकर ₹1 कमाना' },
          { en: 'Risk ₹1 to make ₹2', hi: '₹1 जोखिम लेकर ₹2 कमाना' },
          { en: 'No risk at all', hi: 'बिल्कुल कोई जोखिम नहीं' },
          { en: 'Only losses', hi: 'केवल हानि' },
        ],
        answer: 1,
        explanation: { en: '1:2 means risking 1 unit to gain 2.', hi: '1:2 का अर्थ 1 जोखिम लेकर 2 लाभ।' },
      },
      {
        q: { en: 'Before entering any trade you should know…', hi: 'किसी भी ट्रेड में प्रवेश से पहले आपको पता होना चाहिए…' },
        options: [
          { en: 'Only the target', hi: 'केवल लक्ष्य' },
          { en: 'Only the stop-loss', hi: 'केवल स्टॉप-लॉस' },
          { en: 'Both target and stop-loss', hi: 'लक्ष्य और स्टॉप-लॉस दोनों' },
          { en: 'Neither', hi: 'दोनों में से कोई नहीं' },
        ],
        answer: 2,
        explanation: { en: 'Plan both exits before entering.', hi: 'प्रवेश से पहले दोनों निकास तय करें।' },
      },
    ],
  },
];

export const GLOSSARY: GlossaryTerm[] = [
  { term: 'Stop-loss', termHi: 'स्टॉप-लॉस', def: { en: 'A price level at which you exit a losing trade to limit your loss.', hi: 'वह मूल्य स्तर जहाँ आप हानि सीमित करने के लिए हारे ट्रेड से बाहर निकलते हैं।' } },
  { term: 'Resistance', termHi: 'रेजिस्टेंस', def: { en: 'A price level where a stock tends to stop rising due to selling pressure.', hi: 'वह मूल्य स्तर जहाँ बिकवाली दबाव से स्टॉक बढ़ना रोक देता है।' } },
  { term: 'Support', termHi: 'सपोर्ट', def: { en: 'A price level where a stock tends to stop falling due to buying pressure.', hi: 'वह मूल्य स्तर जहाँ खरीदारी दबाव से स्टॉक गिरना रोक देता है।' } },
  { term: 'Volatility', termHi: 'वोलैटिलिटी', def: { en: 'How much and how fast a price moves. High volatility means big swings.', hi: 'मूल्य कितना और कितनी तेजी से बदलता है। उच्च वोलैटिलिटी बड़े उतार-चढ़ाव का संकेत।' } },
  { term: 'P/E Ratio', termHi: 'पी/ई अनुपात', def: { en: 'Price-to-Earnings ratio: share price divided by earnings per share. A valuation metric.', hi: 'मूल्य-से-आय अनुपात: शेयर मूल्य को प्रति शेयर आय से विभाजित। मूल्यांकन मापदंड।' } },
  { term: 'CNC', termHi: 'सीएनसी', def: { en: 'Cash and Carry — delivery product type for holding shares beyond a day.', hi: 'कैश एंड कैरी — एक दिन से अधिक शेयर रखने के लिए डिलीवरी प्रोडक्ट टाइप।' } },
  { term: 'MIS', termHi: 'एमआईएस', def: { en: 'Margin Intraday Square-off — intraday product type; positions auto-close at market end.', hi: 'मार्जिन इंट्राडे स्क्वायर-ऑफ — इंट्राडे प्रोडक्ट टाइप; पोजीशन मार्केट अंत में स्वतः बंद।' } },
  { term: 'Breakout', termHi: 'ब्रेकआउट', def: { en: 'When price moves beyond a support/resistance level, often with volume.', hi: 'जब मूल्य सपोर्ट/रेजिस्टेंस स्तर से आगे बढ़ता है, अक्सर वॉल्यूम के साथ।' } },
  { term: 'Bullish', termHi: 'बुलिश', def: { en: 'An outlook expecting prices to rise.', hi: 'मूल्य बढ़ने की अपेक्षा वाला दृष्टिकोण।' } },
  { term: 'Bearish', termHi: 'बेयरिश', def: { en: 'An outlook expecting prices to fall.', hi: 'मूल्य गिरने की अपेक्षा वाला दृष्टिकोण।' } },
  { term: 'Liquidity', termHi: 'लिक्विडिटी', def: { en: 'How easily a stock can be bought/sold without big price impact.', hi: 'स्टॉक को बिना बड़े मूल्य प्रभाव के कितनी आसानी से खरीद/बेचा जा सकता है।' } },
  { term: 'Market Order', termHi: 'मार्केट ऑर्डर', def: { en: 'An order to buy/sell immediately at the current market price.', hi: 'वर्तमान मार्केट मूल्य पर तुरंत खरीद/बिक्री का ऑर्डर।' } },
  { term: 'Limit Order', termHi: 'लिमिट ऑर्डर', def: { en: 'An order to buy/sell only at a specified price or better.', hi: 'केवल निर्दिष्ट मूल्य या उससे बेहतर पर खरीद/बिक्री का ऑर्डर।' } },
  { term: 'Volume', termHi: 'वॉल्यूम', def: { en: 'Number of shares traded in a given period.', hi: 'किसी अवधि में ट्रेड किए गए शेयरों की संख्या।' } },
  { term: 'Dividend', termHi: 'लाभांश', def: { en: 'A share of company profits paid to shareholders.', hi: 'कंपनी के लाभ का हिस्सा जो शेयरधारकों को भुगतान किया जाता है।' } },
  { term: 'IPO', termHi: 'आईपीओ', def: { en: 'Initial Public Offering — a company first selling shares to the public.', hi: 'प्रारंभिक सार्वजनिक प्रस्ताव — कंपनी पहली बार शेयर सार्वजनिक बेचती है।' } },
];

export interface TipContent {
  title: { en: string; hi: string };
  body: { en: string; hi: string };
}

export const TIPS: Record<string, TipContent> = {
  buy_without_check: {
    title: { en: 'Did you check the resistance?', hi: 'क्या आपने रेजिस्टेंस जाँचा?' },
    body: {
      en: 'You placed a buy without reviewing nearby resistance. Resistance is a ceiling where sellers often appear. Buying just below resistance can mean a poor entry. Next time, glance at the chart and recent highs first.',
      hi: 'आपने नज़दीकी रेजिस्टेंस देखे बिना खरीद दिया। रेजिस्टेंस एक छत है जहाँ विक्रेता अक्सर सक्रिय होते हैं। रेजिस्टेंस के ठीक नीचे खरीदना कमज़ोर प्रवेश हो सकता है। अगली बार पहले चार्ट और हाल के उच्च देखें।',
    },
  },
  buy_market: {
    title: { en: 'Market order executes instantly', hi: 'मार्केट ऑर्डर तुरंत निष्पादित' },
    body: {
      en: 'A market order fills at the current price — fast, but you don\'t control the exact price. In volatile stocks a limit order can give a better entry. Decide based on how much price precision matters to you.',
      hi: 'मार्केट ऑर्डर वर्तमान मूल्य पर भरता है — तेज, लेकिन सटीक मूल्य आपके नियंत्रण में नहीं। वोलैटाइल स्टॉक में लिमिट ऑर्डर बेहतर प्रवेश दे सकता है। मूल्य सटीकता कितनी मायने रखती है, उसी आधार पर चुनें।',
    },
  },
  buy_limit: {
    title: { en: 'Limit order waits for your price', hi: 'लिमिट ऑर्डर आपके मूल्य की प्रतीक्षा' },
    body: {
      en: 'Your limit order will only execute if the simulated price reaches your target. This gives price control but may never fill. If it doesn\'t fill, you can cancel and re-evaluate.',
      hi: 'आपका लिमिट ऑर्डर तभी निष्पादित होगा जब सिम्युलेटेड मूल्य आपके लक्ष्य तक पहुँचे। यह मूल्य नियंत्रण देता है लेकिन शायद कभी न भरे। न भरने पर आप रद्द करकर पुनः विचार कर सकते हैं।',
    },
  },
  sell_market: {
    title: { en: 'Did you book a planned exit?', hi: 'क्या आपने नियोजित निकास किया?' },
    body: {
      en: 'Selling at market locks in your result. Ideally this exit was planned before entry — a target for profit or a stop-loss to cap loss. Exit plans made in advance beat decisions made in the moment.',
      hi: 'मार्केट पर बिक्री आपका परिणाम तय करती है। आदर्श रूप में यह निकास प्रवेश से पहले नियोजित हो — लाभ के लिए लक्ष्य या हानि सीमित करने के लिए स्टॉप-लॉस। पहले से बना निकास योजना उस क्षण के निर्णय से बेहतर है।',
    },
  },
  mis_intraday: {
    title: { en: 'Intraday positions auto-square-off', hi: 'इंट्राडे पोजीशन स्वतः बंद' },
    body: {
      en: 'MIS (intraday) positions must be closed the same day. Real brokers auto-square them near market close. Practice planning your exit before the day ends — overnight risk is the key difference from CNC delivery.',
      hi: 'एमआईएस (इंट्राडे) पोजीशन उसी दिन बंद करनी होती हैं। असली ब्रोकर मार्केट बंदी के पास स्वतः बंद कर देते हैं। दिन खत्म होने से पहले निकास योजना बनाने का अभ्यास करें — रात भर का जोखिम सीएनसी से मुख्य अंतर है।',
    },
  },
  cnc_delivery: {
    title: { en: 'CNC = delivery, no time pressure', hi: 'सीएनसी = डिलीवरी, समय दबाव नहीं' },
    body: {
      en: 'CNC holdings stay until you choose to sell — like swing or position trading. This suits learning trends and patience. You still track P&L, but without intraday time pressure.',
      hi: 'सीएनसी होल्डिंग तब तक रहती है जब तक आप बेचना चुनें — स्विंग या पोजीशन ट्रेडिंग जैसा। यह रुख और धैर्य सीखने के लिए उपयुक्त। आप लाभ/हानि देखते हैं, लेकिन इंट्राडे समय दबाव नहीं।',
    },
  },
};

export function tipForOrder(side: string, type: string, product: string): string | undefined {
  if (side === 'BUY' && type === 'MARKET' && Math.random() < 0.5) return 'buy_without_check';
  if (side === 'BUY' && type === 'MARKET') return 'buy_market';
  if (side === 'BUY' && type === 'LIMIT') return 'buy_limit';
  if (side === 'SELL') return 'sell_market';
  if (product === 'MIS') return 'mis_intraday';
  if (product === 'CNC') return 'cnc_delivery';
  return undefined;
}

export function pickTip(lang: Lang): TipContent {
  const keys = Object.keys(TIPS);
  const k = keys[Math.floor(Math.random() * keys.length)];
  return TIPS[k];
}
