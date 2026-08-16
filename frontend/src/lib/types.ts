export type VehicleType = 'SUV' | 'Sedan' | 'Hatchback' | 'EV' | 'Luxury' | 'Two-Wheeler' | 'Commercial';

export interface BirthDetailsInput {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  birthTime: string;   // HH:MM
  birthCity: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

export interface VehicleDetailsInput {
  vehicleType: VehicleType | '';
  vehicleModel: string;
  preferredColours?: string;
}

export interface DeliveryWindowInput {
  deliveryStartDate: string; // YYYY-MM-DD
  deliveryEndDate: string;   // YYYY-MM-DD
}

export interface VahanInputData extends BirthDetailsInput, VehicleDetailsInput, DeliveryWindowInput {}

// Phase 3 Response Contract
export interface BirthLocationResolved {
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_offset: string;
  local_birth_datetime_iso: string;
}

export interface LagnaResult {
  longitude: number;
  rashi: string;
  degree: number;
}

export interface NakshatraResult {
  name: string;
  index: number;
  pada: number;
  longitude: number;
}

export interface PlanetResult {
  planet: string;
  longitude: number;
  rashi: string;
  degree: number;
  speed?: number;
}

export interface AstrologyResultData {
  lagna: LagnaResult;
  rashi: string;
  nakshatra: NakshatraResult;
  planets: PlanetResult[];
  ayanamsa?: number;
}

export interface Phase3ComputeResponse {
  request_id: string;
  status: 'computed' | 'accepted';
  birth_location: BirthLocationResolved;
  astrology: AstrologyResultData;
  message: string;
  phase: 3;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface Phase2ErrorResponse {
  error: string;
  details?: ValidationErrorDetail[];
  message?: string;
}

// Legacy Vahan Report types
export interface ShubhWindow {
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  score: number;
  title: string;
  tithi: string;
  nakshatra: string;
  vara: string;
  lagna: string;
  reasoning: string[];
  isTopPick: boolean;
}

export interface RegistrationNumberDigit {
  digit: number;
  meaning: string;
  planet: string;
  compatibilityScore: number;
}

export interface LuckyNumbersOutput {
  chaldeanDriverNumber: number;
  chaldeanConductorNumber: number;
  recommendedDigits: number[];
  recommendedCombinations: string[];
  digitDetails: RegistrationNumberDigit[];
  unfavorableDigits: number[];
  analysisNote: string;
}

export interface ColourOption {
  name: string;
  hex: string;
  rashiAffinity: string;
  rulingPlanet: string;
  description: string;
  isPrimaryChoice: boolean;
}

export interface VehicleColourOutput {
  recommendedColours: ColourOption[];
  avoidColours: ColourOption[];
  astroRationale: string;
}

export interface DirectionOutput {
  primaryDirection: 'North' | 'East' | 'North-East' | 'West' | 'North-West' | 'South-East';
  secondaryDirection: string;
  vastuSymbol: string;
  auspiciousHora: string;
  firstDestination: string;
  driveGuidance: string;
}

export interface VahanPatraCertificate {
  certificateId: string;
  issueDate: string;
  ownerName: string;
  vehicleModel: string;
  vehicleType: string;
  deliveryCity: string;
  shubhWindowSummary: string;
  luckyNumberSummary: string;
  colourSummary: string;
  directionSummary: string;
  vahanMantra: string;
  vahanMantraMeaning: string;
  auspiciousPoojaTime: string;
  validityStatus: string;
}

export interface VahanReport {
  reportId: string;
  shareToken: string;
  createdAt: string;
  input: VahanInputData;
  shubhWindows: ShubhWindow[];
  luckyNumbers: LuckyNumbersOutput;
  auspiciousColours: VehicleColourOutput;
  firstDriveDirection: DirectionOutput;
  vahanPatra: VahanPatraCertificate;
}
