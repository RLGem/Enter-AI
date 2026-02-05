# Event.nApp - Database Schema

## Version 1.1 | Updated 31 January 2026

---

## Table of Contents

| # | Topic |
|:-:|:------|
| 1 | Design Principles |
| 2 | ERD Diagram |
| 3 | Tables |
| 4 | Migrations |
| 5 | Indexes |
| 6 | RLS Policies |

---

# 1. Design Principles

```
+------------------------------------------------------------+
|                                                            |
|   * All TEXT (no ENUMs)                                    |
|       - Maximum flexibility                                |
|       - No migrations for every change                     |
|                                                            |
|   * Minimum required fields                                |
|       - Only what's truly necessary                        |
|       - Everything else nullable                           |
|                                                            |
|   * Automatic timestamps                                   |
|       - created_at                                         |
|       - updated_at (via triggers)                          |
|                                                            |
|   * Flexible dates as TEXT                                 |
|       - Accept: "1/6/2026", "October", "when it's warm"    |
|                                                            |
+------------------------------------------------------------+
```

---

# 2. ERD Diagram

```
+-----------------------------------------------------------------------------+
|                                                                             |
|   +-------------+         +-------------+         +-------------+           |
|   |   events    |<--------|   members   |-------->|    users    |           |
|   +-------------+    1:N  +-------------+    N:1  +-------------+           |
|         |                       |                      |                    |
|         | 1:N                   |                      |                    |
|         v                       |                      |                    |
|   +-------------+               |                      |                    |
|   |    tasks    |<--------------+                      |                    |
|   +-------------+  assigned_to                         |                    |
|         |                                              |                    |
|         |                                              |                    |
|   +-------------+         +-------------+              |                    |
|   |  suppliers  |<--------|    leads    |>-------------+                    |
|   +-------------+    1:N  +-------------+                                   |
|                                 |                                           |
|                                 |                                           |
|   +-------------+               |                                           |
|   |chat_history |<--------------+                                           |
|   +-------------+                                                           |
|                                                                             |
|   +-------------+         +-------------+         +-------------+           |
|   |budget_items |         |   guests    |         |  artifacts  |           |
|   +-------------+         +-------------+         +-------------+           |
|         |                       |                       |                   |
|         +--------> events <-----+--------> users <------+                   |
|                                                                             |
|   +-------------+                                                           |
|   |search_cache | (standalone - for caching web searches)                   |
|   +-------------+                                                           |
|                                                                             |
+-----------------------------------------------------------------------------+
```

---

# 3. Tables

## events - Events

```
+------------------------------------------------------------+
| events                                                     |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| name           | TEXT     | Event name (required)          |
| description    | TEXT     | Description (from conversation)|
| event_date     | TEXT     | Flexible date (text!)          |
| event_type     | TEXT     | Type (wedding, bar mitzvah...) |
| status         | TEXT     | active/completed/cancelled     |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+

Notes:
* event_date is TEXT - can be "1/6/2026" or "October" or "when it's warm"
* event_type is TEXT - can be anything
* When created, the creator is automatically added as admin member
```

## users - System Users (Telegram)

```
+------------------------------------------------------------+
| users                                                      |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| telegram_id    | BIGINT   | Telegram user ID (unique)      |
| telegram_chat_id| BIGINT  | Chat ID                        |
| phone          | TEXT     | Phone number (if provided)     |
| email          | TEXT     | Email (if provided)            |
| first_name     | TEXT     | Name from Telegram/conversation|
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+

Notes:
* first_name is updated when user says "I'm [name]"
* telegram_id is unique - one user per Telegram account
```

## members - Event Participants

```
+------------------------------------------------------------+
| members                                                    |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events                   |
| user_id        | UUID     | FK -> users (nullable)         |
| name           | TEXT     | Member's name (required)       |
| role           | TEXT     | Role - free text               |
| side           | TEXT     | Side/group (optional)          |
| is_admin       | BOOLEAN  | Is event admin                 |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+

Notes:
* role can be "father of groom", "bride's sister", "organizer"
* side can be "groom", "bride", "family", "friends", or NULL
* user_id is NULL if member isn't registered in system
* is_current_user parameter in add_member links user_id
```

## tasks - Tasks

```
+------------------------------------------------------------+
| tasks                                                      |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events (required)        |
| title          | TEXT     | Task title (required)          |
| description    | TEXT     | Description                    |
| status         | TEXT     | open/done (default: open)      |
| due_date       | TEXT     | Due date (flexible text)       |
| category       | TEXT     | Category (optional)            |
| assigned_to    | UUID     | FK -> members (nullable)       |
| assigned_side  | TEXT     | Assigned side (optional)       |
| priority       | TEXT     | low/medium/high                |
| created_by     | UUID     | FK -> members                  |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
| completed_at   | TIMESTAMP| When marked done               |
+----------------+----------+--------------------------------+

Notes:
* due_date is TEXT - can be "28/02/2026" or "end of month"
* category is user-defined - no fixed list
```

## suppliers - Suppliers (Admin-managed)

```
+------------------------------------------------------------+
| suppliers                                                  |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| name           | TEXT     | Supplier/business name         |
| contact_name   | TEXT     | Contact person                 |
| contact_email  | TEXT     | Email                          |
| contact_phone  | TEXT     | Phone                          |
| description    | TEXT     | Services description           |
| categories     | TEXT[]   | Categories (array)             |
| active         | BOOLEAN  | Is active (default: true)      |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+

Notes:
* Managed by admin (Raphy)
* categories can be: ["photography", "video", "magnets"]
* Only active suppliers are shown in search
```

## leads - Leads

```
+------------------------------------------------------------+
| leads                                                      |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events                   |
| supplier_id    | UUID     | FK -> suppliers                |
| member_id      | UUID     | FK -> members (who requested)  |
| status         | TEXT     | sent/contacted/converted/closed|
| message        | TEXT     | Message sent to supplier       |
| sent_at        | TIMESTAMP| When sent                      |
| notes          | TEXT     | Notes                          |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+
```

## budget_items - Budget Items

```
+------------------------------------------------------------+
| budget_items                                               |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events                   |
| category       | TEXT     | Category (venue, catering...)  |
| name           | TEXT     | Item name (required)           |
| description    | TEXT     | Description                    |
| estimated_cost | NUMERIC  | Estimated cost in NIS          |
| actual_cost    | NUMERIC  | Actual cost if known           |
| status         | TEXT     | pending/confirmed/paid         |
| supplier_id    | UUID     | FK -> suppliers (optional)     |
| notes          | TEXT     | Notes                          |
| due_date       | TEXT     | Payment due date               |
| paid_date      | TEXT     | When paid                      |
| created_by     | UUID     | FK -> members                  |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+
```

## guests - Event Guests

```
+------------------------------------------------------------+
| guests                                                     |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events                   |
| name           | TEXT     | Guest name (required)          |
| side           | TEXT     | groom/bride/family/friends     |
| group_name     | TEXT     | Group (Family Smith, Friends)  |
| phone          | TEXT     | Phone number                   |
| email          | TEXT     | Email                          |
| address        | TEXT     | Address                        |
| rsvp_status    | TEXT     | pending/confirmed/declined/maybe|
| plus_one       | BOOLEAN  | Has plus one (default: false)  |
| plus_one_name  | TEXT     | Plus one's name                |
| dietary_restrictions| TEXT| Dietary restrictions           |
| table_number   | INTEGER  | Table assignment               |
| notes          | TEXT     | Notes                          |
| added_by       | UUID     | FK -> members                  |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+
```

## artifacts - Generated Artifacts

```
+------------------------------------------------------------+
| artifacts                                                  |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events                   |
| user_id        | UUID     | FK -> users (who requested)    |
| format         | TEXT     | pdf/excel/csv/markdown/chart   |
| artifact_type  | TEXT     | task_list/budget/guest_list... |
| title          | TEXT     | Artifact title                 |
| description    | TEXT     | Description                    |
| telegram_file_id| TEXT    | Telegram file_id for re-sending|
| content_hash   | TEXT     | Hash for deduplication         |
| metadata       | JSONB    | Flexible metadata              |
| created_at     | TIMESTAMP| auto                           |
| updated_at     | TIMESTAMP| auto (trigger)                 |
+----------------+----------+--------------------------------+

Notes:
* telegram_file_id allows re-sending without regenerating
* metadata stores filters used, etc.
```

## search_cache - Web Search Cache

```
+------------------------------------------------------------+
| search_cache                                               |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| query_hash     | TEXT     | MD5 hash of normalized query   |
| query_text     | TEXT     | Original query                 |
| search_type    | TEXT     | reviews/prices/recommendations |
| results        | JSONB    | Cached results                 |
| result_count   | INTEGER  | Number of results              |
| created_at     | TIMESTAMP| auto                           |
| expires_at     | TIMESTAMP| TTL (24 hours from creation)   |
+----------------+----------+--------------------------------+

Notes:
* Cache expires after 24 hours
* cleanup_expired_search_cache() function removes old entries
```

## chat_history - Conversation History

```
+------------------------------------------------------------+
| chat_history                                               |
+----------------+----------+--------------------------------+
| Column         | Type     | Description                    |
+----------------+----------+--------------------------------+
| id             | UUID     | PK, auto-generated             |
| event_id       | UUID     | FK -> events (nullable)        |
| user_id        | UUID     | FK -> users                    |
| role           | TEXT     | user/assistant                 |
| content        | TEXT     | Message content                |
| tool_calls     | JSONB    | Tool calls (if any)            |
| created_at     | TIMESTAMP| auto                           |
+----------------+----------+--------------------------------+

Notes:
* Last 20 messages are loaded for context
* tool_calls stored as JSON for debugging
```

---

# 4. Migrations

## Migration 1: Initial Schema (20260130000000)

Creates:
- events, users, members, tasks, suppliers, leads, chat_history
- All triggers for updated_at
- All indexes
- RLS enabled (policies pending)

## Migration 2: Artifacts & Search (20260131000000)

Creates:
- artifacts table
- search_cache table
- budget_items table
- guests table
- Additional triggers and indexes
- RLS policies (service role full access)

---

# 5. Indexes

```sql
-- Events
CREATE INDEX idx_events_status ON events(status);

-- Users
CREATE INDEX idx_users_telegram_id ON users(telegram_id);

-- Members
CREATE INDEX idx_members_event_id ON members(event_id);
CREATE INDEX idx_members_user_id ON members(user_id);

-- Tasks
CREATE INDEX idx_tasks_event_id ON tasks(event_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);

-- Suppliers
CREATE INDEX idx_suppliers_active ON suppliers(active);
CREATE INDEX idx_suppliers_categories ON suppliers USING GIN(categories);

-- Leads
CREATE INDEX idx_leads_event_id ON leads(event_id);
CREATE INDEX idx_leads_supplier_id ON leads(supplier_id);
CREATE INDEX idx_leads_status ON leads(status);

-- Budget Items
CREATE INDEX idx_budget_items_event_id ON budget_items(event_id);
CREATE INDEX idx_budget_items_category ON budget_items(category);
CREATE INDEX idx_budget_items_status ON budget_items(status);

-- Guests
CREATE INDEX idx_guests_event_id ON guests(event_id);
CREATE INDEX idx_guests_side ON guests(side);
CREATE INDEX idx_guests_rsvp_status ON guests(rsvp_status);
CREATE INDEX idx_guests_group_name ON guests(group_name);

-- Artifacts
CREATE INDEX idx_artifacts_event_id ON artifacts(event_id);
CREATE INDEX idx_artifacts_user_id ON artifacts(user_id);
CREATE INDEX idx_artifacts_format ON artifacts(format);

-- Search Cache
CREATE INDEX idx_search_cache_query_hash ON search_cache(query_hash);
CREATE INDEX idx_search_cache_expires_at ON search_cache(expires_at);

-- Chat History
CREATE INDEX idx_chat_history_event_id ON chat_history(event_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at);
```

---

# 6. RLS Policies

```sql
-- RLS enabled on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for Edge Functions)
-- User-specific policies to be added when auth is implemented
```

---

**Event.nApp | AI-Powered Event Planning**
