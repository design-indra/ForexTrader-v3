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
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}></div>
        <div>
          <h2 className="font-semibold text-white text-sm">Bot Control</h2>
          <p className="text-xs text-gray-500 mt-0.5">Status: <span className={`font-medium ${isRunning ? "text-emerald-400" : "text-red-400"}`}>{isRunning ? "Running" : "Stopped"} ({isDemo ? "Demo" : "Live"})</span></p>
        </div>
      </div>
      <div className="flex gap-3 ml-auto items-center">
        <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-400">
          <input type="checkbox" checked={isDemo} onChange={(e) => setIsDemo(e.target.checked)} className="w-4 h-4 accent-blue-500" />
          Demo Mode
        </label>
        <button onClick={toggle} className={`px-5 py-2 rounded-lg text-white font-medium text-sm transition-colors ${isRunning ? "bg-red-600 hover:bg-red-700 border border-red-500" : "bg-emerald-600 hover:bg-emerald-700 border border-emerald-500"}`}>
          {isRunning ? "⏹ Stop Bot" : "▶ Start Bot"}
        </button>
      </div>
    </div>
  );
}
