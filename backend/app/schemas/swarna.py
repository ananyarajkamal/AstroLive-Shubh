"""Pydantic schemas for Swarna & Ratna (Gold & Gemstones) module requests and responses."""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator
from datetime import datetime, date

class SwarnaComputeRequest(BaseModel):
    fullName: str = Field(..., description="Full name of user / buyer")
    dateOfBirth: str = Field(..., description="Date of birth in YYYY-MM-DD format")
    birthTime: str = Field(..., description="Time of birth in HH:MM (24h) format")
    birthCity: str = Field(..., description="City of birth for geocoding")
    guidanceType: str = Field("gold_purchase", description="Guidance type: gold_purchase, gold_gift, gemstone_guidance")
    purpose: Optional[str] = Field("personal", description="Gold purpose: personal, gift, auspicious")
    gemstoneCategory: Optional[str] = Field(None, description="Gemstone category: Ruby, Pearl, Red Coral, Emerald, Yellow Sapphire, Diamond, Blue Sapphire, Hessonite, Cat's Eye")
    itemName: Optional[str] = Field(None, description="Optional ornament / brand name for Chaldean numerology")
    startDate: str = Field(..., description="Target search range start date in YYYY-MM-DD format")
    endDate: str = Field(..., description="Target search range end date in YYYY-MM-DD format")

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

class GemstoneSuitabilityReport(BaseModel):
    gemstoneCategory: str
    rulingPlanet: str
    compatibilityCategory: str
    traditionalAssociation: str
    recommendedMetal: str
    wearingDayTime: str
    cautionNote: str

class SwarnaShubhWindow(BaseModel):
    date: str
    startTime: str
    endTime: str
    purpose: str
    rationale: str

class ItemNumerologyReport(BaseModel):
    itemName: str
    compoundNumber: int
    reducedNumber: int
    rulingPlanet: str
    analysis: str

class SwarnaReportResponse(BaseModel):
    requestId: str
    inputSummary: Dict[str, Any]
    astrologySummary: Dict[str, Any]
    shubhWindows: List[SwarnaShubhWindow]
    gemstoneReport: Optional[GemstoneSuitabilityReport] = None
    itemNumerology: Optional[ItemNumerologyReport] = None
    traditionalNotes: List[str]
    disclaimer: str
