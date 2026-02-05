# Event.nApp-Supabase - Claude Context File

## מה זה הקובץ הזה?

קובץ זה מכיל את כל הקונטקסט שצריך כדי לעבוד על פרויקט Event.nApp-Supabase (מימוש Supabase).

---

## 🎯 מהות הפרויקט

**Event.nApp** הוא עוזר AI לתכנון אירועים שפועל כממשק שיחה בלבד (צ'אט).

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
Current Stack (Supabase):
• Database: Supabase (PostgreSQL)
• Backend: Supabase Edge Functions (Deno/TypeScript)
• AI: Claude API (Anthropic)
• Memory: Mem0
• Chat: Telegram Bot (@EAIEventsBot)
• (בהמשך) WhatsApp Business API

Potential Agno Stack:
• Framework: Agno (Python) - https://github.com/agno-agi/agno
• AI: Claude via Agno's Anthropic integration
• Memory: Agno's built-in memory system
• Storage: SQLite/PostgreSQL via Agno
• Chat: Same Telegram/WhatsApp integration
```

---

## 📁 מבנה פרויקט

```
Event.nApp-Supabase/
├── supabase/
│   ├── functions/
│   │   ├── telegram-webhook/index.ts   # Telegram entry point
│   │   ├── send-lead/index.ts          # Lead sending
│   │   └── _shared/
│   │       ├── claude.ts               # Claude API + System Prompt
│   │       ├── mem0.ts                 # Memory integration
│   │       ├── telegram.ts             # Telegram helpers
│   │       ├── tools.ts                # Tool definitions + implementations
│   │       ├── artifacts.ts            # PDF/Excel generation
│   │       ├── search.ts               # Web search
│   │       └── supabase.ts             # DB types + client
│   ├── migrations/
│   │   ├── 20260130000000_initial_schema.sql
│   │   └── 20260131000000_add_artifacts_and_search.sql
│   └── config.toml
├── DocS/                               # Documentation (Hebrew)
│   ├── Event.nApp Context...           # Background & Philosophy
│   ├── Event.nApp PRD...               # Product Requirements
│   ├── Event.nApp Architecture...      # Technical Architecture
│   ├── Event.nApp Database...          # Full DB Schema
│   └── Event.nApp Status...            # Status & Roadmap
└── CLAUDE.md                           # This file
```

---

## 🗄️ Database Schema

```
טבלאות עיקריות:
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

## 🤖 Claude Tools (מומש ב-tools.ts)

```
Event:
• create_event, get_event_summary

Tasks:
• create_task, list_tasks, update_task, delete_task, complete_task

Members:
• add_member, list_members

Suppliers & Leads:
• search_suppliers, send_lead

Budget:
• add_budget_item, list_budget, update_budget_item

Guests:
• add_guest, list_guests, update_guest

Artifacts:
• propose_artifact, generate_artifact (PDF, Excel, CSV, Charts)

Search:
• web_search (reviews, prices, recommendations)
```

---

## 🐛 Known Bugs

### ~~Duplicate Tasks Bug~~ ✅ FIXED
**Location**: `supabase/functions/_shared/tools.ts` line 593-651

**Problem**: `createTask()` was inserting directly without checking for existing identical tasks.

**Solution Applied**:
- Added duplicate check before INSERT in `createTask()`
- Checks for open tasks with similar title (using ILIKE)
- Returns existing task if found instead of creating duplicate

**Status**: Fixed on 2026-01-31

---

## 🔐 Environment Variables

```
TELEGRAM_BOT_TOKEN=xxx
ANTHROPIC_API_KEY=xxx
MEM0_API_KEY=xxx
ADMIN_EMAIL=xxx
ADMIN_PHONE=xxx

# Supabase (automatic in Edge Functions)
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
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
# Supabase CLI
supabase login
supabase link --project-ref xxx
supabase db push
supabase functions deploy telegram-webhook
supabase secrets set KEY=value

# Telegram webhook
curl "https://api.telegram.org/bot{TOKEN}/setWebhook?url={URL}"
curl "https://api.telegram.org/bot{TOKEN}/getWebhookInfo"

# Local development
supabase functions serve telegram-webhook --env-file .env.local
```

---

## ⚠️ חשוב לזכור

```
1. nApp = שיחה, לא UI
2. הכל גמיש - אין קטגוריות קבועות
3. לומדים מהשיחה - לא שואלים הכל מראש
4. ספקים - רק אם יש ברשימה (שתיקה אם אין)
5. עברית RTL
6. ALWAYS check for duplicates before creating tasks/items
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

**Event.nApp-Supabase | AI-Powered Event Planning (Supabase Implementation)**
