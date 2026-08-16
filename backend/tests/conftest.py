import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import app


@pytest.fixture
def client():
    """FastAPI TestClient fixture."""
    return TestClient(app)


@pytest.fixture(autouse=True)
def mock_db_save():
    """
    Requirement #2: Unit/API tests MUST mock the database layer.
    Automated tests do not depend on live Supabase data.
    """
    with patch("app.services.vahan_service.save_birth_profile") as mock_profile, \
         patch("app.services.vahan_service.save_vahan_request") as mock_request:
        
        mock_profile.return_value = {
            "id": "mock-profile-uuid-1234",
            "full_name": "Rahul Sharma",
            "date_of_birth": "1990-05-15",
            "birth_time": "14:30",
            "birth_city": "Bengaluru",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "timezone": "Asia/Kolkata",
            "created_at": "2026-08-16T12:00:00Z",
        }
        
        mock_request.return_value = {
            "id": "mock-request-uuid-5678",
            "birth_profile_id": "mock-profile-uuid-1234",
            "vehicle_type": "SUV",
            "vehicle_model": "Toyota Fortuner",
            "delivery_start": "2026-08-20",
            "delivery_end": "2026-08-30",
            "status": "accepted",
            "created_at": "2026-08-16T12:00:00Z",
        }
        
        yield mock_profile, mock_request
