"use client";

type StatsCardProps = {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
};

export function StatsCard({ label, value, trend = "neutral" }: StatsCardProps) {
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500";
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${trendColor}`}>{value}</p>
    </div>
  );
}
