"""
Telegram Bot Integration for Event.nApp-Agno
"""
import logging
from typing import Optional
from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel

from src.config import config
from src.database.client import get_client
from src.agent.event_agent import get_agent

logger = logging.getLogger(__name__)

router = APIRouter()


class TelegramUpdate(BaseModel):
    """Telegram update model."""
    update_id: int
    message: Optional[dict] = None


async def get_or_create_user(telegram_id: int, telegram_chat_id: int, first_name: Optional[str] = None) -> dict:
    """Get existing user or create new one."""
    db = get_client()

    # Try to find existing user
    result = db.table("users") \
        .select("*") \
        .eq("telegram_id", telegram_id) \
        .execute()

    if result.data:
        user = result.data[0]
        # Update chat_id and name if changed
        update_data = {}
        if telegram_chat_id and user.get("telegram_chat_id") != telegram_chat_id:
            update_data["telegram_chat_id"] = telegram_chat_id
        if first_name and user.get("first_name") != first_name:
            update_data["first_name"] = first_name

        if update_data:
            db.table("users").update(update_data).eq("id", user["id"]).execute()
            user.update(update_data)

        return user

    # Create new user
    user_data = {
        "telegram_id": telegram_id,
        "telegram_chat_id": telegram_chat_id,
    }
    if first_name:
        user_data["first_name"] = first_name

    result = db.table("users").insert(user_data).execute()
    return result.data[0] if result.data else None


async def get_user_event_context(user_id: str) -> dict:
    """Get user's active event and member info."""
    db = get_client()

    # Find member record linked to user with active event
    result = db.table("members") \
        .select("id, name, event_id, events(id, name, status)") \
        .eq("user_id", user_id) \
        .execute()

    if not result.data:
        return {"event_id": None, "member_id": None}

    # Find active event
    for member in result.data:
        event = member.get("events", {})
        if event.get("status") == "active":
            return {
                "event_id": member["event_id"],
                "member_id": member["id"],
                "member_name": member["name"],
                "event_name": event.get("name"),
            }

    return {"event_id": None, "member_id": None}


async def send_telegram_message(chat_id: int, text: str):
    """Send a message via Telegram API."""
    import httpx

    url = f"https://api.telegram.org/bot{config.TELEGRAM_BOT_TOKEN}/sendMessage"

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json={
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown",
        })

        if response.status_code != 200:
            logger.error(f"Failed to send message: {response.text}")


@router.post("/webhook")
async def telegram_webhook(request: Request):
    """Handle incoming Telegram updates."""
    try:
        data = await request.json()
        logger.info(f"Received update: {data.get('update_id')}")

        # Extract message
        message = data.get("message")
        if not message:
            return {"ok": True}

        # Get message details
        telegram_id = message.get("from", {}).get("id")
        telegram_chat_id = message.get("chat", {}).get("id")
        text = message.get("text", "")
        first_name = message.get("from", {}).get("first_name")

        if not telegram_id or not text:
            return {"ok": True}

        # Handle /start command
        if text == "/start":
            await send_telegram_message(
                telegram_chat_id,
                "היי! 👋 אני AIlex, עוזר AI לתכנון אירועים.\n\n"
                "ספר לי על האירוע שאתה מתכנן ונתחיל לעבוד!"
            )
            return {"ok": True}

        # Get or create user
        user = await get_or_create_user(telegram_id, telegram_chat_id, first_name)
        if not user:
            await send_telegram_message(telegram_chat_id, "שגיאה ביצירת משתמש. נסה שוב.")
            return {"ok": True}

        # Get event context
        event_context = await get_user_event_context(user["id"])

        # Process message with agent
        agent = get_agent()
        response = await agent.process_message(
            message=text,
            user_id=user["id"],
            event_id=event_context.get("event_id"),
            member_id=event_context.get("member_id"),
            telegram_id=telegram_id,
            telegram_chat_id=telegram_chat_id,
            user_name=first_name or event_context.get("member_name"),
        )

        # Send response
        await send_telegram_message(telegram_chat_id, response)

        return {"ok": True}

    except Exception as e:
        logger.exception(f"Error processing webhook: {e}")
        return {"ok": True}  # Always return ok to Telegram


@router.get("/webhook/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "Event.nApp-Agno"}
