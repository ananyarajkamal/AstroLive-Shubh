/* translations/index.ts - AstroLive Shubh Comprehensive Translation Dictionary (EN & HI) */

export interface TranslationDictionary {
  nav: {
    home: string;
    vahan: string;
    griha: string;
    vyapar: string;
    swarna: string;
    startJourney: string;
    exploreCollection: string;
  };
  hero: {
    title: string;
    subtitle: string;
    exploreBtn: string;
    startBtn: string;
  };
  positioning: {
    tagline: string;
    title: string;
    subtitle: string;
  };
  collection: {
    tagline: string;
    title: string;
    subtitle: string;
    vahanCategory: string;
    vahanTitle: string;
    vahanSubtitle: string;
    vahanDesc: string;
    vahanBtn: string;
    grihaCategory: string;
    grihaTitle: string;
    grihaSubtitle: string;
    grihaDesc: string;
    grihaBtn: string;
    vyaparCategory: string;
    vyaparTitle: string;
    vyaparSubtitle: string;
    vyaparDesc: string;
    vyaparBtn: string;
    swarnaCategory: string;
    swarnaTitle: string;
    swarnaSubtitle: string;
    swarnaDesc: string;
    swarnaBtn: string;
  };
  method: {
    tagline: string;
    title: string;
    subtitle: string;
    sys1Title: string;
    sys1Desc: string;
    sys2Title: string;
    sys2Desc: string;
    sys3Title: string;
    sys3Desc: string;
    sys4Title: string;
    sys4Desc: string;
  };
  principles: {
    tagline: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
  };
  patraSection: {
    tagline: string;
    title: string;
    subtitle: string;
    btn: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    btn: string;
  };
  footer: {
    brandDesc: string;
    collectionTitle: string;
    vahanLink: string;
    grihaLink: string;
    vyaparLink: string;
    swarnaLink: string;
    builtOnTitle: string;
    swiss: string;
    lahiri: string;
    chaldean: string;
    vastu: string;
    privateTitle: string;
    privateDesc: string;
    copyright: string;
  };
  forms: {
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    dobLabel: string;
    dobPlaceholder: string;
    timeLabel: string;
    timePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    citySearching: string;
    noCityFound: string;
    selectCityPrompt: string;
    vehicleModelLabel: string;
    vehicleModelPlaceholder: string;
    vehicleTypeLabel: string;
    vehicleTypePlaceholder: string;
    regGoalLabel: string;
    deliveryStartLabel: string;
    deliveryEndLabel: string;
    preferredColorsLabel: string;
    preferredColorsPlaceholder: string;
    nextBtn: string;
    backBtn: string;
    calculateBtn: string;
    computing: string;
    computingSubtitle: string;
  };
  report: {
    readyBadge: string;
    reportTitle: string;
    preparedFor: string;
    calcAnother: string;
    sec1Title: string;
    lagnaLabel: string;
    rashiLabel: string;
    nakshatraLabel: string;
    padaLabel: string;
    ayanamsaLabel: string;
    sec2Title: string;
    evalRange: string;
    topPick: string;
    score: string;
    dateLabel: string;
    timeWindowLabel: string;
    sec3Title: string;
    driverNum: string;
    conductorNum: string;
    driverEnergies: string;
    recommendedCombos: string;
    avoidNumbers: string;
    sec4Title: string;
    avoidColours: string;
    sec5Title: string;
    primaryDirection: string;
    auspiciousHora: string;
    guidance: string;
    reqId: string;
    timezone: string;
  };
  patra: {
    tagline: string;
    title: string;
    subtitle: string;
    shareBtn: string;
    printBtn: string;
    copiedNotice: string;
    certId: string;
    detailsHeader: string;
    nameLabel: string;
    birthDateLabel: string;
    birthTimeLabel: string;
    birthCityLabel: string;
    vehicleDetailsHeader: string;
    vehicleLabel: string;
    deliveryWindowLabel: string;
    recsHeader: string;
    luckyNumberLabel: string;
    colourLabel: string;
    directionLabel: string;
    shubhWindowLabel: string;
    mantraLabel: string;
    certTagline: string;
    certSubtitle: string;
    certFootnote: string;
    issuedLabel: string;
    backToWizard: string;
  };
  grihaPage: {
    title: string;
    subtitle: string;
    formHeader: string;
    propTypeLabel: string;
    propTypePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    pujanWindowLabel: string;
    calcBtn: string;
    resTitle: string;
    bhoomiTitle: string;
    entryTitle: string;
    orientationTitle: string;
  };
  vyaparPage: {
    title: string;
    subtitle: string;
    formHeader: string;
    bizNameLabel: string;
    bizNamePlaceholder: string;
    bizTypeLabel: string;
    inaugurationLabel: string;
    calcBtn: string;
    resTitle: string;
    inaugurationTitle: string;
    numerologyTitle: string;
  };
  swarnaPage: {
    title: string;
    subtitle: string;
    formHeader: string;
    purchTypeLabel: string;
    targetDateLabel: string;
    calcBtn: string;
    resTitle: string;
    pushyaTitle: string;
    gemstoneTitle: string;
  };
}

export const translations: Record<'en' | 'hi', TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      vahan: 'Vahan',
      griha: 'Griha',
      vyapar: 'Vyapar',
      swarna: 'Swarna & Ratna',
      startJourney: 'START YOUR JOURNEY →',
      exploreCollection: 'EXPLORE THE COLLECTION →',
    },
    hero: {
      title: "Auspicious timing for life's important milestones.",
      subtitle: "AstroLive Shubh combines astronomical calculations with deterministic, domain-specific rules to find meaningful moments for life's important milestones.",
      exploreBtn: 'EXPLORE THE COLLECTION →',
      startBtn: 'START YOUR JOURNEY →',
    },
    positioning: {
      tagline: 'ASTROLIVE SHUBH',
      title: 'An editorial astrology house for important life decisions.',
      subtitle: 'Combining astronomical calculations with deterministic rules designed for the moments that matter.',
    },
    collection: {
      tagline: 'THE COLLECTION',
      title: 'The AstroLive Shubh Collection',
      subtitle: "Domain-specific decision framework designed for life's major milestones.",
      vahanCategory: 'VEHICLES & MOBILITY',
      vahanTitle: 'Vahan',
      vahanSubtitle: 'Vehicles & mobility',
      vahanDesc: 'Personalized vehicle delivery windows, Chaldean lucky registration numbers, vehicle colours, and first-drive Vastu direction.',
      vahanBtn: 'EXPLORE VAHAN →',
      grihaCategory: 'HOMES & PLOTS',
      grihaTitle: 'Griha',
      grihaSubtitle: 'Homes & plots',
      grihaDesc: 'Plot acquisition timing, Bhoomi Pujan foundation-laying windows, property entry, and main entrance Vastu orientation.',
      grihaBtn: 'EXPLORE GRIHA →',
      vyaparCategory: 'BUSINESS & ENTERPRISE',
      vyaparTitle: 'Vyapar',
      vyaparSubtitle: 'Business & enterprise',
      vyaparDesc: 'Commercial inauguration windows, business incorporation dates, office openings, and brand name Chaldean numerology.',
      vyaparBtn: 'EXPLORE VYAPAR →',
      swarnaCategory: 'GOLD & GEMSTONES',
      swarnaTitle: 'Swarna & Ratna',
      swarnaSubtitle: 'Gold & gemstones',
      swarnaDesc: 'Gold purchase windows during Pushya and Dhanteras alignments, plus traditional birth gemstone suitability guidance.',
      swarnaBtn: 'EXPLORE SWARNA →',
    },
    method: {
      tagline: 'THE ASTROLIVE METHOD',
      title: 'Astronomical precision. Human decisions.',
      subtitle: "AstroLive Shubh combines astronomical calculations with deterministic, domain-specific rules to find meaningful moments for life's important milestones.",
      sys1Title: 'Swiss Ephemeris',
      sys1Desc: 'Astronomical calculations',
      sys2Title: 'Lahiri Sidereal Calculations',
      sys2Desc: 'Planetary alignment',
      sys3Title: 'Chaldean Numerology',
      sys3Desc: 'Number-based guidance',
      sys4Title: 'Vastu & Hora',
      sys4Desc: 'Directional timing',
    },
    principles: {
      tagline: 'PRINCIPLES',
      p1Title: 'Deterministic by design.',
      p1Desc: 'No vague AI-generated predictions at the heart of your result. AstroLive Shubh uses reproducible calculations and explicit domain rules to generate consistent guidance.',
      p2Title: 'Local by design.',
      p2Desc: 'Your core calculations run through our own deterministic platform rather than relying on external AI services.',
    },
    patraSection: {
      tagline: 'DIGITAL PATRA',
      title: 'A moment worth keeping.',
      subtitle: 'Turn your completed guidance into a beautifully designed Digital Patra, a personal record of the auspicious moment and recommendations selected for your milestone.',
      btn: 'VIEW YOUR PATRA →',
    },
    finalCta: {
      title: 'Choose the moment with intention.',
      subtitle: "Whether you're bringing home a new vehicle, entering a new home, starting a business, or making an important purchase, AstroLive Shubh helps you find a moment aligned with your chosen milestone.",
      btn: 'EXPLORE ASTROLIVE SHUBH →',
    },
    footer: {
      brandDesc: 'An editorial astrology house for important life decisions. Combining astronomical calculations with deterministic rules designed for the moments that matter.',
      collectionTitle: 'THE COLLECTION',
      vahanLink: 'Vahan (Vehicles & Mobility)',
      grihaLink: 'Griha (Homes & Plots)',
      vyaparLink: 'Vyapar (Business & Enterprise)',
      swarnaLink: 'Swarna & Ratna (Gold & Gemstones)',
      builtOnTitle: 'BUILT ON',
      swiss: 'Swiss Ephemeris (Astronomical calculations)',
      lahiri: 'Lahiri Sidereal System (Planetary alignment)',
      chaldean: 'Chaldean Numerology (Number-based guidance)',
      vastu: 'Vastu & Hora (Directional timing)',
      privateTitle: 'PRIVATE BY DESIGN',
      privateDesc: "Core calculations are deterministic and performed through AstroLive Shubh's own rules. No external AI service is required for the core guidance.",
      copyright: '© 2026 AstroLive Shubh. All rights reserved.',
    },
    forms: {
      step1Title: 'Personal & Birth Details',
      step1Subtitle: 'Enter your birth details to calculate your planetary alignments.',
      step2Title: 'Vehicle Details',
      step2Subtitle: 'Select your vehicle parameters for custom numerology and vastu.',
      step3Title: 'Delivery Window Range',
      step3Subtitle: 'Define the date range provided by your dealership.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      dobLabel: 'Date of Birth',
      dobPlaceholder: 'Select your date of birth',
      timeLabel: 'Time of Birth',
      timePlaceholder: 'Enter your birth time (e.g. 14:30)',
      cityLabel: 'Birth City',
      cityPlaceholder: 'Search your birth city...',
      citySearching: 'Searching cities...',
      noCityFound: 'No cities found.',
      selectCityPrompt: 'Type at least 2 characters to search',
      vehicleModelLabel: 'Vehicle Model & Name',
      vehicleModelPlaceholder: 'e.g. Tata Nexon EV, BMW X5',
      vehicleTypeLabel: 'Vehicle Category',
      vehicleTypePlaceholder: 'Select vehicle type',
      regGoalLabel: 'Registration Goal',
      deliveryStartLabel: 'Earliest Delivery Date',
      deliveryEndLabel: 'Latest Delivery Date',
      preferredColorsLabel: 'Preferred Colors (Optional)',
      preferredColorsPlaceholder: 'e.g. White, Black, Navy Blue',
      nextBtn: 'Next Step →',
      backBtn: '← Back',
      calculateBtn: 'Calculate Shubh Guidance →',
      computing: 'Computing Astrological Profile...',
      computingSubtitle: 'Evaluating planetary longitudes, Panchang Muhurats, Chaldean lucky numbers, and Vastu directions...',
    },
    report: {
      readyBadge: 'VAHAN REPORT READY',
      reportTitle: 'Personalised Vahan Guidance',
      preparedFor: 'Prepared for',
      calcAnother: 'Calculate Another →',
      sec1Title: '1. BIRTH & ASTROLOGY PROFILE',
      lagnaLabel: 'LAGNA (ASCENDANT)',
      rashiLabel: 'MOON SIGN (RASHI)',
      nakshatraLabel: 'BIRTH NAKSHATRA',
      padaLabel: 'Pada',
      ayanamsaLabel: 'LAHIRI AYANAMSA',
      sec2Title: '2. SHUBH DELIVERY WINDOWS',
      evalRange: 'Evaluated date range:',
      topPick: 'TOP PICK',
      score: 'Score',
      dateLabel: 'Date:',
      timeWindowLabel: 'Time Window:',
      sec3Title: '3. CHALDEAN LUCKY REGISTRATION NUMBERS',
      driverNum: 'DRIVER NUMBER (BIRTH DAY)',
      conductorNum: 'CONDUCTOR NUMBER (DESTINY)',
      driverEnergies: 'Planetary Energy',
      recommendedCombos: 'Recommended Registration Combinations:',
      avoidNumbers: 'Avoid Numbers:',
      sec4Title: '4. RECOMMENDED VEHICLE COLOURS',
      avoidColours: 'Avoid Colours:',
      sec5Title: '5. FIRST DRIVE DIRECTION & VASTU GUIDANCE',
      primaryDirection: 'PRIMARY DIRECTION',
      auspiciousHora: 'AUSPICIOUS HORA',
      guidance: 'Guidance:',
      reqId: 'Request ID:',
      timezone: 'Timezone:',
    },
    patra: {
      tagline: 'DIGITAL PATRA',
      title: 'Digital Vahan Patra',
      subtitle: 'A personalized auspicious guide for your vehicle milestone.',
      shareBtn: 'Share Patra',
      printBtn: 'Print Patra',
      copiedNotice: 'Patra link copied to clipboard',
      certId: 'CERTIFICATE ID:',
      detailsHeader: 'DETAILS',
      nameLabel: 'Name',
      birthDateLabel: 'Birth Date',
      birthTimeLabel: 'Birth Time',
      birthCityLabel: 'Birth City',
      vehicleDetailsHeader: 'VEHICLE DETAILS',
      vehicleLabel: 'Vehicle',
      deliveryWindowLabel: 'Delivery Window',
      recsHeader: 'RECOMMENDATIONS',
      luckyNumberLabel: 'Lucky Number',
      colourLabel: 'Auspicious Colour',
      directionLabel: 'First Drive Direction',
      shubhWindowLabel: 'Shubh Window',
      mantraLabel: 'Vehicle Mantra',
      certTagline: 'VAHAN PATRA',
      certSubtitle: "YOUR VEHICLE'S AUSPICIOUS GUIDE",
      certFootnote: 'This Digital Vahan Patra is generated through deterministic astrological calculations based on your birth details and vehicle preferences.',
      issuedLabel: 'ISSUED',
      backToWizard: '← Back to Vahan Wizard',
    },
    grihaPage: {
      title: 'Griha Home & Plot Guidance',
      subtitle: 'Determine optimal property orientations, Vastu harmony, Bhoomi Pujan foundation windows, and Griha Pravesh entry dates.',
      formHeader: 'Property & Birth Details',
      propTypeLabel: 'Property Type',
      propTypePlaceholder: 'e.g. Residential Villa, Plot, Apartment',
      cityLabel: 'Property Location City',
      cityPlaceholder: 'Search property city...',
      pujanWindowLabel: 'Target Foundation / Entry Range',
      calcBtn: 'Calculate Griha Muhurat →',
      resTitle: 'Griha Auspicious Results',
      bhoomiTitle: 'Bhoomi Pujan & Foundation Windows',
      entryTitle: 'Griha Pravesh Entry Dates',
      orientationTitle: 'Vastu Entrance Alignment',
    },
    vyaparPage: {
      title: 'Vyapar Business & Commercial Guidance',
      subtitle: 'Determine company incorporation dates, office openings, product launch windows, and brand name Chaldean numerology.',
      formHeader: 'Enterprise & Birth Details',
      bizNameLabel: 'Business / Brand Name',
      bizNamePlaceholder: 'e.g. Zenith Global Enterprises',
      bizTypeLabel: 'Industry Sector',
      inaugurationLabel: 'Target Inauguration Range',
      calcBtn: 'Calculate Vyapar Muhurat →',
      resTitle: 'Vyapar Commercial Guidance Results',
      inaugurationTitle: 'Inauguration & Launch Windows',
      numerologyTitle: 'Chaldean Brand Numerology Score',
    },
    swarnaPage: {
      title: 'Swarna & Ratna Guidance',
      subtitle: 'Determine auspicious gold purchase windows during Pushya & Dhanteras alignments, plus birth gemstone suitability.',
      formHeader: 'Gold & Gemstone Parameters',
      purchTypeLabel: 'Purchase Intent',
      targetDateLabel: 'Target Purchase Window',
      calcBtn: 'Calculate Swarna Timing →',
      resTitle: 'Swarna & Ratna Recommendations',
      pushyaTitle: 'Pushya Nakshatra Gold Windows',
      gemstoneTitle: 'Personalized Birth Gemstone Suitability',
    },
  },
  hi: {
    nav: {
      home: 'मुख्य पृष्ठ',
      vahan: 'वाहन',
      griha: 'गृह',
      vyapar: 'व्यापार',
      swarna: 'स्वर्ण एवं रत्न',
      startJourney: 'शुभ यात्रा प्रारंभ करें →',
      exploreCollection: 'संग्रह एक्सप्लोर करें →',
    },
    hero: {
      title: 'जीवन के महत्वपूर्ण अवसरों के लिए उत्तम एवं प्रामाणिक समय।',
      subtitle: 'एस्ट्रोलाइव शुभ खगोलीय शुद्धता और वैदिक सिद्धांतों का संगम है—जो आपके वाहन, गृह प्रवेश, व्यापार एवं स्वर्ण क्रय के हर विशेष क्षण को मंगलमय बनाता है।',
      exploreBtn: 'संग्रह एक्सप्लोर करें →',
      startBtn: 'शुभ यात्रा प्रारंभ करें →',
    },
    positioning: {
      tagline: 'एस्ट्रोलाइव शुभ',
      title: 'महत्वपूर्ण जीवन निर्णयों के लिए एक प्रतिष्ठित ज्योतिष पीठ।',
      subtitle: 'खगोलीय शुद्धता और प्रामाणिक ज्योतिषीय नियमों का संयोजन जो आपके विशेष क्षणों को मंगलमय बनाता है।',
    },
    collection: {
      tagline: 'हमारा संग्रह',
      title: 'एस्ट्रोलाइव शुभ संग्रह',
      subtitle: 'जीवन के प्रमुख अवसरों के लिए विशेष रूप से तैयार किए गए निर्णय प्रणाली।',
      vahanCategory: 'वाहन एवं गतिशीलता',
      vahanTitle: 'वाहन',
      vahanSubtitle: 'वाहन एवं गतिशीलता',
      vahanDesc: 'व्यक्तिगत वाहन डिलीवरी मुहूर्त, बाबिलोनियन/काल्डियन लकी नंबर, शुभ वाहन रंग और प्रथम ड्राइव वास्तु दिशा।',
      vahanBtn: 'वाहन संग्रह देखें →',
      grihaCategory: 'गृह एवं भूखंड',
      grihaTitle: 'गृह',
      grihaSubtitle: 'गृह एवं भूखंड',
      grihaDesc: 'भूखंड क्रय मुहूर्त, भूमि पूजन एवं शिलान्यास समय, गृह प्रवेश तिथि तथा मुख्य द्वार वास्तु मार्गदर्शन।',
      grihaBtn: 'गृह संग्रह देखें →',
      vyaparCategory: 'व्यापार एवं प्रतिष्ठान',
      vyaparTitle: 'व्यापार',
      vyaparSubtitle: 'व्यापार एवं प्रतिष्ठान',
      vyaparDesc: 'व्यावसायिक उद्घाटन मुहूर्त, कंपनी पंजीकरण तिथि, कार्यालय प्रारंभ एवं ब्रांड नाम अंक ज्योतिष।',
      vyaparBtn: 'व्यापार संग्रह देखें →',
      swarnaCategory: 'स्वर्ण एवं रत्न',
      swarnaTitle: 'स्वर्ण एवं रत्न',
      swarnaSubtitle: 'स्वर्ण एवं रत्न',
      swarnaDesc: 'पुष्य नक्षत्र एवं धनतेरस के दौरान स्वर्ण क्रय मुहूर्त तथा आपकी जन्म कुंडली के अनुसार उपयुक्त रत्न मार्गदर्शन।',
      swarnaBtn: 'स्वर्ण संग्रह देखें →',
    },
    method: {
      tagline: 'एस्ट्रोलाइव कार्यपद्धति',
      title: 'खगोलीय शुद्धता। विवेकपूर्ण निर्णय।',
      subtitle: 'एस्ट्रोलाइव शुभ खगोलीय गणनाओं को वैदिक एवं काल्डियन पद्धतियों के साथ जोड़कर आपके लिए सटीक मार्गदर्शन प्रदान करता है।',
      sys1Title: 'स्वीस एफिमेरिस (Swiss Ephemeris)',
      sys1Desc: 'सटीक खगोलीय गणनाएं',
      sys2Title: 'लाहिड़ी निरयण पद्धति',
      sys2Desc: 'ग्रह स्थिति एवं युति',
      sys3Title: 'काल्डियन अंक ज्योतिष',
      sys3Desc: 'संख्यात्मक शुभता विश्लेषण',
      sys4Title: 'वास्तु एवं होरा शास्त्र',
      sys4Desc: 'दिशा एवं सामयिक शुभता',
    },
    principles: {
      tagline: 'हमारे सिद्धांत',
      p1Title: 'निश्चित एवं प्रामाणिक नियमों पर आधारित।',
      p1Desc: 'कोई काल्पनिक या अनिश्चित भविष्यवाणी नहीं। एस्ट्रोलाइव शुभ पुनरुत्पादित गणितीय गणनाओं और स्पष्ट नियमों से परिणाम प्रस्तुत करता है।',
      p2Title: 'स्थानीय और सुरक्षित।',
      p2Desc: 'आपकी गणनाएं सीधे हमारे अपने गणना इंजन पर निष्पादित होती हैं, बाहरी AI सेवाओं पर निर्भर नहीं।',
    },
    patraSection: {
      tagline: 'डिजिटल पात्रा',
      title: 'एक स्मरणीय और पवित्र दस्तावेज।',
      subtitle: 'अपनी शुभ सलाह को एक सुंदर डिजिटल पात्रा प्रमाण-पत्र में परिवर्तित करें, जो आपके जीवन के इस अवसर का स्थायी अभिलेख है।',
      btn: 'अपना पात्रा देखें →',
    },
    finalCta: {
      title: 'अपने महत्वपूर्ण निर्णय के लिए शुभ समय चुनें।',
      subtitle: 'चाहे नया वाहन घर लाना हो, नए गृह में प्रवेश करना हो, नया व्यवसाय शुरू करना हो या स्वर्ण क्रय करना हो, एस्ट्रोलाइव शुभ आपके हर निर्णय को मंगलमय बनाता है।',
      btn: 'एस्ट्रोलाइव शुभ एक्सप्लोर करें →',
    },
    footer: {
      brandDesc: 'महत्वपूर्ण जीवन निर्णयों के लिए एक प्रतिष्ठित ज्योतिष पीठ। खगोलीय शुद्धता एवं वैदिक सिद्धांतों का संगम।',
      collectionTitle: 'हमारा संग्रह',
      vahanLink: 'वाहन (वाहन एवं गतिशीलता)',
      grihaLink: 'गृह (गृह एवं भूखंड)',
      vyaparLink: 'व्यापार (व्यापार एवं प्रतिष्ठान)',
      swarnaLink: 'स्वर्ण एवं रत्न (स्वर्ण एवं रत्न)',
      builtOnTitle: 'आधारित',
      swiss: 'स्वीस एफिमेरिस (सटीक खगोलीय गणनाएं)',
      lahiri: 'लाहिड़ी निरयण प्रणाली (ग्रह स्थिति)',
      chaldean: 'काल्डियन अंक ज्योतिष (शुभ अंक विज्ञान)',
      vastu: 'वास्तु एवं होरा (दिशा एवं काल)',
      privateTitle: 'गोपनीयता एवं सुरक्षा',
      privateDesc: 'सभी गणनाएं पूरी तरह से सुरक्षित एवं निश्चित नियमों पर आधारित हैं। आपकी व्यक्तिगत जानकारी गोपनीय रहती है।',
      copyright: '© 2026 एस्ट्रोलाइव शुभ। सर्वाधिकार सुरक्षित।',
    },
    forms: {
      step1Title: 'व्यक्तिगत एवं जन्म विवरण',
      step1Subtitle: 'अपनी ग्रह स्थिति की गणना के लिए अपना जन्म विवरण दर्ज करें।',
      step2Title: 'वाहन विवरण',
      step2Subtitle: 'अनुकूल अंक ज्योतिष और वास्तु हेतु वाहन पैरामीटर चुनें।',
      step3Title: 'डिलीवरी समय सीमा',
      step3Subtitle: 'डीलरशिप द्वारा दी गई संभावित तिथियों की सीमा दर्ज करें।',
      fullNameLabel: 'पूरा नाम',
      fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
      dobLabel: 'जन्म तिथि',
      dobPlaceholder: 'अपनी जन्म तिथि चुनें',
      timeLabel: 'जन्म समय',
      timePlaceholder: 'अपना जन्म समय दर्ज करें (उदा. 14:30)',
      cityLabel: 'जन्म स्थान',
      cityPlaceholder: 'अपने जन्म स्थान को खोजें...',
      citySearching: 'शहर खोजा जा रहा है...',
      noCityFound: 'कोई शहर नहीं मिला।',
      selectCityPrompt: 'खोजने के लिए कम से कम 2 अक्षर टाइप करें',
      vehicleModelLabel: 'वाहन का नाम एवं मॉडल',
      vehicleModelPlaceholder: 'उदा. टाटा नेक्सन EV, बीएमडब्ल्यू X5',
      vehicleTypeLabel: 'वाहन की श्रेणी',
      vehicleTypePlaceholder: 'वाहन का प्रकार चुनें',
      regGoalLabel: 'पंजीकरण लक्ष्य',
      deliveryStartLabel: 'प्रारंभिक डिलीवरी तिथि',
      deliveryEndLabel: 'अंतिम डिलीवरी तिथि',
      preferredColorsLabel: 'पसंदीदा रंग (वैकल्पिक)',
      preferredColorsPlaceholder: 'उदा. सफेद, काला, नेवी ब्लू',
      nextBtn: 'अगला चरण →',
      backBtn: '← पीछे जाएँ',
      calculateBtn: 'शुभ मार्गदर्शन प्राप्त करें →',
      computing: 'ज्योतिषीय प्रोफाइल की गणना की जा रही है...',
      computingSubtitle: 'ग्रह देशांतर, पंचांग मुहूर्त, काल्डियन लकी नंबर और वास्तु दिशाओं का विश्लेषण हो रहा है...',
    },
    report: {
      readyBadge: 'वाहन रिपोर्ट तैयार है',
      reportTitle: 'व्यक्तिगत वाहन शुभ मार्गदर्शन',
      preparedFor: 'तैयार किया गया:',
      calcAnother: 'दूसरी गणना करें →',
      sec1Title: '1. जन्म एवं ज्योतिष प्रोफाइल',
      lagnaLabel: 'लग्न (Lagna)',
      rashiLabel: 'चंद्र राशि (Moon Rashi)',
      nakshatraLabel: 'जन्म नक्षत्र',
      padaLabel: 'पाद',
      ayanamsaLabel: 'लाहिड़ी अयनांश',
      sec2Title: '2. शुभ डिलीवरी समय सीमा',
      evalRange: 'विश्लेषित तिथि सीमा:',
      topPick: 'उत्तम विकल्प',
      score: 'अंक',
      dateLabel: 'तिथि:',
      timeWindowLabel: 'समय सीमा:',
      sec3Title: '3. काल्डियन लकी पंजीकरण अंक',
      driverNum: 'ड्राइवर अंक (जन्म तारीख)',
      conductorNum: 'कंडक्टर अंक (भाग्य अंक)',
      driverEnergies: 'ग्रह ऊर्जा',
      recommendedCombos: 'अनुशंसित पंजीकरण संख्या संयोजन:',
      avoidNumbers: 'अशुभ अंक (बचें):',
      sec4Title: '4. अनुशंसित वाहन रंग',
      avoidColours: 'अशुभ रंग (बचें):',
      sec5Title: '5. प्रथम ड्राइव दिशा एवं वास्तु मार्गदर्शन',
      primaryDirection: 'मुख्य दिशा',
      auspiciousHora: 'शुभ होरा',
      guidance: 'मार्गदर्शन:',
      reqId: 'अनुरोध आईडी:',
      timezone: 'समय क्षेत्र:',
    },
    patra: {
      tagline: 'डिजिटल पात्रा',
      title: 'डिजिटल वाहन पात्रा',
      subtitle: 'आपके वाहन क्रय के शुभ अवसर का व्यक्तिगत प्रामाणिक दस्तावेज।',
      shareBtn: 'शेयर करें',
      printBtn: 'प्रिंट करें',
      copiedNotice: 'पात्रा लिंक क्लिपबोर्ड में कॉपी हो गया',
      certId: 'प्रमाण-पत्र आईडी:',
      detailsHeader: 'विवरण',
      nameLabel: 'नाम',
      birthDateLabel: 'जन्म तिथि',
      birthTimeLabel: 'जन्म समय',
      birthCityLabel: 'जन्म स्थान',
      vehicleDetailsHeader: 'वाहन विवरण',
      vehicleLabel: 'वाहन',
      deliveryWindowLabel: 'डिलीवरी समय',
      recsHeader: 'अनुशंसाएं',
      luckyNumberLabel: 'शुभ अंक',
      colourLabel: 'शुभ रंग',
      directionLabel: 'प्रथम ड्राइव दिशा',
      shubhWindowLabel: 'शुभ मुहूर्त',
      mantraLabel: 'वाहन मंत्र',
      certTagline: 'वाहन पात्रा',
      certSubtitle: 'आपके वाहन का शुभ मार्गदर्शन',
      certFootnote: 'यह डिजिटल वाहन पात्रा आपके जन्म विवरण और वाहन प्राथमिकताओं के आधार पर खगोलीय गणनाओं से निर्मित किया गया है।',
      issuedLabel: 'जारी तिथि',
      backToWizard: '← वापस वाहन गणना पर जाएँ',
    },
    grihaPage: {
      title: 'गृह निर्माण एवं भूखंड मार्गदर्शन',
      subtitle: 'भूखंड क्रय समय, वास्तु अनुकूलता, भूमि पूजन शिलान्यास मुहूर्त एवं गृह प्रवेश तिथियों का सटीक विश्लेषण।',
      formHeader: 'संपत्ति एवं जन्म विवरण',
      propTypeLabel: 'संपत्ति का प्रकार',
      propTypePlaceholder: 'उदा. आवासीय विला, भूखंड, फ्लैट',
      cityLabel: 'संपत्ति का स्थान (शहर)',
      cityPlaceholder: 'शहर खोजें...',
      pujanWindowLabel: 'लक्ष्य शिलान्यास / प्रवेश सीमा',
      calcBtn: 'गृह मुहूर्त प्राप्त करें →',
      resTitle: 'गृह शुभ परिणाम',
      bhoomiTitle: 'भूमि पूजन एवं शिलान्यास समय',
      entryTitle: 'गृह प्रवेश तिथियां',
      orientationTitle: 'मुख्य द्वार वास्तु अलाइनमेंट',
    },
    vyaparPage: {
      title: 'व्यापार एवं व्यावसायिक मार्गदर्शन',
      subtitle: 'व्यावसायिक उद्घाटन मुहूर्त, कंपनी पंजीकरण तिथि, कार्यालय प्रारंभ एवं ब्रांड नाम अंक ज्योतिष विश्लेषण।',
      formHeader: 'प्रतिष्ठान एवं जन्म विवरण',
      bizNameLabel: 'व्यापार / ब्रांड नाम',
      bizNamePlaceholder: 'उदा. जेनिथ ग्लोबल इंटरप्राइजेज',
      bizTypeLabel: 'उद्योग क्षेत्र',
      inaugurationLabel: 'लक्ष्य उद्घाटन समय सीमा',
      calcBtn: 'व्यापार मुहूर्त प्राप्त करें →',
      resTitle: 'व्यापार मार्गदर्शन परिणाम',
      inaugurationTitle: 'उद्घाटन एवं शुभ शुभारंभ समय',
      numerologyTitle: 'काल्डियन ब्रांड अंक ज्योतिष स्कोर',
    },
    swarnaPage: {
      title: 'स्वर्ण एवं रत्न मार्गदर्शन',
      subtitle: 'पुष्य नक्षत्र एवं धनतेरस योग के दौरान स्वर्ण क्रय मुहूर्त तथा जन्म नक्षत्र अनुसार उपयुक्त रत्न।',
      formHeader: 'स्वर्ण एवं रत्न पैरामीटर',
      purchTypeLabel: 'क्रय का उद्देश्य',
      targetDateLabel: 'लक्ष्य क्रय अवधि',
      calcBtn: 'स्वर्ण मुहूर्त प्राप्त करें →',
      resTitle: 'स्वर्ण एवं रत्न सिफारिशें',
      pushyaTitle: 'पुष्य नक्षत्र स्वर्ण क्रय समय',
      gemstoneTitle: 'व्यक्तिगत जन्म नक्षत्र रत्न अनुकूलता',
    },
  },
};
