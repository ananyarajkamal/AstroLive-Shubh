from typing import Any, Dict


def sanitize_response_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Sanitize response payloads to ensure sensitive credentials
    (e.g., service role keys, DB passwords, API keys) are NEVER exposed.
    """
    sensitive_keys = {
        "SUPABASE_SERVICE_ROLE_KEY",
        "service_role",
        "api_key",
        "secret_key",
        "GEOAPIFY_API_KEY",
        "password",
    }
    
    def _clean(obj: Any) -> Any:
        if isinstance(obj, dict):
            return {
                k: "[REDACTED]" if any(sk.lower() in k.lower() for sk in sensitive_keys) else _clean(v)
                for k, v in obj.items()
            }
        elif isinstance(obj, list):
            return [_clean(item) for item in obj]
        return obj

    return _clean(data)
