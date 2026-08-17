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

      // Days / Vara
      'Sunday': 'रविवार', 'Monday': 'सोमवार', 'Tuesday': 'मंगलवार', 'Wednesday': 'बुधवार',
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

    // 2. Exact Sentence & Phrase Mappings
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

      // Swarna & Pushya Alignment Sentences
      'Pushya Nakshatra & Dhanteras alignment for gold purchase bringing eternal Lakshmi prosperity.': 'पुष्य नक्षत्र और धनतेरस का शुभ योग जो अक्षय लक्ष्मी समृद्धि लाता है।',
      'Birth Moon sign gemstone compatibility evaluated for planetary strength and health.': 'ग्रह बल और स्वास्थ्य के लिए जन्म राशि के अनुसार रत्न अनुकूलता विश्लेषण।',
      'Pushya Nakshatra Gold Buying Window': 'पुष्य नक्षत्र स्वर्ण क्रय शुभ मुहूर्त',
      'Optimal Birth Gemstone Alignment': 'उत्कृष्ट जन्म रत्न अनुकूलता',

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

    if (exactPhrases[val.trim()]) {
      return exactPhrases[val.trim()];
    }

    // 3. Dynamic Rationale & Recommendation Pattern Matching
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
