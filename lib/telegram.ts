import TelegramBot from "node-telegram-bot-api";
import { logger } from "./logger";

let bot: TelegramBot | null = null;

function getBot(token: string) {
  if (!bot) bot = new TelegramBot(token);
  return bot;
}

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  message: string
): Promise<void> {
  try {
    const b = getBot(token);
    await b.sendMessage(chatId, message, { parse_mode: "Markdown" });
    logger.info({ chatId }, "Telegram message sent");
  } catch (err: any) {
    logger.error({ error: err.message }, "Telegram send failed");
  }
}
