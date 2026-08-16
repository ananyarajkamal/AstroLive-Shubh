"""Griha Recommender Engine - Orchestrates astrology and property guidance."""

import uuid
from app.schemas.griha import GrihaComputeRequest, GrihaReportResponse
from app.engine.geocoding import resolve_city_coordinates
from app.engine.timezone import resolve_timezone_and_datetime
from app.engine.astrology.calculator import compute_astrology_profile
from app.engine.griha.orientation import analyze_griha_orientation
from app.engine.griha.muhurat import calculate_griha_muhurats

async def compute_griha_report(req: GrihaComputeRequest) -> GrihaReportResponse:
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

    rashi_name = astro["rashi"]
    nakshatra_name = astro["nakshatra"]["name"]

    # 4. Analyze Vastu property orientation
    orientation_guidance = analyze_griha_orientation(
        orientation_raw=req.propertyOrientation,
        rashi_name=rashi_name
    )

    # 5. Compute date-bounded Shubh Muhurat windows
    shubh_windows = calculate_griha_muhurats(
        start_date_str=req.startDate,
        end_date_str=req.endDate,
        activity_raw=req.preferredActivity,
        nakshatra_name=nakshatra_name
    )

    # 6. Assemble Vastu recommendations & notes
    vastu_recs = [
        f"Position the main entrance threshold cleanly facing {orientation_guidance.primaryOrientation}.",
        "Ensure the North-East (Ishan) corner of the property is kept clean, uncluttered, and well-lit.",
        "Place the primary kitchen stove or hearth in the South-East (Agni) quadrant for health and vitality.",
        "Designate the South-West (Nairrutya) sector for master bedroom or heavy stability storage."
    ]

    important_notes = [
        "All calculated Muhurat windows are strictly bounded within your requested date range.",
        "Astrological timings are calculated deterministically using Swiss Ephemeris sidereal Lahiri Ayanamsa.",
        "For major structural modifications or foundation laying, consult a qualified Vastu architect."
    ]

    return GrihaReportResponse(
        requestId=f"griha-{uuid.uuid4().hex[:12]}",
        inputSummary={
            "fullName": req.fullName,
            "dateOfBirth": req.dateOfBirth,
            "birthTime": req.birthTime,
            "birthCity": display_city,
            "propertyType": req.propertyType.title(),
            "propertyOrientation": req.propertyOrientation.title(),
            "preferredActivity": req.preferredActivity.replace('_', ' ').title(),
            "startDate": req.startDate,
            "endDate": req.endDate
        },
        astrologySummary={
            "ascendant": astro["lagna"],
            "moonSign": astro["rashi"],
            "nakshatra": astro["nakshatra"],
            "planetaryPositions": astro["planets"]
        },
        orientationGuidance=orientation_guidance,
        shubhWindows=shubh_windows,
        vastuRecommendations=vastu_recs,
        importantNotes=important_notes
    )
