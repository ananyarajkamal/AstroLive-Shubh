import httpx
from typing import Dict, Any, Optional, Tuple
from app.core.config import settings
from app.core.logging import logger

# Offline fallback dictionary for common Indian cities
INDIAN_CITIES_FALLBACK: Dict[str, Dict[str, Any]] = {
    "bengaluru": {"city": "Bengaluru", "latitude": 12.9716, "longitude": 77.5946},
    "bangalore": {"city": "Bengaluru", "latitude": 12.9716, "longitude": 77.5946},
    "mumbai": {"city": "Mumbai", "latitude": 19.0760, "longitude": 72.8777},
    "delhi": {"city": "Delhi", "latitude": 28.6139, "longitude": 77.2090},
    "new delhi": {"city": "New Delhi", "latitude": 28.6139, "longitude": 77.2090},
    "chennai": {"city": "Chennai", "latitude": 13.0827, "longitude": 80.2707},
    "hyderabad": {"city": "Hyderabad", "latitude": 17.3850, "longitude": 78.4867},
    "kolkata": {"city": "Kolkata", "latitude": 22.5726, "longitude": 88.3639},
    "pune": {"city": "Pune", "latitude": 18.5204, "longitude": 73.8567},
    "ahmedabad": {"city": "Ahmedabad", "latitude": 23.0225, "longitude": 72.5714},
    "jaipur": {"city": "Jaipur", "latitude": 26.9124, "longitude": 75.7873},
    "chandigarh": {"city": "Chandigarh", "latitude": 30.7333, "longitude": 76.7794},
    "kochi": {"city": "Kochi", "latitude": 9.9312, "longitude": 76.2673},
    "lucknow": {"city": "Lucknow", "latitude": 26.8467, "longitude": 80.9462},
    "surat": {"city": "Surat", "latitude": 21.1702, "longitude": 72.8311},
    "indore": {"city": "Indore", "latitude": 22.7196, "longitude": 75.8577},
    "patna": {"city": "Patna", "latitude": 25.5941, "longitude": 85.1376},
    "bhopal": {"city": "Bhopal", "latitude": 23.2599, "longitude": 77.4126},
    "nagpur": {"city": "Nagpur", "latitude": 21.1458, "longitude": 79.0882},
    "coimbatore": {"city": "Coimbatore", "latitude": 11.0168, "longitude": 76.9558},
}


class GeocodingException(Exception):
    pass


async def resolve_city_coordinates(city_name: str) -> Dict[str, Any]:
    """
    Resolve city string to latitude and longitude.
    First tries Geoapify API if key is present.
    If API fails, network fails, or key missing, tries local fallback dataset.
    If both fail, raises GeocodingException.
    """
    clean_city = city_name.strip()
    normalized_city = clean_city.lower().split(",")[0].strip()

    api_key = settings.GEOAPIFY_API_KEY

    if api_key:
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                url = "https://api.geoapify.com/v1/geocode/search"
                params = {"text": clean_city, "apiKey": api_key, "limit": 1, "type": "city"}
                response = await client.get(url, params=params)

                if response.status_code == 200:
                    data = response.json()
                    features = data.get("features", [])
                    if features:
                        props = features[0].get("properties", {})
                        lat = props.get("lat")
                        lon = props.get("lon")
                        city_resolved = props.get("city") or props.get("name") or clean_city
                        if lat is not None and lon is not None:
                            logger.info(f"Geocoded '{clean_city}' via Geoapify: ({lat}, {lon})")
                            return {
                                "city": city_resolved,
                                "latitude": float(lat),
                                "longitude": float(lon),
                                "source": "geoapify",
                            }
        except Exception as e:
            logger.warning(f"Geoapify request failed for '{clean_city}': {e}. Trying fallback.")

    # Try local fallback dataset
    if normalized_city in INDIAN_CITIES_FALLBACK:
        fb = INDIAN_CITIES_FALLBACK[normalized_city]
        logger.info(f"Resolved '{clean_city}' via local fallback: ({fb['latitude']}, {fb['longitude']})")
        return {
            "city": fb["city"],
            "latitude": fb["latitude"],
            "longitude": fb["longitude"],
            "source": "fallback",
        }

    raise GeocodingException(
        f"Could not resolve location coordinates for city '{clean_city}'. Please check the city spelling and try again."
    )
