"use client";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        ForexTrader v3
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {session?.user?.email ?? ""}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
