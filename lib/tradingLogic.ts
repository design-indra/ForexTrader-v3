import { logger } from "./logger";
import { apiRequest } from "./apiClient";

export type TradeSignal = {
  action: "BUY" | "SELL" | "HOLD";
  symbol: string;
  reason: string;
};

export type StrategyParams = {
  rsiPeriod: number;
  emaPeriod: number;
  atrMultiplier: number;
  winMultiplier: number;
  maxLossStreak: number;
  breakevenBuffer: number;
  maxHoldMinutes: number;
};

export const DEFAULT_STRATEGY_PARAMS: StrategyParams = {
  rsiPeriod: 14,
  emaPeriod: 20,
  atrMultiplier: 2.0,
  winMultiplier: 1.5,
  maxLossStreak: 3,
  breakevenBuffer: 0.0005,
  maxHoldMinutes: 240,
};

export function analyzeSignal(prices: number[], params: StrategyParams): TradeSignal {
  if (prices.length < params.emaPeriod + 5) {
    return { action: "HOLD", symbol: "EUR/USD", reason: "Insufficient data" };
  }

  const latest = prices[prices.length - 1];
  const ema = prices.slice(-params.emaPeriod).reduce((a, b) => a + b, 0) / params.emaPeriod;

  const gains = prices.slice(-params.rsiPeriod).map((p, i, arr) => {
    if (i === 0) return 0;
    return Math.max(0, p - arr[i - 1]);
  });
  const losses = prices.slice(-params.rsiPeriod).map((p, i, arr) => {
    if (i === 0) return 0;
    return Math.max(0, arr[i - 1] - p);
  });
  const avgGain = gains.reduce((a, b) => a + b, 0) / params.rsiPeriod;
  const avgLoss = losses.reduce((a, b) => a + b, 0) / params.rsiPeriod;
  const rsi = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

  logger.info({ latest, ema, rsi }, "Signal analysis");

  if (latest > ema && rsi < 70) return { action: "BUY", symbol: "EUR/USD", reason: `Price above EMA, RSI=${rsi.toFixed(1)}` };
  if (latest < ema && rsi > 30) return { action: "SELL", symbol: "EUR/USD", reason: `Price below EMA, RSI=${rsi.toFixed(1)}` };
  return { action: "HOLD", symbol: "EUR/USD", reason: "No clear signal" };
}
