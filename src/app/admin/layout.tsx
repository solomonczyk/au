"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/products", icon: "inventory_2", label: "Products" },
  { href: "/admin/orders", icon: "receipt_long", label: "Orders" },
  { href: "/admin/compliance", icon: "verified_user", label: "Compliance" },
  { href: "/admin/content", icon: "article", label: "Content" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden md:flex w-64 bg-surface border-r border-outline-variant flex-col py-8 px-4">
        <div className="mb-10 px-2">
          <span className="font-headline-md text-headline-md text-primary tracking-widest uppercase">AURUM</span>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 font-label-caps text-label-caps transition-colors ${
                  isActive
                    ? "text-primary bg-surface-container-high border-r-2 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 border-t border-outline-variant">
          <Link href="/account" className="flex items-center gap-3 p-3 font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Site
          </Link>
        </div>
      </aside>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
