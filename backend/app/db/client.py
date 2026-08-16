from typing import Optional
from supabase import create_client, Client
from app.core.config import settings
from app.core.logging import logger

_supabase_client: Optional[Client] = None


def get_supabase_client() -> Optional[Client]:
    """
    Get or initialize Supabase client using server-side service role key.
    Returns None if SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are not configured
    (e.g., during testing or offline local development).
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    url = settings.SUPABASE_URL
    key = settings.SUPABASE_SERVICE_ROLE_KEY

    if not url or not key:
        logger.info("Supabase URL or Service Role Key not configured. Database operations will run in mock mode.")
        return None

    try:
        _supabase_client = create_client(url, key)
        logger.info("Supabase client initialized successfully.")
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {e}")
        return None
