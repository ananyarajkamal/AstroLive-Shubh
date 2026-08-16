"""Swarna Gemstone Compatibility Engine - Traditional Astrology Alignment."""

from typing import Dict, Any, Optional
from app.schemas.swarna import GemstoneSuitabilityReport

GEMSTONES_DATA: Dict[str, Dict[str, Any]] = {
    "ruby": {
        "category": "Ruby (Manikya)",
        "planet": "Sun (Surya)",
        "favorable_lagnas": ["Aries", "Leo", "Sagittarius"],
        "metal": "24k Gold or Copper",
        "time": "Sunday Morning during Sun Hora",
        "association": "Traditional association with vital energy, leadership, and executive authority.",
        "caution": "Wear on ring finger of right hand. Avoid wearing alongside Blue Sapphire or Diamond."
    },
    "pearl": {
        "category": "Pearl (Moti)",
        "planet": "Moon (Chandra)",
        "favorable_lagnas": ["Cancer", "Scorpio", "Pisces"],
        "metal": "Sterling Silver",
        "time": "Monday Morning during Moon Hora",
        "association": "Traditional association with emotional peace, mental tranquility, and intuition.",
        "caution": "Wear on little finger of right hand."
    },
    "red coral": {
        "category": "Red Coral (Moonga)",
        "planet": "Mars (Mangal)",
        "favorable_lagnas": ["Aries", "Scorpio", "Leo"],
        "metal": "Gold or Copper",
        "time": "Tuesday Morning during Mars Hora",
        "association": "Traditional association with courage, physical stamina, and ambition.",
        "caution": "Wear on ring finger."
    },
    "emerald": {
        "category": "Emerald (Panna)",
        "planet": "Mercury (Budh)",
        "favorable_lagnas": ["Taurus", "Gemini", "Virgo", "Libra"],
        "metal": "Yellow Gold",
        "time": "Wednesday Morning during Mercury Hora",
        "association": "Traditional association with commercial intellect, speech, and mathematical acumen.",
        "caution": "Wear on little finger of right hand."
    },
    "yellow sapphire": {
        "category": "Yellow Sapphire (Pukhraj)",
        "planet": "Jupiter (Guru)",
        "favorable_lagnas": ["Sagittarius", "Pisces", "Aries", "Leo"],
        "metal": "24k Yellow Gold",
        "time": "Thursday Morning during Jupiter Hora",
        "association": "Traditional association with divine wisdom, wealth retention, and higher learning.",
        "caution": "Wear on index finger of right hand."
    },
    "diamond": {
        "category": "Diamond (Heera)",
        "planet": "Venus (Shukra)",
        "favorable_lagnas": ["Taurus", "Libra", "Capricorn", "Aquarius"],
        "metal": "Platinum or White Gold",
        "time": "Friday Morning during Venus Hora",
        "association": "Traditional association with luxury, aesthetic refine, and vehicle comfort.",
        "caution": "Wear on middle finger of right hand."
    },
    "blue sapphire": {
        "category": "Blue Sapphire (Neelam)",
        "planet": "Saturn (Shani)",
        "favorable_lagnas": ["Taurus", "Libra", "Capricorn", "Aquarius"],
        "metal": "Silver or White Gold",
        "time": "Saturday Evening during Saturn Hora",
        "association": "Traditional association with discipline, long-term endurance, and structural focus.",
        "caution": "Requires prior 3-day trial period under pillow as per traditional guidance."
    },
    "hessonite": {
        "category": "Hessonite (Gomed)",
        "planet": "Rahu",
        "favorable_lagnas": ["Taurus", "Gemini", "Libra"],
        "metal": "Silver",
        "time": "Saturday Night",
        "association": "Traditional association with sudden insights and technical mastery.",
        "caution": "Wear on middle finger of right hand."
    },
    "cat's eye": {
        "category": "Cat's Eye (Lehsuniya)",
        "planet": "Ketu",
        "favorable_lagnas": ["Aries", "Scorpio", "Sagittarius"],
        "metal": "Silver",
        "time": "Tuesday Night",
        "association": "Traditional association with spiritual intuition and protection.",
        "caution": "Wear on ring or middle finger."
    }
}

def analyze_gemstone_suitability(
    gemstone_raw: Optional[str],
    lagna_rashi: str
) -> Optional[GemstoneSuitabilityReport]:
    if not gemstone_raw or not gemstone_raw.strip():
        return None

    key = gemstone_raw.lower().strip()
    match = GEMSTONES_DATA.get(key)
    
    if not match:
        return GemstoneSuitabilityReport(
            gemstoneCategory=gemstone_raw.title(),
            rulingPlanet="Traditional Astrological Body",
            compatibilityCategory="Further Traditional Assessment Recommended",
            traditionalAssociation="Traditional symbolic association.",
            recommendedMetal="Gold or Silver",
            wearingDayTime="Consult local traditional astrologer",
            cautionNote="Further traditional assessment recommended."
        )

    is_favorable = lagna_rashi in match["favorable_lagnas"]
    compat = "Highly Compatible" if is_favorable else "Favorable (With Consultation)"

    return GemstoneSuitabilityReport(
        gemstoneCategory=match["category"],
        rulingPlanet=match["planet"],
        compatibilityCategory=compat,
        traditionalAssociation=match["association"],
        recommendedMetal=match["metal"],
        wearingDayTime=match["time"],
        cautionNote=match["caution"]
    )
