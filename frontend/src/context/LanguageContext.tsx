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

    // 1. Word & Terminology Dictionary
    const wordMappings: Record<string, string> = {
      // Activity & Purpose Full Titles
      'Griha Pravesh Housewarming': 'गृह प्रवेश',
      'Bhoomi Pujan Foundation Laying': 'भूमि पूजन',
      'Property Registration & Purchase': 'संपत्ति पंजीकरण एवं क्रय',
      'Key Handover & Property Entry': 'चाबी सुपुर्दगी एवं गृह प्रवेश',
      'Pillar & Foundation Work': 'नींव निर्माण कार्य',
      'Company Incorporation & Legal Registration': 'कंपनी स्थापना एवं पंजीकरण',
      'Business Grand Launch': 'व्यावसायिक भव्य शुभारंभ',
      'Shop & Showroom Opening': 'दुकान एवं शोरूम उद्घाटन',
      'New Office Opening & Puja': 'कार्यालय उद्घाटन एवं पूजन',
      'Commercial Ribbon Cutting Ceremony': 'रिबन कटिंग समारोह',
      'Key Product Launch': 'नवीन उत्पाद लॉन्च',
      'Personal Gold & Wealth Purchase': 'व्यक्तिगत स्वर्ण एवं संपत्ति क्रय',
      'Auspicious Gold Gift Acquisition': 'स्वर्ण उपहार एवं मांगलिक क्रय',
      'Dhanteras & Pushya Gold Buying': 'धनतेरस एवं पुष्य नक्षत्र स्वर्ण क्रय',
      'Gold Asset Purchase': 'स्वर्ण संपत्ति क्रय',
      'Gold Gift Acquisition': 'स्वर्ण उपहार क्रय',
      'Gemstone Activation & Acquisition': 'रत्न धारण एवं पूजन मुहूर्त',

      // Property & Activity Short Terms
      'home': 'गृह / मकान', 'plot': 'भूखंड / प्लॉट', 'apartment': 'अपार्टमेंट / फ्लैट', 'commercial': 'व्यावसायिक संपत्ति',
      'Home / House': 'गृह / मकान', 'Land / Plot': 'भूखंड / प्लॉट', 'Apartment / Flat': 'अपार्टमेंट / फ्लैट', 'Commercial Property': 'व्यावसायिक संपत्ति',
      'griha_pravesh': 'गृह प्रवेश', 'bhoomi_pujan': 'भूमि पूजन', 'purchase': 'संपत्ति क्रय / पंजीकरण', 'handover': 'चाबी सुपुर्दगी', 'foundation': 'नींव निर्माण कार्य',
      'Griha Pravesh (House Entry)': 'गृह प्रवेश', 'Bhoomi Pujan (Ground Laying)': 'भूमि पूजन', 'Property Purchase / Registration': 'संपत्ति क्रय / पंजीकरण', 'Key Handover': 'चाबी सुपुर्दगी', 'Pillar Foundation Work': 'नींव निर्माण कार्य',

      // Orientation Terms
      'east': 'पूर्व', 'north': 'उत्तर', 'north-east': 'उत्तर-पूर्व (ईशान)', 'west': 'पश्चिम', 'north-west': 'उत्तर-पश्चिम (वायव्य)', 'south-east': 'दक्षिण-पूर्व (आग्नेय)', 'south': 'दक्षिण', 'south-west': 'दक्षिण-पश्चिम (नैऋत्य)',
      'East Facing': 'पूर्व मुखी', 'North Facing': 'उत्तर मुखी', 'North-East Facing': 'उत्तर-पूर्व मुखी (ईशान)', 'West Facing': 'पश्चिम मुखी', 'North-West Facing': 'उत्तर-पश्चिम मुखी (वायव्य)', 'South-East Facing': 'दक्षिण-पूर्व मुखी (आग्नेय)', 'South Facing': 'दक्षिण मुखी', 'South-West Facing': 'दक्षिण-पश्चिम मुखी (नैऋत्य)',

      // Business & Numerology Terms
      'inauguration': 'व्यावसायिक उद्घाटन', 'brand_numerology': 'ब्रांड नाम अंक ज्योतिष', 'retail': 'रिटेल / दुकान', 'tech': 'टेक / आईटी फर्म', 'office': 'कॉरपोरेट कार्यालय',
      'Commercial Inauguration': 'व्यावसायिक उद्घाटन', 'Brand Name Numerology': 'ब्रांड नाम अंक ज्योतिष', 'Retail Store / Shop': 'रिटेल / दुकान', 'Tech / IT Firm': 'टेक / आईटी फर्म', 'Corporate Office': 'कॉरपोरेट कार्यालय',

      // Swarna & Gemstones
      'gold': 'स्वर्ण क्रय (सोना)', 'gemstone': 'रत्न धारण', 'Gold Acquisition': 'स्वर्ण क्रय (सोना)', 'Gemstone Recommendation': 'रत्न सिफारिश',
      'Yellow Sapphire / Pukhraj': 'पुखराज (Yellow Sapphire)', 'Ruby / Manik': 'माणिक (Ruby)', 'Pearl / Moti': 'मोती (Pearl)', 'Red Coral / Moonga': 'मूंगा (Red Coral)', 'Emerald / Panna': 'पन्ना (Emerald)', 'Diamond / Heera': 'हीरा (Diamond)', 'Blue Sapphire / Neelam': 'नीलम (Blue Sapphire)',

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

      // Days / Vara full strings from backend
      'Sunday (Ravivar)': 'रविवार', 'Monday (Somvar)': 'सोमवार', 'Tuesday (Mangalvar)': 'मंगलवार',
      'Wednesday (Budhvar)': 'बुधवार', 'Thursday (Guruvar)': 'गुरुवार',
      'Friday (Shukravar)': 'शुक्रवार', 'Saturday (Shanivar)': 'शनिवार',
      'Sunday': 'रविवार', 'Monday': 'सोमवार', 'Tuesday': 'मंगलवार', 'Wednesday': 'बुधवार',
      'Thursday': 'गुरुवार', 'Friday': 'शुक्रवार', 'Saturday': 'शनिवार',
      'Ravivara': 'रविवार', 'Somavara': 'सोमवार', 'Mangalavara': 'मंगलवार',
      'Budhavara': 'बुधवार', 'Guruvara': 'गुरुवार', 'Shukravara': 'शुक्रवार', 'Shanivara': 'शनिवार',

      // Directions
      'East': 'पूर्व', 'West': 'पश्चिम', 'North': 'उत्तर', 'South': 'दक्षिण',
      'North-East': 'उत्तर-पूर्व', 'North-West': 'उत्तर-पश्चिम',
      'South-East': 'दक्षिण-पूर्व', 'South-West': 'दक्षिण-पश्चिम',
      'Northeast': 'उत्तर-पूर्व', 'Northwest': 'उत्तर-पश्चिम',
      'Southeast': 'दक्षिण-पूर्व', 'Southwest': 'दक्षिण-पश्चिम',

      // Vehicle Types
      'Four-Wheeler Car': 'चार पहिया कार', 'Two-Wheeler Bike/Scooter': 'दोपहिया बाइक/स्कूटर',
      'Luxury SUV': 'लक्जरी एसयूवी', 'Electric Vehicle (EV)': 'इलेक्ट्रिक वाहन (EV)',
      'Commercial Vehicle': 'व्यावसायिक वाहन', 'SUV / Crossover': 'एसयूवी / क्रॉसओवर',
      'Sedan': 'सेडान', 'Luxury Premium': 'लक्जरी प्रीमियम', 'Two-Wheeler / Bike': 'दोपहिया / बाइक',
      'Hatchback': 'हैचबैक',

      // Vahan Colour Names
      'Warm Bronze / Champagne Gold': 'वार्म ब्रॉन्ज़ / शैम्पेन गोल्ड',
      'Pearl White / Glacier Silver': 'पर्ल व्हाइट / ग्लेशियर सिल्वर',
      'Pearl White / Moonstone Silver': 'पर्ल व्हाइट / मूनस्टोन सिल्वर',
      'Emerald Metallic Green': 'एमरल्ड मेटैलिक ग्रीन',
      'Deep Midnight Navy / Metallic Blue': 'डीप मिडनाइट नेवी / मेटैलिक ब्लू',
      'Champagne Gold / Soft Bronze': 'शैम्पेन गोल्ड / सॉफ्ट ब्रॉन्ज़',
      'Crimson Red / Metallic Flame': 'क्रिमसन रेड / मेटैलिक फ्लेम',
      'Matte Black / Charcoal Ash': 'मैट ब्लैक / चारकोल ऐश',
      'Dark Charcoal / Ash Black': 'डार्क चारकोल / ऐश ब्लैक',
      'Dark Charcoal / Black': 'डार्क चारकोल / ब्लैक',
      'Jet Black': 'जेट ब्लैक',
      'Midnight Dark Blue': 'मिडनाइट डार्क ब्लू',
      'Matte Black': 'मैट ब्लैक',
      'Pure White': 'शुद्ध सफेद',
      'Bright Vermilion Red': 'ब्राइट वर्मिलियन रेड',
      'Bright Flame Red': 'ब्राइट फ्लेम रेड',
      'Bright Yellow / Amber': 'ब्राइट यलो / एम्बर',

      // Colors & Metals
      'White': 'सफेद', 'Silver': 'सिल्वर', 'Black': 'काला', 'Grey': 'ग्रे', 'Gray': 'ग्रे',
      'Red': 'लाल', 'Blue': 'नीला', 'Navy Blue': 'नेवी ब्लू', 'Green': 'हरा',
      'Yellow': 'पीला', 'Gold': 'स्वर्ण', 'Brown': 'भूरा', 'Beige': 'बेज',
      'Gift': 'उपहार', 'Purchase': 'क्रय', 'Acquisition': 'क्रय', 'Guidance': 'मार्गदर्शन',

      // Vahan Direction Vastu Symbols
      'Purva Vastu Alignment (Sun Rule)': 'पूर्वी वास्तु संरेखण (सूर्य नियम)',
      'Ishan Kona Vastu Alignment (Jupiter & Venus)': 'ईशान कोण वास्तु संरेखण (गुरु एवं शुक्र)',
      'Ishan Kona Vastu Alignment (Jupiter Rule)': 'ईशान कोण वास्तु संरेखण (गुरु नियम)',
      'Uttara Vastu Alignment (Mercury Rule)': 'उत्तरी वास्तु संरेखण (बुध नियम)',
      'Vayavya Vastu Alignment (Moon Rule)': 'वायव्य वास्तु संरेखण (चंद्र नियम)',
      'Vayavya Vastu Alignment (Saturn & Rahu Rule)': 'वायव्य वास्तु संरेखण (शनि एवं राहु नियम)',
      'Pashchima Vastu Alignment (Venus Rule)': 'पश्चिमी वास्तु संरेखण (शुक्र नियम)',
      'Pashchima Vastu Alignment (Saturn Rule)': 'पश्चिमी वास्तु संरेखण (शनि नियम)',
      'Agneya Vastu Alignment (Mars Rule)': 'आग्नेय वास्तु संरेखण (मंगल नियम)',

      // Vahan Hora Strings
      'Sun / Mars Hora (08:00 - 09:30 AM)': 'सूर्य / मंगल होरा (08:00 - 09:30 AM)',
      'Guru Hora (09:15 - 10:30 AM)': 'गुरु होरा (09:15 - 10:30 AM)',
      'Budh Hora (10:00 - 11:15 AM)': 'बुध होरा (10:00 - 11:15 AM)',
      'Budh Hora (09:30 - 10:45 AM)': 'बुध होरा (09:30 - 10:45 AM)',
      'Chandra Hora (08:30 - 09:45 AM)': 'चंद्र होरा (08:30 - 09:45 AM)',
      'Surya Hora (07:30 - 08:45 AM)': 'सूर्य होरा (07:30 - 08:45 AM)',
      'Shukra Hora (10:15 - 11:30 AM)': 'शुक्र होरा (10:15 - 11:30 AM)',
      'Mangal Hora (08:15 - 09:30 AM)': 'मंगल होरा (08:15 - 09:30 AM)',
      'Guru Hora (09:00 - 10:15 AM)': 'गुरु होरा (09:00 - 10:15 AM)',
      'Shani / Budh Hora (11:00 AM - 12:15 PM)': 'शनि / बुध होरा (11:00 AM - 12:15 PM)',
      'Shani Hora (10:30 - 11:45 AM)': 'शनि होरा (10:30 - 11:45 AM)',
      'Guru Hora (09:30 - 10:45 AM)': 'गुरु होरा (09:30 - 10:45 AM)',

      // Vahan First Destination Strings
      'Nearby Temple or Elevated Landmark': 'निकटवर्ती मंदिर या उच्च स्थल',
      'Nearby Temple or Flowing Waterbody': 'निकटवर्ती मंदिर या बहती जलधारा',
      'Prominent Commercial Avenue or Garden': 'प्रमुख व्यावसायिक मार्ग या उद्यान',
      'Waterfront, Lake, or Serene Place of Worship': 'जलतट, झील या शांत पूजा स्थल',
      'Royal Monument or Main City Square': 'शाही स्मारक या मुख्य शहर चौक',
      'Botanical Park or Financial District': 'वनस्पति उद्यान या वित्तीय जिला',
      'Aesthetic Promenade or Temple': 'सुंदर सैरगाह या मंदिर',
      'Nearby Temple or Hilltop Viewpoint': 'निकटवर्ती मंदिर या पहाड़ी दृश्य स्थल',
      'Sacred Pilgrimage Temple or University Campus': 'तीर्थ मंदिर या विश्वविद्यालय परिसर',
      'Historic Stone Monument or Corporate Plaza': 'ऐतिहासिक स्मारक या कॉर्पोरेट प्लाज़ा',
      'Modern Technology Park or Scenic Bridge': 'आधुनिक प्रौद्योगिकी पार्क या दर्शनीय पुल',
      'Riverbank, Lake, or Peaceful Temple': 'नदी किनारा, झील या शांत मंदिर',

      // Astrology / Numerology Terms
      'Lagna': 'लग्न', 'Rashi': 'राशि', 'Moon Sign': 'चंद्र राशि', 'Janma Rashi': 'जन्म राशि',
      'Nakshatra': 'नक्षत्र', 'Pada': 'पाद', 'Ayanamsa': 'अयनांश', 'Sidereal Mode': 'निरयन प्रणाली',
      'Driver Number': 'चालक अंक', 'Conductor Number': 'परिचालक अंक',
    };

    // 2. Exact Sentence & Phrase Mappings
    const exactPhrases: Record<string, string> = {
      // Swarna Guidance Types & Purposes (exact, upper, title, snake_case)
      'Gold Purchase': 'स्वर्ण क्रय',
      'GOLD PURCHASE': 'स्वर्ण क्रय',
      'gold_purchase': 'स्वर्ण क्रय',
      'Gold Gift': 'स्वर्ण उपहार क्रय',
      'GOLD GIFT': 'स्वर्ण उपहार क्रय',
      'gold_gift': 'स्वर्ण उपहार क्रय',
      'Gemstone Guidance': 'रत्न धारण एवं परामर्श',
      'GEMSTONE GUIDANCE': 'रत्न धारण एवं परामर्श',
      'gemstone_guidance': 'रत्न धारण एवं परामर्श',
      'Personal': 'व्यक्तिगत क्रय',
      'PERSONAL': 'व्यक्तिगत क्रय',
      'personal': 'व्यक्तिगत क्रय',
      'Gift': 'उपहार क्रय',
      'GIFT': 'उपहार क्रय',
      'gift': 'उपहार क्रय',
      'Auspicious': 'शुभ / मांगलिक क्रय',
      'AUSPICIOUS': 'शुभ / मांगलिक क्रय',
      'auspicious': 'शुभ / मांगलिक क्रय',
      'Personal Jewellery': 'व्यक्तिगत आभूषण क्रय',
      'Marriage / Gift': 'विवाह / उपहार हेतु क्रय',
      'Investment / Bullion': 'निवेश / बुलियन (सोना)',

      // Swarna Gemstones
      'Ruby (Manik)': 'माणिक्य (रुबी)',
      'Ruby': 'माणिक्य',
      'Pearl (Moti)': 'मोती (पर्ल)',
      'Pearl': 'मोती',
      'Red Coral (Moonga)': 'मूंगा (रेड कोरल)',
      'Red Coral': 'मूंगा',
      'Emerald (Panna)': 'पन्ना (एमरल्ड)',
      'Emerald': 'पन्ना',
      'Yellow Sapphire (Pukhraj)': 'पुखराज (येलो नीलम)',
      'Yellow Sapphire': 'पुखराज',
      'Diamond (Heera)': 'हीरा (डायमंड)',
      'Diamond': 'हीरा',
      'Blue Sapphire (Neelam)': 'नीलम (ब्लू नीलम)',
      'Blue Sapphire': 'नीलम',
      'Hessonite (Gomed)': 'गोमेद (हेसोनाइट)',
      'Hessonite': 'गोमेद',
      'Cat Eye (Lehsuniya)': 'लहसुनिया (कैट्स आई)',
      'Cat Eye': 'लहसुनिया',

      // Griha Property Types & Activities
      'Home / Villa': 'घर / विला',
      'Plot / Land': 'भूखंड / भूमि',
      'Apartment / Flat': 'अपार्टमेंट / फ्लैट',
      'Commercial Office': 'व्यावसायिक कार्यालय',
      'Bhoomi Pujan Foundation Laying': 'भूमि पूजन एवं नीव निर्माण',
      'Bhoomi Pujan': 'भूमि पूजन',
      'Griha Pravesh Housewarming': 'गृह प्रवेश एवं शांति पूजन',
      'Griha Pravesh': 'गृह प्रवेश',
      'Property Registration & Purchase': 'संपत्ति पंजीकरण एवं क्रय',
      'Key Handover & Property Entry': 'चाबी हस्तांतरण एवं गृह प्रवेश',
      'Key Handover': 'चाबी हस्तांतरण',
      'Pillar & Foundation Work': 'स्तंभ एवं नीव निर्माण कार्य',
      'Pillar & Foundation': 'स्तंभ एवं नीव निर्माण',

      // Vyapar Business Types & Milestones
      'Retail Shop': 'खुदरा दुकान (रिटेल)',
      'E-Commerce / Digital': 'ई-कॉमर्स / डिजिटल व्यापार',
      'Ecommerce / Digital': 'ई-कॉमर्स / डिजिटल व्यापार',
      'Manufacturing': 'विनिर्माता / उद्योग',
      'Services / Consulting': 'सेवाएं / परामर्श',
      'Restaurant / Cafe': 'रेस्टोरेंट / कैफे',
      'Real Estate / Infra': 'रियल एस्टेट / इंफ्रास्ट्रक्चर',
      'Finance / Tech': 'वित्त / प्रौद्योगिकी',
      'Company Incorporation & Legal Registration': 'कंपनी निगमन एवं कानूनी पंजीकरण',
      'Business Grand Launch': 'व्यापारिक भव्य शुभारंभ',
      'Shop & Showroom Opening': 'दुकान एवं शोरूम का उद्घाटन',
      'New Office Opening & Puja': 'नए कार्यालय का उद्घाटन एवं पूजा',
      'Commercial Ribbon Cutting Ceremony': 'व्यावसायिक फीता कटाई समारोह',
      'Key Product Launch': 'प्रमुख उत्पाद का शुभारंभ',
      'Incorporation': 'कंपनी निगमन',
      'Launch': 'व्यापारिक शुभारंभ',
      'Shop Opening': 'दुकान उद्घाटन',
      'Office Opening': 'कार्यालय उद्घाटन',
      'Ribbon Cutting': 'फीता कटाई समारोह',
      'Product Launch': 'उत्पाद शुभारंभ',

      // Swarna Purpose Titles (from backend PURPOSES dict)
      'Personal Gold & Wealth Purchase': '\u0935\u094d\u092f\u0915\u094d\u0924\u093f\u0917\u0924 \u0938\u094d\u0935\u0930\u094d\u0923 \u090f\u0935\u0902 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u0915\u094d\u0930\u092f',
      'Auspicious Gold Gift Acquisition': '\u0936\u0941\u092d \u0938\u094d\u0935\u0930\u094d\u0923 \u0909\u092a\u0939\u093e\u0930 \u090f\u0935\u0902 \u092e\u093e\u0902\u0917\u0932\u093f\u0915 \u0915\u094d\u0930\u092f',
      'Dhanteras & Pushya Gold Buying': '\u0927\u0928\u0924\u0947\u0930\u0938 \u090f\u0935\u0902 \u092a\u0941\u0937\u094d\u092f \u0928\u0915\u094d\u0937\u0924\u094d\u0930 \u0938\u094d\u0935\u0930\u094d\u0923 \u0915\u094d\u0930\u092f',
      'Gold Asset Purchase': '\u0938\u094d\u0935\u0930\u094d\u0923 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u0915\u094d\u0930\u092f',
      'Gold Gift Acquisition': '\u0938\u094d\u0935\u0930\u094d\u0923 \u0909\u092a\u0939\u093e\u0930 \u0915\u094d\u0930\u092f',
      'Gemstone Activation & Acquisition': '\u0930\u0924\u094d\u0928 \u0927\u093e\u0930\u0923 \u090f\u0935\u0902 \u092a\u0942\u091c\u0928 \u092e\u0941\u0939\u0942\u0930\u094d\u0924',
      'Gold Acquisition': '\u0938\u094d\u0935\u0930\u094d\u0923 \u0915\u094d\u0930\u092f',


      // Swarna Gemstone Compatibility Categories (note: 'Highly Compatible' already at line 394)
      'Compatible': 'अनुकूल',
      'Conditionally Compatible': 'शर्त सहित अनुकूल',
      'Requires Expert Guidance': 'विशेषज्ञ मार्गदर्शन आवश्यक',
      'Not Recommended': 'अनुशंसित नहीं',

      // Swarna Recommended Metals
      '24k Yellow Gold or Sterling Silver': '24 \u0915\u0948\u0930\u0947\u091f \u092a\u0940\u0932\u093e \u0938\u094b\u0928\u093e \u092f\u093e \u0938\u094d\u091f\u0930\u094d\u0932\u093f\u0902\u0917 \u091a\u093e\u0902\u0926\u0940',
      'Yellow Gold (24k or 22k)': '\u092a\u0940\u0932\u093e \u0938\u094b\u0928\u093e (24k \u092f\u093e 22k)',
      'White Gold or Platinum': '\u0935\u094d\u0939\u093e\u0907\u091f \u0917\u094b\u0932\u094d\u0921 \u092f\u093e \u092a\u094d\u0932\u0948\u091f\u093f\u0928\u092e',
      'Sterling Silver or White Metal': '\u0938\u094d\u091f\u0930\u094d\u0932\u093f\u0902\u0917 \u091a\u093e\u0902\u0926\u0940 \u092f\u093e \u0938\u092b\u0947\u0926 \u0927\u093e\u0924\u0941',
      'Red Coral Metal (Copper Setting)': '\u092e\u0942\u0902\u0917\u093e \u0927\u093e\u0924\u0941 (\u0924\u093e\u0902\u092c\u0947 \u0915\u0940 \u0938\u0947\u091f\u093f\u0902\u0917)',
      'Yellow Gold (Panchadhatu)': '\u092a\u0940\u0932\u093e \u0938\u094b\u0928\u093e (\u092a\u0902\u091a\u0927\u093e\u0924\u0941)',

      // Swarna Wearing Times
      'Sunday Morning during Sun Hora': '\u0930\u0935\u093f\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u0938\u0942\u0930\u094d\u092f \u0939\u094b\u0930\u093e \u092e\u0947\u0902',
      'Monday Morning during Moon Hora': '\u0938\u094b\u092e\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u091a\u0902\u0926\u094d\u0930 \u0939\u094b\u0930\u093e \u092e\u0947\u0902',
      'Thursday Morning during Jupiter Hora': '\u0917\u0941\u0930\u0941\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u0917\u0941\u0930\u0941 \u0939\u094b\u0930\u093e \u092e\u0947\u0902',
      'Friday Morning during Venus Hora': '\u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u0936\u0941\u0915\u094d\u0930 \u0939\u094b\u0930\u093e \u092e\u0947\u0902',
      'Saturday Morning during Saturn Hora': '\u0936\u0928\u093f\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u0936\u0928\u093f \u0939\u094b\u0930\u093e \u092e\u0947\u0902',
      'Wednesday Morning during Mercury Hora': '\u092c\u0941\u0927\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u092c\u0941\u0927 \u0939\u094b\u0930\u093e \u092e\u0947\u0902',
      'Tuesday Morning during Mars Hora': '\u092e\u0902\u0917\u0932\u0935\u093e\u0930 \u092a\u094d\u0930\u093e\u0924: \u092e\u0902\u0917\u0932 \u0939\u094b\u0930\u093e \u092e\u0947\u0902',

      // Swarna Caution Notes
      'Wear on ring finger of right hand as per traditional guidance.': '\u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u0905\u0928\u0941\u0938\u093e\u0930 \u0926\u093e\u0939\u093f\u0928\u0947 \u0939\u093e\u0925 \u0915\u0940 \u0905\u0928\u093e\u092e\u093f\u0915\u093e \u0909\u0902\u0917\u0932\u0940 \u092e\u0947\u0902 \u0927\u093e\u0930\u0923 \u0915\u0930\u0947\u0902\u0964',
      'Traditional association with vital energy, clarity, and executive leadership.': '\u091c\u0940\u0935\u0928 \u090a\u0930\u094d\u091c\u093e, \u0938\u094d\u092a\u0937\u094d\u091f\u0924\u093e \u0914\u0930 \u0915\u093e\u0930\u094d\u092f\u0915\u093e\u0930\u0940 \u0928\u0947\u0924\u0943\u0924\u094d\u0935 \u0915\u0947 \u0938\u093e\u0925 \u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u0938\u0902\u092c\u0902\u0927\u0964',

      // (Note: 'Traditional gold purchases...', 'Astrological calculations use Swiss...', 
      //  'All calculated timing windows...' and 'Astrological timings provide...' already exist below)

      // Vahan Delivery Window Titles
      'Chandra Siddhi & Amrit Kaal Muhurat': 'चंद्र सिद्धि एवं अमृत काल मुहूर्त',
      'Bhauma Siddhi & Tejas Muhurat': 'भौम सिद्धि एवं तेजस मुहूर्त',
      'Budh Siddhi & Abhijit Muhurat': 'बुध सिद्धि एवं अभिजित मुहूर्त',
      'Amrit Siddhi & Pushya Nakshatra Muhurat': 'अमृत सिद्धि एवं पुष्य नक्षत्र मुहूर्त',
      'Shukra Siddhi & Rohini Muhurat': 'शुक्र सिद्धि एवं रोहिणी मुहूर्त',
      'Siddha Yoga & Shani Transit Muhurat': 'सिद्ध योग एवं शनि गोचर मुहूर्त',
      'Shubh Abhijit & Surya Muhurat': 'शुभ अभिजित एवं सूर्य मुहूर्त',
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

      // Vahan Colour Descriptions (all rashis)
      'Projects royal authority, luxury luster, and commanding road presence.': 'शाही अधिकार, वैभव चमक और प्रभावशाली उपस्थिति प्रदर्शित करता है।',
      'Balances solar intensity with elegant composure.': 'सौर ऊर्जा की तीव्रता को सुंदर संतुलन प्रदान करता है।',
      'Projects dynamic courage, warmth, and high vitality.': 'गतिशील साहस, ऊर्जा और उच्च जीवन शक्ति प्रदर्शित करता है।',
      'Provides calming balance and driving clarity.': 'शांत संतुलन और ड्राइविंग स्पष्टता प्रदान करता है।',
      'May attract sluggish energy and thermal heat absorption.': 'आलसी ऊर्जा और ताप अवशोषण को आकर्षित कर सकता है।',
      'Enhances mental clarity, driving calm, and keeps vehicle energy pure.': 'मानसिक स्पष्टता, शांत ड्राइविंग और वाहन की शुद्ध ऊर्जा को बढ़ाता है।',
      'Attracts prosperity, harmony, and elegant road presence.': 'समृद्धि, सामंजस्य और सुंदर सड़क उपस्थिति को आकर्षित करता है।',
      'Projects executive elegance, stability, and high durability.': 'कार्यकारी लालित्य, स्थिरता और उच्च टिकाऊपन प्रदर्शित करता है।',
      'May induce restless driving energy.': 'अशांत ड्राइविंग ऊर्जा उत्पन्न कर सकता है।',
      'Enhances sharp focus, quick adaptability, and intelligence.': 'तीव्र फोकस, त्वरित अनुकूलनशीलता और बुद्धिमत्ता को बढ़ाता है।',
      'Keeps vehicle energy light, pure, and refined.': 'वाहन ऊर्जा को हल्का, शुद्ध और परिष्कृत रखता है।',
      'May absorb heat and mask road visibility.': 'ताप अवशोषित कर सड़क दृश्यता को कम कर सकता है।',
      'Brings serene emotional calm, safety, and pristine vehicle aura.': 'शांत भावनात्मक संतुलन, सुरक्षा और शुद्ध वाहन ऊर्जा लाता है।',
      'Brings divine protection and luxury luster.': 'दिव्य सुरक्षा और वैभव चमक लाता है।',
      'Contrasts with sensitive lunar energy.': 'संवेदनशील चंद्र ऊर्जा के विपरीत है।',
      'Projects executive precision, timeless durability, and calm focus.': 'कार्यकारी सटीकता, कालातीत टिकाऊपन और शांत फोकस प्रदर्शित करता है।',
      'Keeps driving environment pristine and organized.': 'ड्राइविंग वातावरण को शुद्ध और व्यवस्थित रखता है।',
      'May cause unnecessary agitation during dense traffic.': 'घने यातायात में अनावश्यक उत्तेजना उत्पन्न कर सकता है।',
      'Enhances aesthetic elegance, smooth rides, and peace of mind.': 'सौंदर्य लालित्य, सुचारु सवारी और मन की शांति बढ़ाता है।',
      'Attracts abundance, vehicle comfort, and auspicious trips.': 'समृद्धि, वाहन आराम और शुभ यात्राओं को आकर्षित करता है।',
      'May absorb road heat and obscure nighttime visibility.': 'सड़क की गर्मी अवशोषित कर रात्रि दृश्यता कम कर सकता है।',
      'Provides powerful stealth, confidence, and intense road resilience.': 'शक्तिशाली आत्मविश्वास और तीव्र सड़क लचीलापन प्रदान करता है।',
      'Brings warmth, protection, and executive prestige.': 'ऊष्मा, सुरक्षा और कार्यकारी प्रतिष्ठा लाता है।',
      'Too passive for intense Martian energy.': 'तीव्र मंगल ऊर्जा के लिए अत्यधिक निष्क्रिय है।',
      'Brings auspicious fortune, expansion, and long-distance journey luck.': 'शुभ भाग्य, विस्तार और लंबी दूरी की यात्रा का सौभाग्य लाता है।',
      'Maintains pure energy during highway drives.': 'राजमार्ग यात्राओं के दौरान शुद्ध ऊर्जा बनाए रखता है।',
      'Dampens adventurous Sagittarian spirit.': 'साहसी धनु भावना को दबा सकता है।',
      'Projects supreme authority, structural strength, and high longevity.': 'सर्वोच्च अधिकार, संरचनात्मक शक्ति और दीर्घायु प्रदर्शित करता है।',
      'Adds refined balance to heavy Saturnian presence.': 'भारी शनि उपस्थिति में परिष्कृत संतुलन जोड़ता है।',
      'May create friction with disciplined Saturn energy.': 'अनुशासित शनि ऊर्जा के साथ टकराव उत्पन्न कर सकता है।',
      'Emphasizes futuristic technology, EV innovation, and bold style.': 'भविष्यवादी प्रौद्योगिकी, EV नवाचार और साहसी शैली पर जोर देता है।',
      'Keeps vehicle cabin cool and serene.': 'वाहन केबिन को ठंडा और शांत रखता है।',
      'May clash with subtle electric tones.': 'सूक्ष्म इलेक्ट्रिक टोन के साथ टकराव हो सकता है।',
      'Surrounds vehicle with divine grace, peace, and prosperity.': 'वाहन को दिव्य कृपा, शांति और समृद्धि से घेरता है।',
      'Enhances tranquil driving and intuitive safety.': 'शांत ड्राइविंग और सहज सुरक्षा को बढ़ाता है।',
      'May absorb heavy external road vibrations.': 'भारी बाहरी सड़क कंपन अवशोषित कर सकता है।',
      'May diminish royal solar shine.': 'शाही सौर चमक को कम कर सकता है।',

      // Vahan Colour Rationale Sentences (per rashi)
      'Aries is ruled by Mars. Warm metallic shades enhance vital energy while white/silver maintains serene driving focus.': 'मेष राशि मंगल ग्रह द्वारा शासित है। गर्म धात्विक रंग महत्वपूर्ण ऊर्जा बढ़ाते हैं जबकि सफेद/चांदी शांत ड्राइविंग फोकस बनाए रखता है।',
      'Taurus is ruled by Venus. Light metallic and emerald shades enhance luxury comfort, aesthetic harmony, and resale value.': 'वृषभ राशि शुक्र ग्रह द्वारा शासित है। हल्के धात्विक और पन्ना रंग लग्जरी आराम, सौंदर्य सामंजस्य और पुनर्विक्रय मूल्य बढ़ाते हैं।',
      'Gemini is ruled by Mercury. Green and silver tones boost mental alertness, smooth navigation, and communication flow.': 'मिथुन राशि बुध ग्रह द्वारा शासित है। हरे और चांदी के रंग मानसिक सतर्कता, सुचारु नेविगेशन और संचार प्रवाह बढ़ाते हैं।',
      'Cancer is ruled by the Moon. White and silver shades amplify intuitive safety and peaceful commutes.': 'कर्क राशि चंद्रमा द्वारा शासित है। सफेद और चांदी के रंग सहज सुरक्षा और शांतिपूर्ण यात्रा को बढ़ाते हैं।',
      'Leo is ruled by the Sun. Gold, bronze, and radiant silver reflect leadership, prestige, and prosperity.': 'सिंह राशि सूर्य द्वारा शासित है। गोल्ड, ब्रॉन्ज़ और तेजस्वी सिल्वर नेतृत्व, प्रतिष्ठा और समृद्धि को दर्शाते हैं।',
      'Virgo is ruled by Mercury. Navy blue and silver encourage analytical precision and flawless vehicle upkeep.': 'कन्या राशि बुध ग्रह द्वारा शासित है। नेवी ब्लू और सिल्वर विश्लेषणात्मक सटीकता और निर्दोष वाहन रखरखाव को प्रोत्साहित करते हैं।',
      'Libra is ruled by Venus. White, champagne, and silver tones promote perfect equilibrium and aesthetic delight.': 'तुला राशि शुक्र ग्रह द्वारा शासित है। सफेद, शैम्पेन और सिल्वर रंग पूर्ण संतुलन और सौंदर्य आनंद को बढ़ावा देते हैं।',
      'Scorpio is ruled by Mars. Deep navy blue and bronze shades reflect strength, determination, and safety.': 'वृश्चिक राशि मंगल ग्रह द्वारा शासित है। गहरे नेवी ब्लू और ब्रॉन्ज़ रंग शक्ति, दृढ़ता और सुरक्षा को दर्शाते हैं।',
      'Sagittarius is ruled by Jupiter. Gold, bronze, and bright silver amplify optimistic energy and travel luck.': 'धनु राशि गुरु ग्रह द्वारा शासित है। गोल्ड, ब्रॉन्ज़ और चमकीले सिल्वर आशावादी ऊर्जा और यात्रा सौभाग्य को बढ़ाते हैं।',
      'Capricorn is ruled by Saturn. Midnight navy, metallic blue, and silver foster durability, safety, and long lifespan.': 'मकर राशि शनि ग्रह द्वारा शासित है। मिडनाइट नेवी, मेटैलिक ब्लू और सिल्वर टिकाऊपन, सुरक्षा और दीर्घ आयुष्य को बढ़ावा देते हैं।',
      'Aquarius is ruled by Saturn and Rahu. Metallic blue, navy, and silver support cutting-edge technology and smooth mobility.': 'कुंभ राशि शनि और राहु द्वारा शासित है। मेटैलिक ब्लू, नेवी और सिल्वर अत्याधुनिक प्रौद्योगिकी और सुचारु गतिशीलता को समर्थन देते हैं।',
      'Pisces is ruled by Jupiter. Champagne gold, bronze, and pearl white bring divine harmony and calm travels.': 'मीन राशि गुरु ग्रह द्वारा शासित है। शैम्पेन गोल्ड, ब्रॉन्ज़ और पर्ल व्हाइट दिव्य सामंजस्य और शांत यात्राएं लाते हैं।',

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

      // Griha Vastu & Muhurat Sentences
      'Main door in North-East quadrant attracts prosperity, peace, and wisdom.': 'उत्तर-पूर्व दिशा में मुख्य द्वार समृद्धि, शांति और ज्ञान को आकर्षित करता है।',
      'Balanced Water & Earth elements align with owner Janma Rashi.': 'जल एवं पृथ्वी तत्व का संतुलन स्वामी की जन्म राशि के अनुकूल है।',
      'North-East (Ishan Kona)': 'उत्तर-पूर्व (ईशान कोण)',
      'East (Indra Kona)': 'पूर्व (इंद्र कोण)',
      'North (Kuber Kona)': 'उत्तर (कुबेर कोण)',
      'North-West (Vayu Kona)': 'उत्तर-पश्चिम (वायु कोण)',
      'South-East (Agni Kona)': 'दक्षिण-पूर्व (अग्नि कोण)',

      // Vastu Orientation Rationale Sentences
      'North is governed by Kubera (wealth) and Mercury. Highly suitable for prosperity and clear intellectual harmony.': 'उत्तर दिशा कुबेर (धन) और बुध ग्रह द्वारा शासित है। समृद्धि और बौद्धिक सद्भाव के लिए अत्यधिक उपयुक्त।',
      'East is governed by Indra and Sun. Brings vitality, social respect, and auspicious sunrise energy into the home.': 'पूर्व दिशा इंद्र और सूर्य देव द्वारा शासित है। घर में तेज, सामाजिक प्रतिष्ठा और शुभ सूर्योदय ऊर्जा लाती है।',
      'Ishan corner governed by Jupiter. Ideal for spiritual peace, clarity, and overall family well-being.': 'ईशान कोण गुरु (बृहस्पति) द्वारा शासित है। आध्यात्मिक शांति, मानसिक स्पष्टता और परिवार के कल्याण के लिए सर्वोत्तम।',
      'Vayu corner governed by Moon. Encourages movement, social connections, and harmonious domestic relationships.': 'वायव्य कोण चंद्र देव द्वारा शासित है। गतिशीलता, सामाजिक संबंधों और सामंजस्यपूर्ण पारिवारिक रिश्तों को बढ़ावा देता है।',
      'West is governed by Varuna and Saturn. Highly stable for long-term property ownership and steady wealth retention.': 'पश्चिम दिशा वरुण एवं शनि देव द्वारा शासित है। दीर्घकालिक संपत्ति स्वामित्व और संपत्ति संचय हेतु अत्यंत स्थिर।',
      'Agni corner governed by Venus. Ideal for kitchen placement; main entrance requires bright lighting and brass remedies.': 'आग्नेय कोण शुक्र ग्रह द्वारा शासित है। रसोईघर की स्थापना हेतु सर्वोत्तम; मुख्य द्वार पर पर्याप्त प्रकाश एवं पीतल के उपाय आवश्यक हैं।',
      'Yama direction governed by Mars. Provides strength and security when the main entrance threshold is properly aligned.': 'दक्षिण दिशा यम एवं मंगल ग्रह द्वारा शासित है। मुख्य प्रवेश द्वार सही ढंग से संरेखित होने पर शक्ति और सुरक्षा प्रदान करता है।',
      'Nairrutya corner governed by Rahu. Best suited for master bedroom placement rather than the main entry threshold.': 'नैऋत्य कोण राहु ग्रह द्वारा शासित है। मुख्य द्वार के बजाय मास्टर बेडरूम की स्थापना हेतु सर्वाधिक उपयुक्त।',

      // Vastu Recommendations & Notes
      'Ensure the North-East (Ishan) corner of the property is kept clean, uncluttered, and well-lit.': 'संपत्ति के उत्तर-पूर्व (ईशान) कोण को स्वच्छ, बाधा-मुक्त एवं प्रकाशमान रखें।',
      'Place the primary kitchen stove or hearth in the South-East (Agni) quadrant for health and vitality.': 'स्वास्थ्य एवं ऊर्जा हेतु रसोईघर या चूल्हे को दक्षिण-पूर्व (आग्नेय) कोण में स्थापित करें।',
      'Designate the South-West (Nairrutya) sector for master bedroom or heavy stability storage.': 'मास्टर बेडरूम या भारी सामान के स्थायित्व हेतु दक्षिण-पश्चिम (नैऋत्य) कोण निर्धारित करें।',
      'All calculated Muhurat windows are strictly bounded within your requested date range.': 'सभी परिकलित मुहूर्त आपकी अनुरोधित तिथियों के भीतर ही सीमित हैं।',
      'Astrological timings are calculated deterministically using Swiss Ephemeris sidereal Lahiri Ayanamsa.': 'ज्योतिषीय समय की गणना स्विस्स एफिमेरिस निरयन लाहिड़ी अयनांश द्वारा सटीक रूप से की गई है।',

      // Vyapar Business & Numerology Sentences
      'Chaldean destiny compound sum evaluated for commercial growth, fame and customer attraction.': 'व्यावसायिक वृद्धि, प्रसिद्धि और ग्राहक आकर्षण के लिए चाल्डियन न्यूमेरोलॉजी का विश्लेषण।',
      'Business incorporation & launch timing aligned with Mercury & Jupiter Hora.': 'बुध और गुरु होरा के साथ संरेखित व्यावसायिक स्थापना और उद्घाटन मुहूर्त।',
      'Highly Auspicious Business Launch Window': 'अत्यंत शुभ व्यावसायिक शुभारंभ मुहूर्त',
      'Auspicious Brand Destiny Compound': 'शुभ ब्रांड भाग्य यौगिक अंक',
      'All calculated commercial milestone windows are strictly bounded within your requested date range.': 'सभी परिकलित व्यावसायिक मुहूर्त आपकी अनुरोधित तिथि सीमा के भीतर ही सीमित हैं।',
      'Astrological timings provide auspicious timing windows only and do not constitute financial guarantees.': 'ज्योतिषीय समय केवल शुभ मुहूर्त का मार्गदर्शन प्रदान करता है और यह कोई वित्तीय गारंटी नहीं है।',
      'Calculated deterministically using Swiss Ephemeris sidereal Lahiri Ayanamsa.': 'गणना स्विस्स एफिमेरिस निरयन लाहिड़ी अयनांश द्वारा सटीक रूप से की गई है।',

      // Swarna & Pushya Alignment Sentences
      'Pushya Nakshatra & Dhanteras alignment for gold purchase bringing eternal Lakshmi prosperity.': 'पुष्य नक्षत्र और धनतेरस का शुभ योग जो अक्षय लक्ष्मी समृद्धि लाता है।',
      'Birth Moon sign gemstone compatibility evaluated for planetary strength and health.': 'ग्रह बल और स्वास्थ्य के लिए जन्म राशि के अनुसार रत्न अनुकूलता विश्लेषण।',
      'Pushya Nakshatra Gold Buying Window': 'पुष्य नक्षत्र स्वर्ण क्रय शुभ मुहूर्त',
      'Optimal Birth Gemstone Alignment': 'उत्कृष्ट जन्म रत्न अनुकूलता',
      'All calculated timing windows are strictly bounded within your requested date range.': 'सभी परिकलित समय विंडोज आपकी अनुरोधित तिथि सीमा के भीतर सीमित हैं।',
      'Astrological calculations use Swiss Ephemeris sidereal Lahiri Ayanamsa.': 'ज्योतिषीय गणना स्विस्स एफिमेरिस निरयन लाहिड़ी अयनांश पर आधारित है।',
      'Traditional gold purchases during Pushya Nakshatra and Dhanteras are considered highly auspicious.': 'पुष्य नक्षत्र और धनतेरस के दौरान पारंपरिक स्वर्ण क्रय अत्यंत शुभ माना जाता है।',

      // Gemstone Traditional Associations & Cautions
      'Traditional association with vital energy, leadership, and executive authority.': 'पारंपरिक रूप से प्राण ऊर्जा, नेतृत्व और प्रशासनिक अधिकार का प्रतीक।',
      'Wear on ring finger of right hand. Avoid wearing alongside Blue Sapphire or Diamond.': 'दाहिने हाथ की अनामिका उंगली में धारण करें। नीलम या हीरे के साथ पहनने से बचें।',
      'Traditional association with emotional peace, mental tranquility, and intuition.': 'पारंपरिक रूप से मानसिक शांति, भावनात्मक संतुलन और अंतर्ज्ञान का प्रतीक।',
      'Wear on little finger of right hand.': 'दाहिने हाथ की कनिष्ठिका उंगली में धारण करें।',
      'Traditional association with courage, physical stamina, and ambition.': 'पारंपरिक रूप से साहस, शारीरिक ऊर्जा और उच्च आकांक्षा का प्रतीक।',
      'Wear on ring finger.': 'अनामिका उंगली में धारण करें।',
      'Traditional association with commercial intellect, speech, and mathematical acumen.': 'पारंपरिक रूप से व्यावसायिक बुद्धि, वाकपटुता और गणितीय क्षमता का प्रतीक।',
      'Traditional association with divine wisdom, wealth retention, and higher learning.': 'पारंपरिक रूप से ईश्वरीय ज्ञान, संपत्ति संचय और उच्च शिक्षा का प्रतीक।',
      'Wear on index finger of right hand.': 'दाहिने हाथ की तर्जनी उंगली में धारण करें।',
      'Traditional association with luxury, aesthetic refine, and vehicle comfort.': 'पारंपरिक रूप से वैभव, सौंदर्य, भौतिक सुख एवं वाहन आराम का प्रतीक।',
      'Wear on middle finger of right hand.': 'दाहिने हाथ की मध्यमा उंगली में धारण करें।',
      'Traditional association with discipline, long-term endurance, and structural focus.': 'पारंपरिक रूप से अनुशासन, दीर्घकालिक सहनशीलता और स्थायित्व का प्रतीक।',
      'Requires prior 3-day trial period under pillow as per traditional guidance.': 'पारंपरिक परंपरा के अनुसार धारण करने से पूर्व ३ दिन तक तकिये के नीचे रखकर परीक्षण आवश्यक है।',
      'Traditional association with sudden insights and technical mastery.': 'पारंपरिक रूप से आकस्मिक अंतर्दृष्टि और तकनीकी दक्षता का प्रतीक।',
      'Traditional association with spiritual intuition and protection.': 'पारंपरिक रूप से आध्यात्मिक अंतर्ज्ञान और सुरक्षा का प्रतीक।',
      'Wear on ring or middle finger.': 'अनामिका या मध्यमा उंगली में धारण करें।',
      'Highly Compatible': 'अत्यंत अनुकूल',
      'Favorable (With Consultation)': 'अनुशंसित (परामर्श के साथ)',
      'Rahu Kaal clear, opening auspicious Amrit & Abhijit Muhurat alignment.': 'राहु काल के प्रभाव से मुक्त, अमृत एवं अभिजित मुहूर्त योग।',

      // General Statuses & Categories
      'Highly Auspicious': 'अत्यंत शुभ मुहूर्त',
      'Auspicious': 'शुभ मुहूर्त',
      'Neutral (Requires Vastu Alignment)': 'सामान्य (वास्तु संरेखण आवश्यक)',
      'Requires Vastu Remedy': 'वास्तु उपाय आवश्यक',
      'Favorable': 'अनुकूल',
      'Recommended': 'अनुशंसित',
      'Avoid': 'वर्जित',
      'Moderate': 'सामान्य',
    };

    const trimmedVal = val.trim();
    if (!trimmedVal) return '';

    if (exactPhrases[trimmedVal]) {
      return exactPhrases[trimmedVal];
    }

    // Normalized exact check (case-insensitive, underscore & space agnostic)
    const normVal = trimmedVal.replace(/_/g, ' ').replace(/\s+/g, ' ').toLowerCase();
    for (const [k, v] of Object.entries(exactPhrases)) {
      if (k.replace(/_/g, ' ').replace(/\s+/g, ' ').toLowerCase() === normVal) {
        return v;
      }
    }

    // 3. Dynamic Rationale & Recommendation Pattern Matching
    if (val.startsWith("Brand name '") && val.includes("yields Chaldean compound value ")) {
      const match = val.match(/Brand name '(.+)' yields Chaldean compound value (\d+) \(destiny single digit (\d+), governed by (.+)\)\. Aligns harmoniously with founder driver number (\d+)\./);
      if (match) {
        const brand = match[1];
        const compound = match[2];
        const single = match[3];
        const planetTr = wordMappings[match[4]] || match[4];
        const driver = match[5];
        return `ब्रांड नाम '${brand}' का चाल्डियन यौगिक अंक ${compound} (भाग्य एकल अंक ${single}, स्वामी ग्रह ${planetTr}) है। यह संस्थापक के चालक अंक ${driver} के साथ अनुकूल रूप से संरेखित है।`;
      }
    }

    if (val.startsWith("Harmonized with birth Nakshatra (") && val.includes(") during pristine morning Kaal.")) {
      const match = val.match(/Harmonized with birth Nakshatra \((.+)\) during pristine morning Kaal\./);
      if (match) {
        const nakTr = wordMappings[match[1]] || match[1];
        return `जन्म नक्षत्र (${nakTr}) से संरेखित एवं प्रभात काल में शुभ मुहूर्त।`;
      }
    }

    if (val.startsWith('Position the main entrance threshold cleanly facing ')) {
      const dirRaw = val.replace('Position the main entrance threshold cleanly facing ', '').replace('.', '').trim();
      const dirTr = wordMappings[dirRaw] || wordMappings[dirRaw.toLowerCase()] || dirRaw;
      return `${dirTr} दिशा की ओर मुख्य प्रवेश द्वार की देहरी को स्वच्छ एवं सुसज्जित रखें।`;
    }

    if (val.startsWith('For major structural modifications or ') && val.endsWith(' consult a qualified Vastu architect.')) {
      return 'किसी भी बड़े ढांचागत बदलाव या नींव निर्माण कार्य हेतु योग्य वास्तु विशेषज्ञ से परामर्श लें।';
    }

    if (val.startsWith('Auspicious Shubh Muhurat window on ')) {
      const match = val.match(/Auspicious Shubh Muhurat window on (\w+) aligned with (.+) Nakshatra\./);
      if (match) {
        const dayTr = wordMappings[match[1]] || match[1];
        const nakTr = wordMappings[match[2]] || match[2];
        return `${dayTr} को ${nakTr} नक्षत्र से संरेखित शुभ मुहूर्त का समय।`;
      }
    }

    if (val.startsWith('Commercial Shubh Hora & Mercury transit window on ')) {
      const match = val.match(/Commercial Shubh Hora & Mercury transit window on (\w+) aligned with (.+) Nakshatra\./);
      if (match) {
        const dayTr = wordMappings[match[1]] || match[1];
        const nakTr = wordMappings[match[2]] || match[2];
        return `${dayTr} को ${nakTr} नक्षत्र से संरेखित व्यावसायिक शुभ होरा एवं बुध गोचर का समय।`;
      }
    }

    if (val.startsWith('Auspicious Sun & Jupiter Gold Hora on ')) {
      const match = val.match(/Auspicious Sun & Jupiter Gold Hora on (\w+) aligned with (.+) Nakshatra\./);
      if (match) {
        const dayTr = wordMappings[match[1]] || match[1];
        const nakTr = wordMappings[match[2]] || match[2];
        return `${dayTr} को ${nakTr} नक्षत्र से संरेखित सूर्य एवं गुरु स्वर्ण होरा का शुभ समय।`;
      }
    }

    if (val.includes('strictly bounded within your requested date range')) {
      return 'सभी परिकलित शुभ मुहूर्त समय सीमाएँ आपकी अनुरोधित तिथियों के भीतर ही सीमित हैं।';
    }

    if (val.includes('Swiss Ephemeris sidereal Lahiri Ayanamsa') || val.includes('Lahiri Ayanamsa')) {
      return 'ज्योतिषीय समय की गणना स्विस्स एफिमेरिस निरयन लाहिड़ी अयनांश द्वारा सटीक रूप से की गई है।';
    }

    if (val.startsWith('DISCLAIMER: All guidance provided by AstroLive')) {
      return 'अस्वीकरण: एस्ट्रोलाइव शुभ द्वारा प्रदान किया गया समस्त मार्गदर्शन शुद्ध रूप से पारंपरिक भारतीय ज्योतिषीय सिद्धांतों पर आधारित है। यह सलाह चिकित्सकीय, वित्तीय या निवेश गारंटी का विकल्प नहीं है।';
    }

    if (val.startsWith('Moon transit in ') && val.includes('brings favorable road mobility and safety.')) {
      const match = val.match(/Moon transit in (.+) brings favorable road mobility and safety\./);
      if (match) {
        const rashiTr = wordMappings[match[1]] || match[1];
        return `${rashiTr} राशि में चंद्रमा का गोचर यात्रा सुरक्षा और सड़क गतिशीलता के लिए शुभ है।`;
      }
    }

    if (val.startsWith('Drive initial 108 meters facing ')) {
      const rest = val.replace('Drive initial 108 meters facing ', '');
      // Extract direction and the rest of the sentence
      const match = rest.match(/^(.+?)\s+(?:towards?|to|for)\s+(.+)\.?$/i);
      if (match) {
        const dirRaw = match[1].trim();
        const purposeRaw = match[2].trim();
        const dirTr = wordMappings[dirRaw] || wordMappings[dirRaw.toLowerCase()] || dirRaw;
        return `${dirTr} दिशा की ओर 108 मीटर वाहन चलाएं — ${purposeRaw.replace(/\.$/, '')} के लिए।`;
      }
      // Simpler fallback: just translate direction
      const dirWords = rest.split(' ');
      const dirRaw = dirWords.slice(0, 2).join(' ');
      const dirTr = wordMappings[dirRaw] || wordMappings[dirRaw.toLowerCase()] || dirWords[0];
      return `${dirTr} दिशा की ओर 108 मीटर वाहन चलाएं।`;
    }

    // 4. Fallback Word-by-Word Replacement

    let result = val;
    Object.keys(wordMappings).forEach((key) => {
      if (result.includes(key)) {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        result = result.replace(regex, wordMappings[key]);
      }
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
