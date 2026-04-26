"use client";
import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "./StatsCard";
import { TradeTable } from "./TradeTable";
import { EquityChart } from "@/components/charts/EquityChart";
import { BacktestForm } from "./BacktestForm";
import { StrategyCustomizerForm } from "./StrategyCustomizerForm";
import { TelegramSettingsForm } from "./TelegramSettingsForm";
import { useState } from "react";

type Tab = "overview" | "backtest" | "strategy" | "settings";

export function Overview() {
  const [tab, setTab] = useState<Tab>("overview");

  const { data: overview, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: () => fetch("/api/dashboard/overview").then((r) => r.json()),
    refetchInterval: 10_000,
    enabled: tab === "overview",
  });

  const { data: tradesData } = useQuery({
    queryKey: ["trades"],
    queryFn: () => fetch("/api/dashboard/trades").then((r) => r.json()),
    enabled: tab === "overview",
  });

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "backtest", label: "Backtest" },
    { key: "strategy", label: "Strategy" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div>
      {/* Tab nav */}
      <div className="flex gap-2 mb-6 border-b dark:border-gray-700">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard label="Total Return" value={`${overview?.totalReturn?.toFixed(2) ?? 0}%`} trend={overview?.totalReturn >= 0 ? "up" : "down"} />
              <StatsCard label="Win Rate" value={`${overview?.winRate?.toFixed(1) ?? 0}%`} trend="neutral" />
              <StatsCard label="Max Drawdown" value={`${overview?.maxDrawdown?.toFixed(2) ?? 0}%`} trend="down" />
              <StatsCard label="Total Trades" value={overview?.tradesCount ?? 0} trend="neutral" />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-4">Equity Curve</h2>
            <EquityChart data={overview?.equityCurve ?? []} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-4">Trade History</h2>
            <TradeTable trades={tradesData?.trades ?? []} />
          </div>
        </div>
      )}

      {/* Backtest Tab */}
      {tab === "backtest" && <BacktestForm />}

      {/* Strategy Tab */}
      {tab === "strategy" && <StrategyCustomizerForm />}

      {/* Settings Tab */}
      {tab === "settings" && <TelegramSettingsForm />}
    </div>
  );
}
