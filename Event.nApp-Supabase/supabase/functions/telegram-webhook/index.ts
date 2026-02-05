// Event.nApp - Telegram Webhook Handler
// Main entry point for all Telegram messages

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  parseUpdate,
  sendMessage,
  sendTypingAction,
  sendUploadAction,
  sendDocument,
  sendPhoto,
  TelegramUpdate,
} from "../_shared/telegram.ts";
import { supabase, User, Member, Event, ChatMessage } from "../_shared/supabase.ts";
import { chat, buildEventContext } from "../_shared/claude.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const update = parseUpdate(body);

    if (!update?.message?.text) {
      // Not a text message, ignore
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message } = update;
    const telegramUserId = message.from!.id;
    const chatId = message.chat.id;
    const userText = message.text;
    const firstName = message.from?.first_name || "Friend";

    console.log(`Message from ${firstName} (${telegramUserId}): ${userText}`);

    // Handle /start command immediately
    if (userText === "/start" || userText.startsWith("/start ")) {
      await sendMessage(
        chatId,
        `שלום ${firstName}! 👋\n\nאני AIlex, העוזר שלך לתכנון אירועים.\n\nספר לי על האירוע שאתה מתכנן - חתונה, בר מצווה, יום הולדת, או כל דבר אחר!\n\nלדוגמה: "אני מתכנן חתונה של דני ושרה"`
      );

      // Still create/get user for tracking
      await getOrCreateUser(telegramUserId, chatId, firstName);

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle /help command
    if (userText === "/help") {
      await sendMessage(
        chatId,
        `🎯 מה אני יכול לעשות:\n\n` +
        `📋 משימות - "הוסף משימה לסגור צלם", "מה המשימות הפתוחות?"\n` +
        `👥 אורחים - "הוסף את דני לרשימת האורחים"\n` +
        `💰 תקציב - "הוסף הוצאה של 5000 לאולם"\n` +
        `🔍 חיפוש - "חפש ביקורות על אולם הגן"\n` +
        `📄 מסמכים - "שלח לי את רשימת המשימות כ-PDF"\n\n` +
        `פשוט דבר איתי בשפה טבעית! 😊`
      );
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Show typing indicator
    await sendTypingAction(chatId);

    // Get or create user
    const user = await getOrCreateUser(telegramUserId, chatId, firstName);

    // Get user's current event and member info
    const { event, member } = await getUserContext(user.id);

    // Get conversation history (last 20 messages)
    const history = await getConversationHistory(user.id, event?.id);

    // Get task stats if event exists
    let taskStats: { open: number; done: number } | undefined;
    if (event) {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("status")
        .eq("event_id", event.id);
      taskStats = {
        open: tasks?.filter((t) => t.status === "open").length || 0,
        done: tasks?.filter((t) => t.status === "done").length || 0,
      };
    }

    // Build context for Claude
    const eventContext = buildEventContext(
      event ? { name: event.name, event_type: event.event_type, event_date: event.event_date } : null,
      member ? { name: member.name, role: member.role, side: member.side } : null,
      taskStats
    );

    // Call Claude
    const { response, toolCalls } = await chat(
      userText,
      history.map((h) => ({ role: h.role as "user" | "assistant", content: h.content })),
      {
        eventId: event?.id || null,
        userId: user.id,
        memberId: member?.id || null,
        chatId: chatId,
      },
      eventContext
    );

    // Handle artifact file sending
    const artifactsSent = await handleArtifactSending(toolCalls, chatId);

    // Save conversation to history
    await saveMessage(user.id, event?.id || null, "user", userText);
    await saveMessage(user.id, event?.id || null, "assistant", response, toolCalls);

    // If a new event was created, update context
    if (toolCalls) {
      const createEventCall = toolCalls.find(
        (tc: { name: string }) => tc.name === "create_event"
      );
      if (createEventCall) {
        // Refresh event context for future messages
        console.log("New event created, context will update on next message");
      }
    }

    // Send response to user
    await sendMessage(chatId, response);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");

    // Try to notify user of error
    try {
      const body = await req.clone().json();
      if (body?.message?.chat?.id) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        await sendMessage(
          body.message.chat.id,
          `מצטער, משהו השתבש. נסה שוב.\n\nשגיאה: ${errorMsg.substring(0, 100)}`
        );
      }
    } catch (notifyError) {
      console.error("Failed to notify user:", notifyError);
    }

    // Return 200 to prevent Telegram from retrying (which could cause loops)
    return new Response(
      JSON.stringify({ ok: true, error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

async function getOrCreateUser(
  telegramId: number,
  chatId: number,
  firstName: string
): Promise<User> {
  // Try to find existing user
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id", telegramId)
    .single();

  if (existingUser) {
    // Update chat_id if changed
    if (existingUser.telegram_chat_id !== chatId) {
      await supabase
        .from("users")
        .update({ telegram_chat_id: chatId })
        .eq("id", existingUser.id);
    }
    return existingUser;
  }

  // Create new user
  const { data: newUser, error } = await supabase
    .from("users")
    .insert({
      telegram_id: telegramId,
      telegram_chat_id: chatId,
      first_name: firstName,
    })
    .select()
    .single();

  if (error) throw error;
  return newUser;
}

async function getUserContext(
  userId: string
): Promise<{ event: Event | null; member: Member | null }> {
  // Find the user's most recent active event membership
  // Using !inner join to properly filter on the events table
  const { data: memberData } = await supabase
    .from("members")
    .select("*, event:events!inner(*)")
    .eq("user_id", userId)
    .eq("event.status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (memberData && memberData.event) {
    return {
      event: memberData.event as unknown as Event,
      member: memberData as Member,
    };
  }

  // If no membership, check if there's any active event they created
  // (via chat history indicating they started an event)
  const { data: anyActiveEvent } = await supabase
    .from("events")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // For now, return the latest active event if user has no explicit membership
  // This allows the first conversation to create context
  return {
    event: anyActiveEvent || null,
    member: null,
  };
}

async function getConversationHistory(
  userId: string,
  eventId: string | null | undefined
): Promise<ChatMessage[]> {
  let query = supabase
    .from("chat_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(20);

  // If we have an event, filter by it
  if (eventId) {
    query = query.eq("event_id", eventId);
  }

  const { data } = await query;
  return (data || []) as ChatMessage[];
}

async function saveMessage(
  userId: string,
  eventId: string | null,
  role: "user" | "assistant",
  content: string,
  toolCalls?: unknown[]
): Promise<void> {
  await supabase.from("chat_history").insert({
    user_id: userId,
    event_id: eventId,
    role,
    content,
    tool_calls: toolCalls ? JSON.stringify(toolCalls) : null,
  });
}

interface ArtifactToolResult {
  success: boolean;
  artifact?: {
    format: string;
    filename: string;
    mimeType: string;
    bufferBase64: string;
  };
  artifact_id?: string;
  message?: string;
}

async function handleArtifactSending(
  toolCalls: unknown[] | undefined,
  chatId: number
): Promise<number> {
  if (!toolCalls) return 0;

  let artifactsSent = 0;

  for (const tc of toolCalls) {
    const toolCall = tc as { name: string; result: string };

    // Only process generate_artifact tool calls
    if (toolCall.name !== "generate_artifact") continue;

    try {
      const result: ArtifactToolResult = JSON.parse(toolCall.result);

      if (!result.success || !result.artifact) continue;

      // Show upload indicator
      await sendUploadAction(chatId);

      // Decode base64 buffer
      const binaryString = atob(result.artifact.bufferBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Send file based on format
      let sendResult;
      if (result.artifact.format === "chart") {
        // Charts are images, send as photo
        sendResult = await sendPhoto(chatId, bytes, {
          mimeType: result.artifact.mimeType,
        });
      } else {
        // Everything else is a document
        sendResult = await sendDocument(chatId, bytes, result.artifact.filename, {
          mimeType: result.artifact.mimeType,
        });
      }

      // Update artifact record with Telegram file_id if we have one
      if (sendResult.ok && sendResult.fileId && result.artifact_id) {
        await supabase
          .from("artifacts")
          .update({ telegram_file_id: sendResult.fileId })
          .eq("id", result.artifact_id);
      }

      if (sendResult.ok) {
        artifactsSent++;
      } else {
        console.error("Failed to send artifact:", sendResult.error);
      }
    } catch (error) {
      console.error("Error processing artifact:", error);
    }
  }

  return artifactsSent;
}
