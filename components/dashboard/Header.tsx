"use client";
import { useSession, signOut } from "next-auth/react";
export function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-sm text-gray-400">Live</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">{session?.user?.email ?? ""}</span>
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors">Sign Out</button>
      </div>
    </header>
  );
}
