"use client";
type StatsCardProps = { label: string; value: string | number; trend?: "up" | "down" | "neutral"; icon?: string; };
export function StatsCard({ label, value, trend = "neutral", icon }: StatsCardProps) {
  const trendColor = trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-blue-400";
  const border = trend === "up" ? "border-emerald-500/20" : trend === "down" ? "border-red-500/20" : "border-blue-500/20";
  return (
    <div className={`bg-gray-900 border ${border} rounded-xl p-4 shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500 uppercase tracking-widest">{label}</p>
        {icon && <span>{icon}</span>}
      </div>
      <p className={`text-2xl font-bold ${trendColor}`}>{value}</p>
    </div>
  );
}
