import swisseph as swe
from typing import Dict, Any
from app.engine.astrology.ephemeris import normalize_longitude, FLAGS_SIDEREAL
from app.engine.astrology.zodiac import calculate_rashi


def calculate_ascendant(julian_day: float, latitude: float, longitude: float) -> Dict[str, Any]:
    """
    Calculate Lagna (Ascendant) sidereal longitude for a given Julian Day,
    latitude, and longitude using PySwisseph houses_ex with Lahiri ayanamsa.
    """
    swe.set_sid_mode(swe.SIDM_LAHIRI)
    
    # swe.houses_ex returns (cusps, ascmc)
    # ascmc[0] is Ascendant
    cusps, ascmc = swe.houses_ex(julian_day, latitude, longitude, b'P', FLAGS_SIDEREAL)
    raw_asc_lon = ascmc[0]
    asc_lon = normalize_longitude(raw_asc_lon)

    rashi_name, _, degree = calculate_rashi(asc_lon)

    return {
        "longitude": round(asc_lon, 4),
        "rashi": rashi_name,
        "degree": degree,
    }
