"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";

export default function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="max-w-2xl mx-auto px-gutter py-section-padding-lg text-center">
      <div className="bg-surface-container-low border border-outline-variant p-12">
        <span className="material-symbols-outlined text-[64px] text-emerald-400 mb-4 block">check_circle</span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Payment Successful</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          Thank you for your purchase. You will receive a confirmation email shortly.
        </p>
        <Link
          href="/account/orders"
          className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps inline-block hover:bg-primary-fixed-dim transition-all"
        >
          View Orders
        </Link>
      </div>
    </main>
  );
}
