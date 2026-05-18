"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";

export function Header() {
  const itemCount = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));

  return (
    <header className="bg-surface/95 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-gutter h-24 max-w-container-max mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-display-lg leading-none tracking-tighter text-primary"
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
          <Link
            href="/account"
            className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-all px-4 py-2 hidden sm:inline-block"
          >
            Sign In
          </Link>
          <Link
            href="/account"
            className="bg-primary-container text-on-primary-container px-6 py-3 font-label-caps text-label-caps hover:bg-primary transition-all hidden sm:inline-block"
          >
            Open Account
          </Link>
        </div>
      </div>
    </header>
  );
}
