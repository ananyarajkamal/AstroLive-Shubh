"""FastAPI endpoint for Griha (Homes & Plots) compute requests."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.griha import GrihaComputeRequest, GrihaReportResponse
from app.engine.griha.recommender import compute_griha_report

router = APIRouter()

@router.post("/compute", response_model=GrihaReportResponse, status_code=status.HTTP_200_OK)
async def compute_griha(req: GrihaComputeRequest):
    try:
        report = await compute_griha_report(req)
        return report
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to calculate Griha report: {str(e)}")
