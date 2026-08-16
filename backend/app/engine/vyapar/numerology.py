"""Vyapar Brand Name Chaldean Numerology Module."""

from typing import Dict, List, Optional
from app.schemas.vyapar import BrandNumerologyReport
from app.engine.vahan.numerology import reduce_to_single_digit, calculate_driver_number, calculate_conductor_number, CHALDEAN_PLANETS

CHALDEAN_LETTER_VALUES: Dict[str, int] = {
    'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
    'B': 2, 'K': 2, 'R': 2,
    'C': 3, 'G': 3, 'L': 3, 'S': 3,
    'D': 4, 'M': 4, 'T': 4,
    'E': 5, 'H': 5, 'N': 5, 'X': 5,
    'U': 6, 'V': 6, 'W': 6,
    'O': 7, 'Z': 7,
    'F': 8, 'P': 8
}

def calculate_brand_numerology(brand_name: str, dob_str: str) -> Optional[BrandNumerologyReport]:
    if not brand_name or not brand_name.strip():
        return None

    clean_name = brand_name.strip().upper()
    compound_sum = 0
    for char in clean_name:
        if char in CHALDEAN_LETTER_VALUES:
            compound_sum += CHALDEAN_LETTER_VALUES[char]

    if compound_sum == 0:
        return None

    reduced_num = reduce_to_single_digit(compound_sum)
    driver = calculate_driver_number(dob_str)
    conductor = calculate_conductor_number(dob_str)
    ruling_planet = CHALDEAN_PLANETS.get(reduced_num, "Mercury")

    favorable = [1, 3, 5, 6] if driver in [1, 3, 5, 6] else [5, 6, 1]
    avoid = [4, 8]

    analysis = (
        f"Brand name '{brand_name}' yields Chaldean compound value {compound_sum} (destiny single digit {reduced_num}, "
        f"governed by {ruling_planet}). Aligns harmoniously with founder driver number {driver}."
    )

    return BrandNumerologyReport(
        brandName=brand_name.strip(),
        compoundNumber=compound_sum,
        reducedNumber=reduced_num,
        driverNumber=driver,
        conductorNumber=conductor,
        rulingPlanet=ruling_planet,
        favorableNumbers=favorable,
        numbersToAvoid=avoid,
        analysis=analysis
    )
