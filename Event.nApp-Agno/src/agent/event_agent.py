"""
Event.nApp-Agno Agent using Agno Framework
"""
import json
from typing import Optional
from agno.agent import Agent
from agno.models.anthropic import Claude

from src.config import config
from src.agent.system_prompt import SYSTEM_PROMPT, SYSTEM_PROMPT_ONBOARDING
from src.database.client import get_client
from src.tools import get_all_tools


class EventAgent:
    """Main agent for Event.nApp."""

    def __init__(self):
        self.tools = get_all_tools()
        self.agent = Agent(
            model=Claude(
                id="claude-sonnet-4-20250514",
                api_key=config.ANTHROPIC_API_KEY,
            ),
            tools=self.tools,
            instructions=SYSTEM_PROMPT,
            markdown=True,
            show_tool_calls=False,
        )

    async def process_message(
        self,
        message: str,
        user_id: str,
        event_id: Optional[str] = None,
        member_id: Optional[str] = None,
        telegram_id: Optional[int] = None,
        telegram_chat_id: Optional[int] = None,
        user_name: Optional[str] = None,
    ) -> str:
        """Process a user message and return the response."""

        # Build context for tools
        context = {
            "user_id": user_id,
            "event_id": event_id,
            "member_id": member_id,
            "telegram_id": telegram_id,
            "telegram_chat_id": telegram_chat_id,
            "user_name": user_name,
        }

        # Get conversation history for context
        history = await self._get_chat_history(user_id, limit=20)

        # Build system prompt with context
        system_prompt = SYSTEM_PROMPT
        if not event_id:
            system_prompt += "\n\n" + SYSTEM_PROMPT_ONBOARDING

        # Add context info to system prompt
        context_info = self._build_context_info(context)
        if context_info:
            system_prompt += f"\n\n## קונטקסט נוכחי\n{context_info}"

        # Run the agent
        response = self.agent.run(
            message=message,
            context=context,
            stream=False,
        )

        # Extract response content
        response_text = response.content if hasattr(response, 'content') else str(response)

        # Save to chat history
        await self._save_chat_message(user_id, event_id, "user", message)
        await self._save_chat_message(user_id, event_id, "assistant", response_text)

        return response_text

    def _build_context_info(self, context: dict) -> str:
        """Build context information string."""
        parts = []
        if context.get("event_id"):
            parts.append(f"- Event ID: {context['event_id']}")
        if context.get("user_name"):
            parts.append(f"- User: {context['user_name']}")
        if context.get("member_id"):
            parts.append(f"- Member ID: {context['member_id']}")
        return "\n".join(parts)

    async def _get_chat_history(self, user_id: str, limit: int = 20) -> list:
        """Get recent chat history for user."""
        try:
            db = get_client()
            result = db.table("chat_history") \
                .select("role, content, created_at") \
                .eq("user_id", user_id) \
                .order("created_at", desc=True) \
                .limit(limit) \
                .execute()

            # Return in chronological order
            return list(reversed(result.data)) if result.data else []
        except Exception as e:
            print(f"Error getting chat history: {e}")
            return []

    async def _save_chat_message(
        self,
        user_id: str,
        event_id: Optional[str],
        role: str,
        content: str
    ):
        """Save a message to chat history."""
        try:
            db = get_client()
            data = {
                "user_id": user_id,
                "role": role,
                "content": content,
            }
            if event_id:
                data["event_id"] = event_id

            db.table("chat_history").insert(data).execute()
        except Exception as e:
            print(f"Error saving chat message: {e}")


# Global agent instance
_agent: Optional[EventAgent] = None


def get_agent() -> EventAgent:
    """Get or create the global agent instance."""
    global _agent
    if _agent is None:
        _agent = EventAgent()
    return _agent
