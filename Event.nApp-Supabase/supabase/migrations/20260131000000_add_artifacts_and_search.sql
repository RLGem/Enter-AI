-- Migration: Add Artifacts, Search Cache, Budget Items, and Guests
-- Created: 2026-01-31
-- Purpose: Support Dynamic Artifact Generation and Web Search features

-- ============================================
-- ARTIFACTS TABLE
-- Track generated artifacts (PDF, Excel, charts, etc.)
-- ============================================
CREATE TABLE artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    format TEXT NOT NULL, -- pdf, excel, chart, csv, markdown
    artifact_type TEXT, -- task_list, budget, guest_list, comparison, summary, etc.
    title TEXT,
    description TEXT,
    telegram_file_id TEXT, -- Telegram's file_id for re-sending
    content_hash TEXT, -- Hash of content for deduplication
    metadata JSONB DEFAULT '{}', -- Flexible metadata storage
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick lookups by event
CREATE INDEX idx_artifacts_event_id ON artifacts(event_id);
CREATE INDEX idx_artifacts_user_id ON artifacts(user_id);
CREATE INDEX idx_artifacts_format ON artifacts(format);

-- ============================================
-- SEARCH CACHE TABLE
-- Cache search results to avoid duplicate API calls
-- ============================================
CREATE TABLE search_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash TEXT UNIQUE NOT NULL, -- MD5 hash of normalized query
    query_text TEXT NOT NULL, -- Original query for debugging
    search_type TEXT, -- reviews, prices, recommendations, general
    results JSONB NOT NULL, -- Search results
    result_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL -- TTL for cache
);

-- Index for quick cache lookups
CREATE INDEX idx_search_cache_query_hash ON search_cache(query_hash);
CREATE INDEX idx_search_cache_expires_at ON search_cache(expires_at);

-- ============================================
-- BUDGET ITEMS TABLE
-- Track event budget items for budget artifacts
-- ============================================
CREATE TABLE budget_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    category TEXT, -- venue, catering, photography, DJ, flowers, etc.
    name TEXT NOT NULL,
    description TEXT,
    estimated_cost NUMERIC(12, 2),
    actual_cost NUMERIC(12, 2),
    status TEXT DEFAULT 'pending', -- pending, confirmed, paid
    supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
    notes TEXT,
    due_date TEXT, -- Flexible date format
    paid_date TEXT,
    created_by UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for budget lookups
CREATE INDEX idx_budget_items_event_id ON budget_items(event_id);
CREATE INDEX idx_budget_items_category ON budget_items(category);
CREATE INDEX idx_budget_items_status ON budget_items(status);

-- ============================================
-- GUESTS TABLE
-- Track event guests for guest list artifacts
-- ============================================
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    side TEXT, -- groom, bride, family, friends, etc.
    group_name TEXT, -- Family Smith, College Friends, Work colleagues, etc.
    phone TEXT,
    email TEXT,
    address TEXT,
    rsvp_status TEXT DEFAULT 'pending', -- pending, confirmed, declined, maybe
    plus_one BOOLEAN DEFAULT FALSE,
    plus_one_name TEXT,
    dietary_restrictions TEXT,
    table_number INTEGER,
    notes TEXT,
    added_by UUID REFERENCES members(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for guest lookups
CREATE INDEX idx_guests_event_id ON guests(event_id);
CREATE INDEX idx_guests_side ON guests(side);
CREATE INDEX idx_guests_rsvp_status ON guests(rsvp_status);
CREATE INDEX idx_guests_group_name ON guests(group_name);

-- ============================================
-- TRIGGER: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artifacts_updated_at
    BEFORE UPDATE ON artifacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_items_updated_at
    BEFORE UPDATE ON budget_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- CLEANUP FUNCTION: Delete expired cache entries
-- ============================================
CREATE OR REPLACE FUNCTION cleanup_expired_search_cache()
RETURNS void AS $$
BEGIN
    DELETE FROM search_cache WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Enable RLS on new tables
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Service role can access everything (for Edge Functions)
CREATE POLICY "Service role full access on artifacts" ON artifacts
    FOR ALL USING (true);

CREATE POLICY "Service role full access on search_cache" ON search_cache
    FOR ALL USING (true);

CREATE POLICY "Service role full access on budget_items" ON budget_items
    FOR ALL USING (true);

CREATE POLICY "Service role full access on guests" ON guests
    FOR ALL USING (true);

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE artifacts IS 'Stores metadata about generated artifacts (PDF, Excel, charts, etc.)';
COMMENT ON TABLE search_cache IS 'Caches web search results to reduce API calls and costs';
COMMENT ON TABLE budget_items IS 'Tracks event budget items and expenses';
COMMENT ON TABLE guests IS 'Tracks event guests and RSVP status';
