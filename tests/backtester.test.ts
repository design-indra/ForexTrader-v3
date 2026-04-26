import { runBacktest } from "../lib/backtester";
import { DEFAULT_STRATEGY_PARAMS } from "../lib/tradingLogic";

function generateTestPrices(n: number): number[] {
  let price = 1.08;
  return Array.from({ length: n }, (_, i) => {
    price += Math.sin(i / 15) * 0.001;
    return parseFloat(price.toFixed(5));
  });
}

describe("runBacktest", () => {
  it("should return a result with required fields", () => {
    const prices = generateTestPrices(150);
    const result = runBacktest(prices, DEFAULT_STRATEGY_PARAMS);

    expect(result).toHaveProperty("totalReturn");
    expect(result).toHaveProperty("winRate");
    expect(result).toHaveProperty("maxDrawdown");
    expect(result).toHaveProperty("tradesCount");
    expect(result).toHaveProperty("equityCurve");
    expect(Array.isArray(result.equityCurve)).toBe(true);
  });

  it("winRate should be between 0 and 100", () => {
    const prices = generateTestPrices(150);
    const result = runBacktest(prices, DEFAULT_STRATEGY_PARAMS);
    expect(result.winRate).toBeGreaterThanOrEqual(0);
    expect(result.winRate).toBeLessThanOrEqual(100);
  });

  it("maxDrawdown should be non-negative", () => {
    const prices = generateTestPrices(150);
    const result = runBacktest(prices, DEFAULT_STRATEGY_PARAMS);
    expect(result.maxDrawdown).toBeGreaterThanOrEqual(0);
  });
});
