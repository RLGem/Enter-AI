// Telegram Bot API Helper
const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Telegram Update types
export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

// Send a text message to a chat
export async function sendMessage(
  chatId: number,
  text: string,
  options?: {
    parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
    reply_to_message_id?: number;
  }
): Promise<boolean> {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: options?.parse_mode,
        reply_to_message_id: options?.reply_to_message_id,
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram API error:", result);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}

// Send a "typing" indicator
export async function sendTypingAction(chatId: number): Promise<void> {
  try {
    await fetch(`${TELEGRAM_API}/sendChatAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        action: "typing",
      }),
    });
  } catch (error) {
    console.error("Failed to send typing action:", error);
  }
}

// Send an "upload_document" indicator
export async function sendUploadAction(chatId: number): Promise<void> {
  try {
    await fetch(`${TELEGRAM_API}/sendChatAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        action: "upload_document",
      }),
    });
  } catch (error) {
    console.error("Failed to send upload action:", error);
  }
}

// Result type for file sends
export interface TelegramFileResult {
  ok: boolean;
  fileId?: string;
  error?: string;
}

// Send a document (PDF, Excel, CSV, etc.)
export async function sendDocument(
  chatId: number,
  buffer: Uint8Array,
  filename: string,
  options?: {
    caption?: string;
    mimeType?: string;
    reply_to_message_id?: number;
  }
): Promise<TelegramFileResult> {
  try {
    // Create form data for multipart upload
    const formData = new FormData();
    formData.append("chat_id", chatId.toString());

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: options?.mimeType || "application/octet-stream",
    });
    formData.append("document", blob, filename);

    if (options?.caption) {
      formData.append("caption", options.caption);
    }
    if (options?.reply_to_message_id) {
      formData.append("reply_to_message_id", options.reply_to_message_id.toString());
    }

    const response = await fetch(`${TELEGRAM_API}/sendDocument`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram sendDocument error:", result);
      return { ok: false, error: result.description || "Unknown error" };
    }

    // Extract file_id for caching/re-sending
    const fileId = result.result?.document?.file_id;
    return { ok: true, fileId };
  } catch (error) {
    console.error("Failed to send document:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Send a photo/image (PNG, JPG, etc.)
export async function sendPhoto(
  chatId: number,
  buffer: Uint8Array,
  options?: {
    caption?: string;
    mimeType?: string;
    reply_to_message_id?: number;
  }
): Promise<TelegramFileResult> {
  try {
    const formData = new FormData();
    formData.append("chat_id", chatId.toString());

    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: options?.mimeType || "image/png",
    });
    formData.append("photo", blob, "image.png");

    if (options?.caption) {
      formData.append("caption", options.caption);
    }
    if (options?.reply_to_message_id) {
      formData.append("reply_to_message_id", options.reply_to_message_id.toString());
    }

    const response = await fetch(`${TELEGRAM_API}/sendPhoto`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram sendPhoto error:", result);
      return { ok: false, error: result.description || "Unknown error" };
    }

    // Extract file_id (largest photo)
    const photos = result.result?.photo || [];
    const fileId = photos.length > 0 ? photos[photos.length - 1].file_id : undefined;
    return { ok: true, fileId };
  } catch (error) {
    console.error("Failed to send photo:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Re-send a document using cached file_id (much faster)
export async function resendDocument(
  chatId: number,
  fileId: string,
  options?: {
    caption?: string;
    reply_to_message_id?: number;
  }
): Promise<boolean> {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendDocument`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        document: fileId,
        caption: options?.caption,
        reply_to_message_id: options?.reply_to_message_id,
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram resendDocument error:", result);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to resend document:", error);
    return false;
  }
}

// Re-send a photo using cached file_id
export async function resendPhoto(
  chatId: number,
  fileId: string,
  options?: {
    caption?: string;
    reply_to_message_id?: number;
  }
): Promise<boolean> {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo: fileId,
        caption: options?.caption,
        reply_to_message_id: options?.reply_to_message_id,
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram resendPhoto error:", result);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to resend photo:", error);
    return false;
  }
}

// Parse incoming webhook update
export function parseUpdate(body: unknown): TelegramUpdate | null {
  if (!body || typeof body !== "object") {
    return null;
  }
  return body as TelegramUpdate;
}
