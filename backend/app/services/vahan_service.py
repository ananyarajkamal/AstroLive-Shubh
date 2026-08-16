from app.schemas.vahan import (
    VahanComputeRequest,
    VahanComputeResponse,
    BirthLocation,
    AstrologyModel,
    LagnaModel,
    NakshatraModel,
    PlanetModel,
    RecommendationsModel,
)
from app.engine.geocoding import resolve_city_coordinates, GeocodingException
from app.engine.timezone import resolve_timezone_and_datetime, TimezoneResolutionException
from app.engine.astrology.calculator import compute_astrology_profile
from app.engine.vahan.recommender import generate_vahan_recommendations
from app.db.queries import save_birth_profile, save_vahan_request, save_vahan_report
from app.core.logging import logger


async def process_vahan_compute_request(req: VahanComputeRequest) -> VahanComputeResponse:
    """
    Phase 4 Service layer orchestrating:
    1. Geocoding birth city -> lat/lon
    2. Resolving IANA timezone and aware birth datetime
    3. Running deterministic PySwisseph astrology engine (Lagna, Rashi, Nakshatra, Planets)
    4. Running deterministic Vahan recommendation engine (Muhurat, Numerology, Colour, Direction)
    5. Persisting birth profile, vahan request, and report payload to database
    6. Returning structured Phase 4 computed response
    """
    # 1. Geocoding
    geo_res = await resolve_city_coordinates(req.birth_city)
    lat = geo_res["latitude"]
    lon = geo_res["longitude"]
    resolved_city = geo_res["city"]

    # 2. Timezone Resolution & Aware Datetime
    tz_res = resolve_timezone_and_datetime(
        latitude=lat,
        longitude=lon,
        date_str=req.date_of_birth,
        time_str=req.birth_time,
    )
    utc_aware_dt = tz_res["aware_datetime"]

    # 3. Deterministic PySwisseph Astrology Engine
    astro_data = compute_astrology_profile(
        utc_datetime=utc_aware_dt,
        latitude=lat,
        longitude=lon,
    )

    # 4. Deterministic Vahan Recommendation Engine
    recs_data = generate_vahan_recommendations(
        req=req,
        astro_data=astro_data,
    )

    # 5. Database Persistence
    profile_record = await save_birth_profile(
        full_name=req.full_name,
        date_of_birth=req.date_of_birth,
        birth_time=req.birth_time,
        birth_city=resolved_city,
        latitude=lat,
        longitude=lon,
        timezone=tz_res["timezone"],
        user_id=None,
    )

    vahan_req_record = await save_vahan_request(
        birth_profile_id=profile_record["id"],
        vehicle_type=req.vehicle_type,
        vehicle_model=req.vehicle_model,
        delivery_start=req.delivery_start,
        delivery_end=req.delivery_end,
        status="computed",
    )

    report_payload = {
        "request_id": vahan_req_record["id"],
        "birth_location": {
            "city": resolved_city,
            "latitude": lat,
            "longitude": lon,
            "timezone": tz_res["timezone"],
        },
        "astrology": astro_data,
        "recommendations": recs_data,
    }

    await save_vahan_report(
        request_id=vahan_req_record["id"],
        report_payload=report_payload,
        shubh_window=recs_data["delivery_windows"],
        lucky_numbers=recs_data["lucky_numbers"],
        colours=recs_data["colours"],
        direction=recs_data["directions"],
    )

    logger.info(f"Successfully processed Phase 4 recommendation request {vahan_req_record['id']} for {req.full_name}")

    # 6. Construct Phase 4 Response
    return VahanComputeResponse(
        request_id=vahan_req_record["id"],
        status="computed",
        birth_location=BirthLocation(
            city=resolved_city,
            latitude=lat,
            longitude=lon,
            timezone=tz_res["timezone"],
            timezone_offset=tz_res["timezone_offset"],
            local_birth_datetime_iso=tz_res["local_birth_datetime_iso"],
        ),
        astrology=AstrologyModel(
            lagna=LagnaModel(**astro_data["lagna"]),
            rashi=astro_data["rashi"],
            nakshatra=NakshatraModel(**astro_data["nakshatra"]),
            planets=[PlanetModel(**p) for p in astro_data["planets"]],
            ayanamsa=astro_data.get("ayanamsa"),
        ),
        recommendations=RecommendationsModel(
            delivery_windows=recs_data["delivery_windows"],
            lucky_numbers=recs_data["lucky_numbers"],
            colours=recs_data["colours"],
            directions=recs_data["directions"],
        ),
        message="Vahan astrological and vehicle recommendations completed successfully.",
        phase=4,
    )
