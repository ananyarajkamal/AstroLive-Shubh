# AstroLive Shubh

"Auspicious timing for life's important milestones."

AstroLive Shubh is a production-grade, unified functional astrology platform for high-value life decisions. It calculates exact sidereal astronomical positions using Swiss Ephemeris (`pyswisseph`) and generates deterministic recommendations across four live milestone modules: **Vahan** (Vehicles), **Griha** (Homes & Plots), **Vyapar** (Business & Commercial), and **Swarna & Ratna** (Gold & Gemstones).

---

## Overview

AstroLive Shubh transforms user birth details and milestone parameters into deterministic, astrology-based decision reports. By performing precision sidereal planetary calculations locally via Swiss Ephemeris (Lahiri Ayanamsa), the application provides structured guidance for acquisition dates, Vastu orientations, brand numerology, vehicle delivery windows, and traditional gemstone alignments without relying on external AI or LLM services.

---

## Four Functional Milestone Modules

1. **Vahan — Vehicles (LIVE)**: Personalized vehicle delivery windows (Muhurat), Chaldean lucky registration numbers, vehicle colours, and first-drive Vastu direction.
2. **Griha — Homes & Plots (LIVE)**: Property orientation, Vastu harmony analysis, Bhoomi Pujan foundation-laying windows, and Griha Pravesh housewarming timing.
3. **Vyapar — Business & Commercial (LIVE)**: Business incorporation dates, commercial grand launch windows, office openings, and brand name Chaldean numerology.
4. **Swarna & Ratna — Gold & Gemstones (LIVE)**: Gold purchase windows during Pushya & Dhanteras alignments, plus traditional birth gemstone suitability analysis.

---

## Features

- **Local Ephemeris Engine**: 100% local calculation via PySwisseph C-bindings (Swiss Ephemeris 2.10) with sidereal Lahiri Ayanamsa.
- **Geocoding & Timezone Resolution**: Birth city resolution with IANA timezone lookup (`timezonefinder` & `zoneinfo`).
- **Deterministic Guidance Engines**: Zero AI prompt generators, zero random scores, 100% reproducible mathematical outputs.
- **Chaldean Numerology System**: Driver and conductor numbers, lucky registration numbers, and brand name destiny compound sum evaluation.
- **Digital Patra Keepsake**: Shareable and printable Digital Patra certificate summarizing astrological profiles and guidance.

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Vanilla Editorial CSS (`#F4F0E7` Warm Ivory & `#241F1B` Deep Espresso Palette)

### Backend
- FastAPI
- Python 3.11
- PySwisseph
- Pydantic v2
- `timezonefinder` & `zoneinfo`

### Database
- Supabase PostgreSQL

### External Service
- Geoapify Geocoding API (with offline local fallback dataset)

---

## Project Structure

```
AstroLive-Shubh/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/  # FastAPI endpoints (health, vahan, griha, vyapar, swarna)
│   │   ├── core/              # Settings, security, logging
│   │   ├── db/                # Supabase client and queries
│   │   ├── engine/
│   │   │   ├── astrology/     # PySwisseph engine (ephemeris, planets, ascendant)
│   │   │   ├── vahan/         # Vahan rules engine
│   │   │   ├── griha/         # Griha Vastu & Muhurat engine
│   │   │   ├── vyapar/        # Vyapar commercial engine & brand numerology
│   │   │   └── swarna/        # Swarna gold timing & gemstone engine
│   │   └── schemas/           # Pydantic v2 schemas
│   └── tests/                 # Backend pytest test suite (59 passing tests)
├── frontend/
│   ├── public/images/         # Module-specific physical image assets (astro-shubh-hero, griha-hero, etc.)
│   └── src/
│       ├── app/               # Next.js App Router (/, /vahan, /griha, /vyapar, /swarna, /patra/[id])
│       ├── components/        # UI components (SiteNav, SiteFooter, SiteLogo, CitySearch, ModuleIcons)
│       └── lib/               # API client and types
└── README.md                  # Project documentation
```

---

## Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ananyarajkamal/AstroLive-Shubh.git
cd AstroLive-Shubh
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
- `GEOAPIFY_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SECRET_KEY`

Edit `frontend/.env.local` with `NEXT_PUBLIC_API_URL`.

### 5. Start Backend Server
```bash
cd backend
venv\Scripts\python.exe -m uvicorn app.main:app --port 8000 --reload
```

### 6. Start Frontend Dev Server
```bash
cd frontend
npm run dev
```

---

## API Endpoints

- `GET /api/v1/health` — System health check
- `POST /api/v1/vahan/compute` — Vahan vehicle calculation
- `POST /api/v1/griha/compute` — Griha real estate & Vastu calculation
- `POST /api/v1/vyapar/compute` — Vyapar enterprise & brand numerology calculation
- `POST /api/v1/swarna/compute` — Swarna gold acquisition & gemstone calculation

---

## Testing

### Backend Unit & Integration Tests (59 Tests)
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

## Security & Privacy

- Never commit `.env` or `.env.local` files to source control.
- Never expose the Supabase service-role key or API keys to the frontend client.
- Never expose backend secrets through `NEXT_PUBLIC_*` variables.
- Keep all API credentials and secret keys strictly server-side.

---

## Disclaimer

AstroLive Shubh provides traditional astrology-based recommendations, Vastu analysis, and Chaldean numerology guidance for cultural and personal reference. It should not be presented or relied upon as a scientifically guaranteed prediction system or as financial, medical, or investment advice.
