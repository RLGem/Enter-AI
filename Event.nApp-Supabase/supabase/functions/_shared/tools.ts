// Claude Tools - Definitions and Implementations
import { supabase, Task, Member, Supplier, Event, BudgetItem, Guest, Artifact } from "./supabase.ts";
import {
  generateArtifact,
  ArtifactFormat,
  ArtifactContent,
  buildTaskListContent,
  buildBudgetContent,
  buildGuestListContent,
  buildComparisonChart,
  ChartData,
} from "./artifacts.ts";
import {
  searchWeb,
  searchReviews,
  searchPrices,
  searchRecommendations,
  formatSearchResultsForChat,
  extractStructuredData,
  SearchType,
} from "./search.ts";

// Tool definitions for Claude API
export const toolDefinitions = [
  // ============================================
  // EVENT TOOLS
  // ============================================
  {
    name: "create_event",
    description: "Create a new event. Use when user mentions a new event they want to plan.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Event name (e.g., 'Wedding of Rafi and Rachel')" },
        event_type: { type: "string", description: "Event type (e.g., 'wedding', 'bar mitzvah', 'birthday')" },
        event_date: { type: "string", description: "Event date - flexible format (e.g., '1/6/2026', 'October', 'when it gets warm')" },
        description: { type: "string", description: "Additional details about the event" },
      },
      required: ["name"],
    },
  },
  {
    name: "get_event_summary",
    description: "Get a summary of the current event including stats on tasks and members.",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },

  // ============================================
  // TASK TOOLS
  // ============================================
  {
    name: "create_task",
    description: "Create a new task for the event. Use when user wants to add a task or reminder.",
    input_schema: {
      type: "object" as const,
      properties: {
        title: { type: "string", description: "Task title (e.g., 'Book photographer')" },
        description: { type: "string", description: "Task details" },
        due_date: { type: "string", description: "Due date - flexible format" },
        category: { type: "string", description: "Category (e.g., 'photography', 'venue', 'catering')" },
        priority: { type: "string", enum: ["low", "medium", "high"], description: "Priority level" },
        assigned_to_name: { type: "string", description: "Name of person to assign to" },
      },
      required: ["title"],
    },
  },
  {
    name: "list_tasks",
    description: "List tasks. Can filter by status, assignee, or category.",
    input_schema: {
      type: "object" as const,
      properties: {
        status: { type: "string", enum: ["open", "done", "all"], description: "Filter by status" },
        assigned_to_name: { type: "string", description: "Filter by assigned person's name" },
        category: { type: "string", description: "Filter by category" },
      },
      required: [],
    },
  },
  {
    name: "update_task",
    description: "Update an existing task. Can change title, status, due date, etc.",
    input_schema: {
      type: "object" as const,
      properties: {
        task_id: { type: "string", description: "Task ID to update" },
        title: { type: "string", description: "New title" },
        description: { type: "string", description: "New description" },
        status: { type: "string", enum: ["open", "done"], description: "New status" },
        due_date: { type: "string", description: "New due date" },
        priority: { type: "string", enum: ["low", "medium", "high"], description: "New priority" },
        assigned_to_name: { type: "string", description: "Name of person to assign to" },
      },
      required: ["task_id"],
    },
  },
  {
    name: "delete_task",
    description: "Delete a task.",
    input_schema: {
      type: "object" as const,
      properties: {
        task_id: { type: "string", description: "Task ID to delete" },
      },
      required: ["task_id"],
    },
  },
  {
    name: "complete_task",
    description: "Mark a task as done. Use when user says they completed something.",
    input_schema: {
      type: "object" as const,
      properties: {
        task_title_contains: { type: "string", description: "Part of the task title to find and complete" },
      },
      required: ["task_title_contains"],
    },
  },

  // ============================================
  // MEMBER TOOLS
  // ============================================
  {
    name: "add_member",
    description: "Add a participant to the event.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Member's name" },
        role: { type: "string", description: "Role description (e.g., 'father of groom', 'bride's sister')" },
        side: { type: "string", description: "Which side (e.g., 'groom', 'bride', 'family', 'friends')" },
        is_admin: { type: "boolean", description: "Whether this person is an event admin" },
        is_current_user: { type: "boolean", description: "Set to true if this member is the person currently chatting (use when user says 'I am...' or 'my name is...')" },
      },
      required: ["name"],
    },
  },
  {
    name: "list_members",
    description: "List all participants in the event.",
    input_schema: {
      type: "object" as const,
      properties: {
        side: { type: "string", description: "Filter by side" },
      },
      required: [],
    },
  },

  // ============================================
  // SUPPLIER TOOLS
  // ============================================
  {
    name: "search_suppliers",
    description: "Search for suppliers in a category. Only returns suppliers that have an agreement with Event.nApp.",
    input_schema: {
      type: "object" as const,
      properties: {
        category: { type: "string", description: "Category to search (e.g., 'photography', 'catering', 'DJ')" },
      },
      required: ["category"],
    },
  },
  {
    name: "send_lead",
    description: "Send user's details to suppliers. Only use after user explicitly agrees.",
    input_schema: {
      type: "object" as const,
      properties: {
        supplier_ids: {
          type: "array",
          items: { type: "string" },
          description: "IDs of suppliers to contact"
        },
        message: { type: "string", description: "Message to send to suppliers" },
      },
      required: ["supplier_ids"],
    },
  },

  // ============================================
  // BUDGET TOOLS
  // ============================================
  {
    name: "add_budget_item",
    description: "Add an item to the event budget.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Budget item name (e.g., 'Photography', 'Venue deposit')" },
        category: { type: "string", description: "Category (e.g., 'venue', 'catering', 'photography')" },
        estimated_cost: { type: "number", description: "Estimated cost in NIS" },
        actual_cost: { type: "number", description: "Actual cost if known" },
        notes: { type: "string", description: "Additional notes" },
        due_date: { type: "string", description: "Payment due date - flexible format" },
      },
      required: ["name"],
    },
  },
  {
    name: "list_budget",
    description: "List budget items. Can filter by category or status.",
    input_schema: {
      type: "object" as const,
      properties: {
        category: { type: "string", description: "Filter by category" },
        status: { type: "string", enum: ["pending", "confirmed", "paid", "all"], description: "Filter by status" },
      },
      required: [],
    },
  },
  {
    name: "update_budget_item",
    description: "Update a budget item.",
    input_schema: {
      type: "object" as const,
      properties: {
        item_id: { type: "string", description: "Budget item ID to update" },
        name: { type: "string", description: "New name" },
        estimated_cost: { type: "number", description: "New estimated cost" },
        actual_cost: { type: "number", description: "New actual cost" },
        status: { type: "string", enum: ["pending", "confirmed", "paid"], description: "New status" },
        notes: { type: "string", description: "New notes" },
      },
      required: ["item_id"],
    },
  },

  // ============================================
  // GUEST TOOLS
  // ============================================
  {
    name: "add_guest",
    description: "Add a guest to the event.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Guest name" },
        side: { type: "string", description: "Which side (e.g., 'groom', 'bride', 'family')" },
        group_name: { type: "string", description: "Group (e.g., 'Family Smith', 'College Friends')" },
        phone: { type: "string", description: "Phone number" },
        email: { type: "string", description: "Email address" },
        rsvp_status: { type: "string", enum: ["pending", "confirmed", "declined", "maybe"], description: "RSVP status" },
        plus_one: { type: "boolean", description: "Has a plus one?" },
        plus_one_name: { type: "string", description: "Plus one's name if known" },
        dietary_restrictions: { type: "string", description: "Dietary restrictions" },
        notes: { type: "string", description: "Additional notes" },
      },
      required: ["name"],
    },
  },
  {
    name: "list_guests",
    description: "List guests. Can filter by side, group, or RSVP status.",
    input_schema: {
      type: "object" as const,
      properties: {
        side: { type: "string", description: "Filter by side" },
        group_name: { type: "string", description: "Filter by group" },
        rsvp_status: { type: "string", enum: ["pending", "confirmed", "declined", "maybe", "all"], description: "Filter by RSVP" },
      },
      required: [],
    },
  },
  {
    name: "update_guest",
    description: "Update a guest's information.",
    input_schema: {
      type: "object" as const,
      properties: {
        guest_id: { type: "string", description: "Guest ID to update" },
        name: { type: "string", description: "New name" },
        rsvp_status: { type: "string", enum: ["pending", "confirmed", "declined", "maybe"], description: "New RSVP status" },
        table_number: { type: "number", description: "Table assignment" },
        plus_one: { type: "boolean", description: "Has plus one?" },
        plus_one_name: { type: "string", description: "Plus one's name" },
        dietary_restrictions: { type: "string", description: "Dietary restrictions" },
        notes: { type: "string", description: "Notes" },
      },
      required: ["guest_id"],
    },
  },

  // ============================================
  // ARTIFACT TOOLS
  // ============================================
  {
    name: "propose_artifact",
    description: "Propose generating an artifact (PDF, Excel, chart, etc.) to the user. Use this BEFORE generating - let the user confirm the format they want.",
    input_schema: {
      type: "object" as const,
      properties: {
        description: { type: "string", description: "What the artifact will contain (e.g., 'Task list with 12 items')" },
        suggested_format: { type: "string", enum: ["pdf", "excel", "csv", "markdown", "chart"], description: "Your recommended format" },
        data_preview: { type: "string", description: "Brief preview of the data (e.g., '12 tasks: 5 open, 7 done')" },
        alternative_formats: {
          type: "array",
          items: { type: "string", enum: ["pdf", "excel", "csv", "markdown", "chart"] },
          description: "Other formats that would also work well"
        },
      },
      required: ["description", "suggested_format"],
    },
  },
  {
    name: "generate_artifact",
    description: "Generate and send an artifact file (PDF, Excel, chart, etc.) to the user. Use AFTER user confirms they want it.",
    input_schema: {
      type: "object" as const,
      properties: {
        format: { type: "string", enum: ["pdf", "excel", "csv", "markdown", "chart"], description: "Output format" },
        artifact_type: {
          type: "string",
          enum: ["task_list", "budget", "guest_list", "comparison", "summary", "custom"],
          description: "Type of artifact to generate"
        },
        title: { type: "string", description: "Title for the artifact" },
        custom_content: {
          type: "object",
          description: "Custom content for 'custom' type - includes sections, table data, etc.",
          properties: {
            subtitle: { type: "string" },
            sections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  heading: { type: "string" },
                  content: { type: "string" },
                  items: { type: "array", items: { type: "string" } },
                },
              },
            },
            table: {
              type: "object",
              properties: {
                headers: { type: "array", items: { type: "string" } },
                rows: { type: "array", items: { type: "array" } },
              },
            },
          },
        },
        chart_config: {
          type: "object",
          description: "Chart configuration for 'chart' format",
          properties: {
            type: { type: "string", enum: ["bar", "pie", "line", "doughnut", "radar"] },
            labels: { type: "array", items: { type: "string" } },
            datasets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  label: { type: "string" },
                  data: { type: "array", items: { type: "number" } },
                },
              },
            },
          },
        },
        filters: {
          type: "object",
          description: "Filters to apply when generating from database",
          properties: {
            status: { type: "string" },
            category: { type: "string" },
            side: { type: "string" },
            rsvp_status: { type: "string" },
          },
        },
      },
      required: ["format", "artifact_type"],
    },
  },

  // ============================================
  // WEB SEARCH TOOLS
  // ============================================
  {
    name: "web_search",
    description: "Search the web for information about venues, suppliers, prices, reviews, and recommendations. Use this to help users research options.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Search query (can be in Hebrew or English)" },
        search_type: {
          type: "string",
          enum: ["reviews", "prices", "recommendations", "general"],
          description: "Type of search to optimize results"
        },
        max_results: { type: "number", description: "Maximum results to return (default 5)" },
      },
      required: ["query"],
    },
  },
];

// ============================================
// TOOL IMPLEMENTATIONS
// ============================================

export interface ToolContext {
  eventId: string | null;
  userId: string;
  memberId: string | null;
  chatId?: number; // Telegram chat ID for sending files
}

// Result type for artifact generation (returned to webhook for file sending)
export interface ArtifactResult {
  success: boolean;
  artifact?: {
    format: string;
    buffer: Uint8Array;
    filename: string;
    mimeType: string;
  };
  message: string;
  artifactId?: string;
}

export async function executeTool(
  toolName: string,
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  try {
    switch (toolName) {
      // Event tools
      case "create_event":
        return await createEvent(args, context);
      case "get_event_summary":
        return await getEventSummary(context);

      // Task tools
      case "create_task":
        return await createTask(args, context);
      case "list_tasks":
        return await listTasks(args, context);
      case "update_task":
        return await updateTask(args, context);
      case "delete_task":
        return await deleteTask(args, context);
      case "complete_task":
        return await completeTask(args, context);

      // Member tools
      case "add_member":
        return await addMember(args, context);
      case "list_members":
        return await listMembers(args, context);

      // Supplier tools
      case "search_suppliers":
        return await searchSuppliers(args);
      case "send_lead":
        return await sendLead(args, context);

      // Budget tools
      case "add_budget_item":
        return await addBudgetItem(args, context);
      case "list_budget":
        return await listBudget(args, context);
      case "update_budget_item":
        return await updateBudgetItem(args);

      // Guest tools
      case "add_guest":
        return await addGuest(args, context);
      case "list_guests":
        return await listGuests(args, context);
      case "update_guest":
        return await updateGuest(args);

      // Artifact tools
      case "propose_artifact":
        return await proposeArtifact(args);
      case "generate_artifact":
        return await generateArtifactTool(args, context);

      // Web search tools
      case "web_search":
        return await webSearchTool(args);

      default:
        return `Unknown tool: ${toolName}`;
    }
  } catch (error) {
    console.error(`Tool execution error (${toolName}):`, error);
    return `Error executing ${toolName}: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

// ============================================
// EVENT IMPLEMENTATIONS
// ============================================

async function createEvent(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  const { data, error } = await supabase
    .from("events")
    .insert({
      name: args.name as string,
      event_type: args.event_type as string | undefined,
      event_date: args.event_date as string | undefined,
      description: args.description as string | undefined,
      status: "active",
    })
    .select()
    .single();

  if (error) throw error;

  // Automatically add the current user as an admin member of the event
  if (context.userId) {
    // Get user's first_name from users table
    const { data: userData } = await supabase
      .from("users")
      .select("first_name")
      .eq("id", context.userId)
      .single();

    const memberName = userData?.first_name || "Event Creator";

    await supabase
      .from("members")
      .insert({
        event_id: data.id,
        user_id: context.userId,
        name: memberName,
        is_admin: true,
      });
  }

  return JSON.stringify({
    success: true,
    event_id: data.id,
    message: `Event "${data.name}" created successfully.`,
  });
}

async function getEventSummary(context: ToolContext): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", context.eventId)
    .single();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("status")
    .eq("event_id", context.eventId);

  const { data: members } = await supabase
    .from("members")
    .select("id")
    .eq("event_id", context.eventId);

  const openTasks = tasks?.filter((t) => t.status === "open").length || 0;
  const doneTasks = tasks?.filter((t) => t.status === "done").length || 0;

  return JSON.stringify({
    success: true,
    event: {
      name: event?.name,
      type: event?.event_type,
      date: event?.event_date,
      description: event?.description,
    },
    stats: {
      total_tasks: (tasks?.length || 0),
      open_tasks: openTasks,
      completed_tasks: doneTasks,
      members_count: (members?.length || 0),
    },
  });
}

// ============================================
// TASK IMPLEMENTATIONS
// ============================================

async function createTask(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected. Please create or join an event first." });
  }

  const title = args.title as string;

  // Check for duplicate/similar tasks to prevent duplicates
  const { data: existingTasks } = await supabase
    .from("tasks")
    .select("id, title, status")
    .eq("event_id", context.eventId)
    .eq("status", "open")
    .ilike("title", `%${title}%`);

  if (existingTasks && existingTasks.length > 0) {
    const existing = existingTasks[0];
    return JSON.stringify({
      success: true,
      task_id: existing.id,
      already_exists: true,
      message: `Task "${existing.title}" already exists.`,
    });
  }

  let assignedTo: string | undefined;
  if (args.assigned_to_name) {
    const { data: member } = await supabase
      .from("members")
      .select("id")
      .eq("event_id", context.eventId)
      .ilike("name", `%${args.assigned_to_name}%`)
      .single();
    assignedTo = member?.id;
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      event_id: context.eventId,
      title: args.title as string,
      description: args.description as string | undefined,
      due_date: args.due_date as string | undefined,
      category: args.category as string | undefined,
      priority: (args.priority as string) || "medium",
      assigned_to: assignedTo,
      created_by: context.memberId,
      status: "open",
    })
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    task_id: data.id,
    message: `Task "${data.title}" created.`,
  });
}

async function listTasks(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  let query = supabase
    .from("tasks")
    .select("*, assigned_member:members!tasks_assigned_to_fkey(name)")
    .eq("event_id", context.eventId)
    .order("created_at", { ascending: false });

  if (args.status && args.status !== "all") {
    query = query.eq("status", args.status as string);
  }

  if (args.category) {
    query = query.ilike("category", `%${args.category}%`);
  }

  const { data: tasks, error } = await query;
  if (error) throw error;

  const formattedTasks = tasks?.map((t: Task & { assigned_member?: { name: string } }) => ({
    id: t.id,
    title: t.title,
    status: t.status,
    due_date: t.due_date,
    priority: t.priority,
    category: t.category,
    assigned_to: t.assigned_member?.name,
  }));

  return JSON.stringify({
    success: true,
    count: formattedTasks?.length || 0,
    tasks: formattedTasks,
  });
}

async function updateTask(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  const updates: Record<string, unknown> = {};
  if (args.title) updates.title = args.title;
  if (args.description) updates.description = args.description;
  if (args.status) updates.status = args.status;
  if (args.due_date) updates.due_date = args.due_date;
  if (args.priority) updates.priority = args.priority;

  if (args.assigned_to_name && context.eventId) {
    const { data: member } = await supabase
      .from("members")
      .select("id")
      .eq("event_id", context.eventId)
      .ilike("name", `%${args.assigned_to_name}%`)
      .single();
    if (member) updates.assigned_to = member.id;
  }

  if (args.status === "done") {
    updates.completed_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", args.task_id as string)
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    message: `Task "${data.title}" updated.`,
  });
}

async function deleteTask(args: Record<string, unknown>): Promise<string> {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", args.task_id as string)
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    message: `Task "${data.title}" deleted.`,
  });
}

async function completeTask(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  const { data: task, error: findError } = await supabase
    .from("tasks")
    .select("*")
    .eq("event_id", context.eventId)
    .eq("status", "open")
    .ilike("title", `%${args.task_title_contains}%`)
    .single();

  if (findError || !task) {
    return JSON.stringify({
      success: false,
      message: `Could not find open task containing "${args.task_title_contains}".`,
    });
  }

  const { error } = await supabase
    .from("tasks")
    .update({ status: "done", completed_at: new Date().toISOString() })
    .eq("id", task.id);

  if (error) throw error;

  return JSON.stringify({
    success: true,
    message: `Task "${task.title}" marked as done.`,
  });
}

// ============================================
// MEMBER IMPLEMENTATIONS
// ============================================

async function addMember(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  const isCurrentUser = args.is_current_user as boolean;
  const userName = args.name as string;

  // If this is the current user, always update their name in users table
  // even if there's no event yet
  if (isCurrentUser && context.userId) {
    await supabase
      .from("users")
      .update({ first_name: userName })
      .eq("id", context.userId);
  }

  if (!context.eventId) {
    if (isCurrentUser) {
      // We saved the name to users table, but can't add as member without an event
      return JSON.stringify({
        success: true,
        message: `Got it, ${userName}! Once we set up an event, I'll add you as a member.`,
      });
    }
    return JSON.stringify({ success: false, message: "No event selected. Please create or join an event first." });
  }

  // If this is the current user, check if they already have a member record
  if (isCurrentUser && context.userId) {
    const { data: existingMember } = await supabase
      .from("members")
      .select("*")
      .eq("event_id", context.eventId)
      .eq("user_id", context.userId)
      .single();

    if (existingMember) {
      // Update existing member record with new info
      const updates: Record<string, unknown> = { name: args.name as string };
      if (args.role) updates.role = args.role;
      if (args.side) updates.side = args.side;
      if (args.is_admin !== undefined) updates.is_admin = args.is_admin;

      const { data, error } = await supabase
        .from("members")
        .update(updates)
        .eq("id", existingMember.id)
        .select()
        .single();

      if (error) throw error;

      // Also update the user's first_name
      await supabase
        .from("users")
        .update({ first_name: args.name as string })
        .eq("id", context.userId);

      return JSON.stringify({
        success: true,
        member_id: data.id,
        message: `Updated your info: ${data.name}.`,
      });
    }
  }

  // Create new member
  const { data, error } = await supabase
    .from("members")
    .insert({
      event_id: context.eventId,
      user_id: isCurrentUser ? context.userId : undefined,
      name: args.name as string,
      role: args.role as string | undefined,
      side: args.side as string | undefined,
      is_admin: (args.is_admin as boolean) || false,
    })
    .select()
    .single();

  if (error) throw error;

  // If current user, also update users table
  if (isCurrentUser && context.userId) {
    await supabase
      .from("users")
      .update({ first_name: args.name as string })
      .eq("id", context.userId);
  }

  return JSON.stringify({
    success: true,
    member_id: data.id,
    message: `${data.name} added to the event.`,
  });
}

async function listMembers(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  let query = supabase
    .from("members")
    .select("*")
    .eq("event_id", context.eventId);

  if (args.side) {
    query = query.eq("side", args.side as string);
  }

  const { data: members, error } = await query;
  if (error) throw error;

  const formattedMembers = members?.map((m: Member) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    side: m.side,
    is_admin: m.is_admin,
  }));

  return JSON.stringify({
    success: true,
    count: formattedMembers?.length || 0,
    members: formattedMembers,
  });
}

// ============================================
// SUPPLIER IMPLEMENTATIONS
// ============================================

async function searchSuppliers(args: Record<string, unknown>): Promise<string> {
  const category = (args.category as string).toLowerCase();

  const { data: suppliers, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("active", true)
    .contains("categories", [category]);

  if (error) throw error;

  if (!suppliers || suppliers.length === 0) {
    return JSON.stringify({
      success: true,
      has_suppliers: false,
      message: `No suppliers found for category "${category}".`,
    });
  }

  const formattedSuppliers = suppliers.map((s: Supplier) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    categories: s.categories,
  }));

  return JSON.stringify({
    success: true,
    has_suppliers: true,
    count: formattedSuppliers.length,
    suppliers: formattedSuppliers,
  });
}

async function sendLead(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  const supplierIds = args.supplier_ids as string[];
  const message = (args.message as string) || "User is interested in your services.";

  const leads = supplierIds.map((supplierId) => ({
    event_id: context.eventId,
    supplier_id: supplierId,
    member_id: context.memberId,
    message: message,
    status: "sent",
  }));

  const { error } = await supabase.from("leads").insert(leads);
  if (error) throw error;

  // TODO: Actually send emails/SMS to suppliers
  // For now, just record in database

  return JSON.stringify({
    success: true,
    message: `Lead sent to ${supplierIds.length} supplier(s). They will contact you soon.`,
  });
}

// ============================================
// BUDGET IMPLEMENTATIONS
// ============================================

async function addBudgetItem(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  const { data, error } = await supabase
    .from("budget_items")
    .insert({
      event_id: context.eventId,
      name: args.name as string,
      category: args.category as string | undefined,
      estimated_cost: args.estimated_cost as number | undefined,
      actual_cost: args.actual_cost as number | undefined,
      notes: args.notes as string | undefined,
      due_date: args.due_date as string | undefined,
      created_by: context.memberId,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    budget_item_id: data.id,
    message: `Budget item "${data.name}" added.`,
  });
}

async function listBudget(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  let query = supabase
    .from("budget_items")
    .select("*")
    .eq("event_id", context.eventId)
    .order("created_at", { ascending: false });

  if (args.category) {
    query = query.ilike("category", `%${args.category}%`);
  }

  if (args.status && args.status !== "all") {
    query = query.eq("status", args.status as string);
  }

  const { data: items, error } = await query;
  if (error) throw error;

  const totalEstimated = items?.reduce((sum, i) => sum + (i.estimated_cost || 0), 0) || 0;
  const totalActual = items?.reduce((sum, i) => sum + (i.actual_cost || 0), 0) || 0;

  const formattedItems = items?.map((i: BudgetItem) => ({
    id: i.id,
    name: i.name,
    category: i.category,
    estimated_cost: i.estimated_cost,
    actual_cost: i.actual_cost,
    status: i.status,
    due_date: i.due_date,
  }));

  return JSON.stringify({
    success: true,
    count: formattedItems?.length || 0,
    total_estimated: totalEstimated,
    total_actual: totalActual,
    items: formattedItems,
  });
}

async function updateBudgetItem(args: Record<string, unknown>): Promise<string> {
  const updates: Record<string, unknown> = {};
  if (args.name) updates.name = args.name;
  if (args.estimated_cost !== undefined) updates.estimated_cost = args.estimated_cost;
  if (args.actual_cost !== undefined) updates.actual_cost = args.actual_cost;
  if (args.status) updates.status = args.status;
  if (args.notes) updates.notes = args.notes;

  const { data, error } = await supabase
    .from("budget_items")
    .update(updates)
    .eq("id", args.item_id as string)
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    message: `Budget item "${data.name}" updated.`,
  });
}

// ============================================
// GUEST IMPLEMENTATIONS
// ============================================

async function addGuest(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  const { data, error } = await supabase
    .from("guests")
    .insert({
      event_id: context.eventId,
      name: args.name as string,
      side: args.side as string | undefined,
      group_name: args.group_name as string | undefined,
      phone: args.phone as string | undefined,
      email: args.email as string | undefined,
      rsvp_status: (args.rsvp_status as string) || "pending",
      plus_one: (args.plus_one as boolean) || false,
      plus_one_name: args.plus_one_name as string | undefined,
      dietary_restrictions: args.dietary_restrictions as string | undefined,
      notes: args.notes as string | undefined,
      added_by: context.memberId,
    })
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    guest_id: data.id,
    message: `Guest "${data.name}" added.`,
  });
}

async function listGuests(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  let query = supabase
    .from("guests")
    .select("*")
    .eq("event_id", context.eventId)
    .order("name", { ascending: true });

  if (args.side) {
    query = query.eq("side", args.side as string);
  }

  if (args.group_name) {
    query = query.ilike("group_name", `%${args.group_name}%`);
  }

  if (args.rsvp_status && args.rsvp_status !== "all") {
    query = query.eq("rsvp_status", args.rsvp_status as string);
  }

  const { data: guests, error } = await query;
  if (error) throw error;

  const confirmed = guests?.filter((g) => g.rsvp_status === "confirmed").length || 0;
  const pending = guests?.filter((g) => g.rsvp_status === "pending").length || 0;
  const declined = guests?.filter((g) => g.rsvp_status === "declined").length || 0;
  const totalWithPlusOnes = (guests?.length || 0) + (guests?.filter((g) => g.plus_one).length || 0);

  const formattedGuests = guests?.map((g: Guest) => ({
    id: g.id,
    name: g.name,
    side: g.side,
    group_name: g.group_name,
    rsvp_status: g.rsvp_status,
    plus_one: g.plus_one,
    plus_one_name: g.plus_one_name,
    table_number: g.table_number,
  }));

  return JSON.stringify({
    success: true,
    count: formattedGuests?.length || 0,
    stats: {
      total_guests: guests?.length || 0,
      total_with_plus_ones: totalWithPlusOnes,
      confirmed,
      pending,
      declined,
    },
    guests: formattedGuests,
  });
}

async function updateGuest(args: Record<string, unknown>): Promise<string> {
  const updates: Record<string, unknown> = {};
  if (args.name) updates.name = args.name;
  if (args.rsvp_status) updates.rsvp_status = args.rsvp_status;
  if (args.table_number !== undefined) updates.table_number = args.table_number;
  if (args.plus_one !== undefined) updates.plus_one = args.plus_one;
  if (args.plus_one_name) updates.plus_one_name = args.plus_one_name;
  if (args.dietary_restrictions) updates.dietary_restrictions = args.dietary_restrictions;
  if (args.notes) updates.notes = args.notes;

  const { data, error } = await supabase
    .from("guests")
    .update(updates)
    .eq("id", args.guest_id as string)
    .select()
    .single();

  if (error) throw error;

  return JSON.stringify({
    success: true,
    message: `Guest "${data.name}" updated.`,
  });
}

// ============================================
// ARTIFACT IMPLEMENTATIONS
// ============================================

async function proposeArtifact(args: Record<string, unknown>): Promise<string> {
  // This tool is primarily for the AI to structure its proposal to the user
  // It doesn't do any actual generation - just returns the proposal info
  return JSON.stringify({
    success: true,
    proposal: {
      description: args.description,
      suggested_format: args.suggested_format,
      data_preview: args.data_preview,
      alternative_formats: args.alternative_formats || [],
    },
    message: "Artifact proposed to user. Wait for their confirmation before generating.",
  });
}

async function generateArtifactTool(
  args: Record<string, unknown>,
  context: ToolContext
): Promise<string> {
  if (!context.eventId) {
    return JSON.stringify({ success: false, message: "No event selected." });
  }

  const format = args.format as ArtifactFormat;
  const artifactType = args.artifact_type as string;
  const title = args.title as string | undefined;
  const filters = args.filters as Record<string, string> | undefined;

  let content: ArtifactContent;
  let eventName: string | undefined;

  // Get event name for titles
  const { data: eventData } = await supabase
    .from("events")
    .select("name")
    .eq("id", context.eventId)
    .single();
  eventName = eventData?.name;

  try {
    switch (artifactType) {
      case "task_list": {
        // Fetch tasks from database
        let query = supabase
          .from("tasks")
          .select("*, assigned_member:members!tasks_assigned_to_fkey(name)")
          .eq("event_id", context.eventId)
          .order("created_at", { ascending: false });

        if (filters?.status && filters.status !== "all") {
          query = query.eq("status", filters.status);
        }
        if (filters?.category) {
          query = query.ilike("category", `%${filters.category}%`);
        }

        const { data: tasks, error } = await query;
        if (error) throw error;

        const formattedTasks = tasks?.map((t) => ({
          title: t.title,
          status: t.status,
          due_date: t.due_date,
          priority: t.priority,
          assigned_to: (t.assigned_member as { name: string } | null)?.name,
          category: t.category,
        })) || [];

        content = buildTaskListContent(formattedTasks, title || eventName);
        break;
      }

      case "budget": {
        // Fetch budget items
        let query = supabase
          .from("budget_items")
          .select("*")
          .eq("event_id", context.eventId)
          .order("category", { ascending: true });

        if (filters?.status && filters.status !== "all") {
          query = query.eq("status", filters.status);
        }
        if (filters?.category) {
          query = query.ilike("category", `%${filters.category}%`);
        }

        const { data: items, error } = await query;
        if (error) throw error;

        content = buildBudgetContent(items || [], title || eventName);
        break;
      }

      case "guest_list": {
        // Fetch guests
        let query = supabase
          .from("guests")
          .select("*")
          .eq("event_id", context.eventId)
          .order("name", { ascending: true });

        if (filters?.side) {
          query = query.eq("side", filters.side);
        }
        if (filters?.rsvp_status && filters.rsvp_status !== "all") {
          query = query.eq("rsvp_status", filters.rsvp_status);
        }

        const { data: guests, error } = await query;
        if (error) throw error;

        content = buildGuestListContent(guests || [], title || eventName);
        break;
      }

      case "comparison": {
        // For comparison charts, use custom_content or chart_config
        if (args.chart_config) {
          content = {
            title: title || "Comparison",
            chart: args.chart_config as ChartData,
          };
        } else {
          return JSON.stringify({
            success: false,
            message: "Comparison requires chart_config data.",
          });
        }
        break;
      }

      case "summary": {
        // Event summary with tasks, budget, and guests overview
        const [tasksRes, budgetRes, guestsRes] = await Promise.all([
          supabase
            .from("tasks")
            .select("status")
            .eq("event_id", context.eventId),
          supabase
            .from("budget_items")
            .select("estimated_cost, actual_cost, status")
            .eq("event_id", context.eventId),
          supabase
            .from("guests")
            .select("rsvp_status, plus_one")
            .eq("event_id", context.eventId),
        ]);

        const tasks = tasksRes.data || [];
        const budget = budgetRes.data || [];
        const guests = guestsRes.data || [];

        const openTasks = tasks.filter((t) => t.status === "open").length;
        const doneTasks = tasks.filter((t) => t.status === "done").length;
        const totalEstimated = budget.reduce((sum, i) => sum + (i.estimated_cost || 0), 0);
        const totalActual = budget.reduce((sum, i) => sum + (i.actual_cost || 0), 0);
        const confirmedGuests = guests.filter((g) => g.rsvp_status === "confirmed").length;
        const totalWithPlusOnes = guests.length + guests.filter((g) => g.plus_one).length;

        content = {
          title: title || `Event Summary - ${eventName}`,
          sections: [
            {
              heading: "Tasks Overview",
              items: [
                `Total tasks: ${tasks.length}`,
                `Open: ${openTasks}`,
                `Completed: ${doneTasks}`,
              ],
            },
            {
              heading: "Budget Overview",
              items: [
                `Total items: ${budget.length}`,
                `Estimated total: ${totalEstimated.toLocaleString()}`,
                `Actual spent: ${totalActual.toLocaleString()}`,
                `Remaining: ${(totalEstimated - totalActual).toLocaleString()}`,
              ],
            },
            {
              heading: "Guests Overview",
              items: [
                `Total guests: ${guests.length}`,
                `With plus ones: ${totalWithPlusOnes}`,
                `Confirmed: ${confirmedGuests}`,
                `Pending: ${guests.filter((g) => g.rsvp_status === "pending").length}`,
              ],
            },
          ],
          footer: `Generated by Event.nApp - ${new Date().toLocaleDateString("he-IL")}`,
        };
        break;
      }

      case "custom": {
        // Use provided custom content
        const customContent = args.custom_content as ArtifactContent | undefined;
        if (!customContent) {
          return JSON.stringify({
            success: false,
            message: "Custom artifact requires custom_content data.",
          });
        }
        content = {
          title: title || customContent.title,
          ...customContent,
        };
        break;
      }

      default:
        return JSON.stringify({
          success: false,
          message: `Unknown artifact type: ${artifactType}`,
        });
    }

    // Generate the artifact
    const artifact = await generateArtifact(format, content, {
      rtl: true,
      chartOptions: format === "chart" ? { width: 600, height: 400 } : undefined,
    });

    // Save artifact record to database
    const { data: savedArtifact, error: saveError } = await supabase
      .from("artifacts")
      .insert({
        event_id: context.eventId,
        user_id: context.userId,
        format: artifact.format,
        artifact_type: artifactType,
        title: content.title,
        description: `${artifactType} artifact`,
        metadata: { filters },
      })
      .select()
      .single();

    if (saveError) {
      console.error("Failed to save artifact record:", saveError);
    }

    // Return the artifact data - the webhook will handle sending the file
    return JSON.stringify({
      success: true,
      artifact: {
        format: artifact.format,
        filename: artifact.filename,
        mimeType: artifact.mimeType,
        bufferBase64: btoa(String.fromCharCode(...artifact.buffer)),
      },
      artifact_id: savedArtifact?.id,
      message: `Generated ${artifact.filename}`,
    });
  } catch (error) {
    console.error("Artifact generation error:", error);
    return JSON.stringify({
      success: false,
      message: `Failed to generate artifact: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
}

// ============================================
// WEB SEARCH IMPLEMENTATIONS
// ============================================

async function webSearchTool(args: Record<string, unknown>): Promise<string> {
  const query = args.query as string;
  const searchType = (args.search_type as SearchType) || "general";
  const maxResults = (args.max_results as number) || 5;

  try {
    const response = await searchWeb(query, {
      searchType,
      maxResults,
      includeAnswer: true,
    });

    // Extract structured data from results
    const structured = extractStructuredData(response.results);

    return JSON.stringify({
      success: true,
      query: response.query,
      answer: response.answer,
      result_count: response.resultCount,
      from_cache: response.fromCache,
      results: response.results.map((r) => ({
        title: r.title,
        url: r.url,
        snippet: r.content.substring(0, 200) + (r.content.length > 200 ? "..." : ""),
      })),
      extracted: {
        ratings: structured.ratings,
        price_ranges: structured.priceRanges,
        pros: structured.pros,
        cons: structured.cons,
      },
    });
  } catch (error) {
    console.error("Web search error:", error);
    return JSON.stringify({
      success: false,
      message: `Search failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
}
