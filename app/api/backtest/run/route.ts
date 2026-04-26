import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/serverSession";
import { runBacktest } from "@/lib/backtester";
import { DEFAULT_STRATEGY_PARAMS } from "@/lib/tradingLogic";
import { z } from "zod";

const BacktestSchema = z.object({
  pair: z.string().default("EUR/USD"),
  level: z.number().int().min(1).max(5).default(3),
  startDate: z.string(),
  endDate: z.string(),
});

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = BacktestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  // Simulated prices
  const prices = Array.from({ length: 300 }, (_, i) => {
    let p = 1.08;
    p += (Math.sin(i / 10) * 0.005) + (Math.random() - 0.5) * 0.002;
    return parseFloat(p.toFixed(5));
  });

  const result = runBacktest(prices, DEFAULT_STRATEGY_PARAMS);
  return NextResponse.json({ ...result, pair: parsed.data.pair, level: parsed.data.level });
}
