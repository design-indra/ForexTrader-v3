import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/serverSession";
import { sendTelegramMessage } from "@/lib/telegram";
import { z } from "zod";

const TelegramSchema = z.object({
  botToken: z.string().min(10),
  chatId: z.string().min(1),
  sendTest: z.boolean().optional(),
});

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = TelegramSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { botToken, chatId, sendTest } = parsed.data;

  if (sendTest) {
    await sendTelegramMessage(botToken, chatId, "ForexTrader v3 – Test message OK");
  }

  return NextResponse.json({ success: true });
}
