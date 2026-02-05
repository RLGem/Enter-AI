"""
Event.nApp-Agno Configuration
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration from environment variables."""

    # Telegram
    TELEGRAM_BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "")

    # Anthropic
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")

    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # Admin
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "")
    ADMIN_PHONE: str = os.getenv("ADMIN_PHONE", "")

    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    @classmethod
    def validate(cls) -> list[str]:
        """Validate required configuration. Returns list of missing vars."""
        missing = []
        if not cls.TELEGRAM_BOT_TOKEN:
            missing.append("TELEGRAM_BOT_TOKEN")
        if not cls.ANTHROPIC_API_KEY:
            missing.append("ANTHROPIC_API_KEY")
        if not cls.SUPABASE_URL:
            missing.append("SUPABASE_URL")
        if not cls.SUPABASE_SERVICE_ROLE_KEY:
            missing.append("SUPABASE_SERVICE_ROLE_KEY")
        return missing


config = Config()
