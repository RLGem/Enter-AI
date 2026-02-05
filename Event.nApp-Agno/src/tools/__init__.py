"""
Event.nApp-Agno Tools
All tools for the AI agent.
"""
from src.tools.event_tools import create_event, get_event_summary, update_event
from src.tools.task_tools import create_task, list_tasks, update_task, complete_task, delete_task
from src.tools.member_tools import add_member, list_members, update_member
from src.tools.supplier_tools import search_suppliers, send_lead, list_leads
from src.tools.budget_tools import add_budget_item, list_budget, update_budget_item, delete_budget_item
from src.tools.guest_tools import add_guest, add_guests_bulk, list_guests, update_guest, delete_guest


def get_all_tools() -> list:
    """Return all tools for the agent."""
    return [
        # Event tools
        create_event,
        get_event_summary,
        update_event,
        # Task tools (with duplicate prevention!)
        create_task,
        list_tasks,
        update_task,
        complete_task,
        delete_task,
        # Member tools
        add_member,
        list_members,
        update_member,
        # Supplier tools
        search_suppliers,
        send_lead,
        list_leads,
        # Budget tools
        add_budget_item,
        list_budget,
        update_budget_item,
        delete_budget_item,
        # Guest tools
        add_guest,
        add_guests_bulk,
        list_guests,
        update_guest,
        delete_guest,
    ]


__all__ = [
    "get_all_tools",
    # Event
    "create_event",
    "get_event_summary",
    "update_event",
    # Tasks
    "create_task",
    "list_tasks",
    "update_task",
    "complete_task",
    "delete_task",
    # Members
    "add_member",
    "list_members",
    "update_member",
    # Suppliers
    "search_suppliers",
    "send_lead",
    "list_leads",
    # Budget
    "add_budget_item",
    "list_budget",
    "update_budget_item",
    "delete_budget_item",
    # Guests
    "add_guest",
    "add_guests_bulk",
    "list_guests",
    "update_guest",
    "delete_guest",
]
