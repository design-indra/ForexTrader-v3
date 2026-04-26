import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/serverSession";
import { z } from "zod";

const StrategySchema = z.object({
  rsiPeriod: z.number().int().min(5).max(50),
  emaPeriod: z.number().int().min(5).max(200),
  atrMultiplier: z.number().min(0.5).max(5),
  winMultiplier: z.number().min(1).max(5),
  maxLossStreak: z.number().int().min(1).max(20),
  breakevenBuffer: z.number().min(0).max(0.01),
  maxHoldMinutes: z.number().int().min(5).max(1440),
});

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = StrategySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Persist to DB would go here (prisma.userSettings.upsert)
  return NextResponse.json({ success: true, params: parsed.data });
}
