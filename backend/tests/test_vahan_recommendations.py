import pytest
from app.engine.vahan.numerology import compute_vahan_numerology, calculate_driver_number, calculate_conductor_number
from app.engine.vahan.colour import compute_vahan_colours
from app.engine.vahan.direction import compute_vahan_direction
from app.engine.vahan.muhurat import compute_shubh_delivery_windows
from app.engine.vahan.recommender import generate_vahan_recommendations
from app.schemas.vahan import VahanComputeRequest


def test_numerology_calculations():
    """Test 1 & 2: Deterministic Chaldean numerology driver & conductor calculations."""
    # DOB: 1992-05-15 -> Day=15 -> 1+5 = 6 (Venus Driver)
    # Sum: 1+9+9+2+0+5+1+5 = 32 -> 3+2 = 5 (Mercury Conductor)
    driver = calculate_driver_number("1992-05-15")
    conductor = calculate_conductor_number("1992-05-15")
    assert driver == 6
    assert conductor == 5

    num_data = compute_vahan_numerology("1992-05-15")
    assert num_data["chaldeanDriverNumber"] == 6
    assert num_data["chaldeanConductorNumber"] == 5
    assert 6 in num_data["recommendedDigits"]
    assert 8 in num_data["unfavorableDigits"]
    assert 4 in num_data["unfavorableDigits"]
    assert len(num_data["recommendedCombinations"]) > 0


def test_colour_mapping_taurus():
    """Test 3: Deterministic vehicle colour recommendation for Taurus."""
    col_data = compute_vahan_colours("Taurus")
    rec_names = [c["name"] for c in col_data["recommendedColours"]]
    assert any("Pearl White" in name for name in rec_names)
    avoid_names = [c["name"] for c in col_data["avoidColours"]]
    assert any("Red" in name for name in avoid_names)
    assert len(col_data["astroRationale"]) > 0


def test_direction_mapping_taurus():
    """Test 4: Deterministic first drive direction recommendation for Taurus."""
    dir_data = compute_vahan_direction("Taurus")
    assert dir_data["primaryDirection"] == "North-East"
    assert "Ishan Kona" in dir_data["vastuSymbol"]
    assert "Guru Hora" in dir_data["auspiciousHora"]


def test_delivery_window_filtering_bounded():
    """Test 5: Delivery windows bounded strictly by delivery_start and delivery_end."""
    windows = compute_shubh_delivery_windows(
        delivery_start_str="2026-08-20",
        delivery_end_str="2026-08-30",
        moon_rashi="Taurus",
        nakshatra_name="Pushya",
    )
    assert len(windows) > 0
    for w in windows:
        assert "2026-08-20" <= w["startDate"] <= "2026-08-30"

    # Edge case: start == end (single day window)
    windows_single = compute_shubh_delivery_windows(
        delivery_start_str="2026-08-25",
        delivery_end_str="2026-08-25",
        moon_rashi="Taurus",
        nakshatra_name="Pushya",
    )
    assert len(windows_single) == 1
    assert windows_single[0]["startDate"] == "2026-08-25"

    # Edge case: invalid range (start > end) -> returns empty list
    windows_invalid = compute_shubh_delivery_windows(
        delivery_start_str="2026-08-30",
        delivery_end_str="2026-08-20",
        moon_rashi="Taurus",
        nakshatra_name="Pushya",
    )
    assert len(windows_invalid) == 0


def test_recommendation_orchestration():
    """Test 6 & 9: Recommendation orchestrator produces deterministic outputs."""
    req = VahanComputeRequest(
        full_name="Aarav Sharma",
        date_of_birth="1992-05-15",
        birth_time="14:30",
        birth_city="Bengaluru",
        vehicle_type="SUV",
        vehicle_model="Tata Nexon EV",
        delivery_start="2026-08-20",
        delivery_end="2026-08-30",
    )

    astro_data = {
        "rashi": "Taurus",
        "lagna": {"rashi": "Taurus", "longitude": 45.0, "degree": 15.0},
        "nakshatra": {"name": "Pushya", "index": 8, "pada": 1, "longitude": 5.0},
    }

    res1 = generate_vahan_recommendations(req, astro_data)
    res2 = generate_vahan_recommendations(req, astro_data)

    # 100% Deterministic equality check
    assert res1 == res2
    assert "delivery_windows" in res1
    assert "lucky_numbers" in res1
    assert "colours" in res1
    assert "directions" in res1


def test_phase4_api_endpoint_integration(client):
    """Test 7 & 10: Complete Phase 4 API endpoint integration & regression test."""
    payload = {
        "full_name": "Aarav Sharma",
        "date_of_birth": "1992-05-15",
        "birth_time": "14:30",
        "birth_city": "Bengaluru",
        "vehicle_type": "SUV",
        "vehicle_model": "Toyota Fortuner",
        "delivery_start": "2026-08-20",
        "delivery_end": "2026-08-30",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "computed"
    assert data["phase"] == 4

    # Phase 3 Astrology assertions
    assert "astrology" in data
    assert "lagna" in data["astrology"]
    assert "rashi" in data["astrology"]
    assert "nakshatra" in data["astrology"]
    assert "planets" in data["astrology"]

    # Phase 4 Recommendation assertions
    assert "recommendations" in data
    recs = data["recommendations"]
    assert "delivery_windows" in recs
    assert "lucky_numbers" in recs
    assert "colours" in recs
    assert "directions" in recs
    assert len(recs["delivery_windows"]) > 0
    assert recs["lucky_numbers"]["chaldeanDriverNumber"] == 6
