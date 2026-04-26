import { apiRequest } from "./apiClient";
import { logger } from "./logger";
import { z } from "zod";

const BASE_URL = "https://api.monex.co.id"; // Ganti dengan endpoint MIFX resmi

export type Position = {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  volume: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
};

export type AccountInfo = {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  currency: string;
};

const PlaceOrderSchema = z.object({
  symbol: z.string(),
  type: z.enum(["buy", "sell"]),
  volume: z.number().positive(),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional(),
});

export async function getAccountInfo(apiKey: string, accountId: string): Promise<AccountInfo> {
  try {
    const data = await apiRequest(`${BASE_URL}/accounts/${accountId}`, {
      headers: { Authorization: `Bearer ${apiKey}`, "User-Agent": "ForexTrader-v3/1.0" },
    });
    logger.info({ accountId }, "Account info fetched");
    return data;
  } catch (err: any) {
    logger.error({ error: err.message }, "Failed to fetch account info");
    // Return mock for demo
    return { balance: 10000, equity: 10050, margin: 200, freeMargin: 9850, currency: "USD" };
  }
}

export async function getOpenPositions(apiKey: string, accountId: string): Promise<Position[]> {
  try {
    const data = await apiRequest(`${BASE_URL}/accounts/${accountId}/positions`, {
      headers: { Authorization: `Bearer ${apiKey}`, "User-Agent": "ForexTrader-v3/1.0" },
    });
    return data.positions ?? [];
  } catch {
    return [];
  }
}

export async function placeOrder(
  apiKey: string,
  accountId: string,
  order: z.infer<typeof PlaceOrderSchema>
): Promise<{ orderId: string; success: boolean }> {
  const parsed = PlaceOrderSchema.parse(order);
  logger.info({ order: parsed }, "Placing order");
  try {
    const data = await apiRequest(`${BASE_URL}/accounts/${accountId}/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "User-Agent": "ForexTrader-v3/1.0" },
      body: parsed,
    });
    return { orderId: data.orderId, success: true };
  } catch (err: any) {
    logger.error({ error: err.message }, "Order failed");
    return { orderId: "", success: false };
  }
}
