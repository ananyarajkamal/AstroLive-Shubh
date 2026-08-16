from datetime import date, time, datetime
from zoneinfo import ZoneInfo
from typing import Dict, Any
from timezonefinder import TimezoneFinder
from app.core.logging import logger

_tf = TimezoneFinder()


class TimezoneResolutionException(Exception):
    pass


def resolve_timezone_and_datetime(
    latitude: float,
    longitude: float,
    date_str: str,
    time_str: str
) -> Dict[str, Any]:
    """
    Resolve coordinates to IANA timezone using timezonefinder.
    Construct aware datetime using Python zoneinfo.
    Derive UTC offset string from the aware datetime.
    """
    tz_name = _tf.timezone_at(lat=latitude, lng=longitude)
    
    if not tz_name:
        # Fallback if coordinates are in international waters or unmapped edge
        logger.warning(f"timezonefinder returned None for ({latitude}, {longitude}). Defaulting to Asia/Kolkata.")
        tz_name = "Asia/Kolkata"

    try:
        tz = ZoneInfo(tz_name)
    except Exception as e:
        raise TimezoneResolutionException(f"Invalid IANA timezone resolved '{tz_name}': {e}")

    try:
        parsed_date = date.fromisoformat(date_str)
        parsed_time = time.fromisoformat(time_str)
        local_naive_dt = datetime.combine(parsed_date, parsed_time)
        aware_dt = local_naive_dt.replace(tzinfo=tz)
    except Exception as e:
        raise TimezoneResolutionException(f"Failed to create timezone-aware datetime: {e}")

    # Format offset, e.g. "+05:30" or "-05:00"
    offset_delta = aware_dt.utcoffset()
    if offset_delta is not None:
        total_seconds = int(offset_delta.total_seconds())
        sign = "+" if total_seconds >= 0 else "-"
        abs_seconds = abs(total_seconds)
        hours = abs_seconds // 3600
        minutes = (abs_seconds % 3600) // 60
        offset_str = f"{sign}{hours:02d}:{minutes:02d}"
    else:
        offset_str = "+00:00"

    return {
        "timezone": tz_name,
        "timezone_offset": offset_str,
        "aware_datetime": aware_dt,
        "local_birth_datetime_iso": aware_dt.isoformat(),
    }
