"""Unit and integration tests for Griha (Homes & Plots) module."""

import pytest
from datetime import date, timedelta
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.griha import GrihaComputeRequest
from app.engine.griha.orientation import analyze_griha_orientation
from app.engine.griha.muhurat import calculate_griha_muhurats
from app.engine.griha.recommender import compute_griha_report

client = TestClient(app)

@pytest.mark.asyncio
async def test_valid_griha_compute_request():
    req = GrihaComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        propertyType="home",
        propertyOrientation="east",
        preferredActivity="griha_pravesh",
        startDate="2026-09-01",
        endDate="2026-09-30"
    )
    report = await compute_griha_report(req)
    assert report.requestId.startswith("griha-")
    assert report.inputSummary["fullName"] == "Ananya Raj"
    assert report.orientationGuidance.primaryOrientation == "East"
    assert report.orientationGuidance.compatibilityCategory == "Highly Auspicious"
    assert len(report.shubhWindows) > 0
    # Bounded range verification
    for w in report.shubhWindows:
        assert "2026-09-01" <= w.date <= "2026-09-30"

def test_invalid_date_of_birth_future():
    future_date = (date.today() + timedelta(days=1)).strftime("%Y-%m-%d")
    with pytest.raises(ValueError, match="future"):
        GrihaComputeRequest(
            fullName="Test User",
            dateOfBirth=future_date,
            birthTime="12:00",
            birthCity="Delhi",
            startDate="2026-10-01",
            endDate="2026-10-15"
        )

def test_invalid_birth_time_format():
    with pytest.raises(ValueError, match="24-hour"):
        GrihaComputeRequest(
            fullName="Test User",
            dateOfBirth="1990-01-01",
            birthTime="25:99",
            birthCity="Mumbai",
            startDate="2026-10-01",
            endDate="2026-10-15"
        )

def test_invalid_date_range_end_before_start():
    with pytest.raises(ValueError, match="earlier"):
        GrihaComputeRequest(
            fullName="Test User",
            dateOfBirth="1990-01-01",
            birthTime="10:00",
            birthCity="Mumbai",
            startDate="2026-10-15",
            endDate="2026-10-01"
        )

def test_griha_orientation_analysis():
    east = analyze_griha_orientation("east", "Aries")
    assert east.primaryOrientation == "East"
    assert east.compatibilityCategory == "Highly Auspicious"

    south_west = analyze_griha_orientation("south-west", "Taurus")
    assert south_west.compatibilityCategory == "Requires Vastu Remedy"

def test_muhurat_date_window_bounded():
    windows = calculate_griha_muhurats("2026-09-01", "2026-09-10", "griha_pravesh", "Rohini")
    assert len(windows) > 0
    for w in windows:
        assert "2026-09-01" <= w.date <= "2026-09-10"

@pytest.mark.asyncio
async def test_deterministic_repeated_calculation():
    req = GrihaComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        propertyType="plot",
        propertyOrientation="north",
        preferredActivity="bhoomi_pujan",
        startDate="2026-09-01",
        endDate="2026-09-15"
    )
    rep1 = await compute_griha_report(req)
    rep2 = await compute_griha_report(req)
    assert rep1.orientationGuidance == rep2.orientationGuidance
    assert len(rep1.shubhWindows) == len(rep2.shubhWindows)

def test_griha_api_endpoint_integration():
    payload = {
        "fullName": "Ananya Raj",
        "dateOfBirth": "1995-08-15",
        "birthTime": "10:30",
        "birthCity": "Bengaluru",
        "propertyType": "apartment",
        "propertyOrientation": "north-east",
        "preferredActivity": "griha_pravesh",
        "startDate": "2026-09-01",
        "endDate": "2026-09-30"
    }
    response = client.post("/api/v1/griha/compute", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["orientationGuidance"]["compatibilityCategory"] == "Highly Auspicious"
    assert len(data["shubhWindows"]) > 0

def test_existing_vahan_regression():
    vahan_payload = {
        "full_name": "Ananya Raj",
        "date_of_birth": "1995-08-15",
        "birth_time": "10:30",
        "birth_city": "Bengaluru",
        "delivery_start": "2026-09-01",
        "delivery_end": "2026-09-30",
        "vehicle_type": "Car",
        "vehicle_model": "SUV"
    }
    res = client.post("/api/v1/vahan/compute", json=vahan_payload)
    assert res.status_code == 200
    assert res.json()["status"] == "computed"
