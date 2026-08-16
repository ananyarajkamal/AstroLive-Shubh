from datetime import date, time, datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator, model_validator


class VahanComputeRequest(BaseModel):
    full_name: str = Field(..., description="Full name of the user")
    date_of_birth: str = Field(..., description="Date of birth in YYYY-MM-DD format")
    birth_time: str = Field(..., description="Exact birth time in HH:MM format")
    birth_city: str = Field(..., description="Name of the birth city")
    vehicle_type: str = Field(..., description="Category of vehicle (SUV, Sedan, etc.)")
    vehicle_model: str = Field(..., description="Make and model of vehicle")
    delivery_start: str = Field(..., description="Earliest delivery date in YYYY-MM-DD format")
    delivery_end: str = Field(..., description="Latest delivery date in YYYY-MM-DD format")

    @field_validator("full_name", "birth_city", "vehicle_type", "vehicle_model")
    @classmethod
    def check_non_empty(cls, v: str, info) -> str:
        if not v or not v.strip():
            raise ValueError(f"{info.field_name.replace('_', ' ').title()} cannot be empty.")
        return v.strip()

    @field_validator("date_of_birth")
    @classmethod
    def validate_dob(cls, v: str) -> str:
        try:
            parsed = date.fromisoformat(v)
        except ValueError:
            raise ValueError("Date of birth must be a valid date in YYYY-MM-DD format.")
        
        if parsed > date.today():
            raise ValueError("Date of birth cannot be in the future.")
        if parsed.year < 1900:
            raise ValueError("Year of birth must be 1900 or later.")
        return v

    @field_validator("birth_time")
    @classmethod
    def validate_time(cls, v: str) -> str:
        try:
            time.fromisoformat(v)
        except ValueError:
            raise ValueError("Birth time must be a valid time in HH:MM format.")
        return v

    @field_validator("delivery_start", "delivery_end")
    @classmethod
    def validate_date_format(cls, v: str, info) -> str:
        try:
            date.fromisoformat(v)
        except ValueError:
            raise ValueError(f"{info.field_name.replace('_', ' ').title()} must be a valid date in YYYY-MM-DD format.")
        return v

    @model_validator(mode="after")
    def validate_delivery_range(self) -> "VahanComputeRequest":
        try:
            start = date.fromisoformat(self.delivery_start)
            end = date.fromisoformat(self.delivery_end)
            if start > end:
                raise ValueError("Delivery start date must be before or equal to delivery end date.")
        except (ValueError, TypeError) as e:
            if "must be before or equal" in str(e):
                raise ValueError("Delivery start date must be before or equal to delivery end date.")
        return self


class BirthLocation(BaseModel):
    city: str
    latitude: float
    longitude: float
    timezone: str
    timezone_offset: str
    local_birth_datetime_iso: str


class LagnaModel(BaseModel):
    longitude: float
    rashi: str
    degree: float


class NakshatraModel(BaseModel):
    name: str
    index: int
    pada: int
    longitude: float


class PlanetModel(BaseModel):
    planet: str
    longitude: float
    rashi: str
    degree: float
    speed: Optional[float] = None


class AstrologyModel(BaseModel):
    lagna: LagnaModel
    rashi: str
    nakshatra: NakshatraModel
    planets: List[PlanetModel]
    ayanamsa: Optional[float] = None


class RecommendationsModel(BaseModel):
    delivery_windows: List[Dict[str, Any]]
    lucky_numbers: Dict[str, Any]
    colours: Dict[str, Any]
    directions: Dict[str, Any]


class VahanComputeResponse(BaseModel):
    request_id: str
    status: str = "computed"
    birth_location: BirthLocation
    astrology: AstrologyModel
    recommendations: RecommendationsModel
    message: str = "Vahan astrological and vehicle recommendations completed successfully."
    phase: int = 4


class ValidationErrorDetail(BaseModel):
    field: str
    message: str


class ValidationErrorResponse(BaseModel):
    error: str = "validation_error"
    details: List[ValidationErrorDetail]


class ErrorResponse(BaseModel):
    error: str
    message: str
