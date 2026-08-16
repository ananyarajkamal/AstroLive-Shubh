"""Vyapar Recommender Engine - Orchestrates astrology, brand numerology, and milestone guidance."""

import uuid
from app.schemas.vyapar import VyaparComputeRequest, VyaparReportResponse
from app.engine.geocoding import resolve_city_coordinates
from app.engine.timezone import resolve_timezone_and_datetime
from app.engine.astrology.calculator import compute_astrology_profile
from app.engine.vyapar.numerology import calculate_brand_numerology
from app.engine.vyapar.muhurat import calculate_vyapar_muhurats

async def compute_vyapar_report(req: VyaparComputeRequest) -> VyaparReportResponse:
    # 1. Geocode birth city
    geo = await resolve_city_coordinates(req.birthCity)
    lat = geo["latitude"]
    lon = geo["longitude"]
    display_city = geo["city"]

    # 2. Resolve timezone and aware datetime
    tz_info = resolve_timezone_and_datetime(
        latitude=lat,
        longitude=lon,
        date_str=req.dateOfBirth,
        time_str=req.birthTime
    )

    # 3. Compute PySwisseph planetary chart
    astro = compute_astrology_profile(
        utc_datetime=tz_info["aware_datetime"],
        latitude=lat,
        longitude=lon
    )

    nakshatra_name = astro["nakshatra"]["name"]

    # 4. Brand Numerology calculation (if brand name provided)
    brand_numerology_report = None
    if req.brandName:
        brand_numerology_report = calculate_brand_numerology(req.brandName, req.dateOfBirth)

    # 5. Compute date-bounded Shubh Muhurat windows
    shubh_windows = calculate_vyapar_muhurats(
        start_date_str=req.startDate,
        end_date_str=req.endDate,
        milestone_raw=req.milestone,
        nakshatra_name=nakshatra_name
    )

    important_notes = [
        "All calculated commercial milestone windows are strictly bounded within your requested date range.",
        "Astrological timings provide auspicious timing windows only and do not constitute financial guarantees.",
        "Calculated deterministically using Swiss Ephemeris sidereal Lahiri Ayanamsa."
    ]

    return VyaparReportResponse(
        requestId=f"vyapar-{uuid.uuid4().hex[:12]}",
        inputSummary={
            "fullName": req.fullName,
            "dateOfBirth": req.dateOfBirth,
            "birthTime": req.birthTime,
            "birthCity": display_city,
            "businessType": req.businessType.title(),
            "milestone": req.milestone.replace('_', ' ').title(),
            "brandName": req.brandName or "N/A",
            "startDate": req.startDate,
            "endDate": req.endDate
        },
        astrologySummary={
            "ascendant": astro["lagna"],
            "moonSign": astro["rashi"],
            "nakshatra": astro["nakshatra"],
            "planetaryPositions": astro["planets"]
        },
        shubhWindows=shubh_windows,
        brandNumerology=brand_numerology_report,
        favorableNumbers=[1, 3, 5, 6],
        importantNotes=important_notes
    )
