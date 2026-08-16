"""Swarna Recommender Engine - Orchestrates astrology, gold timing, and gemstone suitability."""

import uuid
from app.schemas.swarna import SwarnaComputeRequest, SwarnaReportResponse, ItemNumerologyReport
from app.engine.geocoding import resolve_city_coordinates
from app.engine.timezone import resolve_timezone_and_datetime
from app.engine.astrology.calculator import compute_astrology_profile
from app.engine.swarna.muhurat import calculate_swarna_muhurats
from app.engine.swarna.gemstone import analyze_gemstone_suitability
from app.engine.vyapar.numerology import calculate_brand_numerology

async def compute_swarna_report(req: SwarnaComputeRequest) -> SwarnaReportResponse:
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

    lagna_rashi = astro["lagna"]["rashi"]
    nakshatra_name = astro["nakshatra"]["name"]

    # 4. Compute date-bounded Shubh Muhurat windows
    purpose_key = req.purpose or req.guidanceType
    shubh_windows = calculate_swarna_muhurats(
        start_date_str=req.startDate,
        end_date_str=req.endDate,
        purpose_raw=purpose_key,
        nakshatra_name=nakshatra_name
    )

    # 5. Gemstone Suitability Report (if selected or gemstone provided)
    gemstone_report = None
    if req.guidanceType == "gemstone_guidance" or req.gemstoneCategory:
        gemstone_report = analyze_gemstone_suitability(
            gemstone_raw=req.gemstoneCategory or "Ruby",
            lagna_rashi=lagna_rashi
        )

    # 6. Item / Ornament Name Chaldean Numerology (if provided)
    item_numerology_report = None
    if req.itemName and req.itemName.strip():
        num_res = calculate_brand_numerology(req.itemName, req.dateOfBirth)
        if num_res:
            item_numerology_report = ItemNumerologyReport(
                itemName=req.itemName.strip(),
                compoundNumber=num_res.compoundNumber,
                reducedNumber=num_res.reducedNumber,
                rulingPlanet=num_res.rulingPlanet,
                analysis=num_res.analysis
            )

    traditional_notes = [
        "All calculated timing windows are strictly bounded within your requested date range.",
        "Astrological calculations use Swiss Ephemeris sidereal Lahiri Ayanamsa.",
        "Traditional gold purchases during Pushya Nakshatra and Dhanteras are considered highly auspicious."
    ]

    disclaimer = (
        "DISCLAIMER: All guidance provided by AstroLive Shubh Swarna & Ratna is based purely on traditional "
        "Indian astrological principles. This guidance does not constitute medical advice, financial advice, "
        "investment management, or guaranteed asset performance."
    )

    return SwarnaReportResponse(
        requestId=f"swarna-{uuid.uuid4().hex[:12]}",
        inputSummary={
            "fullName": req.fullName,
            "dateOfBirth": req.dateOfBirth,
            "birthTime": req.birthTime,
            "birthCity": display_city,
            "guidanceType": req.guidanceType.replace('_', ' ').title(),
            "purpose": (req.purpose or "N/A").title(),
            "gemstoneCategory": req.gemstoneCategory or "N/A",
            "itemName": req.itemName or "N/A",
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
        gemstoneReport=gemstone_report,
        itemNumerology=item_numerology_report,
        traditionalNotes=traditional_notes,
        disclaimer=disclaimer
    )
