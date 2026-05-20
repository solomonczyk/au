"use client";

import { useState, useEffect } from "react";

interface PriceData {
  xauUsd: number;
  changeUsd: number;
  changePct: number;
  direction: "up" | "down" | "flat";
}

export function GoldTicker() {
  const [price, setPrice] = useState<PriceData | null>(null);

  useEffect(() => {
    function fetchPrice() {
      fetch("/api/prices/current")
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setPrice(json.data);
        })
        .catch(() => {});
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const changeColor =
    price?.direction === "up"
      ? "text-emerald-400"
      : price?.direction === "down"
        ? "text-red-400"
        : "text-on-surface-variant";

  const arrow =
    price?.direction === "up"
      ? "M12 4l8 12H4z"
      : price?.direction === "down"
        ? "M12 20l-8-12h16z"
        : "";

  return (
    <div className="bg-surface-container-lowest border-b border-outline-variant/30 py-3 overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter flex items-center justify-center space-x-12 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-on-surface-variant">XAU/USD</span>
          {price ? (
            <>
              <span className="font-body-md text-body-md font-bold text-on-surface">
                ${price.xauUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })} /oz
              </span>
              <span className={`flex items-center ${changeColor} font-label-caps text-label-caps`}>
                {arrow && (
                  <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={arrow} />
                  </svg>
                )}
                {price.changePct >= 0 ? "+" : ""}
                {price.changePct}%
              </span>
            </>
          ) : (
            <span className="font-body-md text-body-md text-on-surface-variant animate-pulse">
              Loading...
            </span>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-on-surface-variant">GOLD BARS (1oz)</span>
          <span className="font-body-md text-body-md text-on-surface">
            {price
              ? `$${(price.xauUsd * 1.03).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
              : "---"}
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="font-label-caps text-label-caps text-on-surface-variant">GOLD COINS (Eagle)</span>
          <span className="font-body-md text-body-md text-on-surface">
            {price
              ? `$${(price.xauUsd * 1.05).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
              : "---"}
          </span>
        </div>
      </div>
    </div>
  );
}
