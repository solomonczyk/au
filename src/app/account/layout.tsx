"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/account", icon: "dashboard", label: "Dashboard" },
  { href: "/account/wallet", icon: "account_balance_wallet", label: "Wallet" },
  { href: "/account/orders", icon: "receipt_long", label: "Orders" },
  { href: "/account/settings", icon: "settings", label: "Settings" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-outline-variant flex-col py-8 px-4">
        <div className="mb-10 px-2">
          <span className="font-headline-md text-headline-md text-primary tracking-widest uppercase">
            AURUM
          </span>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            Client Portal
          </p>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 font-label-caps text-label-caps transition-colors duration-200 ${
                  isActive
                    ? "text-primary bg-surface-container-high border-r-2 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container-lowest/98 backdrop-blur-lg border-t border-outline-variant">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center ${
                isActive ? "text-primary" : "text-on-surface-variant opacity-60"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-caps text-[10px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">{children}</main>
    </div>
  );
}
