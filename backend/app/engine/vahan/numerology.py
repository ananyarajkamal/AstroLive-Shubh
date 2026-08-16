from datetime import date
from typing import Dict, Any, List

CHALDEAN_PLANETS: Dict[int, str] = {
    1: "Sun",
    2: "Moon",
    3: "Jupiter",
    4: "Rahu",
    5: "Mercury",
    6: "Venus",
    7: "Ketu",
    8: "Saturn",
    9: "Mars",
}

CHALDEAN_MEANINGS: Dict[int, str] = {
    1: "Ruled by Sun (Surya) – Signifies leadership, commanding road presence, and executive authority.",
    2: "Ruled by Moon (Chandra) – Represents emotional tranquility, smooth driving, and harmonious travel.",
    3: "Ruled by Jupiter (Guru) – Brings wisdom, safety, divine protection, and auspicious long journeys.",
    4: "Ruled by Rahu – Highly dynamic energy; best balanced when paired with 6 or 5.",
    5: "Ruled by Mercury (Budh) – Represents speed, intelligence, adaptability, and high vehicle resale value.",
    6: "Ruled by Venus (Shukra) – Symbolizes luxury, elegance, vehicle comfort, and smooth travels.",
    7: "Ruled by Ketu – Intuitive and analytical; best paired with 3 or 5.",
    8: "Ruled by Saturn (Shani) – Represents endurance and heavy duty; requires careful maintenance.",
    9: "Ruled by Mars (Mangal) – High energy, courage, and sport performance.",
}

# Chaldean friendly digits lookup
FRIENDLY_DIGITS: Dict[int, List[int]] = {
    1: [1, 2, 3, 5, 9],
    2: [1, 2, 3, 5],
    3: [1, 2, 3, 5, 7, 9],
    4: [1, 5, 6, 7],
    5: [1, 2, 3, 5, 6],
    6: [6, 5, 1, 3],
    7: [1, 3, 5, 6],
    8: [3, 5, 6],
    9: [1, 3, 5, 9],
}

# Unfavorable vehicle digits (Saturn 8 & Rahu 4 generally avoided for vehicle sum unless driver is 8/4)
UNFAVORABLE_DIGITS: List[int] = [8, 4]


def reduce_to_single_digit(n: int) -> int:
    """Reduce an integer sum to a single digit [1-9]."""
    while n > 9:
        n = sum(int(d) for d in str(n))
    return n


def calculate_driver_number(dob_str: str) -> int:
    """Calculate Chaldean Driver Number (Day of birth reduced to single digit)."""
    parsed = date.fromisoformat(dob_str)
    return reduce_to_single_digit(parsed.day)


def calculate_conductor_number(dob_str: str) -> int:
    """Calculate Chaldean Conductor Number (Full DOB digits reduced to single digit)."""
    digits = [int(ch) for ch in dob_str if ch.isdigit()]
    return reduce_to_single_digit(sum(digits))


def compute_vahan_numerology(dob_str: str) -> Dict[str, Any]:
    """
    Deterministic Chaldean numerology calculator for vehicle registration numbers.
    """
    driver = calculate_driver_number(dob_str)
    conductor = calculate_conductor_number(dob_str)

    recommended = FRIENDLY_DIGITS.get(driver, [6, 5, 1, 3])
    
    # Generate digit details
    digit_details = []
    base_scores = [98, 94, 89, 85]
    for idx, d in enumerate(recommended):
        score = base_scores[idx] if idx < len(base_scores) else 80
        digit_details.append({
            "digit": d,
            "meaning": CHALDEAN_MEANINGS.get(d, "Auspicious alignment."),
            "planet": CHALDEAN_PLANETS.get(d, "Celestial Body"),
            "compatibilityScore": score,
        })

    # Generate recommended combinations matching driver & conductor harmony
    combos = [
        f"000{recommended[0]}",
        f"0{recommended[1]}0{recommended[1]}",
        f"1{recommended[0]}1{recommended[0]}",
        f"{recommended[0]}00{recommended[0]}",
        f"{recommended[1]*1111}"
    ]

    analysis = (
        f"Chaldean numerology shows strong harmony between your birth driver number {driver} "
        f"({CHALDEAN_PLANETS.get(driver, 'Planet')}) and vehicle luxury energy. "
        f"Recommended primary digit is {recommended[0]}. Avoid registration numbers summing to 8 or 4."
    )

    return {
        "chaldeanDriverNumber": driver,
        "chaldeanConductorNumber": conductor,
        "recommendedDigits": recommended,
        "recommendedCombinations": combos,
        "digitDetails": digit_details,
        "unfavorableDigits": UNFAVORABLE_DIGITS,
        "analysisNote": analysis,
    }
