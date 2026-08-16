# AstroLive Vahan Backend

## Setup

```bash
# Create virtual environment (recommended)
python -m venv venv
.\venv\Scripts\activate     # Windows
source venv/bin/activate    # Mac/Linux

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Configure environment
copy .env.example .env
# Edit .env and add your API keys

# Run the server
uvicorn app.main:app --reload --port 8000
```

## Run Tests

```bash
pytest tests/ -v
```

## API

- Health: `GET http://localhost:8000/health`
- Compute: `POST http://localhost:8000/api/v1/vahan/compute`
