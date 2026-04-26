"use client";
import { useState } from "react";
import { toast } from "sonner";

const DEFAULT = {
  rsiPeriod: 14,
  emaPeriod: 20,
  atrMultiplier: 2.0,
  winMultiplier: 1.5,
  maxLossStreak: 3,
  breakevenBuffer: 0.0005,
  maxHoldMinutes: 240,
};

export function StrategyCustomizerForm() {
  const [params, setParams] = useState(DEFAULT);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof DEFAULT, value: number) {
    setParams((p) => ({ ...p, [key]: value }));
  }

  async function save() {
    setLoading(true);
    try {
      const res = await fetch("/api/settings/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error();
      toast.success("Strategy params disimpan!");
    } catch {
      toast.error("Gagal menyimpan.");
    } finally {
      setLoading(false);
    }
  }

  const fields: { key: keyof typeof DEFAULT; label: string; step: number; min: number; max: number }[] = [
    { key: "rsiPeriod", label: "RSI Period", step: 1, min: 5, max: 50 },
    { key: "emaPeriod", label: "EMA Period", step: 1, min: 5, max: 200 },
    { key: "atrMultiplier", label: "ATR Multiplier", step: 0.1, min: 0.5, max: 5 },
    { key: "winMultiplier", label: "Win Multiplier (RR)", step: 0.1, min: 1, max: 5 },
    { key: "maxLossStreak", label: "Max Loss Streak", step: 1, min: 1, max: 20 },
    { key: "breakevenBuffer", label: "Breakeven Buffer", step: 0.0001, min: 0, max: 0.01 },
    { key: "maxHoldMinutes", label: "Max Hold (minutes)", step: 5, min: 5, max: 1440 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
      <h2 className="font-semibold mb-6">Strategy Customizer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm text-gray-500 mb-1">{f.label}</label>
            <input
              type="number"
              step={f.step}
              min={f.min}
              max={f.max}
              value={params[f.key]}
              onChange={(e) => update(f.key, parseFloat(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ))}
      </div>
      <button onClick={save} disabled={loading}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50">
        {loading ? "Saving..." : "Save Strategy"}
      </button>
    </div>
  );
}
