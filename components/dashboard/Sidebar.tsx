"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/backtest", label: "Backtest", icon: "🔬" },
  { href: "/strategy", label: "Strategy", icon: "⚙️" },
  { href: "/settings", label: "Settings", icon: "🔧" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-3 z-40 bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-30" />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-56 bg-white dark:bg-gray-800 shadow-lg z-40 flex flex-col transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto md:shadow-none`}>
        <div className="p-5 border-b dark:border-gray-700">
          <span className="text-lg font-bold text-blue-600">ForexTrader v3</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t dark:border-gray-700">
          <button onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
            🚪 Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
