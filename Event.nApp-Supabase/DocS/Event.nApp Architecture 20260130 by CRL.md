# Event.nApp - Technical Architecture

## Version 1.1 | Updated 31 January 2026

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

---

# 1. Architecture Overview

## Principles

```
+------------------------------------------------------------+
|                                                            |
|   * Maximum simplicity                                     |
|   * Serverless (no servers to manage)                      |
|   * Free/cheap as possible                                 |
|   * Scalable                                               |
|   * Easy to extend                                         |
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
|   Supabase Edge Function (Webhook)                         |
|        |                                                   |
|        v                                                   |
|   Claude API (claude-sonnet-4) + Tools                     |
|        |                                                   |
|        v                                                   |
|   Supabase Database (PostgreSQL)                           |
|        |                                                   |
|        v                                                   |
|   Response back to user (+ files if artifacts generated)   |
|                                                            |
+------------------------------------------------------------+
```

---

# 2. Tech Stack

## Components (IMPLEMENTED)

```
+------------------------------------------------------------+
|                                                            |
|   Database: Supabase (PostgreSQL)                          |
|       * Free up to 500MB                                   |
|       * Auto-generated APIs                                |
|       * Row Level Security                                 |
|                                                            |
|   Backend: Supabase Edge Functions                         |
|       * Deno runtime                                       |
|       * TypeScript                                         |
|       * Serverless                                         |
|                                                            |
|   AI: Claude API (Anthropic)                               |
|       * Model: claude-sonnet-4-20250514                    |
|       * Tools/Function calling                             |
|       * Hebrew + English support                           |
|                                                            |
|   Web Search: Tavily API                                   |
|       * Real-time web search                               |
|       * Reviews, prices, recommendations                   |
|       * Cached results (24h TTL)                           |
|                                                            |
|   Artifacts: Dynamic Generation                            |
|       * PDF (jsPDF)                                        |
|       * Excel (ExcelJS)                                    |
|       * CSV, Markdown                                      |
|       * Charts (QuickChart.io)                             |
|                                                            |
|   Chat Interface: Telegram Bot                             |
|       * @EAIEventsBot                                      |
|       * Text messages + file attachments                   |
|       * Typing indicators                                  |
|                                                            |
+------------------------------------------------------------+
```

## SDKs & Libraries

```
+------------------------------------------------------------+
|                                                            |
|   @supabase/supabase-js: latest (via esm.sh)               |
|   jsPDF: 2.5.1 (PDF generation)                            |
|   ExcelJS: 4.4.0 (Excel generation)                        |
|   Tavily API: REST                                         |
|   Telegram Bot API: REST                                   |
|   Claude API: REST (anthropic-version: 2023-06-01)         |
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
|  |                         Supabase                                      |  |
|  |  +----------------------------------------------------------------+  |  |
|  |  |              Edge Function: telegram-webhook                   |  |  |
|  |  |                                                                |  |  |
|  |  |  1. Receive message from Telegram                              |  |  |
|  |  |  2. Get/Create user, find event context                        |  |  |
|  |  |  3. Load conversation history                                  |  |  |
|  |  |  4. Call Claude with Tools                                     |  |  |
|  |  |  5. Execute tool calls (DB operations)                         |  |  |
|  |  |  6. Handle artifact generation & file sending                  |  |  |
|  |  |  7. Save conversation history                                  |  |  |
|  |  |  8. Send response to Telegram                                  |  |  |
|  |  |                                                                |  |  |
|  |  +---------------+------------------------+-----------------------+  |  |
|  |                  |                        |                          |  |
|  |                  v                        v                          |  |
|  |  +---------------------+    +-----------------------+                |  |
|  |  |    PostgreSQL DB    |    |    _shared modules    |                |  |
|  |  |                     |    |                       |                |  |
|  |  |  * events           |    |  * claude.ts          |                |  |
|  |  |  * users            |    |  * tools.ts           |                |  |
|  |  |  * members          |    |  * telegram.ts        |                |  |
|  |  |  * tasks            |    |  * supabase.ts        |                |  |
|  |  |  * suppliers        |    |  * artifacts.ts       |                |  |
|  |  |  * leads            |    |  * search.ts          |                |  |
|  |  |  * budget_items     |    |                       |                |  |
|  |  |  * guests           |    +-----------------------+                |  |
|  |  |  * artifacts        |                                             |  |
|  |  |  * search_cache     |                                             |  |
|  |  |  * chat_history     |                                             |  |
|  |  |                     |                                             |  |
|  |  +---------------------+                                             |  |
|  |                                                                       |  |
|  +-----------------------------------------------------------------------+  |
|                                   |                                         |
|                    +--------------+--------------+                          |
|                    |              |              |                          |
|                    v              v              v                          |
|             +-----------+  +-----------+  +-----------+                     |
|             |  Claude   |  |  Tavily   |  | QuickChart|                     |
|             |   API     |  |   API     |  |    API    |                     |
|             +-----------+  +-----------+  +-----------+                     |
|                                                                             |
+-----------------------------------------------------------------------------+
```

---

# 4. Components

## Edge Function: telegram-webhook

Main entry point for all Telegram messages.

**File:** `supabase/functions/telegram-webhook/index.ts`

**Flow:**
1. Parse incoming Telegram update
2. Get or create user record
3. Get user context (current event + member)
4. Load conversation history (last 20 messages)
5. Build event context for Claude
6. Call Claude with tools
7. Handle artifact file sending (if generated)
8. Save conversation to history
9. Send response to user

## Claude Tools (IMPLEMENTED)

```
+------------------------------------------------------------+
|                                                            |
|   EVENT TOOLS:                                             |
|   * create_event(name, event_type?, event_date?)           |
|   * get_event_summary()                                    |
|                                                            |
|   TASK TOOLS:                                              |
|   * create_task(title, description?, due_date?, ...)       |
|   * list_tasks(status?, category?, assigned_to_name?)      |
|   * update_task(task_id, updates...)                       |
|   * delete_task(task_id)                                   |
|   * complete_task(task_title_contains)                     |
|                                                            |
|   MEMBER TOOLS:                                            |
|   * add_member(name, role?, side?, is_current_user?)       |
|   * list_members(side?)                                    |
|                                                            |
|   SUPPLIER TOOLS:                                          |
|   * search_suppliers(category)                             |
|   * send_lead(supplier_ids, message?)                      |
|                                                            |
|   BUDGET TOOLS:                                            |
|   * add_budget_item(name, category?, estimated_cost?, ...) |
|   * list_budget(category?, status?)                        |
|   * update_budget_item(item_id, updates...)                |
|                                                            |
|   GUEST TOOLS:                                             |
|   * add_guest(name, side?, rsvp_status?, plus_one?, ...)   |
|   * list_guests(side?, group_name?, rsvp_status?)          |
|   * update_guest(guest_id, updates...)                     |
|                                                            |
|   ARTIFACT TOOLS:                                          |
|   * propose_artifact(description, suggested_format, ...)   |
|   * generate_artifact(format, artifact_type, title?, ...)  |
|     Formats: pdf, excel, csv, markdown, chart              |
|     Types: task_list, budget, guest_list, comparison,      |
|            summary, custom                                 |
|                                                            |
|   WEB SEARCH TOOLS:                                        |
|   * web_search(query, search_type?, max_results?)          |
|     Types: reviews, prices, recommendations, general       |
|                                                            |
+------------------------------------------------------------+
```

## Shared Modules

| Module | Purpose |
|--------|---------|
| `claude.ts` | Claude API integration, system prompt, tool calling loop |
| `tools.ts` | Tool definitions and implementations |
| `telegram.ts` | Telegram Bot API helpers (messages, typing, files) |
| `supabase.ts` | Supabase client and type definitions |
| `artifacts.ts` | PDF, Excel, CSV, Markdown, Chart generation |
| `search.ts` | Tavily web search with caching |

---

# 5. Data Flow

## Incoming Message

```
+------------------------------------------------------------+
|                                                            |
|   1. Telegram --> Webhook                                  |
|      {                                                     |
|        update_id: 123,                                     |
|        message: {                                          |
|          from: { id: 456, first_name: "Danny" },           |
|          chat: { id: 789 },                                |
|          text: "Add task to book photographer"             |
|        }                                                   |
|      }                                                     |
|                                                            |
|   2. Edge Function                                         |
|      * Gets/creates user with telegram_id = 456            |
|      * Finds member in active event                        |
|      * Loads conversation history                          |
|      * Builds context string                               |
|                                                            |
|   3. Claude                                                |
|      System: "You are AIlex..."                            |
|      Context: "Event: Wedding of X and Y..."               |
|      History: [...last 20 messages...]                     |
|      User: "Add task to book photographer"                 |
|      Tools: [create_task, list_tasks, ...]                 |
|                                                            |
|   4. Claude Response                                       |
|      tool_calls: [{                                        |
|        name: "create_task",                                |
|        arguments: { title: "Book photographer" }           |
|      }]                                                    |
|      text: "Added task 'Book photographer'. Set a date?"   |
|                                                            |
|   5. Execute Tools --> Update DB                           |
|                                                            |
|   6. Send Response --> Telegram                            |
|                                                            |
+------------------------------------------------------------+
```

## Artifact Generation Flow

```
+------------------------------------------------------------+
|                                                            |
|   1. User: "Send me the task list as PDF"                  |
|                                                            |
|   2. Claude calls generate_artifact(                       |
|        format="pdf",                                       |
|        artifact_type="task_list"                           |
|      )                                                     |
|                                                            |
|   3. Tool fetches tasks from DB                            |
|                                                            |
|   4. Generates PDF using jsPDF                             |
|                                                            |
|   5. Returns base64-encoded buffer                         |
|                                                            |
|   6. Webhook decodes and sends via Telegram sendDocument   |
|                                                            |
|   7. Artifact record saved to DB with telegram_file_id     |
|                                                            |
+------------------------------------------------------------+
```

---

# 6. Security

## Environment Variables

```
+------------------------------------------------------------+
|                                                            |
|   Required Secrets (in Supabase):                          |
|                                                            |
|   TELEGRAM_BOT_TOKEN     - Telegram bot token              |
|   ANTHROPIC_API_KEY      - Claude API key                  |
|   TAVILY_API_KEY         - Web search API key              |
|   SUPABASE_URL           - Auto-provided                   |
|   SUPABASE_SERVICE_ROLE_KEY - Auto-provided                |
|                                                            |
|   WARNING: Never commit secrets to code!                   |
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
|   * Service role key used by Edge Functions                |
|                                                            |
+------------------------------------------------------------+
```

---

# 7. Deployment

## Deploy Edge Functions

```bash
# Deploy the webhook function
supabase functions deploy telegram-webhook

# Set required secrets
supabase secrets set TELEGRAM_BOT_TOKEN=xxx
supabase secrets set ANTHROPIC_API_KEY=xxx
supabase secrets set TAVILY_API_KEY=xxx
```

## Set Telegram Webhook

```bash
curl "https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://{PROJECT}.supabase.co/functions/v1/telegram-webhook"
```

## Database Migrations

```bash
# Push migrations to remote
supabase db push

# Check migration status
supabase migration list
```

---

# 8. Folder Structure (ACTUAL)

```
Event.nApp/
├── supabase/
│   ├── functions/
│   │   ├── telegram-webhook/
│   │   │   └── index.ts           # Main webhook handler
│   │   └── _shared/
│   │       ├── claude.ts          # Claude API + system prompt
│   │       ├── tools.ts           # All tool implementations
│   │       ├── telegram.ts        # Telegram API helpers
│   │       ├── supabase.ts        # DB client + types
│   │       ├── artifacts.ts       # PDF/Excel/Chart generation
│   │       └── search.ts          # Tavily web search
│   ├── migrations/
│   │   ├── 20260130000000_initial_schema.sql
│   │   └── 20260131000000_add_artifacts_and_search.sql
│   ├── config.toml
│   └── .temp/
├── DocS/
│   ├── Event.nApp Architecture 20260130 by CRL.md
│   ├── Event.nApp Context 20260130 by CRL.md
│   ├── Event.nApp Database 20260130 by CRL.md
│   ├── Event.nApp PRD 20260130 by CRL.md
│   └── Event.nApp Status 20260130 by CRL.md
├── CLAUDE.md
└── .claude/
    └── settings.local.json
```

---

**Event.nApp | AI-Powered Event Planning**
