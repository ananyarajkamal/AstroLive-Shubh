"""Unit and integration tests for Swarna & Ratna (Gold & Gemstones) module."""

import pytest
from datetime import date, timedelta
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.swarna import SwarnaComputeRequest
from app.engine.swarna.gemstone import analyze_gemstone_suitability
from app.engine.swarna.muhurat import calculate_swarna_muhurats
from app.engine.swarna.recommender import compute_swarna_report

client = TestClient(app)

@pytest.mark.asyncio
async def test_valid_gold_request():
    req = SwarnaComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        guidanceType="gold_purchase",
        purpose="personal",
        startDate="2026-09-01",
        endDate="2026-09-30"
    )
    report = await compute_swarna_report(req)
    assert report.requestId.startswith("swarna-")
    assert report.inputSummary["fullName"] == "Ananya Raj"
    assert len(report.shubhWindows) > 0
    for w in report.shubhWindows:
        assert "2026-09-01" <= w.date <= "2026-09-30"

@pytest.mark.asyncio
async def test_valid_gemstone_request():
    req = SwarnaComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        guidanceType="gemstone_guidance",
        gemstoneCategory="Ruby",
        startDate="2026-09-01",
        endDate="2026-09-30"
    )
    report = await compute_swarna_report(req)
    assert report.gemstoneReport is not None
    assert "Ruby" in report.gemstoneReport.gemstoneCategory
    assert report.disclaimer is not None

def test_invalid_date_of_birth_future():
    future_date = (date.today() + timedelta(days=1)).strftime("%Y-%m-%d")
    with pytest.raises(ValueError, match="future"):
        SwarnaComputeRequest(
            fullName="Test User",
            dateOfBirth=future_date,
            birthTime="12:00",
            birthCity="Delhi",
            startDate="2026-10-01",
            endDate="2026-10-15"
        )

def test_invalid_birth_time_format():
    with pytest.raises(ValueError, match="24-hour"):
        SwarnaComputeRequest(
            fullName="Test User",
            dateOfBirth="1990-01-01",
            birthTime="25:99",
            birthCity="Mumbai",
            startDate="2026-10-01",
            endDate="2026-10-15"
        )

def test_invalid_date_range_end_before_start():
    with pytest.raises(ValueError, match="earlier"):
        SwarnaComputeRequest(
            fullName="Test User",
            dateOfBirth="1990-01-01",
            birthTime="10:00",
            birthCity="Mumbai",
            startDate="2026-10-15",
            endDate="2026-10-01"
        )

def test_unsupported_gemstone_fallback():
    gem = analyze_gemstone_suitability("UnknownMysticGem", "Taurus")
    assert gem is not None
    assert "Further Traditional Assessment" in gem.compatibilityCategory

def test_muhurat_date_window_bounded():
    windows = calculate_swarna_muhurats("2026-09-01", "2026-09-10", "personal", "Rohini")
    assert len(windows) > 0
    for w in windows:
        assert "2026-09-01" <= w.date <= "2026-09-10"

@pytest.mark.asyncio
async def test_deterministic_repeated_calculation():
    req = SwarnaComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        guidanceType="gold_purchase",
        purpose="gift",
        startDate="2026-09-01",
        endDate="2026-09-15"
    )
    rep1 = await compute_swarna_report(req)
    rep2 = await compute_swarna_report(req)
    assert len(rep1.shubhWindows) == len(rep2.shubhWindows)

def test_swarna_api_endpoint_integration():
    payload = {
        "fullName": "Ananya Raj",
        "dateOfBirth": "1995-08-15",
        "birthTime": "10:30",
        "birthCity": "Bengaluru",
        "guidanceType": "gemstone_guidance",
        "gemstoneCategory": "Emerald",
        "startDate": "2026-09-01",
        "endDate": "2026-09-30"
    }
    response = client.post("/api/v1/swarna/compute", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["gemstoneReport"]["gemstoneCategory"] == "Emerald (Panna)"
    assert len(data["shubhWindows"]) > 0

def test_vahan_regression():
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

def test_griha_regression():
    griha_payload = {
        "fullName": "Ananya Raj",
        "dateOfBirth": "1995-08-15",
        "birthTime": "10:30",
        "birthCity": "Bengaluru",
        "propertyType": "home",
        "propertyOrientation": "east",
        "preferredActivity": "griha_pravesh",
        "startDate": "2026-09-01",
        "endDate": "2026-09-30"
    }
    res = client.post("/api/v1/griha/compute", json=griha_payload)
    assert res.status_code == 200
    assert res.json()["orientationGuidance"]["primaryOrientation"] == "East"

def test_vyapar_regression():
    vyapar_payload = {
        "fullName": "Ananya Raj",
        "dateOfBirth": "1995-08-15",
        "birthTime": "10:30",
        "birthCity": "Bengaluru",
        "businessType": "technology",
        "milestone": "launch",
        "brandName": "AstroLive",
        "startDate": "2026-09-01",
        "endDate": "2026-09-30"
    }
    res = client.post("/api/v1/vyapar/compute", json=vyapar_payload)
    assert res.status_code == 200
    assert res.json()["brandNumerology"]["brandName"] == "AstroLive"
