import pytest
from app.core.config import settings


def test_valid_vahan_compute_request(client):
    """Test 2 & Requirement #1: Valid request returns HTTP 200 OK (not 202)."""
    payload = {
        "full_name": "Rahul Sharma",
        "date_of_birth": "1990-05-15",
        "birth_time": "14:30",
        "birth_city": "Bengaluru",
        "vehicle_type": "SUV",
        "vehicle_model": "Toyota Fortuner",
        "delivery_start": "2026-08-20",
        "delivery_end": "2026-08-30",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 200  # Requirement #1

    data = response.json()
    assert data["status"] == "computed"
    assert data["phase"] == 4
    assert "request_id" in data
    assert data["birth_location"]["city"] == "Bengaluru"
    assert data["birth_location"]["timezone"] == "Asia/Kolkata"
    assert data["birth_location"]["timezone_offset"] == "+05:30"
    
    # Phase 3 Astrology & Phase 4 Recommendation assertions
    assert "astrology" in data
    assert "recommendations" in data
    astro = data["astrology"]
    recs = data["recommendations"]
    assert "lagna" in astro
    assert "rashi" in astro
    assert "nakshatra" in astro
    assert "planets" in astro
    assert "delivery_windows" in recs
    assert "lucky_numbers" in recs
    assert "colours" in recs
    assert "directions" in recs

    # Requirement #3: Ensure NO secret keys are leaked in body or headers
    response_str = str(data).lower()
    assert "service_role" not in response_str
    assert "secret" not in response_str


def test_invalid_date_of_birth_future(client):
    """Test 3 & Requirement #4: Future birth date returns custom 422 error."""
    payload = {
        "full_name": "Future User",
        "date_of_birth": "2099-01-01",
        "birth_time": "14:30",
        "birth_city": "Mumbai",
        "vehicle_type": "SUV",
        "vehicle_model": "Fortuner",
        "delivery_start": "2026-08-20",
        "delivery_end": "2026-08-30",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["error"] == "validation_error"
    assert any(d["field"] == "date_of_birth" for d in data["details"])
    assert any("future" in d["message"].lower() for d in data["details"])


def test_invalid_birth_time_format(client):
    """Test 4 & Requirement #4: Invalid birth time returns custom 422 error."""
    payload = {
        "full_name": "Rahul Sharma",
        "date_of_birth": "1990-05-15",
        "birth_time": "25:99",
        "birth_city": "Mumbai",
        "vehicle_type": "SUV",
        "vehicle_model": "Fortuner",
        "delivery_start": "2026-08-20",
        "delivery_end": "2026-08-30",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["error"] == "validation_error"
    assert any(d["field"] == "birth_time" for d in data["details"])


def test_missing_birth_city(client):
    """Test 5 & Requirement #4: Empty birth city returns custom 422 error."""
    payload = {
        "full_name": "Rahul Sharma",
        "date_of_birth": "1990-05-15",
        "birth_time": "14:30",
        "birth_city": "   ",
        "vehicle_type": "SUV",
        "vehicle_model": "Fortuner",
        "delivery_start": "2026-08-20",
        "delivery_end": "2026-08-30",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["error"] == "validation_error"
    assert any(d["field"] == "birth_city" for d in data["details"])


def test_invalid_delivery_range(client):
    """Test 6 & Requirement #4: delivery_start > delivery_end returns custom 422 error."""
    payload = {
        "full_name": "Rahul Sharma",
        "date_of_birth": "1990-05-15",
        "birth_time": "14:30",
        "birth_city": "Bengaluru",
        "vehicle_type": "SUV",
        "vehicle_model": "Fortuner",
        "delivery_start": "2026-08-30",
        "delivery_end": "2026-08-20",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["error"] == "validation_error"


def test_geocoding_failure_response(client):
    """Test unknown city geocoding failure returns structured 422 error."""
    payload = {
        "full_name": "Rahul Sharma",
        "date_of_birth": "1990-05-15",
        "birth_time": "14:30",
        "birth_city": "InvalidCityNameX1Y2Z3",
        "vehicle_type": "SUV",
        "vehicle_model": "Fortuner",
        "delivery_start": "2026-08-20",
        "delivery_end": "2026-08-30",
    }
    response = client.post("/api/v1/vahan/compute", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert "geocoding_failed" in str(data)
