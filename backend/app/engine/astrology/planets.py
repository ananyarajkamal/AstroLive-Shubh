import swisseph as swe
from typing import List, Dict, Any
from app.engine.astrology.ephemeris import normalize_longitude, FLAGS_SIDEREAL
from app.engine.astrology.zodiac import calculate_rashi

PLANET_IDS = [
    ("Sun", swe.SUN),
    ("Moon", swe.MOON),
    ("Mars", swe.MARS),
    ("Mercury", swe.MERCURY),
    ("Jupiter", swe.JUPITER),
    ("Venus", swe.VENUS),
    ("Saturn", swe.SATURN),
    ("Rahu", swe.MEAN_NODE),  # Explicit node convention: Mean Node
]


def calculate_planetary_positions(julian_day: float) -> List[Dict[str, Any]]:
    """
    Calculate sidereal planetary longitudes for Sun, Moon, Mars, Mercury,
    Jupiter, Venus, Saturn, Rahu, and Ketu.
    Uses Lahiri ayanamsa and Moshier ephemeris.
    """
    swe.set_sid_mode(swe.SIDM_LAHIRI)
    results = []

    rahu_lon = 0.0

    for name, body_id in PLANET_IDS:
        res, ret_flags = swe.calc_ut(julian_day, body_id, FLAGS_SIDEREAL)
        raw_lon = res[0]
        speed = res[3]
        norm_lon = normalize_longitude(raw_lon)
        rashi_name, _, deg = calculate_rashi(norm_lon)

        if name == "Rahu":
            rahu_lon = norm_lon

        results.append({
            "planet": name,
            "longitude": round(norm_lon, 4),
            "rashi": rashi_name,
            "degree": deg,
            "speed": round(speed, 4),
        })

    # Ketu calculation: Rahu + 180°
    ketu_lon = normalize_longitude(rahu_lon + 180.0)
    ketu_rashi, _, ketu_deg = calculate_rashi(ketu_lon)
    results.append({
        "planet": "Ketu",
        "longitude": round(ketu_lon, 4),
        "rashi": ketu_rashi,
        "degree": ketu_deg,
        "speed": round(results[-1]["speed"], 4), # Node speed matches Rahu
    })

    return results
