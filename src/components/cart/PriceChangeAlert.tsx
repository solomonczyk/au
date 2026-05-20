"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";

interface PriceMap {
  [productId: string]: number;
}

export function PriceChangeAlert() {
  const items = useCartStore((s) => s.items);
  const [changes, setChanges] = useState<{ name: string; oldPrice: number; newPrice: number }[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (items.length === 0 || dismissed) return;

    const productIds = items.map((i) => i.productId).join(",");
    fetch(`/api/products/price-check?ids=${productIds}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.success) return;
        const currentPrices: PriceMap = json.data;
        const priceChanges: { name: string; oldPrice: number; newPrice: number }[] = [];

        for (const item of items) {
          const currentPrice = currentPrices[item.productId];
          if (currentPrice && Math.abs(currentPrice - item.price) > currentPrice * 0.02) {
            priceChanges.push({
              name: item.name,
              oldPrice: item.price,
              newPrice: currentPrice,
            });
          }
        }

        if (priceChanges.length > 0) {
          setChanges(priceChanges);
        }
      })
      .catch(() => {});
  }, [items, dismissed]);

  if (changes.length === 0 || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-surface-container-high border border-outline-variant shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h4 className="font-label-caps text-label-caps uppercase text-warning">Price Update</h4>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Dismiss"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          Some items in your cart have changed in price since you added them:
        </p>
        <ul className="space-y-2">
          {changes.map((c, i) => (
            <li key={i} className="font-body-sm text-body-sm">
              <span className="text-on-surface">{c.name}</span>
              <br />
              <span className="text-on-surface-variant">
                ${c.oldPrice.toFixed(2)} → <span className={c.newPrice > c.oldPrice ? "text-red-400" : "text-emerald-400"}>${c.newPrice.toFixed(2)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
