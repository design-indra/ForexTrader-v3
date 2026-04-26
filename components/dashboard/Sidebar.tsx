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
      <button onClick={() => setOpen(true)} className="md:hidden fixed top-4 left-4 z-40 bg-gray-900 border border-gray-700 p-2 rounded-lg text-gray-300">☰</button>
      {open && <div onClick={() => setOpen(false)} className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm" />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-gray-900 border-r border-gray-800 z-40 flex flex-col transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto`}>
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="text-base font-bold text-white">ForexTrader <span className="text-blue-500">v3</span></span>
          </div>
          <p className="text-xs text-gray-500 mt-1">MIFX Trading Bot</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${pathname === item.href ? "bg-blue-600/20 text-blue-400 font-medium border border-blue-500/30" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">🚪 Sign Out</button>
        </div>
      </aside>
    </>
  );
}
