"""FastAPI endpoint for Swarna & Ratna (Gold & Gemstones) compute requests."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.swarna import SwarnaComputeRequest, SwarnaReportResponse
from app.engine.swarna.recommender import compute_swarna_report

router = APIRouter()

@router.post("/compute", response_model=SwarnaReportResponse, status_code=status.HTTP_200_OK)
async def compute_swarna(req: SwarnaComputeRequest):
    try:
        report = await compute_swarna_report(req)
        return report
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to calculate Swarna report: {str(e)}")
