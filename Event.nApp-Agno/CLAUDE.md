# Event.nApp-Agno - Claude Context File

## מה זה הקובץ הזה?

קובץ זה מכיל את כל הקונטקסט שצריך כדי לעבוד על פרויקט Event.nApp-Agno (מימוש Python/Agno).

---

## 🎯 מהות הפרויקט

**Event.nApp-Agno** הוא עוזר AI לתכנון אירועים שפועל כממשק שיחה בלבד (צ'אט).
זהו מימוש חדש של Event.nApp באמצעות Agno Framework (Python).

### פילוסופיית nApp

```
nApp = "No App" (עברית) + "New App" (אנגלית)

עקרונות יסוד:
• אין UI מסורתי - רק שיחה טבעית
• AI לומד מהשיחה (לא קונפיגורציה/טפסים מראש)
• שואלים רק כשרלוונטי - לא מראש
• גמישות מלאה - כל סוג אירוע, כל פורמט תאריך
• זיכרון חכם - זיכרון אירוע (משותף) + זיכרון משתמש (פרטי)
• פעולות גמישות - המשתמש מבקש, ה-AI מבצע
```

### מודל עסקי

```
• חינמי למשתמשים
• הכנסה מלידים חמים לספקים
• מציע ספקים רק אם יש ברשימה (שתיקה אם אין)
• עותק של כל ליד נשלח לאדמין
```

---

## 🏗️ Stack טכנולוגי

```
Agno Stack:
• Framework: Agno (Python) - https://github.com/agno-agi/agno
• AI: Claude via Agno's Anthropic integration
• Memory: Agno's built-in memory system
• Database: Supabase (PostgreSQL)
• Chat: Telegram Bot (@EAIEventsBot)
• (בהמשך) WhatsApp Business API

Sister Project:
• Event.nApp-Supabase - Original implementation with Supabase Edge Functions (Deno/TypeScript)
```

---

## 📁 מבנה פרויקט

```
Event.nApp-Agno/
├── src/
│   ├── __init__.py
│   ├── main.py                    # Entry point
│   ├── config.py                  # Configuration & env vars
│   ├── agent/
│   │   ├── __init__.py
│   │   ├── event_agent.py         # Main Agno agent
│   │   └── system_prompt.py       # System prompt in Hebrew
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── event_tools.py         # create_event, get_event_summary
│   │   ├── task_tools.py          # create_task, list_tasks, etc. (with dedup!)
│   │   ├── member_tools.py        # add_member, list_members
│   │   ├── supplier_tools.py      # search_suppliers, send_lead
│   │   ├── budget_tools.py        # add_budget_item, list_budget, etc.
│   │   └── guest_tools.py         # add_guest, list_guests, etc.
│   ├── database/
│   │   ├── __init__.py
│   │   ├── client.py              # Supabase client
│   │   ├── models.py              # Pydantic models
│   │   └── schema.sql             # Database schema
│   └── integrations/
│       ├── __init__.py
│       └── telegram_bot.py        # Telegram webhook handler
├── tests/
│   ├── __init__.py
│   ├── test_tools.py
│   └── test_agent.py
├── DocS/                          # Documentation (Hebrew)
│   ├── Event.nApp Context...
│   ├── Event.nApp PRD...
│   ├── Event.nApp Architecture...
│   ├── Event.nApp Database...
│   └── Event.nApp Status...
├── requirements.txt
├── .env.example
├── .gitignore
├── CLAUDE.md                      # This file
└── README.md
```

---

## 🗄️ Database Schema

```
טבלאות עיקריות (זהה ל-Supabase version):
• events       - אירועים (name, event_date TEXT, event_type, status)
• users        - משתמשי Telegram (telegram_id, telegram_chat_id)
• members      - משתתפים באירוע (event_id, user_id, name, role, side, is_admin)
• tasks        - משימות (event_id, title, status, due_date TEXT, category, assigned_to, priority)
• suppliers    - ספקים (name, categories[], active)
• leads        - לידים (event_id, supplier_id, member_id, status, message)
• chat_history - היסטוריית שיחות
• budget_items - פריטי תקציב
• guests       - אורחים (rsvp_status, plus_one, table_number)
• artifacts    - קבצים שנוצרו (PDF, Excel)

עקרונות DB:
• הכל TEXT (לא ENUMs) - גמישות מלאה
• מינימום שדות חובה
• תאריכים כ-TEXT (גמישות: "1/6/2026", "באוקטובר", "כשיהיה חם")
```

---

## 🤖 Agno Tools (לממש ב-src/tools/)

```
Event:
• create_event, get_event_summary

Tasks (with built-in duplicate prevention!):
• create_task, list_tasks, update_task, delete_task, complete_task

Members:
• add_member, list_members

Suppliers & Leads:
• search_suppliers, send_lead

Budget:
• add_budget_item, list_budget, update_budget_item

Guests:
• add_guest, list_guests, update_guest
```

---

## 🔐 Environment Variables

```
# Telegram
TELEGRAM_BOT_TOKEN=xxx

# AI
ANTHROPIC_API_KEY=xxx

# Supabase (new project for Agno)
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=xxx

# Admin
ADMIN_EMAIL=xxx
ADMIN_PHONE=xxx
```

---

## 🧪 Test Case

```
חתונה של מיכל ועמיתי קרני
תאריך: 1 ביוני 2026
משתתפים:
• מיכל - הכלה
• עמיתי קרני - החתן
• רפי (Raphy) - אבא של הכלה + אדמין המערכת
```

---

## 🚀 פקודות נפוצות

```bash
# Python environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run locally
python src/main.py

# Run tests
pytest tests/

# Telegram webhook (ngrok for local dev)
ngrok http 8000
```

---

## ⚠️ חשוב לזכור

```
1. nApp = שיחה, לא UI
2. הכל גמיש - אין קטגוריות קבועות
3. לומדים מהשיחה - לא שואלים הכל מראש
4. ספקים - רק אם יש ברשימה (שתיקה אם אין)
5. עברית RTL
6. ALWAYS check for duplicates before creating tasks/items (learned from Supabase version)
7. Use Agno's built-in memory system
```

---

## 📋 Implementation Checklist

```
[ ] Create new Supabase project "Event.nApp-Agno"
[ ] Get credentials (SUPABASE_URL, keys, DATABASE_URL)
[ ] Run schema.sql in Supabase SQL editor
[ ] Implement database client (src/database/client.py)
[ ] Implement Pydantic models (src/database/models.py)
[ ] Implement tools with duplicate prevention
[ ] Implement Agno agent with system prompt
[ ] Implement Telegram integration
[ ] Test via Telegram
[ ] Deploy (Railway/Render/etc.)
```

---

## 👤 בעל הפרויקט

```
רפי (Raphy)
• אדמין המערכת
• אבא של הכלה (מיכל) בחתונה לדוגמה
• מנהל ספקים ולידים
```

---

## 🔗 Related Projects

```
• Event.nApp-Supabase - Sister project (Deno/TypeScript/Supabase Edge Functions)
  Location: D:\My ProjectS\Enter AI\Event.nApp-Supabase
```

---

**Event.nApp-Agno | AI-Powered Event Planning (Agno/Python Implementation)**
