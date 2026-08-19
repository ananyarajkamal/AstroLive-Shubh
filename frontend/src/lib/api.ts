import { VahanInputData, Phase3ComputeResponse, Phase2ErrorResponse } from './types';

export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'https://astrolive-shubh.onrender.com/api/v1').replace(/\/+$/, '');


export class ApiError extends Error {
  status: number;
  errorType: string;
  details?: { field: string; message: string }[];

  constructor(message: string, status: number, errorType: string = 'api_error', details?: { field: string; message: string }[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorType = errorType;
    this.details = details;
  }
}

/**
 * Phase 3 Real API Call to FastAPI `/api/v1/vahan/compute`.
 * Executes PySwisseph deterministic astrology calculations and returns structured Lagna, Rashi, Nakshatra, and Planets.
 */
export async function computeVahanRequest(inputData: VahanInputData): Promise<Phase3ComputeResponse> {
  const payload = {
    full_name: inputData.fullName,
    date_of_birth: inputData.dateOfBirth,
    birth_time: inputData.birthTime,
    birth_city: inputData.birthCity,
    vehicle_type: inputData.vehicleType,
    vehicle_model: inputData.vehicleModel,
    delivery_start: inputData.deliveryStartDate,
    delivery_end: inputData.deliveryEndDate,
  };

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/vahan/compute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    throw new ApiError(
      'Unable to connect to the backend server. Please check your network connection or try again later.',
      0,
      'network_error'
    );
  }

  if (!response.ok) {
    let errorData: Phase2ErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // Non-JSON response
    }

    if (response.status === 422 && errorData) {
      if (errorData.error === 'validation_error' && errorData.details) {
        throw new ApiError(
          'Please review the highlighted fields and fix any errors.',
          422,
          'validation_error',
          errorData.details
        );
      } else if (errorData.error === 'geocoding_failed') {
        throw new ApiError(
          errorData.message || 'Could not resolve birth city coordinates. Please check city spelling.',
          422,
          'geocoding_failed'
        );
      } else if (errorData.error === 'timezone_resolution_failed') {
        throw new ApiError(
          errorData.message || 'Could not resolve timezone for the birth location.',
          422,
          'timezone_resolution_failed'
        );
      }
    }

    const fallbackMsg = errorData?.message || `Server error (${response.status}). Please try again later.`;
    throw new ApiError(fallbackMsg, response.status, errorData?.error || 'server_error');
  }

  const data: Phase3ComputeResponse = await response.json();
  return data;
}
