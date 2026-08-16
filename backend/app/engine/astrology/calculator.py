from datetime import datetime
from typing import Dict, Any
from app.engine.astrology.ephemeris import datetime_to_julian_day, get_ayanamsa
from app.engine.astrology.ascendant import calculate_ascendant
from app.engine.astrology.planets import calculate_planetary_positions
from app.engine.astrology.nakshatra import calculate_nakshatra
from app.engine.astrology.rules import format_astrology_result


def compute_astrology_profile(
    utc_datetime: datetime,
    latitude: float,
    longitude: float
) -> Dict[str, Any]:
    """
    Main deterministic calculation pipeline:
    UTC aware datetime + coordinates -> Julian Day -> PySwisseph -> Lagna, Planets, Nakshatra, Rashi.
    """
    # 1. Calculate Julian Day
    jd = datetime_to_julian_day(utc_datetime)
    ayanamsa_val = get_ayanamsa(jd)

    # 2. Calculate Lagna (Ascendant)
    lagna_info = calculate_ascendant(jd, latitude, longitude)

    # 3. Calculate Planetary Positions (Sidereal Lahiri)
    planets_info = calculate_planetary_positions(jd)

    # 4. Find Moon planet for Rashi & Nakshatra
    moon_info = next(p for p in planets_info if p["planet"] == "Moon")

    # 5. Calculate Nakshatra from Moon's sidereal longitude
    nakshatra_info = calculate_nakshatra(moon_info["longitude"])

    # 6. Format using deterministic rule engine
    astrology_data = format_astrology_result(
        lagna=lagna_info,
        planets=planets_info,
        moon_planet=moon_info,
        nakshatra_info=nakshatra_info,
    )
    
    astrology_data["ayanamsa"] = round(ayanamsa_val, 4)

    return astrology_data
