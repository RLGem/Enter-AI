# Event.nApp-Agno - Database Schema

## Version 1.0 | 31 January 2026

---

## Table of Contents

| # | Topic |
|:-:|:------|
| 1 | Design Principles |
| 2 | ERD Diagram |
| 3 | Tables |
| 4 | Schema SQL |
| 5 | Indexes |
| 6 | RLS Policies |

---

# 1. Design Principles

```
+------------------------------------------------------------+
|                                                            |
|   SAME SCHEMA AS SUPABASE VERSION                          |
|   (for compatibility and potential migration)              |
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
|   +-------------+         +-------------+                                   |
|   |budget_items |         |   guests    |                                   |
|   +-------------+         +-------------+                                   |
|         |                       |                                           |
|         +--------> events <-----+                                           |
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
```

---

# 4. Schema SQL

This SQL should be run in the new Supabase project's SQL editor:

```sql
-- ============================================
-- Event.nApp-Agno Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Events
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    event_date TEXT,
    event_type TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (Telegram users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    telegram_id BIGINT UNIQUE NOT NULL,
    telegram_chat_id BIGINT,
    phone TEXT,
    email TEXT,
    first_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Members (Event participants)
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    role TEXT,
    side TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'open',
    due_date TEXT,
    category TEXT,
    assigned_to UUID REFERENCES members(id) ON DELETE SET NULL,
    assigned_side TEXT,
    priority TEXT DEFAULT 'medium',
    created_by UUID REFERENCES members(id) ON DELETE SET NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Suppliers (Admin-managed)
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    description TEXT,
    categories TEXT[],
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'sent',
    message TEXT,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budget Items
CREATE TABLE budget_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    category TEXT,
    name TEXT NOT NULL,
    description TEXT,
    estimated_cost NUMERIC,
    actual_cost NUMERIC,
    status TEXT DEFAULT 'pending',
    supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
    notes TEXT,
    due_date TEXT,
    paid_date TEXT,
    created_by UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    side TEXT,
    group_name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    rsvp_status TEXT DEFAULT 'pending',
    plus_one BOOLEAN DEFAULT FALSE,
    plus_one_name TEXT,
    dietary_restrictions TEXT,
    table_number INTEGER,
    notes TEXT,
    added_by UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat History
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    tool_calls JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER budget_items_updated_at
    BEFORE UPDATE ON budget_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_members_event_id ON members(event_id);
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_tasks_event_id ON tasks(event_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_suppliers_active ON suppliers(active);
CREATE INDEX idx_suppliers_categories ON suppliers USING GIN(categories);
CREATE INDEX idx_leads_event_id ON leads(event_id);
CREATE INDEX idx_leads_supplier_id ON leads(supplier_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_budget_items_event_id ON budget_items(event_id);
CREATE INDEX idx_budget_items_category ON budget_items(category);
CREATE INDEX idx_budget_items_status ON budget_items(status);
CREATE INDEX idx_guests_event_id ON guests(event_id);
CREATE INDEX idx_guests_side ON guests(side);
CREATE INDEX idx_guests_rsvp_status ON guests(rsvp_status);
CREATE INDEX idx_guests_group_name ON guests(group_name);
CREATE INDEX idx_chat_history_event_id ON chat_history(event_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for Python backend)
CREATE POLICY "Service role full access" ON events FOR ALL USING (true);
CREATE POLICY "Service role full access" ON users FOR ALL USING (true);
CREATE POLICY "Service role full access" ON members FOR ALL USING (true);
CREATE POLICY "Service role full access" ON tasks FOR ALL USING (true);
CREATE POLICY "Service role full access" ON suppliers FOR ALL USING (true);
CREATE POLICY "Service role full access" ON leads FOR ALL USING (true);
CREATE POLICY "Service role full access" ON budget_items FOR ALL USING (true);
CREATE POLICY "Service role full access" ON guests FOR ALL USING (true);
CREATE POLICY "Service role full access" ON chat_history FOR ALL USING (true);

-- ============================================
-- DONE
-- ============================================
```

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
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for Python backend)
-- User-specific policies to be added when auth is implemented
```

---

**Event.nApp-Agno | AI-Powered Event Planning (Python/Agno Implementation)**
