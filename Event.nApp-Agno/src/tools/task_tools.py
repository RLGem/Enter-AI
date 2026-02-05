"""
Task Tools for Event.nApp-Agno
WITH DUPLICATE PREVENTION!
"""
from typing import Optional
from datetime import datetime
from agno.tools import tool
from src.database.client import get_client


@tool
def create_task(
    title: str,
    description: Optional[str] = None,
    due_date: Optional[str] = None,
    category: Optional[str] = None,
    priority: str = "medium",
    assigned_to_name: Optional[str] = None,
    assigned_side: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Create a new task for the event. Automatically prevents duplicates.

    Args:
        title: Task title (required)
        description: Task description
        due_date: Due date (flexible text format)
        category: Task category
        priority: Priority level (low/medium/high)
        assigned_to_name: Name of person to assign to
        assigned_side: Side to assign to (e.g., "groom", "bride")
        context: Agent context (auto-provided)

    Returns:
        dict with success status and task details
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {
            "success": False,
            "message": "אין אירוע פעיל. יש ליצור אירוע קודם.",
        }

    db = get_client()

    # DUPLICATE PREVENTION - check for similar open tasks
    existing = db.table("tasks") \
        .select("id, title, status") \
        .eq("event_id", event_id) \
        .eq("status", "open") \
        .ilike("title", f"%{title}%") \
        .execute()

    if existing.data:
        task = existing.data[0]
        return {
            "success": True,
            "already_exists": True,
            "task_id": task["id"],
            "title": task["title"],
            "message": f"משימה דומה כבר קיימת: '{task['title']}'",
        }

    # Find assigned member if name provided
    assigned_to = None
    if assigned_to_name:
        member_result = db.table("members") \
            .select("id") \
            .eq("event_id", event_id) \
            .ilike("name", f"%{assigned_to_name}%") \
            .execute()

        if member_result.data:
            assigned_to = member_result.data[0]["id"]

    # Create the task
    task_data = {
        "event_id": event_id,
        "title": title,
        "status": "open",
        "priority": priority,
    }

    if description:
        task_data["description"] = description
    if due_date:
        task_data["due_date"] = due_date
    if category:
        task_data["category"] = category
    if assigned_to:
        task_data["assigned_to"] = assigned_to
    if assigned_side:
        task_data["assigned_side"] = assigned_side
    if context.get("member_id"):
        task_data["created_by"] = context["member_id"]

    result = db.table("tasks").insert(task_data).execute()

    if result.data:
        task = result.data[0]
        return {
            "success": True,
            "task_id": task["id"],
            "title": task["title"],
            "message": f"נוספה משימה: '{title}'",
        }

    return {
        "success": False,
        "message": "שגיאה ביצירת המשימה",
    }


@tool
def list_tasks(
    status: Optional[str] = None,
    category: Optional[str] = None,
    assigned_to_name: Optional[str] = None,
    my_tasks: bool = False,
    context: dict = None,
) -> dict:
    """
    List tasks for the current event.

    Args:
        status: Filter by status (open/done)
        category: Filter by category
        assigned_to_name: Filter by assigned person name
        my_tasks: If True, show only tasks assigned to current user
        context: Agent context (auto-provided)

    Returns:
        dict with list of tasks
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {
            "success": False,
            "message": "אין אירוע פעיל",
            "tasks": [],
        }

    db = get_client()

    query = db.table("tasks") \
        .select("id, title, description, status, due_date, category, priority, assigned_side, assigned_to, members(name)") \
        .eq("event_id", event_id) \
        .order("created_at", desc=False)

    if status:
        query = query.eq("status", status)

    if category:
        query = query.ilike("category", f"%{category}%")

    if my_tasks and context.get("member_id"):
        query = query.eq("assigned_to", context["member_id"])

    if assigned_to_name:
        # Need to filter by member name - get member first
        member_result = db.table("members") \
            .select("id") \
            .eq("event_id", event_id) \
            .ilike("name", f"%{assigned_to_name}%") \
            .execute()

        if member_result.data:
            member_ids = [m["id"] for m in member_result.data]
            query = query.in_("assigned_to", member_ids)

    result = query.execute()

    tasks = []
    for t in (result.data or []):
        task_info = {
            "id": t["id"],
            "title": t["title"],
            "status": t["status"],
            "priority": t.get("priority", "medium"),
        }
        if t.get("due_date"):
            task_info["due_date"] = t["due_date"]
        if t.get("category"):
            task_info["category"] = t["category"]
        if t.get("members") and t["members"].get("name"):
            task_info["assigned_to"] = t["members"]["name"]
        if t.get("assigned_side"):
            task_info["assigned_side"] = t["assigned_side"]
        if t.get("description"):
            task_info["description"] = t["description"]

        tasks.append(task_info)

    return {
        "success": True,
        "count": len(tasks),
        "tasks": tasks,
    }


@tool
def update_task(
    task_id: Optional[str] = None,
    title_contains: Optional[str] = None,
    new_title: Optional[str] = None,
    description: Optional[str] = None,
    due_date: Optional[str] = None,
    category: Optional[str] = None,
    priority: Optional[str] = None,
    assigned_to_name: Optional[str] = None,
    assigned_side: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Update an existing task.

    Args:
        task_id: Task ID to update (or use title_contains)
        title_contains: Find task by title substring
        new_title: New title
        description: New description
        due_date: New due date
        category: New category
        priority: New priority
        assigned_to_name: Name of person to assign to
        assigned_side: Side to assign to
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find task
    if not task_id and title_contains:
        find_result = db.table("tasks") \
            .select("id, title") \
            .eq("event_id", event_id) \
            .ilike("title", f"%{title_contains}%") \
            .execute()

        if not find_result.data:
            return {"success": False, "message": f"לא נמצאה משימה עם '{title_contains}'"}

        task_id = find_result.data[0]["id"]

    if not task_id:
        return {"success": False, "message": "יש לספק task_id או title_contains"}

    # Build update data
    update_data = {}
    if new_title:
        update_data["title"] = new_title
    if description:
        update_data["description"] = description
    if due_date:
        update_data["due_date"] = due_date
    if category:
        update_data["category"] = category
    if priority:
        update_data["priority"] = priority
    if assigned_side:
        update_data["assigned_side"] = assigned_side

    if assigned_to_name:
        member_result = db.table("members") \
            .select("id") \
            .eq("event_id", event_id) \
            .ilike("name", f"%{assigned_to_name}%") \
            .execute()

        if member_result.data:
            update_data["assigned_to"] = member_result.data[0]["id"]

    if not update_data:
        return {"success": False, "message": "לא סופקו שדות לעדכון"}

    result = db.table("tasks") \
        .update(update_data) \
        .eq("id", task_id) \
        .execute()

    if result.data:
        return {
            "success": True,
            "task_id": task_id,
            "message": "המשימה עודכנה",
            "updated_fields": list(update_data.keys()),
        }

    return {"success": False, "message": "שגיאה בעדכון המשימה"}


@tool
def complete_task(
    task_id: Optional[str] = None,
    title_contains: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Mark a task as completed.

    Args:
        task_id: Task ID to complete (or use title_contains)
        title_contains: Find task by title substring
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find task
    if not task_id and title_contains:
        find_result = db.table("tasks") \
            .select("id, title, status") \
            .eq("event_id", event_id) \
            .eq("status", "open") \
            .ilike("title", f"%{title_contains}%") \
            .execute()

        if not find_result.data:
            return {"success": False, "message": f"לא נמצאה משימה פתוחה עם '{title_contains}'"}

        task = find_result.data[0]
        task_id = task["id"]
        task_title = task["title"]
    else:
        task_title = title_contains or "המשימה"

    if not task_id:
        return {"success": False, "message": "יש לספק task_id או title_contains"}

    result = db.table("tasks") \
        .update({
            "status": "done",
            "completed_at": datetime.utcnow().isoformat(),
        }) \
        .eq("id", task_id) \
        .execute()

    if result.data:
        return {
            "success": True,
            "task_id": task_id,
            "message": f"המשימה '{task_title}' הושלמה ✅",
        }

    return {"success": False, "message": "שגיאה בסימון המשימה כהושלמה"}


@tool
def delete_task(
    task_id: Optional[str] = None,
    title_contains: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Delete a task.

    Args:
        task_id: Task ID to delete (or use title_contains)
        title_contains: Find task by title substring
        context: Agent context (auto-provided)

    Returns:
        dict with success status
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Find task
    if not task_id and title_contains:
        find_result = db.table("tasks") \
            .select("id, title") \
            .eq("event_id", event_id) \
            .ilike("title", f"%{title_contains}%") \
            .execute()

        if not find_result.data:
            return {"success": False, "message": f"לא נמצאה משימה עם '{title_contains}'"}

        task = find_result.data[0]
        task_id = task["id"]
        task_title = task["title"]
    else:
        task_title = title_contains or "המשימה"

    if not task_id:
        return {"success": False, "message": "יש לספק task_id או title_contains"}

    result = db.table("tasks") \
        .delete() \
        .eq("id", task_id) \
        .execute()

    return {
        "success": True,
        "message": f"המשימה '{task_title}' נמחקה",
    }
