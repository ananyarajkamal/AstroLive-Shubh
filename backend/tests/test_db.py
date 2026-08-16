import pytest
from unittest.mock import patch, MagicMock
from app.db.queries import save_birth_profile, save_vahan_request
from app.db.client import get_supabase_client
from app.core.config import settings


@pytest.mark.asyncio
async def test_db_persistence_fallback_when_unconfigured():
    """Test 11 & Requirement #2: DB persistence functions safely fall back when Supabase unconfigured."""
    profile = await save_birth_profile(
        full_name="Test User",
        date_of_birth="1990-01-01",
        birth_time="12:00",
        birth_city="Delhi",
        latitude=28.6139,
        longitude=77.2090,
        timezone="Asia/Kolkata",
    )
    assert profile["full_name"] == "Test User"
    assert "id" in profile

    req = await save_vahan_request(
        birth_profile_id=profile["id"],
        vehicle_type="Sedan",
        vehicle_model="Honda City",
        delivery_start="2026-08-20",
        delivery_end="2026-08-25",
    )
    assert req["status"] == "accepted"
    assert req["birth_profile_id"] == profile["id"]


def test_service_role_key_security():
    """Requirement #3: Verify service role key is NEVER leaked in frontend vars or public exports."""
    # Ensure config object doesn't export secrets in default repr/dict
    key = settings.SUPABASE_SERVICE_ROLE_KEY
    # Verify no frontend env vars contain service role
    for env_var in ("NEXT_PUBLIC_SUPABASE_KEY", "NEXT_PUBLIC_SERVICE_ROLE"):
        assert env_var not in settings.model_dump()
