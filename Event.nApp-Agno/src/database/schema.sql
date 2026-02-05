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
CREATE TABLE IF NOT EXISTS events (
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
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS members (
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
CREATE TABLE IF NOT EXISTS tasks (
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
CREATE TABLE IF NOT EXISTS suppliers (
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
CREATE TABLE IF NOT EXISTS leads (
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
CREATE TABLE IF NOT EXISTS budget_items (
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
CREATE TABLE IF NOT EXISTS guests (
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
CREATE TABLE IF NOT EXISTS chat_history (
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

DROP TRIGGER IF EXISTS events_updated_at ON events;
CREATE TRIGGER events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS users_updated_at ON users;
CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS members_updated_at ON members;
CREATE TRIGGER members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS tasks_updated_at ON tasks;
CREATE TRIGGER tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS suppliers_updated_at ON suppliers;
CREATE TRIGGER suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS budget_items_updated_at ON budget_items;
CREATE TRIGGER budget_items_updated_at
    BEFORE UPDATE ON budget_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS guests_updated_at ON guests;
CREATE TRIGGER guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_members_event_id ON members(event_id);
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_event_id ON tasks(event_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_suppliers_active ON suppliers(active);
CREATE INDEX IF NOT EXISTS idx_suppliers_categories ON suppliers USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_leads_event_id ON leads(event_id);
CREATE INDEX IF NOT EXISTS idx_leads_supplier_id ON leads(supplier_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_budget_items_event_id ON budget_items(event_id);
CREATE INDEX IF NOT EXISTS idx_budget_items_category ON budget_items(category);
CREATE INDEX IF NOT EXISTS idx_budget_items_status ON budget_items(status);
CREATE INDEX IF NOT EXISTS idx_guests_event_id ON guests(event_id);
CREATE INDEX IF NOT EXISTS idx_guests_side ON guests(side);
CREATE INDEX IF NOT EXISTS idx_guests_rsvp_status ON guests(rsvp_status);
CREATE INDEX IF NOT EXISTS idx_guests_group_name ON guests(group_name);
CREATE INDEX IF NOT EXISTS idx_chat_history_event_id ON chat_history(event_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_created_at ON chat_history(created_at);

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
DROP POLICY IF EXISTS "Service role full access events" ON events;
CREATE POLICY "Service role full access events" ON events FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access users" ON users;
CREATE POLICY "Service role full access users" ON users FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access members" ON members;
CREATE POLICY "Service role full access members" ON members FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access tasks" ON tasks;
CREATE POLICY "Service role full access tasks" ON tasks FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access suppliers" ON suppliers;
CREATE POLICY "Service role full access suppliers" ON suppliers FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access leads" ON leads;
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access budget_items" ON budget_items;
CREATE POLICY "Service role full access budget_items" ON budget_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access guests" ON guests;
CREATE POLICY "Service role full access guests" ON guests FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role full access chat_history" ON chat_history;
CREATE POLICY "Service role full access chat_history" ON chat_history FOR ALL USING (true);

-- ============================================
-- DONE
-- ============================================
