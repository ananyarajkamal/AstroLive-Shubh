/* LanguageContext.tsx - Comprehensive Internationalization Context & Hindi Translation Engine */
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationDictionary } from '../translations';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
  translateValue: (val: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('astrolive_lang') as Language;
    if (saved === 'en' || saved === 'hi') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('astrolive_lang', newLang);
    }
  };

  const translateValue = (val: string): string => {
    if (!val || lang === 'en') return val;

    // 1. Exact Sentence & Phrase Mappings
    const exactPhrases: Record<string, string> = {
      // Delivery Window Titles
      'Chandra Siddhi & Amrit Kaal Muhurat': 'चंद्र सिद्धि एवं अमृत काल मुहूर्त',
      'Rohini Nakshatra & Guru Hora Alignment': 'रोहिणी नक्षत्र एवं गुरु होरा योग',
      'Shukra Hora & Pushya Nakshatra Alignment': 'शुक्र होरा एवं पुष्य नक्षत्र योग',
      'Ravi Hora & Abhijit Muhurat': 'रवि होरा एवं अभिजित मुहूर्त',
      'Shubha Tithi & Budha Hora Alignment': 'शुभ तिथि एवं बुध होरा योग',
      'Optimal Delivery Window': 'उत्कृष्ट वाहन डिलीवरी मुहूर्त',
      'Auspicious Vehicle Delivery Window': 'शुभ वाहन डिलीवरी मुहूर्त',

      // Delivery Window Reasoning
      'Moon transit in Aquarius brings favorable road mobility and safety.': 'कुंभ राशि में चंद्रमा का गोचर यात्रा सुरक्षा और गतिशीलता के लिए अत्यधिक शुभ है।',
      'Moon transit in Taurus brings favorable road mobility and safety.': 'वृषभ राशि में चंद्रमा का गोचर यात्रा सुरक्षा और स्थायित्व प्रदान करता है।',
      'Moon transit in Cancer brings favorable road mobility and safety.': 'कर्क राशि में चंद्रमा का गोचर यात्रा सुरक्षा और शांति प्रदान करता है।',
      'Abhijit Muhurat window strictly bounded within requested target date range.': 'अभिजित मुहूर्त की समय सीमा आपकी अनुरोधित तिथियों के अनुकूल है।',
      'Shubh Hora window aligned with Rohini Nakshatra and Friday planetary energy.': 'शुभ होरा समय रोहिणी नक्षत्र एवं शुक्रवार की ग्रह ऊर्जा से संरेखित है।',
      '4th House Lord aligned favorably for vehicle purchase and long life.': 'चतुर्थेश का शुभ प्रभाव वाहन क्रय और सुख-समृद्धि के लिए अनुकूल है।',
      'Clean lunar Tithi with zero Rahu Kaal overlap during delivery hours.': 'वितरण घंटों के दौरान राहु काल के प्रभाव से मुक्त शुद्ध चंद्र तिथि।',
      'Strong Venus Hora alignment enhances luxury, comfort and resale prestige.': 'शुक्र होरा का बलशाली योग लग्जरी, आराम और प्रतिष्ठा में वृद्धि करता है।',

      // Color Rationale & Descriptions
      'Primary and alternative vehicle paint choices harmonized with your birth Moon sign': 'वाहन के रंगों का चयन आपकी जन्म राशि और ग्रह स्थिति के अनुसार अनुकूलित है।',
      'Purity, peace, high clarity and auspicious Venus alignment': 'पवित्रता, शांति, स्पष्टता एवं शुभ शुक्र ग्रह का प्रभाव',
      'Mercury intelligence, elegance, prestige and durability': 'बुध ग्रह की बौद्धिकता, लालित्य, प्रतिष्ठा एवं स्थायित्व',
      'Sun vitality, royal presence, power and protection': 'सूर्य ग्रह का तेज, शाही उपस्थिति, शक्ति एवं सुरक्षा',
      'Jupiter wisdom, divine protection, prosperity and grace': 'गुरु ग्रह की ज्ञान-ऊर्जा, ईश्वरीय सुरक्षा एवं समृद्धि',
      'Avoid Dark Red / Crimson due to Mars high heat combustion in 4th house': 'चतुर्थ भाव में मंगल के तीव्र प्रभाव के कारण गहरे लाल/क्रिमसन रंग से बचें',
      'Avoid Jet Black due to Saturn obstruction in vehicle 4th house': 'चतुर्थ भाव में शनि के प्रभाव के कारण गहरे काले रंग से बचें',

      // Vastu & First Drive Direction
      'Primary drive direction to East towards temple or sacred venue': 'प्रथम यात्रा पूर्व दिशा की ओर किसी मंदिर या पवित्र स्थान हेतु करें',
      'Drive North or East first to invite Kuber wealth and prosperity': 'कुबेर समृद्धि और लाभ हेतु सर्वप्रथम उत्तर या पूर्व दिशा में वाहन चलाएं',
      'Shukra Hora (Venus Hour) / Guru Hora (Jupiter Hour)': 'शुक्र होरा / गुरु होरा',
      'Local Temple / Sacred Sanctuary / Family Home': 'स्थानीय मंदिर / पवित्र देवालय / पैतृक निवास',
      'Perform brief Vastu Swastika ritual on bonnet before first journey.': 'प्रथम यात्रा से पूर्व वाहन के बोनट पर केसर या सिंदूर से स्वस्तिक पूजन करें।',
      'Offer coconut and flowers at local temple after driving East.': 'पूर्व दिशा की ओर प्रथम यात्रा के पश्चात मंदिर में श्रीफल एवं पुष्प अर्पित करें।',

      // Planetary Energies
      'Venus Luxury Energy': 'शुक्र लग्जरी ऊर्जा',
      'Mercury Intelligence Energy': 'बुध बौद्धिक ऊर्जा',
      'Sun Vitality Energy': 'सूर्य तेज ऊर्जा',
      'Jupiter Prosperity Energy': 'गुरु समृद्धि ऊर्जा',
      'Mars Power Energy': 'मंगल शक्ति ऊर्जा',
      'Saturn Stability Energy': 'शनि स्थायित्व ऊर्जा',
      'Moon Peace Energy': 'चंद्र शांति ऊर्जा',
    };

    if (exactPhrases[val.trim()]) {
      return exactPhrases[val.trim()];
    }

    // 2. Word and Terminology Replacements
    const wordMappings: Record<string, string> = {
      // Nakshatras
      'Ashwini': 'अश्विनी', 'Bharani': 'भरणी', 'Krittika': 'कृत्तिका', 'Rohini': 'रोहिणी',
      'Mrigashira': 'मृगशिरा', 'Ardra': 'आर्द्रा', 'Punarvasu': 'पुनर्वसु', 'Pushya': 'पुष्य',
      'Ashlesha': 'अश्लेषा', 'Magha': 'मघा', 'Purva Phalguni': 'पूर्वा फाल्गुनी',
      'Uttara Phalguni': 'उत्तरा फाल्गुनी', 'Hasta': 'हस्त', 'Chitra': 'चित्रा',
      'Swati': 'स्वाती', 'Vishakha': 'विशाखा', 'Anuradha': 'अनुराधा', 'Jyeshtha': 'ज्येष्ठा',
      'Mula': 'मूल', 'Purva Ashadha': 'पूर्वाषाढ़ा', 'Uttara Ashadha': 'उत्तराषाढ़ा',
      'Shravana': 'श्रवण', 'Dhanishta': 'धनिष्ठा', 'Shatabhisha': 'शतभिषा',
      'Purva Bhadrapada': 'पूर्व भाद्रपद', 'Uttara Bhadrapada': 'उत्तर भाद्रपद', 'Revati': 'रेवती',

      // Rashis
      'Aries': 'मेष', 'Taurus': 'वृषभ', 'Gemini': 'मिथुन', 'Cancer': 'कर्क',
      'Leo': 'सिंह', 'Virgo': 'कन्या', 'Libra': 'तुला', 'Scorpio': 'वृश्चिक',
      'Sagittarius': 'धनु', 'Capricorn': 'मकर', 'Aquarius': 'कुंभ', 'Pisces': 'मीन',

      // Days / Vara
      'Sunday': 'सोमवार', 'Monday': 'सोमवार', 'Tuesday': 'मंगलवार', 'Wednesday': 'बुधवार',
      'Thursday': 'गुरुवार', 'Friday': 'शुक्रवार', 'Saturday': 'शनिवार',
      'Ravivara': 'रविवार', 'Somavara': 'सोमवार', 'Mangalavara': 'मंगलवार',
      'Budhavara': 'बुधवार', 'Guruvara': 'गुरुवार', 'Shukravara': 'शुक्रवार', 'Shanivara': 'शनिवार',

      // Directions
      'East': 'पूर्व', 'West': 'पश्चिम', 'North': 'उत्तर', 'South': 'दक्षिण',
      'North-East': 'उत्तर-पूर्व (ईशान)', 'North-West': 'उत्तर-पश्चिम (वायव्य)',
      'South-East': 'दक्षिण-पूर्व (आग्नेय)', 'South-West': 'दक्षिण-पश्चिम (नैऋत्य)',
      'Northeast': 'उत्तर-पूर्व (ईशान)', 'Northwest': 'उत्तर-पश्चिम (वायव्य)',
      'Southeast': 'दक्षिण-पूर्व (आग्नेय)', 'Southwest': 'दक्षिण-पश्चिम (नैऋत्य)',

      // Vehicle Types
      'Four-Wheeler Car': 'चार पहिया कार', 'Two-Wheeler Bike/Scooter': 'दोपहिया बाइक/स्कूटर',
      'Luxury SUV': 'लक्जरी एसयूवी', 'Electric Vehicle (EV)': 'इलेक्ट्रिक वाहन (EV)',
      'Commercial Vehicle': 'व्यावसायिक वाहन', 'SUV / Crossover': 'एसयूवी / क्रॉसओवर',
      'Sedan': 'सेडान', 'Luxury Premium': 'लक्जरी प्रीमियम', 'Two-Wheeler / Bike': 'दोपहिया / बाइक',
      'Hatchback': 'हैचबैक',

      // Colors
      'White': 'सफेद', 'Silver': 'सिल्वर', 'Black': 'काला', 'Grey': 'ग्रे', 'Gray': 'ग्रे',
      'Red': 'लाल', 'Blue': 'नीला', 'Navy Blue': 'नेवी ब्लू', 'Green': 'हरा',
      'Yellow': 'पीला', 'Gold': 'गोल्ड', 'Brown': 'भूरा', 'Beige': 'बेज',

      // Astrology / Numerology Terms
      'Lagna': 'लग्न', 'Rashi': 'राशि', 'Moon Sign': 'चंद्र राशि', 'Janma Rashi': 'जन्म राशि',
      'Nakshatra': 'नक्षत्र', 'Pada': 'पाद', 'Ayanamsa': 'अयनांश', 'Sidereal Mode': 'निरयन प्रणाली',
      'Driver Number': 'चालक अंक', 'Conductor Number': 'परिचालक अंक',
    };

    let result = val;
    Object.keys(wordMappings).forEach((key) => {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      result = result.replace(regex, wordMappings[key]);
    });

    return result;
  };

  const dictionary = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionary, translateValue }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'en' as Language,
      setLang: () => {},
      t: translations['en'],
      translateValue: (val: string) => val,
    };
  }
  return context;
}
