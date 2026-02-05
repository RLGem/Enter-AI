# Event.nApp-Agno

AI-Powered Event Planning Assistant - Python/Agno Implementation

## What is Event.nApp?

Event.nApp is an AI assistant for event planning that works through chat interface only.

**nApp** = "No App" (Hebrew) + "New App" (English)

- No traditional UI - just natural conversation
- AI learns from conversation (no upfront configuration)
- Flexible - any event type, any date format
- Free for users, revenue from supplier leads

## Tech Stack

- **Framework**: Agno (Python AI Agent Framework)
- **AI**: Claude via Anthropic API
- **Database**: Supabase (PostgreSQL)
- **Web**: FastAPI
- **Chat**: Telegram Bot

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project named "Event.nApp-Agno"
3. Copy credentials from Settings → API:
   - Project URL
   - anon/public key
   - service_role key

### 2. Run Database Schema

1. Go to Supabase → SQL Editor
2. Copy contents of `src/database/schema.sql`
3. Run the SQL

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
ANTHROPIC_API_KEY=your_claude_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Install Dependencies

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: .\venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

### 5. Run Locally

```bash
python src/main.py
```

### 6. Set Up Telegram Webhook

For local development, use ngrok:

```bash
ngrok http 8000
```

Then set webhook:

```bash
curl "https://api.telegram.org/bot{TOKEN}/setWebhook?url={NGROK_URL}/webhook"
```

## Project Structure

```
Event.nApp-Agno/
├── src/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Configuration
│   ├── agent/
│   │   ├── event_agent.py   # Agno agent
│   │   └── system_prompt.py # Hebrew system prompt
│   ├── tools/
│   │   ├── event_tools.py   # Event management
│   │   ├── task_tools.py    # Tasks (with dedup!)
│   │   ├── member_tools.py  # Members
│   │   ├── supplier_tools.py# Suppliers & leads
│   │   ├── budget_tools.py  # Budget items
│   │   └── guest_tools.py   # Guest list
│   ├── database/
│   │   ├── client.py        # Supabase client
│   │   ├── models.py        # Pydantic models
│   │   └── schema.sql       # DB schema
│   └── integrations/
│       └── telegram_bot.py  # Telegram webhook
├── tests/
├── DocS/                    # Documentation (Hebrew)
├── requirements.txt
├── .env.example
└── CLAUDE.md               # Claude context file
```

## Features

- **Event Management** - Create and manage any type of event
- **Task Management** - With built-in duplicate prevention
- **Member Management** - Track participants and roles
- **Supplier Leads** - Connect users with suppliers
- **Budget Tracking** - Estimated vs actual costs
- **Guest Management** - RSVP, plus-ones, tables

## Test Case

Wedding of Michal & Amitai Karni
- Date: June 1, 2026
- Admin: Raphy (father of the bride)

## Related Projects

- **Event.nApp-Supabase** - Original TypeScript/Deno implementation

## License

MIT

---

**Event.nApp-Agno | AI-Powered Event Planning**
