import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/serverSession";
import { runBacktest } from "@/lib/backtester";
import { DEFAULT_STRATEGY_PARAMS } from "@/lib/tradingLogic";

// Simulated price data (replace with real broker API call)
function generatePrices(n: number): number[] {
  let price = 1.08;
  return Array.from({ length: n }, () => {
    price += (Math.random() - 0.5) * 0.001;
    return parseFloat(price.toFixed(5));
  });
}

export async function GET() {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prices = generatePrices(200);
  const result = runBacktest(prices, DEFAULT_STRATEGY_PARAMS);

  return NextResponse.json(result);
}
