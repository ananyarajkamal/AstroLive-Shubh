from typing import Dict, Any, Tuple
from app.engine.astrology.ephemeris import normalize_longitude

RASHI_NAMES = [
    "Aries",        # 0: Mesha (0° - 30°)
    "Taurus",       # 1: Vrishabha (30° - 60°)
    "Gemini",       # 2: Mithuna (60° - 90°)
    "Cancer",       # 3: Karka (90° - 120°)
    "Leo",          # 4: Simha (120° - 150°)
    "Virgo",        # 5: Kanya (150° - 180°)
    "Libra",        # 6: Tula (180° - 210°)
    "Scorpio",      # 7: Vrishchika (210° - 240°)
    "Sagittarius",  # 8: Dhanu (240° - 270°)
    "Capricorn",    # 9: Makara (270° - 300°)
    "Aquarius",     # 10: Kumbha (300° - 330°)
    "Pisces",       # 11: Meena (330° - 360°)
]


def calculate_rashi(longitude: float) -> Tuple[str, int, float]:
    """
    Calculate Rashi (Zodiac Sign) from sidereal longitude.
    Returns (rashi_name, rashi_index, degree_in_rashi).
    """
    norm_lon = normalize_longitude(longitude)
    rashi_idx = int(norm_lon // 30) % 12
    degree_in_rashi = norm_lon % 30.0
    return RASHI_NAMES[rashi_idx], rashi_idx, round(degree_in_rashi, 4)
