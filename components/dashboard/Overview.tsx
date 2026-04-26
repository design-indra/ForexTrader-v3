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
  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "backtest", label: "Backtest", icon: "🔬" },
    { key: "strategy", label: "Strategy", icon: "⚙️" },
    { key: "settings", label: "Settings", icon: "🔧" },
  ];
  return (
    <div>
      <div className="flex gap-1 mb-6 bg-gray-900 border border-gray-800 rounded-xl p-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${tab === t.key ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"}`}>
            <span>{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>
      {tab === "overview" && (
        <div className="space-y-5">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />)}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <StatsCard label="Total Return" value={`${overview?.totalReturn?.toFixed(2) ?? 0}%`} trend={overview?.totalReturn >= 0 ? "up" : "down"} icon="💹" />
              <StatsCard label="Win Rate" value={`${overview?.winRate?.toFixed(1) ?? 0}%`} trend="neutral" icon="🎯" />
              <StatsCard label="Max Drawdown" value={`${overview?.maxDrawdown?.toFixed(2) ?? 0}%`} trend="down" icon="📉" />
              <StatsCard label="Total Trades" value={overview?.tradesCount ?? 0} trend="neutral" icon="🔄" />
            </div>
          )}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2"><span>📈</span> Equity Curve</h2>
            <EquityChart data={overview?.equityCurve ?? []} />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2"><span>📋</span> Trade History</h2>
            <TradeTable trades={tradesData?.trades ?? []} />
          </div>
        </div>
      )}
      {tab === "backtest" && <BacktestForm />}
      {tab === "strategy" && <StrategyCustomizerForm />}
      {tab === "settings" && <TelegramSettingsForm />}
    </div>
  );
}
