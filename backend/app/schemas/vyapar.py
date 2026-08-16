"""Pydantic schemas for Vyapar (Business & Enterprise) module requests and responses."""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator
from datetime import datetime, date

class VyaparComputeRequest(BaseModel):
    fullName: str = Field(..., description="Full name of business founder / owner")
    dateOfBirth: str = Field(..., description="Date of birth in YYYY-MM-DD format")
    birthTime: str = Field(..., description="Time of birth in HH:MM (24h) format")
    birthCity: str = Field(..., description="City of birth for geocoding")
    businessType: str = Field("startup", description="Business category: startup, retail, restaurant, service, manufacturing, technology, other")
    milestone: str = Field("launch", description="Business milestone: incorporation, launch, shop_opening, office_opening, ribbon_cutting, product_launch")
    brandName: Optional[str] = Field(None, description="Optional business / brand name for Chaldean numerology")
    startDate: str = Field(..., description="Target milestone search range start date in YYYY-MM-DD format")
    endDate: str = Field(..., description="Target milestone search range end date in YYYY-MM-DD format")

    @field_validator('dateOfBirth')
    def validate_dob(cls, v):
        try:
            parsed = datetime.strptime(v, "%Y-%m-%d").date()
            if parsed > date.today():
                raise ValueError("Date of birth cannot be in the future.")
        except ValueError as e:
            if "future" in str(e):
                raise e
            raise ValueError("Invalid date of birth format. Use YYYY-MM-DD.")
        return v

    @field_validator('birthTime')
    def validate_birth_time(cls, v):
        try:
            datetime.strptime(v, "%H:%M")
        except ValueError:
            raise ValueError("Invalid birth time format. Use HH:MM in 24-hour format.")
        return v

    @field_validator('endDate')
    def validate_date_range(cls, v, values):
        if 'startDate' in values.data:
            start_str = values.data['startDate']
            try:
                start_dt = datetime.strptime(start_str, "%Y-%m-%d").date()
                end_dt = datetime.strptime(v, "%Y-%m-%d").date()
                if end_dt < start_dt:
                    raise ValueError("End date cannot be earlier than start date.")
            except ValueError as e:
                if "earlier" in str(e):
                    raise e
                raise ValueError("Invalid date format in range.")
        return v

class BrandNumerologyReport(BaseModel):
    brandName: str
    compoundNumber: int
    reducedNumber: int
    driverNumber: int
    conductorNumber: int
    rulingPlanet: str
    favorableNumbers: List[int]
    numbersToAvoid: List[int]
    analysis: str

class VyaparShubhWindow(BaseModel):
    date: str
    startTime: str
    endTime: str
    milestone: str
    rationale: str

class VyaparReportResponse(BaseModel):
    requestId: str
    inputSummary: Dict[str, Any]
    astrologySummary: Dict[str, Any]
    shubhWindows: List[VyaparShubhWindow]
    brandNumerology: Optional[BrandNumerologyReport] = None
    favorableNumbers: List[int]
    importantNotes: List[str]
