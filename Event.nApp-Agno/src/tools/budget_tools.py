"""
Budget Tools for Event.nApp-Agno
"""
from typing import Optional
from agno.tools import tool
from src.database.client import get_client


@tool
def add_budget_item(
    name: str,
    category: Optional[str] = None,
    estimated_cost: Optional[float] = None,
    actual_cost: Optional[float] = None,
    description: Optional[str] = None,
    status: str = "pending",
    due_date: Optional[str] = None,
    notes: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Add a budget item to the event.

    Args:
        name: Item name (required)
        category: Category (e.g., "venue", "catering", "photography")
        estimated_cost: Estimated cost in NIS
        actual_cost: Actual cost if known
        description: Description
        status: Status (pending/confirmed/paid)
        due_date: Payment due date
        notes: Additional notes
        context: Agent context (auto-provided)

    Returns:
        dict with success status and item details
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Check for duplicate
    existing = db.table("budget_items") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{name}%") \
        .execute()

    if existing.data:
        item = existing.data[0]
        return {
            "success": True,
            "already_exists": True,
            "item_id": item["id"],
            "name": item["name"],
            "message": f"פריט תקציב דומה כבר קיים: '{item['name']}'",
        }

    # Create item
    item_data = {
        "event_id": event_id,
        "name": name,
        "status": status,
    }

    if category:
        item_data["category"] = category
    if estimated_cost is not None:
        item_data["estimated_cost"] = estimated_cost
    if actual_cost is not None:
        item_data["actual_cost"] = actual_cost
    if description:
        item_data["description"] = description
    if due_date:
        item_data["due_date"] = due_date
    if notes:
        item_data["notes"] = notes
    if context.get("member_id"):
        item_data["created_by"] = context["member_id"]

    result = db.table("budget_items").insert(item_data).execute()

    if result.data:
        item = result.data[0]
        return {
            "success": True,
            "item_id": item["id"],
            "name": item["name"],
            "estimated_cost": item.get("estimated_cost"),
            "message": f"נוסף פריט תקציב: '{name}'",
        }

    return {"success": False, "message": "שגיאה בהוספת פריט תקציב"}


@tool
def list_budget(
    category: Optional[str] = None,
    status: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    List budget items and show totals.

    Args:
        category: Filter by category
        status: Filter by status (pending/confirmed/paid)
        context: Agent context (auto-provided)

    Returns:
        dict with budget items and totals
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל", "items": []}

    db = get_client()

    query = db.table("budget_items") \
        .select("id, name, category, estimated_cost, actual_cost, status, due_date, notes") \
        .eq("event_id", event_id) \
        .order("category", nullsfirst=True)

    if category:
        query = query.ilike("category", f"%{category}%")
    if status:
        query = query.eq("status", status)

    result = query.execute()

    items = []
    total_estimated = 0
    total_actual = 0

    for b in (result.data or []):
        item_info = {
            "id": b["id"],
            "name": b["name"],
            "status": b["status"],
        }
        if b.get("category"):
            item_info["category"] = b["category"]
        if b.get("estimated_cost"):
            item_info["estimated_cost"] = b["estimated_cost"]
            total_estimated += b["estimated_cost"]
        if b.get("actual_cost"):
            item_info["actual_cost"] = b["actual_cost"]
            total_actual += b["actual_cost"]
        if b.get("due_date"):
            item_info["due_date"] = b["due_date"]

        items.append(item_info)

    return {
        "success": True,
        "count": len(items),
        "items": items,
        "totals": {
            "estimated": total_estimated,
            "actual": total_actual,
            "difference": total_estimated - total_actual,
        },
    }


@tool
def update_budget_item(
    item_name: str,
    new_name: Optional[str] = None,
    category: Optional[str] = None,
    estimated_cost: Optional[float] = None,
    actual_cost: Optional[float] = None,
    status: Optional[str] = None,
    due_date: Optional[str] = None,
    paid_date: Optional[str] = None,
    notes: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Update a budget item.

    Args:
        item_name: Name of item to update
        new_name: New name
        category: New category
        estimated_cost: New estimated cost
        actual_cost: New actual cost
        status: New status (pending/confirmed/paid)
        due_date: New due date
        paid_date: Date paid
        notes: New notes
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find item
    find_result = db.table("budget_items") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{item_name}%") \
        .execute()

    if not find_result.data:
        return {"success": False, "message": f"לא נמצא פריט תקציב עם '{item_name}'"}

    item_id = find_result.data[0]["id"]

    # Build update
    update_data = {}
    if new_name:
        update_data["name"] = new_name
    if category:
        update_data["category"] = category
    if estimated_cost is not None:
        update_data["estimated_cost"] = estimated_cost
    if actual_cost is not None:
        update_data["actual_cost"] = actual_cost
    if status:
        update_data["status"] = status
    if due_date:
        update_data["due_date"] = due_date
    if paid_date:
        update_data["paid_date"] = paid_date
    if notes:
        update_data["notes"] = notes

    if not update_data:
        return {"success": False, "message": "לא סופקו שדות לעדכון"}

    result = db.table("budget_items") \
        .update(update_data) \
        .eq("id", item_id) \
        .execute()

    if result.data:
        return {
            "success": True,
            "item_id": item_id,
            "message": "פריט התקציב עודכן",
        }

    return {"success": False, "message": "שגיאה בעדכון פריט התקציב"}


@tool
def delete_budget_item(
    item_name: str,
    context: dict = None,
) -> dict:
    """
    Delete a budget item.

    Args:
        item_name: Name of item to delete
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find item
    find_result = db.table("budget_items") \
        .select("id, name") \
        .eq("event_id", event_id) \
        .ilike("name", f"%{item_name}%") \
        .execute()

    if not find_result.data:
        return {"success": False, "message": f"לא נמצא פריט תקציב עם '{item_name}'"}

    item = find_result.data[0]

    db.table("budget_items").delete().eq("id", item["id"]).execute()

    return {
        "success": True,
        "message": f"פריט התקציב '{item['name']}' נמחק",
    }
