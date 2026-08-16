from fastapi import APIRouter, HTTPException, status
from app.schemas.vahan import VahanComputeRequest, VahanComputeResponse, ErrorResponse, ValidationErrorResponse
from app.services.vahan_service import process_vahan_compute_request
from app.engine.geocoding import GeocodingException
from app.engine.timezone import TimezoneResolutionException

router = APIRouter()


@router.post(
    "/vahan/compute",
    response_model=VahanComputeResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {"model": VahanComputeResponse, "description": "Vahan request accepted successfully."},
        422: {"model": ValidationErrorResponse, "description": "Validation or Geocoding failure."},
        500: {"model": ErrorResponse, "description": "Internal server error."},
    },
)
async def compute_vahan(request: VahanComputeRequest):
    """
    Primary endpoint for submitting Vahan calculation request.
    Phase 2 validates inputs, geocodes birth city, resolves timezone,
    persists request to database, and returns 200 OK accepted response.
    """
    try:
        response = await process_vahan_compute_request(request)
        return response
    except GeocodingException as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"error": "geocoding_failed", "message": str(e)},
        )
    except TimezoneResolutionException as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail={"error": "timezone_resolution_failed", "message": str(e)},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "server_error", "message": "An internal error occurred while processing your request."},
        )
