"""
Supabase Database Client
"""
from supabase import create_client, Client
from src.config import config


def get_supabase_client() -> Client:
    """Create and return Supabase client with service role key."""
    return create_client(
        config.SUPABASE_URL,
        config.SUPABASE_SERVICE_ROLE_KEY
    )


# Global client instance
supabase: Client = None


def init_supabase() -> Client:
    """Initialize the global Supabase client."""
    global supabase
    supabase = get_supabase_client()
    return supabase


def get_client() -> Client:
    """Get the Supabase client, initializing if needed."""
    global supabase
    if supabase is None:
        supabase = get_supabase_client()
    return supabase
