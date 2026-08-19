from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging, logger
from app.api.v1.router import api_router

setup_logging()

app = FastAPI(
    title="AstroLive Vahan API",
    description="Personalised vehicle-astrology computation platform backend.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS restriction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Custom 422 RequestValidationError handler matching requirement #4:
    {
      "error": "validation_error",
      "details": [
        {
          "field": "date_of_birth",
          "message": "Date cannot be in the future."
        }
      ]
    }
    """
    details = []
    for err in exc.errors():
        loc = err.get("loc", [])
        # Extract field name from location tuple (skip 'body', 'query', etc.)
        field_name = str(loc[-1]) if loc else "request"
        msg = err.get("msg", "Invalid value")
        # Clean up Pydantic error prefix if present
        if msg.startswith("Value error, "):
            msg = msg.replace("Value error, ", "")

        details.append({
            "field": field_name,
            "message": msg
        })

    logger.warning(f"Validation error on {request.url.path}: {details}")

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "validation_error",
            "details": details
        }
    )


# Root health endpoint
@app.get("/health", tags=["Health"])
def root_health():
    return {"status": "ok"}


# Mount API v1
app.include_router(api_router, prefix="/api/v1")
