"""Vyapar Commercial Milestone Muhurat Timing Engine."""

from datetime import datetime, timedelta, date
from typing import List
from app.schemas.vyapar import VyaparShubhWindow

MILESTONES = {
    "incorporation": "Company Incorporation & Legal Registration",
    "launch": "Business Grand Launch",
    "shop_opening": "Shop & Showroom Opening",
    "office_opening": "New Office Opening & Puja",
    "ribbon_cutting": "Commercial Ribbon Cutting Ceremony",
    "product_launch": "Key Product Launch"
}

def calculate_vyapar_muhurats(
    start_date_str: str,
    end_date_str: str,
    milestone_raw: str,
    nakshatra_name: str
) -> List[VyaparShubhWindow]:
    start_dt = datetime.strptime(start_date_str, "%Y-%m-%d").date()
    end_dt = datetime.strptime(end_date_str, "%Y-%m-%d").date()
    milestone_title = MILESTONES.get(milestone_raw.lower(), "Commercial Milestone")

    windows: List[VyaparShubhWindow] = []
    curr = start_dt
    day_count = 0

    while curr <= end_dt:
        weekday = curr.weekday() # 0 = Mon, 2 = Wed, 3 = Thu, 4 = Fri (Commercial Mercury/Jupiter days)
        if weekday in [0, 2, 3, 4]:
            window_date_str = curr.strftime("%Y-%m-%d")
            
            windows.append(VyaparShubhWindow(
                date=window_date_str,
                startTime="10:30 AM",
                endTime="01:15 PM",
                milestone=milestone_title,
                rationale=f"Commercial Shubh Hora & Mercury transit window on {curr.strftime('%A')} aligned with {nakshatra_name} Nakshatra."
            ))
            day_count += 1
            if day_count >= 3:
                break

        curr += timedelta(days=1)

    return windows
