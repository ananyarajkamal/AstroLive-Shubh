import { VahanReport } from './types';

/**
 * Phase 1 Mock Data for AstroLive Vahan Frontend UI Shell.
 * Note: These values are realistic static mocks designed for UI rendering & prototype validation.
 * Real deterministic astronomical calculations are performed on the FastAPI backend starting in Phase 3.
 */
export const MOCK_VAHAN_REPORT: VahanReport = {
  reportId: "vh_report_9b1deb4d3b7d",
  shareToken: "vh_patra_mock_9b1deb4d",
  createdAt: "2026-08-16T15:00:00Z",
  input: {
    fullName: "Aarav Sharma",
    dateOfBirth: "1992-05-15",
    birthTime: "14:30",
    birthCity: "Bengaluru",
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: "Asia/Kolkata",
    vehicleType: "SUV",
    vehicleModel: "Tata Nexon EV Max",
    deliveryStartDate: "2026-08-20",
    deliveryEndDate: "2026-08-30"
  },
  shubhWindows: [
    {
      id: "win-1",
      startDate: "2026-08-22",
      endDate: "2026-08-22",
      startTime: "09:15 AM",
      endTime: "11:45 AM",
      score: 96,
      title: "Amrit Siddhi & Pushya Nakshatra Muhurat",
      tithi: "Shukla Saptami",
      nakshatra: "Pushya Nakshatra",
      vara: "Thursday (Guruvar)",
      lagna: "Tula (Libra) Lagna - Auspicious 4th House Lord",
      reasoning: [
        "Moon transit in 10th House brings honor and effortless mobility.",
        "Jupiter aspect on 4th House ensures smooth & collision-free journeys.",
        "Rahu Kaal ends at 09:00 AM, opening pristine Amrit Kaal."
      ],
      isTopPick: true
    },
    {
      id: "win-2",
      startDate: "2026-08-25",
      endDate: "2026-08-25",
      startTime: "02:30 PM",
      endTime: "04:45 PM",
      score: 88,
      title: "Shubh Abhijit & Rohini Muhurat",
      tithi: "Dashami Tithi",
      nakshatra: "Rohini Nakshatra",
      vara: "Sunday (Ravivar)",
      lagna: "Simha (Leo) Lagna",
      reasoning: [
        "Rohini Nakshatra is inherently auspicious for new luxury acquisitions.",
        "Venus in 11th House amplifies vehicle comfort and longevity.",
        "Abhijit Muhurat alignment offers divine protection."
      ],
      isTopPick: false
    },
    {
      id: "win-3",
      startDate: "2026-08-28",
      endDate: "2026-08-28",
      startTime: "10:00 AM",
      endTime: "12:15 PM",
      score: 82,
      title: "Uttara Phalguni Siddhi Yoga",
      tithi: "Dwadashi Tithi",
      nakshatra: "Uttara Phalguni",
      vara: "Wednesday (Budhvar)",
      lagna: "Kanya (Virgo) Lagna",
      reasoning: [
        "Mercury in own sign grants sharp mental focus while driving.",
        "Auspicious Hora of Sun during key ignition moment."
      ],
      isTopPick: false
    }
  ],
  luckyNumbers: {
    chaldeanDriverNumber: 6,    // 1+5 = 6 (Venus)
    chaldeanConductorNumber: 5, // 1+5+0+5+1+9+9+2 = 32 = 5 (Mercury)
    recommendedDigits: [6, 5, 1, 3],
    recommendedCombinations: ["0006", "0505", "1515", "6006", "5555"],
    digitDetails: [
      {
        digit: 6,
        meaning: "Ruled by Venus (Shukra) – Symbolizes luxury, elegance, vehicle comfort, and smooth travels.",
        planet: "Venus",
        compatibilityScore: 98
      },
      {
        digit: 5,
        meaning: "Ruled by Mercury (Budh) – Represents speed, intelligence, adaptability, and high resale value.",
        planet: "Mercury",
        compatibilityScore: 94
      },
      {
        digit: 1,
        meaning: "Ruled by Sun (Surya) – Signifies leadership, commanding road presence, and authority.",
        planet: "Sun",
        compatibilityScore: 89
      },
      {
        digit: 3,
        meaning: "Ruled by Jupiter (Guru) – Brings wisdom, safety, and auspicious long-distance journeys.",
        planet: "Jupiter",
        compatibilityScore: 85
      }
    ],
    unfavorableDigits: [8, 4],
    analysisNote: "Chaldean numerology shows strong harmony between your Venus birth number (6) and vehicle luxury energy. Avoid registration numbers summing to 8 or 4."
  },
  auspiciousColours: {
    recommendedColours: [
      {
        name: "Pearl White / Glacier Silver",
        hex: "#F5F7FA",
        rashiAffinity: "Moon & Venus Harmony",
        rulingPlanet: "Venus & Moon",
        description: "Enhances mental clarity, driving calm, and keeps vehicle energy pure.",
        isPrimaryChoice: true
      },
      {
        name: "Deep Midnight Navy / Metallic Blue",
        hex: "#0E1B38",
        rashiAffinity: "Mercury & Saturn Alignment",
        rulingPlanet: "Mercury",
        description: "Projects timeless authority, resilience, and executive elegance on road.",
        isPrimaryChoice: false
      },
      {
        name: "Warm Bronze / Champagne Gold",
        hex: "#C5A059",
        rashiAffinity: "Sun & Jupiter Aspect",
        rulingPlanet: "Sun",
        description: "Brings royal auspiciousness, luxury luster, and auspicious prosperity.",
        isPrimaryChoice: false
      }
    ],
    avoidColours: [
      {
        name: "Matte Black / Charcoal Ash",
        hex: "#121212",
        rashiAffinity: "Ketu & Malefic Saturn Conflict",
        rulingPlanet: "Saturn / Rahu",
        description: "May attract minor scratches, thermal heat absorption, and sluggish energy.",
        isPrimaryChoice: false
      },
      {
        name: "Crimson Red / Vermillion",
        hex: "#B22222",
        rashiAffinity: "Mars Hyperactivity",
        rulingPlanet: "Mars",
        description: "Creates aggressive road energy and hasty driving tendencies for your Lagna.",
        isPrimaryChoice: false
      }
    ],
    astroRationale: "Based on your Taurus/Venus birth chart energy, soft lustrous shades (Pearl White, Navy, Antique Gold) align perfectly with vehicle longevity while aggressive reds and dull blacks should be avoided."
  },
  firstDriveDirection: {
    primaryDirection: "North-East",
    secondaryDirection: "East",
    vastuSymbol: "Ishan Kona (Sacred Direction of Divine Growth)",
    auspiciousHora: "Guru Hora (09:15 AM - 10:15 AM)",
    firstDestination: "A sacred temple, flowing waterbody, or ancestral family home",
    driveGuidance: "Exit the showroom turning towards East or North-East. Stop briefly at a temple to offer coconut & flowers before driving to your home garage."
  },
  vahanPatra: {
    certificateId: "VAHAN-PATRA-2026-8849",
    issueDate: "22 August 2026",
    ownerName: "Aarav Sharma",
    vehicleModel: "Tata Nexon EV Max",
    vehicleType: "SUV",
    deliveryCity: "Bengaluru",
    shubhWindowSummary: "22 August 2026 | 09:15 AM - 11:45 AM (Amrit Siddhi)",
    luckyNumberSummary: "Single Digit 6 or 5 (Combination: 0006, 0505)",
    colourSummary: "Pearl White / Metallic Navy / Champagne Gold",
    directionSummary: "North-East (Ishan Kona) during Guru Hora",
    vahanMantra: "OM NAMAH SHIVAYA ॥ OM SHREE VAHANA DEVTAYAI NAMAH ॥",
    vahanMantraMeaning: "Salutations to the divine guardian of mobility, granting protection, prosperity, and obstacle-free journeys.",
    auspiciousPoojaTime: "09:30 AM (Right after vehicle key handover)",
    validityStatus: "Authentic AstroLive Vahan Digital Certificate"
  }
};

export const CITIES_FALLBACK = [
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Kochi",
  "Lucknow",
  "Surat",
  "Indore"
];
