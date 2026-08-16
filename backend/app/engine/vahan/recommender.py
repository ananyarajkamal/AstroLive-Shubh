from typing import Dict, Any
from app.schemas.vahan import VahanComputeRequest
from app.engine.vahan.numerology import compute_vahan_numerology
from app.engine.vahan.colour import compute_vahan_colours
from app.engine.vahan.direction import compute_vahan_direction
from app.engine.vahan.muhurat import compute_shubh_delivery_windows


def generate_vahan_recommendations(
    req: VahanComputeRequest,
    astro_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Main Phase 4 Vahan Recommendation Engine Orchestrator.
    Consumes input request and calculated Phase 3 astrology outputs.
    Returns deterministic recommendations payload for delivery windows,
    lucky numbers, vehicle colours, and first drive directions.
    """
    moon_rashi = astro_data["rashi"]
    lagna_rashi = astro_data["lagna"]["rashi"]
    nakshatra_name = astro_data["nakshatra"]["name"]

    # 1. Muhurat Delivery Windows
    delivery_windows = compute_shubh_delivery_windows(
        delivery_start_str=req.delivery_start,
        delivery_end_str=req.delivery_end,
        moon_rashi=moon_rashi,
        nakshatra_name=nakshatra_name,
    )

    # 2. Chaldean Numerology
    lucky_numbers = compute_vahan_numerology(req.date_of_birth)

    # 3. Vehicle Colours
    colours = compute_vahan_colours(moon_rashi)

    # 4. First Drive Direction
    direction = compute_vahan_direction(lagna_rashi)

    return {
        "delivery_windows": delivery_windows,
        "lucky_numbers": lucky_numbers,
        "colours": colours,
        "directions": direction,
    }
