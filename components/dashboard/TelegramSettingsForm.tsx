"use client";
import { useState } from "react";
import { toast } from "sonner";

export function TelegramSettingsForm() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(sendTest = false) {
    setLoading(true);
    try {
      const res = await fetch("/api/settings/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botToken, chatId, sendTest }),
      });
      if (!res.ok) throw new Error();
      toast.success(sendTest ? "Test message terkirim!" : "Telegram settings disimpan!");
    } catch {
      toast.error("Gagal – cek token & chat ID.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow max-w-lg">
      <h2 className="font-semibold mb-6">Telegram Notifications</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Bot Token</label>
          <input type="text" placeholder="123456:ABC-DEF..." value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Chat ID</label>
          <input type="text" placeholder="987654321" value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <p className="text-xs text-gray-400">
          Buat bot via @BotFather → copy token. Chat ID: kirim pesan ke bot lalu buka
          https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates
        </p>
        <div className="flex gap-3">
          <button onClick={() => save(false)} disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50">
            Save
          </button>
          <button onClick={() => save(true)} disabled={loading}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm disabled:opacity-50">
            Send Test Message
          </button>
        </div>
      </div>
    </div>
  );
}
