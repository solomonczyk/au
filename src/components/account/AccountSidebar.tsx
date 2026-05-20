"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navSections = [
  {
    label: "Account",
    items: [
      { href: "/account", icon: "dashboard", label: "Dashboard" },
      { href: "/account/orders", icon: "receipt_long", label: "My Orders" },
      { href: "/account/wishlist", icon: "favorite", label: "Wishlist" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/account/addresses", icon: "location_on", label: "Addresses" },
      { href: "/account/profile", icon: "person", label: "Profile" },
      { href: "/account/settings", icon: "settings", label: "Notifications" },
    ],
  },
];

export function AccountSidebar({ user }: { user: { name?: string | null; email?: string | null } }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/account") return pathname === "/account";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-surface-container-low border-r border-outline-variant">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-outline-variant">
        <Link href="/account">
          <span className="font-headline-md text-headline-md text-primary tracking-widest uppercase">
            AUREUM
          </span>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-0.5">
            Client Portal
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="px-6 py-2 font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
              {section.label}
            </div>
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 mx-2 px-4 py-2.5 font-label-caps text-label-caps transition-all duration-200 rounded ${
                    active
                      ? "text-primary bg-primary/5 border-l-2 border-primary rounded-none pl-3"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-higher"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <div className="my-2 border-t border-outline-variant/30 mx-4" />
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-5 border-t border-outline-variant">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="font-body-sm text-body-sm text-on-surface truncate">{user.name ?? "User"}</div>
            <div className="font-body-sm text-[11px] text-on-surface-variant truncate">{user.email}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant hover:text-error transition-colors w-full"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
