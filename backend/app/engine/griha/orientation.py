"""Griha Vastu Orientation Engine - Deterministic Direction Compatibility."""

from typing import Dict, Any, List
from app.schemas.griha import GrihaOrientationGuidance

ORIENTATIONS = {
    "north": {
        "category": "Highly Auspicious",
        "favorable": ["North", "North-East", "East"],
        "caution": ["South-West"],
        "rationale": "North is governed by Kubera (wealth) and Mercury. Highly suitable for prosperity and clear intellectual harmony."
    },
    "east": {
        "category": "Highly Auspicious",
        "favorable": ["East", "North-East", "North"],
        "caution": ["South-West"],
        "rationale": "East is governed by Indra and Sun. Brings vitality, social respect, and auspicious sunrise energy into the home."
    },
    "north-east": {
        "category": "Highly Auspicious",
        "favorable": ["North-East", "East", "North"],
        "caution": ["South-East", "South-West"],
        "rationale": "Ishan corner governed by Jupiter. Ideal for spiritual peace, clarity, and overall family well-being."
    },
    "north-west": {
        "category": "Favorable",
        "favorable": ["North-West", "North", "West"],
        "caution": ["South-East"],
        "rationale": "Vayu corner governed by Moon. Encourages movement, social connections, and harmonious domestic relationships."
    },
    "west": {
        "category": "Favorable",
        "favorable": ["West", "North-West", "South-West"],
        "caution": ["North-East"],
        "rationale": "West is governed by Varuna and Saturn. Highly stable for long-term property ownership and steady wealth retention."
    },
    "south-east": {
        "category": "Neutral (Requires Vastu Alignment)",
        "favorable": ["South-East", "East"],
        "caution": ["North-East"],
        "rationale": "Agni corner governed by Venus. Ideal for kitchen placement; main entrance requires bright lighting and brass remedies."
    },
    "south": {
        "category": "Neutral (Requires Vastu Alignment)",
        "favorable": ["South", "South-East", "West"],
        "caution": ["North-East"],
        "rationale": "Yama direction governed by Mars. Provides strength and security when the main entrance threshold is properly aligned."
    },
    "south-west": {
        "category": "Requires Vastu Remedy",
        "favorable": ["South-West", "West", "South"],
        "caution": ["North-East"],
        "rationale": "Nairrutya corner governed by Rahu. Best suited for master bedroom placement rather than the main entry threshold."
    }
}

def analyze_griha_orientation(orientation_raw: str, rashi_name: str) -> GrihaOrientationGuidance:
    key = orientation_raw.lower().strip()
    match = ORIENTATIONS.get(key, ORIENTATIONS["east"])

    return GrihaOrientationGuidance(
        primaryOrientation=key.title(),
        compatibilityCategory=match["category"],
        favorableDirections=match["favorable"],
        directionsRequiringCaution=match["caution"],
        rationale=match["rationale"]
    )
