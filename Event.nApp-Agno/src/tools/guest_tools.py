"""
Guest Tools for Event.nApp-Agno
"""
from typing import Optional
from agno.tools import tool
from src.database.client import get_client


@tool
def add_guest(
    name: str,
    side: Optional[str] = None,
    group_name: Optional[str] = None,
    phone: Optional[str] = None,
    email: Optional[str] = None,
    rsvp_status: str = "pending",
    plus_one: bool = False,
    plus_one_name: Optional[str] = None,
    dietary_restrictions: Optional[str] = None,
    table_number: Optional[int] = None,
    notes: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Add a guest to the event.

    Args:
        name: Guest name (required)
        side: Which side (groom/bride/family/friends)
        group_name: Group name (e.g., "משפחת כהן", "חברים מהעבודה")
        phone: Phone number
        email: Email address
        rsvp_status: RSVP status (pending/confirmed/declined/maybe)
        plus_one: Whether guest has plus one
        plus_one_name: Name of plus one
        dietary_restrictions: Dietary restrictions
        table_number: Table assignment
        notes: Additional notes
        context: Agent context (auto-provided)

    Returns:
        dict with success status and guest details
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Check for duplicate
    existing = db.table("guests") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{name}%") \
        .execute()

    if existing.data:
        guest = existing.data[0]
        return {
            "success": True,
            "already_exists": True,
            "guest_id": guest["id"],
            "name": guest["name"],
            "message": f"האורח '{guest['name']}' כבר ברשימה",
        }

    # Create guest
    guest_data = {
        "event_id": event_id,
        "name": name,
        "rsvp_status": rsvp_status,
        "plus_one": plus_one,
    }

    if side:
        guest_data["side"] = side
    if group_name:
        guest_data["group_name"] = group_name
    if phone:
        guest_data["phone"] = phone
    if email:
        guest_data["email"] = email
    if plus_one_name:
        guest_data["plus_one_name"] = plus_one_name
    if dietary_restrictions:
        guest_data["dietary_restrictions"] = dietary_restrictions
    if table_number is not None:
        guest_data["table_number"] = table_number
    if notes:
        guest_data["notes"] = notes
    if context.get("member_id"):
        guest_data["added_by"] = context["member_id"]

    result = db.table("guests").insert(guest_data).execute()

    if result.data:
        guest = result.data[0]
        return {
            "success": True,
            "guest_id": guest["id"],
            "name": guest["name"],
            "message": f"נוסף אורח: {name}",
        }

    return {"success": False, "message": "שגיאה בהוספת אורח"}


@tool
def add_guests_bulk(
    names: list[str],
    side: Optional[str] = None,
    group_name: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Add multiple guests at once.

    Args:
        names: List of guest names
        side: Which side for all guests
        group_name: Group name for all guests
        context: Agent context (auto-provided)

    Returns:
        dict with success status and count
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    added = 0
    skipped = 0

    for name in names:
        name = name.strip()
        if not name:
            continue

        # Check for duplicate
        existing = db.table("guests") \
            .select("id") \
            .eq("event_id", event_id) \
            .ilike("name", f"%{name}%") \
            .execute()

        if existing.data:
            skipped += 1
            continue

        # Create guest
        guest_data = {
            "event_id": event_id,
            "name": name,
            "rsvp_status": "pending",
        }
        if side:
            guest_data["side"] = side
        if group_name:
            guest_data["group_name"] = group_name
        if context.get("member_id"):
            guest_data["added_by"] = context["member_id"]

        db.table("guests").insert(guest_data).execute()
        added += 1

    return {
        "success": True,
        "added": added,
        "skipped": skipped,
        "message": f"נוספו {added} אורחים" + (f" ({skipped} כבר היו ברשימה)" if skipped else ""),
    }


@tool
def list_guests(
    side: Optional[str] = None,
    group_name: Optional[str] = None,
    rsvp_status: Optional[str] = None,
    table_number: Optional[int] = None,
    context: dict = None,
) -> dict:
    """
    List guests with optional filters.

    Args:
        side: Filter by side
        group_name: Filter by group
        rsvp_status: Filter by RSVP status
        table_number: Filter by table number
        context: Agent context (auto-provided)

    Returns:
        dict with guest list and stats
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל", "guests": []}

    db = get_client()

    query = db.table("guests") \
        .select("id, name, side, group_name, rsvp_status, plus_one, plus_one_name, dietary_restrictions, table_number") \
        .eq("event_id", event_id) \
        .order("name")

    if side:
        query = query.ilike("side", f"%{side}%")
    if group_name:
        query = query.ilike("group_name", f"%{group_name}%")
    if rsvp_status:
        query = query.eq("rsvp_status", rsvp_status)
    if table_number is not None:
        query = query.eq("table_number", table_number)

    result = query.execute()

    guests = []
    stats = {
        "total": 0,
        "confirmed": 0,
        "declined": 0,
        "pending": 0,
        "maybe": 0,
        "with_plus_one": 0,
        "total_attending": 0,
    }

    for g in (result.data or []):
        guest_info = {
            "id": g["id"],
            "name": g["name"],
            "rsvp_status": g["rsvp_status"],
        }
        if g.get("side"):
            guest_info["side"] = g["side"]
        if g.get("group_name"):
            guest_info["group_name"] = g["group_name"]
        if g.get("plus_one"):
            guest_info["plus_one"] = True
            if g.get("plus_one_name"):
                guest_info["plus_one_name"] = g["plus_one_name"]
            stats["with_plus_one"] += 1
        if g.get("dietary_restrictions"):
            guest_info["dietary_restrictions"] = g["dietary_restrictions"]
        if g.get("table_number") is not None:
            guest_info["table_number"] = g["table_number"]

        guests.append(guest_info)

        # Stats
        stats["total"] += 1
        status = g["rsvp_status"]
        if status == "confirmed":
            stats["confirmed"] += 1
            stats["total_attending"] += 1
            if g.get("plus_one"):
                stats["total_attending"] += 1
        elif status == "declined":
            stats["declined"] += 1
        elif status == "maybe":
            stats["maybe"] += 1
        else:
            stats["pending"] += 1

    return {
        "success": True,
        "count": len(guests),
        "guests": guests,
        "stats": stats,
    }


@tool
def update_guest(
    guest_name: str,
    new_name: Optional[str] = None,
    side: Optional[str] = None,
    group_name: Optional[str] = None,
    phone: Optional[str] = None,
    email: Optional[str] = None,
    rsvp_status: Optional[str] = None,
    plus_one: Optional[bool] = None,
    plus_one_name: Optional[str] = None,
    dietary_restrictions: Optional[str] = None,
    table_number: Optional[int] = None,
    notes: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Update a guest's details.

    Args:
        guest_name: Name of guest to update
        new_name: New name
        side: New side
        group_name: New group
        phone: New phone
        email: New email
        rsvp_status: New RSVP status
        plus_one: Has plus one
        plus_one_name: Plus one name
        dietary_restrictions: Dietary restrictions
        table_number: Table number
        notes: Notes
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find guest
    find_result = db.table("guests") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{guest_name}%") \
        .execute()

    if not find_result.data:
        return {"success": False, "message": f"לא נמצא אורח עם השם '{guest_name}'"}

    guest_id = find_result.data[0]["id"]

    # Build update
    update_data = {}
    if new_name:
        update_data["name"] = new_name
    if side:
        update_data["side"] = side
    if group_name:
        update_data["group_name"] = group_name
    if phone:
        update_data["phone"] = phone
    if email:
        update_data["email"] = email
    if rsvp_status:
        update_data["rsvp_status"] = rsvp_status
    if plus_one is not None:
        update_data["plus_one"] = plus_one
    if plus_one_name:
        update_data["plus_one_name"] = plus_one_name
    if dietary_restrictions:
        update_data["dietary_restrictions"] = dietary_restrictions
    if table_number is not None:
        update_data["table_number"] = table_number
    if notes:
        update_data["notes"] = notes

    if not update_data:
        return {"success": False, "message": "לא סופקו שדות לעדכון"}

    result = db.table("guests") \
        .update(update_data) \
        .eq("id", guest_id) \
        .execute()

    if result.data:
        return {
            "success": True,
            "guest_id": guest_id,
            "message": "פרטי האורח עודכנו",
        }

    return {"success": False, "message": "שגיאה בעדכון האורח"}


@tool
def delete_guest(
    guest_name: str,
    context: dict = None,
) -> dict:
    """
    Remove a guest from the list.

    Args:
        guest_name: Name of guest to remove
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find guest
    find_result = db.table("guests") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{guest_name}%") \
        .execute()

    if not find_result.data:
        return {"success": False, "message": f"לא נמצא אורח עם השם '{guest_name}'"}

    guest = find_result.data[0]

    db.table("guests").delete().eq("id", guest["id"]).execute()

    return {
        "success": True,
        "message": f"האורח '{guest['name']}' הוסר מהרשימה",
    }
