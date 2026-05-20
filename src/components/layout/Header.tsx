"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/store/cart";

export function Header() {
  const { data: session } = useSession();
  const itemCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-surface/95 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-gutter h-24 max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-display-lg-mobile md:text-display-lg leading-none tracking-tighter text-primary"
          >
            AUREUM GOLD
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/catalog"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              Buy
            </Link>
            <Link
              href="/sell"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              Sell
            </Link>
            <Link
              href="/prices"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              Prices
            </Link>
            <Link
              href="/about"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              Why Gold
            </Link>
            <Link
              href="/contact"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all px-4 py-2"
          >
            <span className="material-symbols-outlined text-2xl align-middle">shopping_cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {session?.user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-surface-container-low border border-outline-variant px-4 py-2 hover:border-primary transition-colors"
              >
                <span className="material-symbols-outlined text-primary">account_circle</span>
                <span className="font-label-caps text-label-caps text-on-surface max-w-[100px] truncate">
                  {session.user.name || session.user.email}
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  {userMenuOpen ? "expand_less" : "expand_more"}
                </span>
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-56 bg-surface-container-low border border-outline-variant shadow-xl z-20">
                    <div className="py-2">
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        Orders
                      </Link>
                      <Link
                        href="/account/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        Wishlist
                      </Link>
                      <Link
                        href="/account/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        Settings
                      </Link>
                      <hr className="border-outline-variant my-2" />
                      <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full text-left px-4 py-3 font-body-sm text-body-sm text-error hover:bg-surface-container-high transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all px-4 py-2 hidden sm:inline-block"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary-container text-on-primary-container px-6 py-3 font-label-caps text-label-caps hover:bg-primary transition-all hidden sm:inline-block"
              >
                Open Account
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-24 z-50 bg-surface/98 backdrop-blur-lg">
          <nav className="flex flex-col items-center justify-start pt-12 gap-0">
            {[
              { href: "/catalog", label: "Buy" },
              { href: "/sell", label: "Sell" },
              { href: "/prices", label: "Prices" },
              { href: "/about", label: "Why Gold" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-5 font-headline-sm text-headline-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all border-b border-outline-variant/30"
              >
                {item.label}
              </Link>
            ))}
            <div className="w-full px-8 mt-8 space-y-4">
              {session?.user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center border border-outline-variant text-on-surface py-4 font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="block w-full text-center bg-surface-container-high text-on-surface py-4 font-label-caps text-label-caps hover:bg-error-container hover:text-on-error-container transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center border border-outline-variant text-on-surface py-4 font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center bg-primary text-on-primary py-4 font-label-caps text-label-caps hover:bg-primary-container transition-all"
                  >
                    Open Account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
