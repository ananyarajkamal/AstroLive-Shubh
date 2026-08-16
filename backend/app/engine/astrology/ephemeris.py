import swisseph as swe
from datetime import datetime, timezone
from typing import Tuple

# Initialize Swiss Ephemeris with Lahiri Ayanamsa and Moshier Ephemeris
swe.set_sid_mode(swe.SIDM_LAHIRI)

FLAGS_SIDEREAL = swe.FLG_SIDEREAL | swe.FLG_MOSEPH


def normalize_longitude(lon: float) -> float:
    """Normalize longitude to [0, 360)."""
    norm = lon % 360.0
    return norm + 360.0 if norm < 0 else norm


def datetime_to_julian_day(utc_dt: datetime) -> float:
    """
    Convert a timezone-aware UTC datetime to a Julian Day number.
    Input must be in UTC.
    """
    if utc_dt.tzinfo is None:
        utc_dt = utc_dt.replace(tzinfo=timezone.utc)
    else:
        utc_dt = utc_dt.astimezone(timezone.utc)

    year = utc_dt.year
    month = utc_dt.month
    day = utc_dt.day
    decimal_hour = utc_dt.hour + (utc_dt.minute / 60.0) + (utc_dt.second / 3600.0) + (utc_dt.microsecond / 3.6e9)

    return swe.julday(year, month, day, decimal_hour)


def get_ayanamsa(julian_day: float) -> float:
    """Get Lahiri Ayanamsa value for given Julian Day."""
    swe.set_sid_mode(swe.SIDM_LAHIRI)
    return swe.get_ayanamsa(julian_day)
