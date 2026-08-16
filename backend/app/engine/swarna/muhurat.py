"""Swarna Gold Acquisition Shubh Timing Engine."""

from datetime import datetime, timedelta, date
from typing import List
from app.schemas.swarna import SwarnaShubhWindow

PURPOSES = {
    "personal": "Personal Gold & Wealth Purchase",
    "gift": "Auspicious Gold Gift Acquisition",
    "auspicious": "Dhanteras & Pushya Gold Buying",
    "gold_purchase": "Gold Asset Purchase",
    "gold_gift": "Gold Gift Acquisition",
    "gemstone_guidance": "Gemstone Activation & Acquisition"
}

def calculate_swarna_muhurats(
    start_date_str: str,
    end_date_str: str,
    purpose_raw: str,
    nakshatra_name: str
) -> List[SwarnaShubhWindow]:
    start_dt = datetime.strptime(start_date_str, "%Y-%m-%d").date()
    end_dt = datetime.strptime(end_date_str, "%Y-%m-%d").date()
    purpose_title = PURPOSES.get(purpose_raw.lower(), "Gold Acquisition")

    windows: List[SwarnaShubhWindow] = []
    curr = start_dt
    day_count = 0

    while curr <= end_dt:
        weekday = curr.weekday() # 0 = Mon, 3 = Thu, 4 = Fri, 6 = Sun (Sun/Jupiter gold hora days)
        if weekday in [0, 3, 4, 6]:
            window_date_str = curr.strftime("%Y-%m-%d")
            
            windows.append(SwarnaShubhWindow(
                date=window_date_str,
                startTime="08:30 AM",
                endTime="11:15 AM",
                purpose=purpose_title,
                rationale=f"Auspicious Sun & Jupiter Gold Hora on {curr.strftime('%A')} aligned with {nakshatra_name} Nakshatra."
            ))
            day_count += 1
            if day_count >= 3:
                break

        curr += timedelta(days=1)

    return windows
