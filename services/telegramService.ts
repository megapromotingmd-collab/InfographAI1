
import { TELEGRAM_CONFIG } from "../constants";

const BASE_URL = `https://api.telegram.org/bot${TELEGRAM_CONFIG.TOKEN}`;

/**
 * Sends a text message to the configured Telegram chat.
 * Uses basic text mode to prevent Markdown parsing errors with special characters.
 */
export const sendTelegramMessage = async (text: string): Promise<void> => {
  try {
    // We use plain text to prevent 400 Bad Request errors from Telegram
    // when the prompt contains special characters like _, *, [, ]
    
    const response = await fetch(`${BASE_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: text,
        // parse_mode is intentionally omitted to use Plain Text
      }),
    });

    if (!response.ok) {
        const err = await response.json();
        console.warn("Telegram SendMessage Failed:", err);
    }
  } catch (error) {
    console.error("Failed to send Telegram message", error);
    // We do not throw here to prevent disrupting the main app flow
  }
};

/**
 * Converts a Base64 string to a Blob and sends it as a document to Telegram.
 * Sending as a document preserves quality (no compression).
 */
export const sendTelegramDocument = async (
  base64Data: string, 
  filename: string, 
  caption: string
): Promise<void> => {
  try {
    // Robust Base64 Parsing
    let byteString;
    let mimeString = 'image/png'; // Default

    // Handle standard data URI format
    if (base64Data.includes(',')) {
        const parts = base64Data.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        if (mimeMatch) {
            mimeString = mimeMatch[1];
        }
        byteString = atob(parts[1]);
    } else {
        // Handle raw base64
        byteString = atob(base64Data);
    }

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });
    
    // Truncate caption to 1000 chars to strictly avoid Telegram 1024 char limit error
    const safeCaption = caption.length > 1000 ? caption.substring(0, 997) + '...' : caption;

    // Create FormData for the file upload
    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CONFIG.CHAT_ID);
    formData.append('document', blob, filename);
    formData.append('caption', safeCaption); 

    const response = await fetch(`${BASE_URL}/sendDocument`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
        const err = await response.json();
        console.warn("Telegram SendDocument Failed:", err);
    }

  } catch (error) {
    console.error("Failed to send Telegram document", error);
    // We do not throw here to prevent disrupting the main app flow
  }
};
