import type { StrategyParams } from "./tradingLogic";
import { analyzeSignal } from "./tradingLogic";

export type BacktestTrade = {
  index: number;
  action: "BUY" | "SELL";
  price: number;
  pnl: number;
};

export type BacktestResult = {
  totalReturn: number;
  winRate: number;
  maxDrawdown: number;
  tradesCount: number;
  equityCurve: number[];
};

export function runBacktest(prices: number[], params: StrategyParams, initialCapital = 10_000): BacktestResult {
  let capital = initialCapital;
  const equityCurve: number[] = [capital];
  const trades: BacktestTrade[] = [];
  let wins = 0;
  let peak = capital;
  let maxDrawdown = 0;

  for (let i = params.emaPeriod + 5; i < prices.length - 1; i++) {
    const slice = prices.slice(0, i + 1);
    const signal = analyzeSignal(slice, params);
    if (signal.action === "HOLD") continue;

    const entry = prices[i];
    const exit = prices[i + 1];
    const pnl = signal.action === "BUY" ? (exit - entry) / entry : (entry - exit) / entry;
    const gain = capital * 0.02 * pnl; // 2% risk per trade
    capital += gain;

    if (gain > 0) wins++;
    trades.push({ index: i, action: signal.action, price: entry, pnl: gain });
    equityCurve.push(capital);

    if (capital > peak) peak = capital;
    const dd = (peak - capital) / peak;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }

  return {
    totalReturn: ((capital - initialCapital) / initialCapital) * 100,
    winRate: trades.length ? (wins / trades.length) * 100 : 0,
    maxDrawdown: maxDrawdown * 100,
    tradesCount: trades.length,
    equityCurve,
  };
}
