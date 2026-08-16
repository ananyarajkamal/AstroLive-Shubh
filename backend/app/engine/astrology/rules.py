from typing import Dict, Any, List, Tuple


def format_astrology_result(
    lagna: Dict[str, Any],
    planets: List[Dict[str, Any]],
    moon_planet: Dict[str, Any],
    nakshatra_info: Tuple[str, int, int, float]
) -> Dict[str, Any]:
    """
    Deterministic rule engine mapping raw astronomical outputs to the
    structured astrology payload for Phase 3.
    """
    nak_name, nak_idx, nak_pada, nak_deg = nakshatra_info

    return {
        "lagna": {
            "longitude": lagna["longitude"],
            "rashi": lagna["rashi"],
            "degree": lagna["degree"],
        },
        "rashi": moon_planet["rashi"],  # Janma Rashi is Moon Sign
        "nakshatra": {
            "name": nak_name,
            "index": nak_idx,
            "pada": nak_pada,
            "longitude": round(nak_deg, 4),
        },
        "planets": planets,
    }
