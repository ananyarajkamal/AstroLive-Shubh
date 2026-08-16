# AstroLive Vahan

"Your vehicle's auspicious moment, personalised."

AstroLive Vahan is a production-quality, personalized vehicle-astrology web platform. It calculates exact sidereal astronomical positions using Swiss Ephemeris (`pyswisseph`) and generates deterministic recommendations for vehicle delivery windows (Muhurat), Chaldean lucky registration numbers, vehicle colours, and first drive directions (Vastu).

---

## Overview

AstroLive Vahan transforms user birth details and vehicle preferences into deterministic, astrology-based vehicle recommendations. By performing precision sidereal planetary calculations locally via Swiss Ephemeris, the application provides structured guidance for acquisition dates, registration numbers, vehicle colours, and initial drive directions without relying on external AI services.

---

## Features

- Birth profile processing with accurate geocoding and IANA timezone resolution.
- Deterministic astrology calculations using PySwisseph.
- Sidereal Lagna (Ascendant), Moon Sign (Rashi), and Birth Nakshatra with Pada.
- 9 sidereal planetary positions (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu).
- Deterministic Vahan recommendations.
- Shubh delivery windows (Muhurat) bounded by user date range.
- Chaldean numerology driver and conductor number calculation with lucky registration numbers.
- Vehicle colour recommendations and colours to avoid based on Rashi.
- First drive direction and Vastu guidance.

---

## Architecture

Next.js (Frontend UI & Wizard)
    |
    | POST /api/v1/vahan/compute
    v
FastAPI (Backend API Router & Validation)
    |
    v
Astrology Engine (PySwisseph, Lahiri Ayanamsa, Moshier Ephemeris)
    |
    v
Vahan Recommendation Engine (Muhurat, Numerology, Colour, Direction)
    |
    v
Supabase PostgreSQL (birth_profiles, vahan_requests, vahan_reports)

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Vanilla Inline CSS

### Backend
- FastAPI
- Python 3.11
- PySwisseph
- Pydantic v2
- timezonefinder & zoneinfo

### Database
- Supabase PostgreSQL

### External Service
- Geoapify Geocoding API (with local offline fallback dataset)

---

## Project Structure

```
AstroLive-Vahan/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/  # FastAPI endpoints (health, vahan compute)
│   │   ├── core/              # Settings, security, logging
│   │   ├── db/                # Supabase client and queries
│   │   ├── engine/
│   │   │   ├── astrology/     # PySwisseph engine (ephemeris, planets, ascendant)
│   │   │   └── vahan/         # Recommendation engine (numerology, colour, direction, muhurat)
│   │   └── schemas/           # Pydantic v2 schemas
│   ├── migrations/            # SQL scripts (001_initial_schema.sql)
│   └── tests/                 # Backend pytest test suite
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router (/, /calculate, /patra/[id])
│   │   ├── components/        # UI components (CitySearch, SiteNav)
│   │   └── lib/               # API client and types
│   └── .env.example           # Frontend environment example
├── LICENSE                    # MIT License
└── README.md                  # Project documentation
```

---

## Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/username/AstroLive-Vahan.git
cd AstroLive-Vahan
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
copy .env.example .env.local
```

### 4. Configure Environment Variables
Edit `backend/.env` with placeholders:
- GEOAPIFY_API_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SECRET_KEY

Edit `frontend/.env.local` with `NEXT_PUBLIC_API_URL`.

### 5. Run Supabase Migration
Execute `backend/migrations/001_initial_schema.sql` in your Supabase SQL Editor.

### 6. Start Backend Server
```bash
cd backend
venv\Scripts\python.exe -m uvicorn app.main:app --port 8000 --reload
```

### 7. Start Frontend Dev Server
```bash
cd frontend
npm run dev
```

---

## Environment Variables

### Backend Configuration (backend/.env)
The backend environment file contains server-side secrets and must never be committed:
- `GEOAPIFY_API_KEY`: API key for city geocoding.
- `SUPABASE_URL`: Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role secret key.
- `SECRET_KEY`: Application secret key.
- `ENVIRONMENT`: Application environment (development/production).
- `ALLOWED_ORIGINS`: Allowed CORS origins.

### Frontend Configuration (frontend/.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API base endpoint (default: http://localhost:8000/api/v1).

---

## Testing

### Backend Unit & Integration Tests
```bash
cd backend
venv\Scripts\python.exe -m pytest tests/ -v
```

### Frontend Production Build Test
```bash
cd frontend
npm run build
```

---

## Security

- Never commit `.env` or `.env.local` files to source control.
- Never expose the Supabase service-role key to the frontend client.
- Never expose backend secrets through `NEXT_PUBLIC_*` variables.
- Keep all API credentials and secret keys strictly server-side.

---

## Disclaimer

AstroLive Vahan provides traditional astrology-based recommendations and numerology guidance for educational and cultural reference. It should not be presented or relied upon as a scientifically guaranteed prediction system.
