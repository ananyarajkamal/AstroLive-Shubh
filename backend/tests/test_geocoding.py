import pytest
import respx
from httpx import Response
from app.engine.geocoding import resolve_city_coordinates, GeocodingException
from app.core.config import settings


@pytest.mark.asyncio
async def test_fallback_geocoding(monkeypatch):
    """Test 8: Local fallback city geocoding for common Indian cities."""
    monkeypatch.setattr(settings, "GEOAPIFY_API_KEY", "")
    res = await resolve_city_coordinates("bengaluru")
    assert res["city"] == "Bengaluru"
    assert res["latitude"] == 12.9716
    assert res["longitude"] == 77.5946
    assert res["source"] == "fallback"


@pytest.mark.asyncio
@respx.mock
async def test_unknown_city_geocoding_failure():
    """Test 9: Unknown city fails safely when both Geoapify and fallback fail."""
    respx.get("https://api.geoapify.com/v1/geocode/search").mock(
        return_value=Response(500)
    )
    with pytest.raises(GeocodingException) as exc_info:
        await resolve_city_coordinates("NonExistentCityXYZ123")
    assert "Could not resolve location coordinates" in str(exc_info.value)


@pytest.mark.asyncio
@respx.mock
async def test_geoapify_successful_geocoding():
    """Test 7: Successful geocoding via Geoapify API mock using respx."""
    respx.get("https://api.geoapify.com/v1/geocode/search").mock(
        return_value=Response(
            200,
            json={
                "features": [
                    {
                        "properties": {
                            "city": "Tokyo",
                            "lat": 35.6762,
                            "lon": 139.6503,
                        }
                    }
                ]
            },
        )
    )

    with pytest.MonkeyPatch.context() as mp:
        mp.setattr(settings, "GEOAPIFY_API_KEY", "mock_key")
        res = await resolve_city_coordinates("Tokyo, Japan")
        assert res["city"] == "Tokyo"
        assert res["latitude"] == 35.6762
        assert res["longitude"] == 139.6503
        assert res["source"] == "geoapify"
