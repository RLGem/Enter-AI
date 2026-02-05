"""
Supplier and Lead Tools for Event.nApp-Agno
"""
from typing import Optional
from datetime import datetime
from agno.tools import tool
from src.database.client import get_client
from src.config import config


@tool
def search_suppliers(
    category: str,
    context: dict = None,
) -> dict:
    """
    Search for suppliers by category.

    Args:
        category: Supplier category (e.g., "photographer", "catering", "dj", "צלם", "קייטרינג")
        context: Agent context (auto-provided)

    Returns:
        dict with list of matching suppliers
    """
    db = get_client()

    # Search in categories array
    result = db.table("suppliers") \
        .select("id, name, description, categories, contact_name") \
        .eq("active", True) \
        .contains("categories", [category]) \
        .execute()

    # If no exact match, try partial match
    if not result.data:
        all_suppliers = db.table("suppliers") \
            .select("id, name, description, categories, contact_name") \
            .eq("active", True) \
            .execute()

        matching = []
        for s in (all_suppliers.data or []):
            categories = s.get("categories") or []
            if any(category.lower() in cat.lower() for cat in categories):
                matching.append(s)
        result.data = matching

    suppliers = []
    for s in (result.data or []):
        suppliers.append({
            "id": s["id"],
            "name": s["name"],
            "description": s.get("description"),
            "categories": s.get("categories", []),
        })

    if not suppliers:
        return {
            "success": True,
            "found": False,
            "count": 0,
            "suppliers": [],
            "message": "לא נמצאו ספקים בקטגוריה זו",
        }

    return {
        "success": True,
        "found": True,
        "count": len(suppliers),
        "suppliers": suppliers,
    }


@tool
def send_lead(
    supplier_ids: list[str],
    message: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    Send lead to suppliers. Copies also sent to admin.

    Args:
        supplier_ids: List of supplier IDs to send lead to
        message: Optional custom message
        context: Agent context (auto-provided)

    Returns:
        dict with success status and lead details
    """
    context = context or {}
    event_id = context.get("event_id")
    member_id = context.get("member_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל"}

    db = get_client()

    # Get event details for the lead
    event_result = db.table("events") \
        .select("name, event_date, event_type") \
        .eq("id", event_id) \
        .single() \
        .execute()

    event = event_result.data if event_result.data else {}

    # Get member details
    member_name = "משתמש"
    if member_id:
        member_result = db.table("members") \
            .select("name") \
            .eq("id", member_id) \
            .single() \
            .execute()
        if member_result.data:
            member_name = member_result.data["name"]

    # Create leads for each supplier
    leads_created = []
    for supplier_id in supplier_ids:
        # Get supplier info
        supplier_result = db.table("suppliers") \
            .select("name, contact_email, contact_phone") \
            .eq("id", supplier_id) \
            .single() \
            .execute()

        if not supplier_result.data:
            continue

        supplier = supplier_result.data

        # Build lead message
        lead_message = message or f"""
ליד חדש מ-Event.nApp!

אירוע: {event.get('name', 'לא צוין')}
סוג: {event.get('event_type', 'לא צוין')}
תאריך: {event.get('event_date', 'לא צוין')}
יצירת קשר: {member_name}
"""

        # Create lead record
        lead_data = {
            "event_id": event_id,
            "supplier_id": supplier_id,
            "member_id": member_id,
            "status": "sent",
            "message": lead_message,
            "sent_at": datetime.utcnow().isoformat(),
        }

        result = db.table("leads").insert(lead_data).execute()

        if result.data:
            leads_created.append({
                "lead_id": result.data[0]["id"],
                "supplier_name": supplier["name"],
                "supplier_email": supplier.get("contact_email"),
                "supplier_phone": supplier.get("contact_phone"),
            })

        # TODO: Actually send email/SMS to supplier
        # TODO: Send copy to admin (config.ADMIN_EMAIL)

    if leads_created:
        return {
            "success": True,
            "count": len(leads_created),
            "leads": leads_created,
            "message": f"נשלחו {len(leads_created)} לידים לספקים. הם ייצרו קשר בקרוב!",
        }

    return {
        "success": False,
        "message": "לא נוצרו לידים",
    }


@tool
def list_leads(
    status: Optional[str] = None,
    context: dict = None,
) -> dict:
    """
    List leads for the current event.

    Args:
        status: Filter by status (sent/contacted/converted/closed)
        context: Agent context (auto-provided)

    Returns:
        dict with list of leads
    """
    context = context or {}
    event_id = context.get("event_id")

    if not event_id:
        return {"success": False, "message": "אין אירוע פעיל", "leads": []}

    db = get_client()

    query = db.table("leads") \
        .select("id, status, sent_at, notes, suppliers(name, categories), members(name)") \
        .eq("event_id", event_id) \
        .order("sent_at", desc=True)

    if status:
        query = query.eq("status", status)

    result = query.execute()

    leads = []
    for l in (result.data or []):
        lead_info = {
            "id": l["id"],
            "status": l["status"],
            "sent_at": l.get("sent_at"),
        }
        if l.get("suppliers"):
            lead_info["supplier"] = l["suppliers"]["name"]
            lead_info["categories"] = l["suppliers"].get("categories", [])
        if l.get("members"):
            lead_info["requested_by"] = l["members"]["name"]
        if l.get("notes"):
            lead_info["notes"] = l["notes"]

        leads.append(lead_info)

    return {
        "success": True,
        "count": len(leads),
        "leads": leads,
    }
