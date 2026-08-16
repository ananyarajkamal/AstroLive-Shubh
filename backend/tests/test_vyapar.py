"""Unit and integration tests for Vyapar (Business & Enterprise) module."""

import pytest
from datetime import date, timedelta
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.vyapar import VyaparComputeRequest
from app.engine.vyapar.numerology import calculate_brand_numerology
from app.engine.vyapar.muhurat import calculate_vyapar_muhurats
from app.engine.vyapar.recommender import compute_vyapar_report

client = TestClient(app)

@pytest.mark.asyncio
async def test_valid_vyapar_compute_request():
    req = VyaparComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        businessType="technology",
        milestone="launch",
        brandName="AstroLive",
        startDate="2026-09-01",
        endDate="2026-09-30"
    )
    report = await compute_vyapar_report(req)
    assert report.requestId.startswith("vyapar-")
    assert report.inputSummary["fullName"] == "Ananya Raj"
    assert report.brandNumerology is not None
    assert report.brandNumerology.brandName == "AstroLive"
    assert len(report.shubhWindows) > 0
    for w in report.shubhWindows:
        assert "2026-09-01" <= w.date <= "2026-09-30"

def test_invalid_date_of_birth_future():
    future_date = (date.today() + timedelta(days=1)).strftime("%Y-%m-%d")
    with pytest.raises(ValueError, match="future"):
        VyaparComputeRequest(
            fullName="Test User",
            dateOfBirth=future_date,
            birthTime="12:00",
            birthCity="Delhi",
            startDate="2026-10-01",
            endDate="2026-10-15"
        )

def test_invalid_birth_time_format():
    with pytest.raises(ValueError, match="24-hour"):
        VyaparComputeRequest(
            fullName="Test User",
            dateOfBirth="1990-01-01",
            birthTime="25:99",
            birthCity="Mumbai",
            startDate="2026-10-01",
            endDate="2026-10-15"
        )

def test_invalid_date_range_end_before_start():
    with pytest.raises(ValueError, match="earlier"):
        VyaparComputeRequest(
            fullName="Test User",
            dateOfBirth="1990-01-01",
            birthTime="10:00",
            birthCity="Mumbai",
            startDate="2026-10-15",
            endDate="2026-10-01"
        )

def test_brand_numerology_calculation():
    num = calculate_brand_numerology("AstroLive", "1995-08-15")
    assert num is not None
    assert num.brandName == "AstroLive"
    assert num.compoundNumber > 0
    assert 1 <= num.reducedNumber <= 9

def test_muhurat_date_window_bounded():
    windows = calculate_vyapar_muhurats("2026-09-01", "2026-09-10", "launch", "Rohini")
    assert len(windows) > 0
    for w in windows:
        assert "2026-09-01" <= w.date <= "2026-09-10"

@pytest.mark.asyncio
async def test_deterministic_repeated_calculation():
    req = VyaparComputeRequest(
        fullName="Ananya Raj",
        dateOfBirth="1995-08-15",
        birthTime="10:30",
        birthCity="Bengaluru",
        businessType="retail",
        milestone="shop_opening",
        brandName="Shubh Retail",
        startDate="2026-09-01",
        endDate="2026-09-15"
    )
    rep1 = await compute_vyapar_report(req)
    rep2 = await compute_vyapar_report(req)
    assert rep1.brandNumerology.compoundNumber == rep2.brandNumerology.compoundNumber
    assert len(rep1.shubhWindows) == len(rep2.shubhWindows)

def test_vyapar_api_endpoint_integration():
    payload = {
        "fullName": "Ananya Raj",
        "dateOfBirth": "1995-08-15",
        "birthTime": "10:30",
        "birthCity": "Bengaluru",
        "businessType": "technology",
        "milestone": "incorporation",
        "brandName": "AstroLive Shubh",
        "startDate": "2026-09-01",
        "endDate": "2026-09-30"
    }
    response = client.post("/api/v1/vyapar/compute", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["brandNumerology"]["brandName"] == "AstroLive Shubh"
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
