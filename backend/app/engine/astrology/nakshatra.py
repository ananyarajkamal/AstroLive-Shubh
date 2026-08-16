from typing import Dict, Any, Tuple
from app.engine.astrology.ephemeris import normalize_longitude

NAKSHATRA_NAMES = [
    "Ashwini",          # 1
    "Bharani",          # 2
    "Krittika",         # 3
    "Rohini",           # 4
    "Mrigashira",       # 5
    "Ardra",            # 6
    "Punarvasu",        # 7
    "Pushya",           # 8
    "Ashlesha",         # 9
    "Magha",            # 10
    "Purva Phalguni",   # 11
    "Uttara Phalguni",  # 12
    "Hasta",            # 13
    "Chitra",           # 14
    "Swati",            # 15
    "Vishakha",         # 16
    "Anuradha",         # 17
    "Jyeshtha",         # 18
    "Mula",             # 19
    "Purva Ashadha",    # 20
    "Uttara Ashadha",   # 21
    "Shravana",         # 22
    "Dhanishta",        # 23
    "Shatabhisha",      # 24
    "Purva Bhadrapada", # 25
    "Uttara Bhadrapada",# 26
    "Revati",           # 27
]

NAKSHATRA_SPAN = 360.0 / 27.0  # 13.333333333333334° (13°20')
PADA_SPAN = NAKSHATRA_SPAN / 4.0   # 3.3333333333333335° (3°20')


def calculate_nakshatra(longitude: float) -> Tuple[str, int, int, float]:
    """
    Calculate Nakshatra details from sidereal longitude (usually Moon's longitude).
    Returns (nakshatra_name, nakshatra_index [1-27], pada [1-4], degree_in_nakshatra).
    """
    norm_lon = normalize_longitude(longitude)
    
    nakshatra_idx_0 = int(norm_lon // NAKSHATRA_SPAN) % 27
    nakshatra_idx_1 = nakshatra_idx_0 + 1
    nakshatra_name = NAKSHATRA_NAMES[nakshatra_idx_0]
    
    deg_in_nak = norm_lon % NAKSHATRA_SPAN
    pada = int(deg_in_nak // PADA_SPAN) + 1
    if pada > 4:
        pada = 4

    return nakshatra_name, nakshatra_idx_1, pada, round(deg_in_nak, 4)
