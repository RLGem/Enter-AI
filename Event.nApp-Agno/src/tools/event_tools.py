"""
Event Tools for Event.nApp-Agno
"""
from typing import Optional
from agno.tools import tool
from src.database.client import get_client


@tool
def create_event(
    name: str,
    event_type: Optional[str] = None,
    event_date: Optional[str] = None,
    description: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Create a new event.

    Args:
        name: Event name (e.g., "החתונה של רפי ורחל")
        event_type: Event type (e.g., "wedding", "bar_mitzvah", "birthday")
        event_date: Event date as text (flexible format)
        description: Event description
        context: Agent context (auto-provided)

    Returns:
        dict with success status and event details
    """
    context = context or {}
    db = get_client()

    # Check if user already has an active event
    user_id = context.get("user_id")
    if user_id:
        existing = db.table("members") \
            .select("event_id, events(id, name, status)") \
            .eq("user_id", user_id) \
            .execute()

        active_events = [
            m for m in existing.data
            if m.get("events", {}).get("status") == "active"
        ] if existing.data else []

        if active_events:
            event = active_events[0]["events"]
            return {
                "success": True,
                "already_exists": True,
                "event_id": event["id"],
                "event_name": event["name"],
                "message": f"כבר יש לך אירוע פעיל: {event['name']}",
            }

    # Create new event
    event_data = {
        "name": name,
        "status": "active",
    }
    if event_type:
        event_data["event_type"] = event_type
    if event_date:
        event_data["event_date"] = event_date
    if description:
        event_data["description"] = description

    result = db.table("events").insert(event_data).execute()

    if result.data:
        event = result.data[0]

        # Auto-add current user as admin member if we have user info
        if user_id:
            member_data = {
                "event_id": event["id"],
                "user_id": user_id,
                "name": context.get("user_name", "User"),
                "is_admin": True,
            }
            db.table("members").insert(member_data).execute()

        return {
            "success": True,
            "event_id": event["id"],
            "event_name": event["name"],
            "message": f"נוצר אירוע: {name}",
        }

    return {
        "success": False,
        "message": "שגיאה ביצירת האירוע",
    }


@tool
def get_event_summary(context: dict = None) -> dict:
    """
    Get summary of the current event.

    Args:
        context: Agent context with event_id (auto-provided)

    Returns:
        dict with event summary including tasks, members, budget, guests counts
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {
            "success": False,
            "message": "אין אירוע פעיל. ספר לי על האירוע שאתה מתכנן.",
        }

    db = get_client()

    # Get event details
    event_result = db.table("events") \
        .select("*") \
        .eq("id", event_id) \
        .single() \
        .execute()

    if not event_result.data:
        return {
            "success": False,
            "message": "האירוע לא נמצא",
        }

    event = event_result.data

    # Get counts
    tasks_result = db.table("tasks") \
        .select("id, status") \
        .eq("event_id", event_id) \
        .execute()

    members_result = db.table("members") \
        .select("id") \
        .eq("event_id", event_id) \
        .execute()

    budget_result = db.table("budget_items") \
        .select("estimated_cost, actual_cost") \
        .eq("event_id", event_id) \
        .execute()

    guests_result = db.table("guests") \
        .select("id, rsvp_status") \
        .eq("event_id", event_id) \
        .execute()

    # Calculate stats
    tasks = tasks_result.data or []
    open_tasks = len([t for t in tasks if t["status"] == "open"])
    done_tasks = len([t for t in tasks if t["status"] == "done"])

    members = members_result.data or []
    member_count = len(members)

    budget_items = budget_result.data or []
    total_estimated = sum(b.get("estimated_cost") or 0 for b in budget_items)
    total_actual = sum(b.get("actual_cost") or 0 for b in budget_items)

    guests = guests_result.data or []
    guest_count = len(guests)
    confirmed_guests = len([g for g in guests if g["rsvp_status"] == "confirmed"])

    return {
        "success": True,
        "event": {
            "name": event.get("name"),
            "date": event.get("event_date"),
            "type": event.get("event_type"),
            "status": event.get("status"),
        },
        "tasks": {
            "total": len(tasks),
            "open": open_tasks,
            "done": done_tasks,
        },
        "members": {
            "count": member_count,
        },
        "budget": {
            "estimated_total": total_estimated,
            "actual_total": total_actual,
            "items_count": len(budget_items),
        },
        "guests": {
            "total": guest_count,
            "confirmed": confirmed_guests,
        },
    }


@tool
def update_event(
    event_date: Optional[str] = None,
    description: Optional[str] = None,
    name: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Update current event details.

    Args:
        event_date: New event date
        description: New description
        name: New event name
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {
            "success": False,
            "message": "אין אירוע פעיל",
        }

    db = get_client()

    update_data = {}
    if event_date:
        update_data["event_date"] = event_date
    if description:
        update_data["description"] = description
    if name:
        update_data["name"] = name

    if not update_data:
        return {
            "success": False,
            "message": "לא סופקו שדות לעדכון",
        }

    result = db.table("events") \
        .update(update_data) \
        .eq("id", event_id) \
        .execute()

    if result.data:
        return {
            "success": True,
            "message": "האירוע עודכן",
            "updated_fields": list(update_data.keys()),
        }

    return {
        "success": False,
        "message": "שגיאה בעדכון האירוע",
    }
