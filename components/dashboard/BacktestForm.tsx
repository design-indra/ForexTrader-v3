"use client";
import { useState } from "react";
import { EquityChart } from "@/components/charts/EquityChart";
import { toast } from "sonner";

export function BacktestForm() {
  const [pair, setPair] = useState("EUR/USD");
  const [level, setLevel] = useState(3);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function runBacktest() {
    setLoading(true);
    try {
      const res = await fetch("/api/backtest/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pair, level, startDate, endDate }),
      });
      const data = await res.json();
      setResult(data);
      toast.success("Backtest selesai!");
    } catch {
      toast.error("Backtest gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
        <h2 className="font-semibold mb-4">Backtest Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Currency Pair</label>
            <select value={pair} onChange={(e) => setPair(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
              <option>EUR/USD</option>
              <option>GBP/USD</option>
              <option>USD/JPY</option>
              <option>AUD/USD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Strategy Level (1-5)</label>
            <input type="number" min={1} max={5} value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600" />
          </div>
        </div>
        <button onClick={runBacktest} disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50">
          {loading ? "Running..." : "Run Backtest"}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow space-y-4">
          <h2 className="font-semibold">Backtest Results – {result.pair}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Return", value: `${result.totalReturn?.toFixed(2)}%` },
              { label: "Win Rate", value: `${result.winRate?.toFixed(1)}%` },
              { label: "Max Drawdown", value: `${result.maxDrawdown?.toFixed(2)}%` },
              { label: "Trades", value: result.tradesCount },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-xl font-bold mt-1">{s.value}</p>
              </div>
            ))}
          </div>
          <EquityChart data={result.equityCurve ?? []} />
        </div>
      )}
    </div>
  );
}
