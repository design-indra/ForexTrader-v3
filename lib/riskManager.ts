import { logger } from "./logger";

export type RiskState = {
  lossStreak: number;
  isPaused: boolean;
  dailyLoss: number;
  openPositions: number;
};

export function checkRisk(state: RiskState, maxLossStreak: number): { allowed: boolean; reason: string } {
  if (state.isPaused) return { allowed: false, reason: "Bot is paused" };
  if (state.openPositions >= 1) return { allowed: false, reason: "Max 1 position allowed" };
  if (state.lossStreak >= maxLossStreak) {
    logger.warn({ lossStreak: state.lossStreak }, "Loss streak limit reached – auto-pause");
    return { allowed: false, reason: `Loss streak ${state.lossStreak} >= ${maxLossStreak}` };
  }
  return { allowed: true, reason: "OK" };
}
