"use client";
import { useState } from "react";
import { toast } from "sonner";

export function BotControl() {
  const [isRunning, setIsRunning] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  function toggle() {
    setIsRunning((v) => !v);
    toast.success(isRunning ? "Bot dihentikan" : `Bot dimulai (${isDemo ? "Demo" : "Live"})`);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col md:flex-row items-start md:items-center gap-4">
      <div>
        <h2 className="font-semibold">Bot Control</h2>
        <p className="text-xs text-gray-400 mt-1">
          Status:{" "}
          <span className={`font-medium ${isRunning ? "text-green-500" : "text-red-500"}`}>
            {isRunning ? "Running" : "Stopped"} ({isDemo ? "Demo" : "Live"})
          </span>
        </p>
      </div>
      <div className="flex gap-3 ml-auto">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={isDemo} onChange={(e) => setIsDemo(e.target.checked)}
            className="w-4 h-4" />
          Demo Mode
        </label>
        <button onClick={toggle}
          className={`px-5 py-2 rounded-lg text-white font-medium text-sm ${
            isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}>
          {isRunning ? "Stop Bot" : "Start Bot"}
        </button>
      </div>
    </div>
  );
}
