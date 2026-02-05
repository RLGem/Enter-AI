# Event.nApp-Agno - Technical Architecture

## Version 1.0 | 31 January 2026

---

## Table of Contents

| # | Topic |
|:-:|:------|
| 1 | Architecture Overview |
| 2 | Tech Stack |
| 3 | System Diagram |
| 4 | Components |
| 5 | Data Flow |
| 6 | Security |
| 7 | Deployment |
| 8 | Comparison with Supabase Version |

---

# 1. Architecture Overview

## Principles

```
+------------------------------------------------------------+
|                                                            |
|   * Modern Python (3.11+)                                  |
|   * Agno Framework for AI agents                           |
|   * Supabase for database (same schema as Supabase version)|
|   * Async throughout                                       |
|   * Clean separation of concerns                           |
|   * Built-in duplicate prevention                          |
|                                                            |
+------------------------------------------------------------+
```

## General Flow

```
+------------------------------------------------------------+
|                                                            |
|   User (Telegram)                                          |
|        |                                                   |
|        v                                                   |
|   Telegram Bot API                                         |
|        |                                                   |
|        v                                                   |
|   Python Server (FastAPI/Webhook)                          |
|        |                                                   |
|        v                                                   |
|   Agno Agent + Tools                                       |
|        |                                                   |
|        v                                                   |
|   Supabase Database (PostgreSQL)                           |
|        |                                                   |
|        v                                                   |
|   Response back to user                                    |
|                                                            |
+------------------------------------------------------------+
```

---

# 2. Tech Stack

## Components

```
+------------------------------------------------------------+
|                                                            |
|   Framework: Agno (Python)                                 |
|       * AI agent framework                                 |
|       * Built-in tool system                               |
|       * Memory management                                  |
|       * https://github.com/agno-agi/agno                   |
|                                                            |
|   AI: Claude via Agno                                      |
|       * Model: claude-sonnet-4-20250514                    |
|       * Anthropic integration built into Agno              |
|                                                            |
|   Database: Supabase (PostgreSQL)                          |
|       * Same schema as Supabase version                    |
|       * supabase-py client                                 |
|       * Row Level Security                                 |
|                                                            |
|   Web Framework: FastAPI                                   |
|       * Async webhook handling                             |
|       * Telegram webhook endpoint                          |
|                                                            |
|   Chat Interface: Telegram Bot                             |
|       * @EAIEventsBot                                      |
|       * python-telegram-bot library                        |
|                                                            |
+------------------------------------------------------------+
```

## Python Packages

```
+------------------------------------------------------------+
|                                                            |
|   requirements.txt:                                        |
|                                                            |
|   agno>=0.1.0                                              |
|   anthropic>=0.34.0                                        |
|   supabase>=2.0.0                                          |
|   fastapi>=0.109.0                                         |
|   uvicorn>=0.27.0                                          |
|   python-telegram-bot>=20.7                                |
|   pydantic>=2.5.0                                          |
|   python-dotenv>=1.0.0                                     |
|   httpx>=0.26.0                                            |
|                                                            |
+------------------------------------------------------------+
```

---

# 3. System Diagram

```
+-----------------------------------------------------------------------------+
|                                                                             |
|                            +-------------+                                  |
|                            |    User     |                                  |
|                            |  Telegram   |                                  |
|                            +------+------+                                  |
|                                   |                                         |
|                                   v                                         |
|                            +-------------+                                  |
|                            |  Telegram   |                                  |
|                            |  Bot API    |                                  |
|                            +------+------+                                  |
|                                   | Webhook                                 |
|                                   v                                         |
|  +----------------------------------------------------------------------+  |
|  |                     Python Server (FastAPI)                          |  |
|  |  +----------------------------------------------------------------+  |  |
|  |  |                   telegram_bot.py                              |  |  |
|  |  |                                                                |  |  |
|  |  |  1. Receive update from Telegram                               |  |  |
|  |  |  2. Get/Create user context                                    |  |  |
|  |  |  3. Pass to Agno Agent                                         |  |  |
|  |  |  4. Send response to Telegram                                  |  |  |
|  |  |                                                                |  |  |
|  |  +------------------------+---------------------------------------+  |  |
|  |                           |                                          |  |
|  |                           v                                          |  |
|  |  +----------------------------------------------------------------+  |  |
|  |  |                   event_agent.py (Agno)                        |  |  |
|  |  |                                                                |  |  |
|  |  |  * System prompt (AIlex identity)                              |  |  |
|  |  |  * Tool definitions                                            |  |  |
|  |  |  * Conversation management                                     |  |  |
|  |  |  * Memory integration                                          |  |  |
|  |  |                                                                |  |  |
|  |  +------------------------+---------------------------------------+  |  |
|  |                           |                                          |  |
|  |            +--------------+--------------+                           |  |
|  |            |              |              |                           |  |
|  |            v              v              v                           |  |
|  |  +----------------+ +----------------+ +----------------+            |  |
|  |  | event_tools.py | | task_tools.py  | | member_tools.py|            |  |
|  |  +----------------+ +----------------+ +----------------+            |  |
|  |  | supplier_tools | | budget_tools   | | guest_tools    |            |  |
|  |  +----------------+ +----------------+ +----------------+            |  |
|  |                           |                                          |  |
|  |                           v                                          |  |
|  |  +----------------------------------------------------------------+  |  |
|  |  |                      client.py                                 |  |  |
|  |  |                   (Supabase Client)                            |  |  |
|  |  +----------------------------------------------------------------+  |  |
|  |                                                                       |  |
|  +-----------------------------------------------------------------------+  |
|                                   |                                         |
|                                   v                                         |
|                      +------------------------+                             |
|                      |    Supabase Database   |                             |
|                      |      (PostgreSQL)      |                             |
|                      |                        |                             |
|                      |  * events              |                             |
|                      |  * users               |                             |
|                      |  * members             |                             |
|                      |  * tasks               |                             |
|                      |  * suppliers           |                             |
|                      |  * leads               |                             |
|                      |  * budget_items        |                             |
|                      |  * guests              |                             |
|                      |  * chat_history        |                             |
|                      |                        |                             |
|                      +------------------------+                             |
|                                                                             |
+-----------------------------------------------------------------------------+
```

---

# 4. Components

## Main Entry Point: main.py

```python
# src/main.py
from fastapi import FastAPI
from src.integrations.telegram_bot import router as telegram_router

app = FastAPI(title="Event.nApp-Agno")
app.include_router(telegram_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Agno Agent: event_agent.py

```python
# src/agent/event_agent.py
from agno import Agent
from src.tools import all_tools
from src.agent.system_prompt import SYSTEM_PROMPT

class EventAgent:
    def __init__(self):
        self.agent = Agent(
            model="claude-sonnet-4-20250514",
            system_prompt=SYSTEM_PROMPT,
            tools=all_tools,
        )

    async def process_message(self, user_message: str, context: dict) -> str:
        response = await self.agent.run(
            message=user_message,
            context=context,
        )
        return response.content
```

## Tools (with Duplicate Prevention!)

```python
# src/tools/task_tools.py
from agno import tool
from src.database.client import supabase

@tool
async def create_task(
    title: str,
    description: str = None,
    due_date: str = None,
    category: str = None,
    priority: str = "medium",
    assigned_to_name: str = None,
    context: dict = None,
) -> dict:
    """Create a new task for the event."""

    event_id = context.get("event_id")
    if not event_id:
        return {"success": False, "message": "No event selected."}

    # DUPLICATE PREVENTION (learned from Supabase version!)
    existing = await supabase.table("tasks") \
        .select("id, title, status") \
        .eq("event_id", event_id) \
        .eq("status", "open") \
        .ilike("title", f"%{title}%") \
        .execute()

    if existing.data:
        task = existing.data[0]
        return {
            "success": True,
            "task_id": task["id"],
            "already_exists": True,
            "message": f"Task '{task['title']}' already exists.",
        }

    # Create new task
    result = await supabase.table("tasks").insert({
        "event_id": event_id,
        "title": title,
        "description": description,
        "due_date": due_date,
        "category": category,
        "priority": priority,
        "status": "open",
    }).execute()

    return {
        "success": True,
        "task_id": result.data[0]["id"],
        "message": f"Task '{title}' created.",
    }
```

## Tool List

```
+------------------------------------------------------------+
|                                                            |
|   EVENT TOOLS (event_tools.py):                            |
|   * create_event(name, event_type?, event_date?)           |
|   * get_event_summary()                                    |
|                                                            |
|   TASK TOOLS (task_tools.py):                              |
|   * create_task(title, ...) - WITH DUPLICATE CHECK!        |
|   * list_tasks(status?, category?, assigned_to_name?)      |
|   * update_task(task_id, updates...)                       |
|   * delete_task(task_id)                                   |
|   * complete_task(task_title_contains)                     |
|                                                            |
|   MEMBER TOOLS (member_tools.py):                          |
|   * add_member(name, role?, side?, is_current_user?)       |
|   * list_members(side?)                                    |
|                                                            |
|   SUPPLIER TOOLS (supplier_tools.py):                      |
|   * search_suppliers(category)                             |
|   * send_lead(supplier_ids, message?)                      |
|                                                            |
|   BUDGET TOOLS (budget_tools.py):                          |
|   * add_budget_item(name, category?, estimated_cost?, ...) |
|   * list_budget(category?, status?)                        |
|   * update_budget_item(item_id, updates...)                |
|                                                            |
|   GUEST TOOLS (guest_tools.py):                            |
|   * add_guest(name, side?, rsvp_status?, plus_one?, ...)   |
|   * list_guests(side?, group_name?, rsvp_status?)          |
|   * update_guest(guest_id, updates...)                     |
|                                                            |
+------------------------------------------------------------+
```

---

# 5. Data Flow

## Incoming Message

```
+------------------------------------------------------------+
|                                                            |
|   1. Telegram --> FastAPI Webhook                          |
|      {                                                     |
|        "update_id": 123,                                   |
|        "message": {                                        |
|          "from": {"id": 456, "first_name": "Danny"},       |
|          "chat": {"id": 789},                              |
|          "text": "Add task to book photographer"           |
|        }                                                   |
|      }                                                     |
|                                                            |
|   2. telegram_bot.py                                       |
|      * Gets/creates user with telegram_id = 456            |
|      * Finds member in active event                        |
|      * Builds context dict                                 |
|                                                            |
|   3. Agno Agent                                            |
|      System: "You are AIlex..."                            |
|      Context: {"event_id": "...", "user_id": "..."}        |
|      User: "Add task to book photographer"                 |
|      Tools: [create_task, list_tasks, ...]                 |
|                                                            |
|   4. Agent calls tool                                      |
|      create_task(title="Book photographer")                |
|      --> Checks for duplicates first!                      |
|      --> Creates task if new                               |
|                                                            |
|   5. Agent generates response                              |
|      "Added task 'Book photographer'. Set a date?"         |
|                                                            |
|   6. Send Response --> Telegram                            |
|                                                            |
+------------------------------------------------------------+
```

---

# 6. Security

## Environment Variables

```
+------------------------------------------------------------+
|                                                            |
|   Required in .env:                                        |
|                                                            |
|   TELEGRAM_BOT_TOKEN     - Telegram bot token              |
|   ANTHROPIC_API_KEY      - Claude API key                  |
|   SUPABASE_URL           - Supabase project URL            |
|   SUPABASE_ANON_KEY      - Supabase anon key               |
|   SUPABASE_SERVICE_ROLE_KEY - For admin operations         |
|   DATABASE_URL           - Direct PostgreSQL connection    |
|                                                            |
|   WARNING: Never commit .env to git!                       |
|                                                            |
+------------------------------------------------------------+
```

## Data Isolation

```
+------------------------------------------------------------+
|                                                            |
|   * Each event is isolated by event_id                     |
|   * RLS (Row Level Security) enabled on all tables         |
|   * Users can only see their own events                    |
|   * Service role key used for server operations            |
|                                                            |
+------------------------------------------------------------+
```

---

# 7. Deployment

## Local Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Copy .env.example to .env and fill in values
cp .env.example .env

# Run locally
python src/main.py

# Use ngrok for Telegram webhook
ngrok http 8000

# Set webhook
curl "https://api.telegram.org/bot{TOKEN}/setWebhook?url={NGROK_URL}/webhook"
```

## Production Deployment Options

```
+------------------------------------------------------------+
|                                                            |
|   Option 1: Railway                                        |
|   * Easy Python deployment                                 |
|   * Auto-scales                                            |
|   * Free tier available                                    |
|                                                            |
|   Option 2: Render                                         |
|   * Free tier                                              |
|   * Auto-deploy from GitHub                                |
|                                                            |
|   Option 3: Fly.io                                         |
|   * Low latency                                            |
|   * Good free tier                                         |
|                                                            |
|   Option 4: Self-hosted (VPS)                              |
|   * Full control                                           |
|   * Use Docker for easy deployment                         |
|                                                            |
+------------------------------------------------------------+
```

---

# 8. Comparison with Supabase Version

```
+------------------------------------------------------------+
|                                                            |
|   Feature          | Supabase Version | Agno Version       |
|   -----------------+------------------+--------------------+
|   Language         | TypeScript/Deno  | Python             |
|   Framework        | Supabase Edge Fn | Agno + FastAPI     |
|   AI Integration   | Direct Claude API| Agno Agent         |
|   Database         | Supabase         | Supabase (same)    |
|   Schema           | Same             | Same               |
|   Tools            | Custom impl      | Agno @tool         |
|   Memory           | Mem0             | Agno built-in      |
|   Deployment       | Supabase hosting | Railway/Render/etc |
|   Duplicate check  | Added (fixed)    | Built-in from start|
|                                                            |
+------------------------------------------------------------+
```

---

# 9. Folder Structure

```
Event.nApp-Agno/
├── src/
│   ├── __init__.py
│   ├── main.py                    # FastAPI entry point
│   ├── config.py                  # Configuration
│   ├── agent/
│   │   ├── __init__.py
│   │   ├── event_agent.py         # Agno agent
│   │   └── system_prompt.py       # System prompt
│   ├── tools/
│   │   ├── __init__.py            # Exports all_tools
│   │   ├── event_tools.py
│   │   ├── task_tools.py          # WITH DEDUP!
│   │   ├── member_tools.py
│   │   ├── supplier_tools.py
│   │   ├── budget_tools.py
│   │   └── guest_tools.py
│   ├── database/
│   │   ├── __init__.py
│   │   ├── client.py              # Supabase client
│   │   ├── models.py              # Pydantic models
│   │   └── schema.sql             # DB schema
│   └── integrations/
│       ├── __init__.py
│       └── telegram_bot.py        # Telegram webhook
├── tests/
│   ├── __init__.py
│   ├── test_tools.py
│   └── test_agent.py
├── DocS/
│   ├── Event.nApp-Agno Context...
│   ├── Event.nApp-Agno PRD...
│   ├── Event.nApp-Agno Architecture...
│   ├── Event.nApp-Agno Database...
│   └── Event.nApp-Agno Status...
├── requirements.txt
├── .env.example
├── .gitignore
├── CLAUDE.md
└── README.md
```

---

**Event.nApp-Agno | AI-Powered Event Planning (Python/Agno Implementation)**
