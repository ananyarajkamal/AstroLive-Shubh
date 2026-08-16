import pytest
from datetime import datetime, timezone
from zoneinfo import ZoneInfo
from app.engine.astrology.ephemeris import normalize_longitude, datetime_to_julian_day, get_ayanamsa
from app.engine.astrology.zodiac import calculate_rashi, RASHI_NAMES
from app.engine.astrology.nakshatra import calculate_nakshatra, NAKSHATRA_NAMES
from app.engine.astrology.ascendant import calculate_ascendant
from app.engine.astrology.planets import calculate_planetary_positions
from app.engine.astrology.calculator import compute_astrology_profile


def test_longitude_normalization():
    """Test 4: Longitude normalization to [0, 360)."""
    assert normalize_longitude(0.0) == 0.0
    assert normalize_longitude(360.0) == 0.0
    assert normalize_longitude(-10.0) == 350.0
    assert normalize_longitude(725.5) == 5.5


def test_rashi_boundaries():
    """Test 1: Rashi boundary calculations."""
    rashi, idx, deg = calculate_rashi(0.0)
    assert rashi == "Aries" and idx == 0 and deg == 0.0

    rashi, idx, deg = calculate_rashi(29.9999)
    assert rashi == "Aries" and idx == 0

    rashi, idx, deg = calculate_rashi(30.0)
    assert rashi == "Taurus" and idx == 1 and deg == 0.0

    rashi, idx, deg = calculate_rashi(359.9999)
    assert rashi == "Pisces" and idx == 11


def test_nakshatra_boundaries():
    """Test 2 & 3: Nakshatra and Pada boundaries."""
    # 0° = Ashwini Pada 1
    name, idx, pada, deg = calculate_nakshatra(0.0)
    assert name == "Ashwini" and idx == 1 and pada == 1

    # 3.34° = Ashwini Pada 2
    name, idx, pada, deg = calculate_nakshatra(3.34)
    assert name == "Ashwini" and idx == 1 and pada == 2

    # 13.34° = Bharani Pada 1
    name, idx, pada, deg = calculate_nakshatra(13.34)
    assert name == "Bharani" and idx == 2 and pada == 1

    # 359.9° = Revati Pada 4
    name, idx, pada, deg = calculate_nakshatra(359.9)
    assert name == "Revati" and idx == 27 and pada == 4


def test_timezone_and_julian_day():
    """Test 5 & 6: Timezone conversion and Julian Day generation."""
    # Fixed date: 2000-01-01 12:00 UTC
    dt_utc = datetime(2000, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
    jd = datetime_to_julian_day(dt_utc)
    # J2000.0 epoch at 12:00 TT is 2451545.0
    assert abs(jd - 2451545.0) < 0.01

    # Convert IST 17:30 (which is 12:00 UTC)
    dt_ist = datetime(2000, 1, 1, 17, 30, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    jd_ist = datetime_to_julian_day(dt_ist)
    assert abs(jd - jd_ist) < 0.00001


def test_planetary_calculation_structure():
    """Test 7: Planetary calculation output structure for 9 planets."""
    jd = 2451545.0  # J2000
    planets = calculate_planetary_positions(jd)
    assert len(planets) == 9  # Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu
    
    planet_names = [p["planet"] for p in planets]
    for expected in ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]:
        assert expected in planet_names

    # Check Rahu/Ketu 180° opposite relationship
    rahu = next(p for p in planets if p["planet"] == "Rahu")
    ketu = next(p for p in planets if p["planet"] == "Ketu")
    diff = (ketu["longitude"] - rahu["longitude"]) % 360.0
    assert abs(diff - 180.0) < 0.001


def test_ascendant_output_structure():
    """Test 8: Ascendant (Lagna) output structure."""
    jd = 2451545.0
    # Bengaluru coordinates: 12.9716 N, 77.5946 E
    lagna = calculate_ascendant(jd, latitude=12.9716, longitude=77.5946)
    assert "longitude" in lagna
    assert "rashi" in lagna
    assert "degree" in lagna
    assert 0 <= lagna["longitude"] < 360
    assert lagna["rashi"] in RASHI_NAMES


def test_golden_sanity_astrology_computation():
    """Test 9 & 10: Golden test case producing repeatable deterministic output."""
    # Fixed birth input: 1990-05-15 14:30:00 IST in Bengaluru (12.9716, 77.5946)
    dt_ist = datetime(1990, 5, 15, 14, 30, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    
    # First calculation
    res1 = compute_astrology_profile(dt_ist, latitude=12.9716, longitude=77.5946)
    
    # Second calculation (deterministic check)
    res2 = compute_astrology_profile(dt_ist, latitude=12.9716, longitude=77.5946)

    assert res1 == res2  # Deterministic check: exact equality

    # Check structure
    assert res1["lagna"]["rashi"] == "Virgo"
    assert res1["rashi"] == "Capricorn"
    assert res1["nakshatra"]["name"] == "Uttara Ashadha"
    assert res1["nakshatra"]["pada"] in [1, 2, 3, 4]
    assert len(res1["planets"]) == 9
    assert abs(res1["ayanamsa"] - 23.73) < 0.5
