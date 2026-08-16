from typing import Dict, Any, List

# Deterministic Rashi/Planet to Vehicle Colour Rules
COLOUR_MAPPINGS: Dict[str, Dict[str, Any]] = {
    "Aries": {
        "recommended": [
            {"name": "Warm Bronze / Champagne Gold", "hex": "#C5A059", "rashiAffinity": "Mars & Sun Energy", "rulingPlanet": "Mars", "description": "Projects dynamic courage, warmth, and high vitality.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Moon Balance", "rulingPlanet": "Venus & Moon", "description": "Provides calming balance and driving clarity.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Matte Black / Charcoal Ash", "hex": "#121212", "rashiAffinity": "Saturn Conflict", "rulingPlanet": "Saturn", "description": "May attract sluggish energy and thermal heat absorption.", "isPrimaryChoice": False}
        ],
        "rationale": "Aries is ruled by Mars. Warm metallic shades enhance vital energy while white/silver maintains serene driving focus."
    },
    "Taurus": {
        "recommended": [
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Venus Harmony", "rulingPlanet": "Venus", "description": "Enhances mental clarity, driving calm, and keeps vehicle energy pure.", "isPrimaryChoice": True},
            {"name": "Emerald Metallic Green", "hex": "#0F5257", "rashiAffinity": "Mercury & Venus Alignment", "rulingPlanet": "Mercury", "description": "Attracts prosperity, harmony, and elegant road presence.", "isPrimaryChoice": False},
            {"name": "Deep Midnight Navy / Metallic Blue", "hex": "#0E1B38", "rashiAffinity": "Saturn Aspect", "rulingPlanet": "Saturn", "description": "Projects executive elegance, stability, and high durability.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Crimson Red / Metallic Flame", "hex": "#991B1B", "rashiAffinity": "Mars Conflict", "rulingPlanet": "Mars", "description": "May induce restless driving energy.", "isPrimaryChoice": False}
        ],
        "rationale": "Taurus is ruled by Venus. Light metallic and emerald shades enhance luxury comfort, aesthetic harmony, and resale value."
    },
    "Gemini": {
        "recommended": [
            {"name": "Emerald Metallic Green", "hex": "#0F5257", "rashiAffinity": "Mercury Power", "rulingPlanet": "Mercury", "description": "Enhances sharp focus, quick adaptability, and intelligence.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Venus Harmony", "rulingPlanet": "Venus", "description": "Keeps vehicle energy light, pure, and refined.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Dark Charcoal / Ash Black", "hex": "#1F2937", "rashiAffinity": "Rahu Shadow", "rulingPlanet": "Rahu", "description": "May absorb heat and mask road visibility.", "isPrimaryChoice": False}
        ],
        "rationale": "Gemini is ruled by Mercury. Green and silver tones boost mental alertness, smooth navigation, and communication flow."
    },
    "Cancer": {
        "recommended": [
            {"name": "Pearl White / Moonstone Silver", "hex": "#F8FAFC", "rashiAffinity": "Moon Dominance", "rulingPlanet": "Moon", "description": "Brings serene emotional calm, safety, and pristine vehicle aura.", "isPrimaryChoice": True},
            {"name": "Warm Bronze / Champagne Gold", "hex": "#C5A059", "rashiAffinity": "Jupiter Aspect", "rulingPlanet": "Jupiter", "description": "Brings divine protection and luxury luster.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Jet Black", "hex": "#000000", "rashiAffinity": "Saturn Oppositional Aspect", "rulingPlanet": "Saturn", "description": "Contrasts with sensitive lunar energy.", "isPrimaryChoice": False}
        ],
        "rationale": "Cancer is ruled by the Moon. White and silver shades amplify intuitive safety and peaceful commutes."
    },
    "Leo": {
        "recommended": [
            {"name": "Warm Bronze / Champagne Gold", "hex": "#C5A059", "rashiAffinity": "Solar Dominance", "rulingPlanet": "Sun", "description": "Projects royal authority, luxury luster, and commanding road presence.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Venus Aspect", "rulingPlanet": "Venus", "description": "Balances solar intensity with elegant composure.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Midnight Dark Blue", "hex": "#0F172A", "rashiAffinity": "Saturn Square", "rulingPlanet": "Saturn", "description": "May diminish royal solar shine.", "isPrimaryChoice": False}
        ],
        "rationale": "Leo is ruled by the Sun. Gold, bronze, and radiant silver reflect leadership, prestige, and prosperity."
    },
    "Virgo": {
        "recommended": [
            {"name": "Deep Midnight Navy / Metallic Blue", "hex": "#0E1B38", "rashiAffinity": "Mercury & Saturn Alignment", "rulingPlanet": "Mercury", "description": "Projects executive precision, timeless durability, and calm focus.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Moon Harmony", "rulingPlanet": "Moon", "description": "Keeps driving environment pristine and organized.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Bright Vermilion Red", "hex": "#DC2626", "rashiAffinity": "Mars Tension", "rulingPlanet": "Mars", "description": "May cause unnecessary agitation during dense traffic.", "isPrimaryChoice": False}
        ],
        "rationale": "Virgo is ruled by Mercury. Navy blue and silver encourage analytical precision and flawless vehicle upkeep."
    },
    "Libra": {
        "recommended": [
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Venus Exaltation", "rulingPlanet": "Venus", "description": "Enhances aesthetic elegance, smooth rides, and peace of mind.", "isPrimaryChoice": True},
            {"name": "Champagne Gold / Soft Bronze", "hex": "#D4AF37", "rashiAffinity": "Jupiter Aspect", "rulingPlanet": "Jupiter", "description": "Attracts abundance, vehicle comfort, and auspicious trips.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Matte Black", "hex": "#111827", "rashiAffinity": "Rahu Shadow", "rulingPlanet": "Rahu", "description": "May absorb road heat and obscure nighttime visibility.", "isPrimaryChoice": False}
        ],
        "rationale": "Libra is ruled by Venus. White, champagne, and silver tones promote perfect equilibrium and aesthetic delight."
    },
    "Scorpio": {
        "recommended": [
            {"name": "Deep Midnight Navy / Metallic Blue", "hex": "#0E1B38", "rashiAffinity": "Mars & Jupiter Aspect", "rulingPlanet": "Mars", "description": "Provides powerful stealth, confidence, and intense road resilience.", "isPrimaryChoice": True},
            {"name": "Warm Bronze / Champagne Gold", "hex": "#C5A059", "rashiAffinity": "Sun Harmony", "rulingPlanet": "Sun", "description": "Brings warmth, protection, and executive prestige.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Pure White", "hex": "#FFFFFF", "rashiAffinity": "Neutral Moon", "rulingPlanet": "Moon", "description": "Too passive for intense Martian energy.", "isPrimaryChoice": False}
        ],
        "rationale": "Scorpio is ruled by Mars. Deep navy blue and bronze shades reflect strength, determination, and safety."
    },
    "Sagittarius": {
        "recommended": [
            {"name": "Warm Bronze / Champagne Gold", "hex": "#C5A059", "rashiAffinity": "Jupiter Dominance", "rulingPlanet": "Jupiter", "description": "Brings auspicious fortune, expansion, and long-distance journey luck.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Venus Harmony", "rulingPlanet": "Venus", "description": "Maintains pure energy during highway drives.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Dark Charcoal / Black", "hex": "#1E293B", "rashiAffinity": "Saturn Square", "rulingPlanet": "Saturn", "description": "Dampens adventurous Sagittarian spirit.", "isPrimaryChoice": False}
        ],
        "rationale": "Sagittarius is ruled by Jupiter. Gold, bronze, and bright silver amplify optimistic energy and travel luck."
    },
    "Capricorn": {
        "recommended": [
            {"name": "Deep Midnight Navy / Metallic Blue", "hex": "#0E1B38", "rashiAffinity": "Saturn Dominance", "rulingPlanet": "Saturn", "description": "Projects supreme authority, structural strength, and high longevity.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Mercury Harmony", "rulingPlanet": "Mercury", "description": "Adds refined balance to heavy Saturnian presence.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Bright Flame Red", "hex": "#EF4444", "rashiAffinity": "Mars Enemy Aspect", "rulingPlanet": "Mars", "description": "May create friction with disciplined Saturn energy.", "isPrimaryChoice": False}
        ],
        "rationale": "Capricorn is ruled by Saturn. Midnight navy, metallic blue, and silver foster durability, safety, and long lifespan."
    },
    "Aquarius": {
        "recommended": [
            {"name": "Deep Midnight Navy / Metallic Blue", "hex": "#0E1B38", "rashiAffinity": "Saturn & Rahu Innovation", "rulingPlanet": "Saturn", "description": "Emphasizes futuristic technology, EV innovation, and bold style.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Venus Harmony", "rulingPlanet": "Venus", "description": "Keeps vehicle cabin cool and serene.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Bright Yellow / Amber", "hex": "#F59E0B", "rashiAffinity": "Jupiter Opposition", "rulingPlanet": "Jupiter", "description": "May clash with subtle electric tones.", "isPrimaryChoice": False}
        ],
        "rationale": "Aquarius is ruled by Saturn and Rahu. Metallic blue, navy, and silver support cutting-edge technology and smooth mobility."
    },
    "Pisces": {
        "recommended": [
            {"name": "Warm Bronze / Champagne Gold", "hex": "#C5A059", "rashiAffinity": "Jupiter Exaltation", "rulingPlanet": "Jupiter", "description": "Surrounds vehicle with divine grace, peace, and prosperity.", "isPrimaryChoice": True},
            {"name": "Pearl White / Glacier Silver", "hex": "#F5F7FA", "rashiAffinity": "Moon Harmony", "rulingPlanet": "Moon", "description": "Enhances tranquil driving and intuitive safety.", "isPrimaryChoice": False},
        ],
        "avoid": [
            {"name": "Matte Black", "hex": "#0F172A", "rashiAffinity": "Saturn Shadow", "rulingPlanet": "Saturn", "description": "May absorb heavy external road vibrations.", "isPrimaryChoice": False}
        ],
        "rationale": "Pisces is ruled by Jupiter. Champagne gold, bronze, and pearl white bring divine harmony and calm travels."
    },
}


def compute_vahan_colours(rashi: str) -> Dict[str, Any]:
    """
    Deterministic vehicle colour recommendation engine based on birth Rashi.
    """
    mapping = COLOUR_MAPPINGS.get(rashi, COLOUR_MAPPINGS["Taurus"])

    return {
        "recommendedColours": mapping["recommended"],
        "avoidColours": mapping["avoid"],
        "astroRationale": mapping["rationale"],
    }
