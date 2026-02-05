"""
Event.nApp-Agno - Main Entry Point
AI-Powered Event Planning Assistant
"""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import config
from src.database.client import init_supabase
from src.integrations.telegram_bot import router as telegram_router

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if config.DEBUG else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Event.nApp-Agno",
    description="AI-Powered Event Planning Assistant",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(telegram_router, tags=["Telegram"])


@app.on_event("startup")
async def startup_event():
    """Initialize on startup."""
    logger.info("Starting Event.nApp-Agno...")

    # Validate configuration
    missing = config.validate()
    if missing:
        logger.warning(f"Missing environment variables: {missing}")

    # Initialize Supabase
    try:
        init_supabase()
        logger.info("Supabase client initialized")
    except Exception as e:
        logger.error(f"Failed to initialize Supabase: {e}")

    logger.info("Event.nApp-Agno started successfully!")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "Event.nApp-Agno",
        "description": "AI-Powered Event Planning Assistant",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    logger.info(f"Starting server on {config.HOST}:{config.PORT}")
    uvicorn.run(
        "src.main:app",
        host=config.HOST,
        port=config.PORT,
        reload=config.DEBUG,
    )
