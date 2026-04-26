"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type EquityChartProps = { data: number[] };

export function EquityChart({ data }: EquityChartProps) {
  const chartData = data.map((v, i) => ({ i, equity: v }));
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="i" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="equity" stroke="#2563EB" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
