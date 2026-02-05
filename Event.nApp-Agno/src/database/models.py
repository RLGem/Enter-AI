"""
Pydantic Models for Event.nApp-Agno
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


# ============================================
# EVENT MODELS
# ============================================

class EventCreate(BaseModel):
    name: str
    description: Optional[str] = None
    event_date: Optional[str] = None
    event_type: Optional[str] = None
    status: str = "active"


class Event(EventCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime


# ============================================
# USER MODELS
# ============================================

class UserCreate(BaseModel):
    telegram_id: int
    telegram_chat_id: Optional[int] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    first_name: Optional[str] = None


class User(UserCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime


# ============================================
# MEMBER MODELS
# ============================================

class MemberCreate(BaseModel):
    event_id: UUID
    user_id: Optional[UUID] = None
    name: str
    role: Optional[str] = None
    side: Optional[str] = None
    is_admin: bool = False


class Member(MemberCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime


# ============================================
# TASK MODELS
# ============================================

class TaskCreate(BaseModel):
    event_id: UUID
    title: str
    description: Optional[str] = None
    status: str = "open"
    due_date: Optional[str] = None
    category: Optional[str] = None
    assigned_to: Optional[UUID] = None
    assigned_side: Optional[str] = None
    priority: str = "medium"
    created_by: Optional[UUID] = None


class Task(TaskCreate):
    id: UUID
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[str] = None
    category: Optional[str] = None
    assigned_to: Optional[UUID] = None
    assigned_side: Optional[str] = None
    priority: Optional[str] = None


# ============================================
# SUPPLIER MODELS
# ============================================

class SupplierCreate(BaseModel):
    name: str
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    description: Optional[str] = None
    categories: list[str] = Field(default_factory=list)
    active: bool = True


class Supplier(SupplierCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime


# ============================================
# LEAD MODELS
# ============================================

class LeadCreate(BaseModel):
    event_id: UUID
    supplier_id: UUID
    member_id: Optional[UUID] = None
    status: str = "sent"
    message: Optional[str] = None


class Lead(LeadCreate):
    id: UUID
    sent_at: datetime
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime


# ============================================
# BUDGET ITEM MODELS
# ============================================

class BudgetItemCreate(BaseModel):
    event_id: UUID
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    estimated_cost: Optional[float] = None
    actual_cost: Optional[float] = None
    status: str = "pending"
    supplier_id: Optional[UUID] = None
    notes: Optional[str] = None
    due_date: Optional[str] = None
    paid_date: Optional[str] = None
    created_by: Optional[UUID] = None


class BudgetItem(BudgetItemCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime


class BudgetItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    estimated_cost: Optional[float] = None
    actual_cost: Optional[float] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    due_date: Optional[str] = None
    paid_date: Optional[str] = None


# ============================================
# GUEST MODELS
# ============================================

class GuestCreate(BaseModel):
    event_id: UUID
    name: str
    side: Optional[str] = None
    group_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    rsvp_status: str = "pending"
    plus_one: bool = False
    plus_one_name: Optional[str] = None
    dietary_restrictions: Optional[str] = None
    table_number: Optional[int] = None
    notes: Optional[str] = None
    added_by: Optional[UUID] = None


class Guest(GuestCreate):
    id: UUID
    created_at: datetime
    updated_at: datetime


class GuestUpdate(BaseModel):
    name: Optional[str] = None
    side: Optional[str] = None
    group_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    rsvp_status: Optional[str] = None
    plus_one: Optional[bool] = None
    plus_one_name: Optional[str] = None
    dietary_restrictions: Optional[str] = None
    table_number: Optional[int] = None
    notes: Optional[str] = None


# ============================================
# CHAT HISTORY MODELS
# ============================================

class ChatMessageCreate(BaseModel):
    event_id: Optional[UUID] = None
    user_id: UUID
    role: str  # "user" or "assistant"
    content: str
    tool_calls: Optional[dict] = None


class ChatMessage(ChatMessageCreate):
    id: UUID
    created_at: datetime


# ============================================
# CONTEXT MODEL (for agent)
# ============================================

class AgentContext(BaseModel):
    """Context passed to agent tools."""
    user_id: Optional[str] = None
    member_id: Optional[str] = None
    event_id: Optional[str] = None
    telegram_id: Optional[int] = None
    telegram_chat_id: Optional[int] = None
    user_name: Optional[str] = None
