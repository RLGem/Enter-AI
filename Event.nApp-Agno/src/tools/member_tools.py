"""
Member Tools for Event.nApp-Agno
"""
from typing import Optional
from agno.tools import tool
from src.database.client import get_client


@tool
def add_member(
    name: str,
    role: Optional[str] = None,
    side: Optional[str] = None,
    is_current_user: bool = False,
    context: dict = None,
) -> dict:
    """
    Add a member to the event.

    Args:
        name: Member name (required)
        role: Member role (e.g., "אבא של החתן", "אחות הכלה")
        side: Which side (e.g., "groom", "bride", "חתן", "כלה")
        is_current_user: If True, links to current user
        context: Agent context (auto-provided)

    Returns:
        dict with success status and member details
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {
            "success": False,
            "message": "אין אירוע פעיל. יש ליצור אירוע קודם.",
        }

    db = get_client()

    # Check for existing member with same name
    existing = db.table("members") \
        .select("id, name, role, side") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{name}%") \
        .execute()

    if existing.data:
        member = existing.data[0]
        return {
            "success": True,
            "already_exists": True,
            "member_id": member["id"],
            "name": member["name"],
            "message": f"המשתתף '{member['name']}' כבר קיים",
        }

    # Create member
    member_data = {
        "event_id": event_id,
        "name": name,
    }

    if role:
        member_data["role"] = role
    if side:
        member_data["side"] = side
    if is_current_user and context.get("user_id"):
        member_data["user_id"] = context["user_id"]
        member_data["is_admin"] = True  # Current user is admin

    result = db.table("members").insert(member_data).execute()

    if result.data:
        member = result.data[0]
        return {
            "success": True,
            "member_id": member["id"],
            "name": member["name"],
            "role": member.get("role"),
            "side": member.get("side"),
            "message": f"נוסף משתתף: {name}",
        }

    return {
        "success": False,
        "message": "שגיאה בהוספת המשתתף",
    }


@tool
def list_members(
    side: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    List members of the current event.

    Args:
        side: Filter by side (e.g., "groom", "bride")
        context: Agent context (auto-provided)

    Returns:
        dict with list of members
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {
            "success": False,
            "message": "אין אירוע פעיל",
            "members": [],
        }

    db = get_client()

    query = db.table("members") \
        .select("id, name, role, side, is_admin") \
        .eq("event_id", event_id) \
        .order("created_at")

    if side:
        query = query.ilike("side", f"%{side}%")

    result = query.execute()

    members = []
    for m in (result.data or []):
        member_info = {
            "id": m["id"],
            "name": m["name"],
        }
        if m.get("role"):
            member_info["role"] = m["role"]
        if m.get("side"):
            member_info["side"] = m["side"]
        if m.get("is_admin"):
            member_info["is_admin"] = True

        members.append(member_info)

    return {
        "success": True,
        "count": len(members),
        "members": members,
    }


@tool
def update_member(
    member_name: str,
    new_name: Optional[str] = None,
    role: Optional[str] = None,
    side: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Update a member's details.

    Args:
        member_name: Name of member to update
        new_name: New name
        role: New role
        side: New side
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find member
    find_result = db.table("members") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{member_name}%") \
        .execute()

    if not find_result.data:
        return {"success": False, "message": f"לא נמצא משתתף עם השם '{member_name}'"}

    member_id = find_result.data[0]["id"]

    # Build update data
    update_data = {}
    if new_name:
        update_data["name"] = new_name
    if role:
        update_data["role"] = role
    if side:
        update_data["side"] = side

    if not update_data:
        return {"success": False, "message": "לא סופקו שדות לעדכון"}

    result = db.table("members") \
        .update(update_data) \
        .eq("id", member_id) \
        .execute()

    if result.data:
        return {
            "success": True,
            "member_id": member_id,
            "message": "פרטי המשתתף עודכנו",
        }

    return {"success": False, "message": "שגיאה בעדכון המשתתף"}
