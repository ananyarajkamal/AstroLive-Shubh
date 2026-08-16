from fastapi import APIRouter
from app.api.v1.endpoints import health, vahan, griha, vyapar, swarna

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(vahan.router, tags=["Vahan"])
api_router.include_router(griha.router, prefix="/griha", tags=["Griha"])
api_router.include_router(vyapar.router, prefix="/vyapar", tags=["Vyapar"])
api_router.include_router(swarna.router, prefix="/swarna", tags=["Swarna & Ratna"])
