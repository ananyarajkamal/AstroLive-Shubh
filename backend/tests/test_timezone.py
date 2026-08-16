import pytest
from app.engine.timezone import resolve_timezone_and_datetime


def test_timezone_resolution_bengaluru():
    """Test 10: Timezone resolution using timezonefinder + zoneinfo."""
    # Bengaluru coordinates: 12.9716, 77.5946
    res = resolve_timezone_and_datetime(
        latitude=12.9716,
        longitude=77.5946,
        date_str="1990-05-15",
        time_str="14:30",
    )
    assert res["timezone"] == "Asia/Kolkata"
    assert res["timezone_offset"] == "+05:30"
    assert "1990-05-15T14:30:00+05:30" in res["local_birth_datetime_iso"]


def test_timezone_resolution_london():
    """Test timezone resolution for London (UTC/BST)."""
    # London coordinates: 51.5074, -0.1278
    res = resolve_timezone_and_datetime(
        latitude=51.5074,
        longitude=-0.1278,
        date_str="1990-01-15",
        time_str="10:00",
    )
    assert res["timezone"] == "Europe/London"
    assert res["timezone_offset"] == "+00:00"
