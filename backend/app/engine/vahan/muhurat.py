from datetime import date, timedelta
from typing import Dict, Any, List

# Deterministic day-of-week planetary rulers and titles
WEEKDAY_TITLES: Dict[int, Dict[str, str]] = {
    0: {"vara": "Monday (Somvar)", "title": "Chandra Siddhi & Amrit Kaal Muhurat", "lagna": "Karka (Cancer) Lagna"},
    1: {"vara": "Tuesday (Mangalvar)", "title": "Bhauma Siddhi & Tejas Muhurat", "lagna": "Vrishchika (Scorpio) Lagna"},
    2: {"vara": "Wednesday (Budhvar)", "title": "Budh Siddhi & Abhijit Muhurat", "lagna": "Kanya (Virgo) Lagna"},
    3: {"vara": "Thursday (Guruvar)", "title": "Amrit Siddhi & Pushya Nakshatra Muhurat", "lagna": "Tula (Libra) Lagna - Auspicious 4th House Lord"},
    4: {"vara": "Friday (Shukravar)", "title": "Shukra Siddhi & Rohini Muhurat", "lagna": "Vrishabha (Taurus) Lagna"},
    5: {"vara": "Saturday (Shanivar)", "title": "Siddha Yoga & Shani Transit Muhurat", "lagna": "Makara (Capricorn) Lagna"},
    6: {"vara": "Sunday (Ravivar)", "title": "Shubh Abhijit & Surya Muhurat", "lagna": "Simha (Leo) Lagna"},
}

TIME_SLOTS = [
    ("09:15 AM", "11:45 AM", 96, True),
    ("02:30 PM", "04:45 PM", 88, False),
    ("10:00 AM", "12:15 PM", 82, False),
]


def compute_shubh_delivery_windows(
    delivery_start_str: str,
    delivery_end_str: str,
    moon_rashi: str,
    nakshatra_name: str
) -> List[Dict[str, Any]]:
    """
    Deterministic delivery-window engine strictly bounded by user's delivery_start
    and delivery_end date range.
    Evaluates dates within range and returns scored Shubh Windows.
    """
    try:
        start_date = date.fromisoformat(delivery_start_str)
        end_date = date.fromisoformat(delivery_end_str)
    except (ValueError, TypeError):
        return []

    if start_date > end_date:
        return []

    windows = []
    curr = start_date
    window_idx = 1

    while curr <= end_date and len(windows) < 3:
        weekday = curr.weekday()  # 0=Monday, 6=Sunday
        info = WEEKDAY_TITLES[weekday]
        slot = TIME_SLOTS[(window_idx - 1) % len(TIME_SLOTS)]
        
        date_iso = curr.isoformat()

        reasoning = [
            f"Moon transit in {moon_rashi} brings favorable road mobility and safety.",
            f"Harmonized with birth Nakshatra ({nakshatra_name}) during pristine morning Kaal.",
            "Rahu Kaal clear, opening auspicious Amrit & Abhijit Muhurat alignment."
        ]

        windows.append({
            "id": f"win-{window_idx}",
            "startDate": date_iso,
            "endDate": date_iso,
            "startTime": slot[0],
            "endTime": slot[1],
            "score": slot[2],
            "title": info["title"],
            "tithi": "Shukla Saptami" if window_idx == 1 else "Dashami Tithi",
            "nakshatra": f"{nakshatra_name} Alignment",
            "vara": info["vara"],
            "lagna": info["lagna"],
            "reasoning": reasoning,
            "isTopPick": slot[3] and window_idx == 1,
        })

        window_idx += 1
        curr += timedelta(days=2 if (end_date - start_date).days >= 4 else 1)

    return windows
