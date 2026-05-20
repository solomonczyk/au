"use client";

import { useState, useEffect } from "react";

interface PriceData {
  xauUsd: number;
  changeUsd: number;
  changePct: number;
  direction: "up" | "down" | "flat";
}

export function PriceCards() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prices/current")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setPrice(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-container-low border border-outline-variant p-8 animate-pulse">
            <div className="h-4 w-24 bg-surface-container-high mb-4" />
            <div className="h-8 w-32 bg-surface-container-high mb-2" />
            <div className="h-4 w-16 bg-surface-container-high" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      pair: "XAU/USD",
      price: price?.xauUsd ?? 0,
      change: price?.changePct ?? 0,
      direction: price?.direction ?? "flat",
      prefix: "$",
    },
    {
      pair: "XAU/EUR",
      price: price ? price.xauUsd * 0.92 : 0,
      change: price?.changePct ?? 0,
      direction: price?.direction ?? "flat",
      prefix: "€",
    },
    {
      pair: "XAU/GBP",
      price: price ? price.xauUsd * 0.79 : 0,
      change: price ? -(price.changePct) : 0,
      direction: price ? (price.changePct > 0 ? "down" : "up") : "flat",
      prefix: "£",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      {cards.map((item) => (
        <div
          key={item.pair}
          className="bg-surface-container-low border border-outline-variant p-8"
        >
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            {item.pair}
          </span>
          <div className="mt-4 flex items-end justify-between">
            <span className="font-headline-md text-headline-md text-on-surface">
              {item.prefix}
              {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`font-label-caps text-label-caps flex items-center gap-1 ${
                item.direction === "up" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {item.direction === "up" ? "arrow_drop_up" : "arrow_drop_down"}
              </span>
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
