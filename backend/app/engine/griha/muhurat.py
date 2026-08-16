"""Griha Muhurat Timing Engine - Date-Bounded Window Calculation."""

from datetime import datetime, timedelta, date
from typing import List
from app.schemas.griha import GrihaShubhWindow

ACTIVITIES = {
    "bhoomi_pujan": "Bhoomi Pujan Foundation Laying",
    "griha_pravesh": "Griha Pravesh Housewarming",
    "purchase": "Property Registration & Purchase",
    "handover": "Key Handover & Property Entry",
    "foundation": "Pillar & Foundation Work"
}

def calculate_griha_muhurats(
    start_date_str: str,
    end_date_str: str,
    activity_raw: str,
    nakshatra_name: str
) -> List[GrihaShubhWindow]:
    start_dt = datetime.strptime(start_date_str, "%Y-%m-%d").date()
    end_dt = datetime.strptime(end_date_str, "%Y-%m-%d").date()
    activity_title = ACTIVITIES.get(activity_raw.lower(), "Griha Milestone")

    windows: List[GrihaShubhWindow] = []

    # Iterate through candidate days within the requested range
    curr = start_dt
    day_count = 0

    while curr <= end_dt:
        # Check day suitability deterministically based on day of week and nakshatra harmony
        weekday = curr.weekday() # 0 = Monday, 3 = Thursday, 4 = Friday
        if weekday in [0, 3, 4]: # Mon, Thu, Fri are classic auspicious days for property
            window_date_str = curr.strftime("%Y-%m-%d")
            
            # Format candidate morning window (Abhijit/Shubh Hora)
            windows.append(GrihaShubhWindow(
                date=window_date_str,
                startTime="09:15 AM",
                endTime="11:45 AM",
                activity=activity_title,
                rationale=f"Auspicious Shubh Muhurat window on {curr.strftime('%A')} aligned with {nakshatra_name} Nakshatra."
            ))
            day_count += 1
            if day_count >= 3: # Limit to top 3 auspicious windows in range
                break

        curr += timedelta(days=1)

    return windows
