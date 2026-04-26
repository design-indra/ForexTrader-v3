import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/serverSession";

export async function GET() {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Return mock trades (replace with DB query)
  const trades = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    symbol: "EUR/USD",
    action: i % 2 === 0 ? "BUY" : "SELL",
    entryPrice: 1.0800 + i * 0.001,
    exitPrice: 1.0820 + i * 0.001,
    pnl: i % 3 === 0 ? -20 : 35,
    createdAt: new Date(Date.now() - i * 3600_000).toISOString(),
  }));

  return NextResponse.json({ trades, total: trades.length });
}
