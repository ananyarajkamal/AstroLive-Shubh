from typing import Dict, Any

DIRECTION_MAPPINGS: Dict[str, Dict[str, Any]] = {
    "Aries": {
        "primary": "East", "secondary": "North-East",
        "symbol": "Purva Vastu Alignment (Sun Rule)", "hora": "Sun / Mars Hora (08:00 - 09:30 AM)",
        "destination": "Nearby Temple or Elevated Landmark",
        "guidance": "Drive initial 108 meters facing East towards morning solar rays for strength."
    },
    "Taurus": {
        "primary": "North-East", "secondary": "North",
        "symbol": "Ishan Kona Vastu Alignment (Jupiter & Venus)", "hora": "Guru Hora (09:15 - 10:30 AM)",
        "destination": "Nearby Temple or Flowing Waterbody",
        "guidance": "Drive initial 108 meters towards North-East (Ishan Kona) to activate divine protection."
    },
    "Gemini": {
        "primary": "North", "secondary": "North-East",
        "symbol": "Uttara Vastu Alignment (Mercury Rule)", "hora": "Budh Hora (10:00 - 11:15 AM)",
        "destination": "Prominent Commercial Avenue or Garden",
        "guidance": "Drive initial 108 meters facing North to foster smooth mobility and prosperity."
    },
    "Cancer": {
        "primary": "North-West", "secondary": "North-East",
        "symbol": "Vayavya Vastu Alignment (Moon Rule)", "hora": "Chandra Hora (08:30 - 09:45 AM)",
        "destination": "Waterfront, Lake, or Serene Place of Worship",
        "guidance": "Drive initial 108 meters facing North-West for emotional calm and safety."
    },
    "Leo": {
        "primary": "East", "secondary": "North-East",
        "symbol": "Purva Vastu Alignment (Sun Rule)", "hora": "Surya Hora (07:30 - 08:45 AM)",
        "destination": "Royal Monument or Main City Square",
        "guidance": "Drive initial 108 meters facing East to command authority and long vehicle lifespan."
    },
    "Virgo": {
        "primary": "North", "secondary": "North-West",
        "symbol": "Uttara Vastu Alignment (Mercury Rule)", "hora": "Budh Hora (09:30 - 10:45 AM)",
        "destination": "Botanical Park or Financial District",
        "guidance": "Drive initial 108 meters facing North for precision, safety, and high resale value."
    },
    "Libra": {
        "primary": "West", "secondary": "North-East",
        "symbol": "Pashchima Vastu Alignment (Venus Rule)", "hora": "Shukra Hora (10:15 - 11:30 AM)",
        "destination": "Aesthetic Promenade or Temple",
        "guidance": "Drive initial 108 meters facing West or North-East for perfect driving balance."
    },
    "Scorpio": {
        "primary": "South-East", "secondary": "East",
        "symbol": "Agneya Vastu Alignment (Mars Rule)", "hora": "Mangal Hora (08:15 - 09:30 AM)",
        "destination": "Nearby Temple or Hilltop Viewpoint",
        "guidance": "Drive initial 108 meters facing South-East/East for maximum protection."
    },
    "Sagittarius": {
        "primary": "North-East", "secondary": "East",
        "symbol": "Ishan Kona Vastu Alignment (Jupiter Rule)", "hora": "Guru Hora (09:00 - 10:15 AM)",
        "destination": "Sacred Pilgrimage Temple or University Campus",
        "guidance": "Drive initial 108 meters facing North-East to ensure blessed long-distance travels."
    },
    "Capricorn": {
        "primary": "West", "secondary": "North",
        "symbol": "Pashchima Vastu Alignment (Saturn Rule)", "hora": "Shani / Budh Hora (11:00 AM - 12:15 PM)",
        "destination": "Historic Stone Monument or Corporate Plaza",
        "guidance": "Drive initial 108 meters facing West to solidify endurance and vehicle durability."
    },
    "Aquarius": {
        "primary": "West", "secondary": "North-West",
        "symbol": "Vayavya Vastu Alignment (Saturn & Rahu Rule)", "hora": "Shani Hora (10:30 - 11:45 AM)",
        "destination": "Modern Technology Park or Scenic Bridge",
        "guidance": "Drive initial 108 meters facing West/North-West to activate futuristic innovation."
    },
    "Pisces": {
        "primary": "North-East", "secondary": "East",
        "symbol": "Ishan Kona Vastu Alignment (Jupiter Rule)", "hora": "Guru Hora (09:30 - 10:45 AM)",
        "destination": "Riverbank, Lake, or Peaceful Temple",
        "guidance": "Drive initial 108 meters facing North-East for divine grace and peaceful journeys."
    },
}


def compute_vahan_direction(lagna_rashi: str) -> Dict[str, Any]:
    """
    Deterministic first drive direction recommendation based on Lagna / Rashi.
    """
    mapping = DIRECTION_MAPPINGS.get(lagna_rashi, DIRECTION_MAPPINGS["Taurus"])

    return {
        "primaryDirection": mapping["primary"],
        "secondaryDirection": mapping["secondary"],
        "vastuSymbol": mapping["symbol"],
        "auspiciousHora": mapping["hora"],
        "firstDestination": mapping["destination"],
        "driveGuidance": mapping["guidance"],
    }
