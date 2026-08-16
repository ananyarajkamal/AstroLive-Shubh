import uuid
from typing import Dict, Any, Optional, List
from datetime import datetime
from app.db.client import get_supabase_client
from app.core.logging import logger


async def save_birth_profile(
    full_name: str,
    date_of_birth: str,
    birth_time: str,
    birth_city: str,
    latitude: float,
    longitude: float,
    timezone: str,
    user_id: Optional[str] = None
) -> Dict[str, Any]:
    """
    Save birth profile into Supabase birth_profiles table.
    Falls back to mock ID if database client is unconfigured/offline.
    """
    profile_id = str(uuid.uuid4())
    now_iso = datetime.utcnow().isoformat()

    record = {
        "id": profile_id,
        "user_id": user_id,
        "full_name": full_name,
        "date_of_birth": date_of_birth,
        "birth_time": birth_time,
        "birth_city": birth_city,
        "latitude": latitude,
        "longitude": longitude,
        "timezone": timezone,
        "created_at": now_iso,
    }

    supabase = get_supabase_client()
    if supabase is not None:
        try:
            res = supabase.table("birth_profiles").insert(record).execute()
            if res.data:
                logger.info(f"Saved birth_profile {profile_id} to Supabase.")
                return res.data[0]
        except Exception as e:
            logger.error(f"Error saving birth_profile to Supabase: {e}. Returning local record.")

    return record


async def save_vahan_request(
    birth_profile_id: str,
    vehicle_type: str,
    vehicle_model: str,
    delivery_start: str,
    delivery_end: str,
    status: str = "accepted"
) -> Dict[str, Any]:
    """
    Save vahan request into Supabase vahan_requests table.
    Falls back to mock record if database client is unconfigured/offline.
    """
    request_id = str(uuid.uuid4())
    now_iso = datetime.utcnow().isoformat()

    record = {
        "id": request_id,
        "birth_profile_id": birth_profile_id,
        "vehicle_type": vehicle_type,
        "vehicle_model": vehicle_model,
        "delivery_start": delivery_start,
        "delivery_end": delivery_end,
        "status": status,
        "created_at": now_iso,
    }

    supabase = get_supabase_client()
    if supabase is not None:
        try:
            res = supabase.table("vahan_requests").insert(record).execute()
            if res.data:
                logger.info(f"Saved vahan_request {request_id} to Supabase.")
                return res.data[0]
        except Exception as e:
            logger.error(f"Error saving vahan_request to Supabase: {e}. Returning local record.")

    return record


async def save_vahan_report(
    request_id: str,
    report_payload: Dict[str, Any],
    shubh_window: Optional[List[Dict[str, Any]]] = None,
    lucky_numbers: Optional[Dict[str, Any]] = None,
    colours: Optional[Dict[str, Any]] = None,
    direction: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Save calculated astrology report payload into Supabase vahan_reports table.
    """
    report_id = str(uuid.uuid4())
    now_iso = datetime.utcnow().isoformat()

    record = {
        "id": report_id,
        "request_id": request_id,
        "report_payload": report_payload,
        "shubh_window": shubh_window,
        "lucky_numbers": lucky_numbers,
        "colours": colours,
        "direction": direction,
        "created_at": now_iso,
    }

    supabase = get_supabase_client()
    if supabase is not None:
        try:
            res = supabase.table("vahan_reports").insert(record).execute()
            if res.data:
                logger.info(f"Saved vahan_report {report_id} to Supabase.")
                return res.data[0]
        except Exception as e:
            logger.error(f"Error saving vahan_report to Supabase: {e}. Returning local record.")

    return record

