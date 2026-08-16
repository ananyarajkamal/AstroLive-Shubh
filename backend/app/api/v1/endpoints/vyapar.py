"""FastAPI endpoint for Vyapar (Business & Enterprise) compute requests."""

from fastapi import APIRouter, HTTPException, status
from app.schemas.vyapar import VyaparComputeRequest, VyaparReportResponse
from app.engine.vyapar.recommender import compute_vyapar_report

router = APIRouter()

@router.post("/compute", response_model=VyaparReportResponse, status_code=status.HTTP_200_OK)
async def compute_vyapar(req: VyaparComputeRequest):
    try:
        report = await compute_vyapar_report(req)
        return report
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to calculate Vyapar report: {str(e)}")
