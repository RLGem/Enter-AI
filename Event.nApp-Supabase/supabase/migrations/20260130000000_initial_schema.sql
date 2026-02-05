-- Event.nApp Initial Schema
-- Version 1.0 | January 30, 2026

-- ============================================
-- TABLES
-- ============================================

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    event_date TEXT,  -- Flexible format: "1/6/2026", "October", "when it's warm"
    event_type TEXT,  -- Free text: wedding, bar mitzvah, birthday, etc.
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (Telegram users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telegram_id BIGINT UNIQUE NOT NULL,
    telegram_chat_id BIGINT,
    phone TEXT,
    email TEXT,
    first_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members table (event participants)
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    role TEXT,  -- Free text: "father of groom", "bride's sister", "organizer"
    side TEXT,  -- Optional: "groom", "bride", "family", "friends", or NULL
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'open',  -- open, done
    due_date TEXT,  -- Flexible format: "28/02/2026" or "end of month"
    category TEXT,  -- User-defined, no fixed list
    assigned_to UUID REFERENCES members(id) ON DELETE SET NULL,
    assigned_side TEXT,  -- Optional side assignment
    priority TEXT DEFAULT 'medium',  -- low, medium, high
    created_by UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Suppliers table (admin-managed)
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    description TEXT,
    categories TEXT[],  -- Array: ["photography", "video", "magnets"]
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE NOT NULL,
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'sent',  -- sent, contacted, converted, closed
    message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL,  -- user, assistant
    content TEXT NOT NULL,
    tool_calls JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TRIGGERS - Auto-update updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES - Performance optimization
-- ============================================

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

-- Chat history
CREATE INDEX idx_chat_history_event_id ON chat_history(event_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_created_at ON chat_history(created_at);

-- ============================================
-- RLS - Row Level Security (prepared for later)
-- ============================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- For now, allow all access via service_role key
-- (Edge Functions use service_role)
-- Specific policies will be added when auth is implemented
