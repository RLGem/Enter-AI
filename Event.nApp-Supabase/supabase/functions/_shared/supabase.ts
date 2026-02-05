// Supabase Client for Edge Functions
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definitions matching our schema
export interface Event {
  id: string;
  name: string;
  description?: string;
  event_date?: string;
  event_type?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  telegram_id: number;
  telegram_chat_id?: number;
  phone?: string;
  email?: string;
  first_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  event_id: string;
  user_id?: string;
  name: string;
  role?: string;
  side?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  event_id: string;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  category?: string;
  assigned_to?: string;
  assigned_side?: string;
  priority: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  description?: string;
  categories?: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  event_id: string;
  supplier_id: string;
  member_id?: string;
  status: string;
  message?: string;
  sent_at: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  event_id?: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  tool_calls?: unknown;
  created_at: string;
}

export interface BudgetItem {
  id: string;
  event_id: string;
  category?: string;
  name: string;
  description?: string;
  estimated_cost?: number;
  actual_cost?: number;
  status: string;
  supplier_id?: string;
  notes?: string;
  due_date?: string;
  paid_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  event_id: string;
  name: string;
  side?: string;
  group_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  rsvp_status: string;
  plus_one: boolean;
  plus_one_name?: string;
  dietary_restrictions?: string;
  table_number?: number;
  notes?: string;
  added_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Artifact {
  id: string;
  event_id?: string;
  user_id?: string;
  format: string;
  artifact_type?: string;
  title?: string;
  description?: string;
  telegram_file_id?: string;
  content_hash?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface SearchCache {
  id: string;
  query_hash: string;
  query_text: string;
  search_type?: string;
  results: unknown;
  result_count: number;
  created_at: string;
  expires_at: string;
}
