"use client";

type Trade = {
  id: number;
  symbol: string;
  action: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  createdAt: string;
};

export function TradeTable({ trades }: { trades: Trade[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="py-2 text-left">Symbol</th>
            <th className="py-2 text-left">Action</th>
            <th className="py-2 text-right">Entry</th>
            <th className="py-2 text-right">Exit</th>
            <th className="py-2 text-right">PnL</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => (
            <tr key={t.id} className="border-b dark:border-gray-700">
              <td className="py-2">{t.symbol}</td>
              <td className={`py-2 font-medium ${t.action === "BUY" ? "text-green-600" : "text-red-600"}`}>{t.action}</td>
              <td className="py-2 text-right">{t.entryPrice.toFixed(5)}</td>
              <td className="py-2 text-right">{t.exitPrice?.toFixed(5) ?? "-"}</td>
              <td className={`py-2 text-right font-medium ${t.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                {t.pnl >= 0 ? "+" : ""}{t.pnl.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
