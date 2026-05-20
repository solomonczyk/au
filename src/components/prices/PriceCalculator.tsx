"use client";

import { useState, useEffect } from "react";

export function PriceCalculator() {
  const [weightOz, setWeightOz] = useState("1");
  const [markupPct, setMarkupPct] = useState("3.5");
  const [spotPrice, setSpotPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/prices/current")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setSpotPrice(json.data.xauUsd);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!weightOz || !markupPct || !spotPrice) return;
    const weight = parseFloat(weightOz);
    const markup = parseFloat(markupPct);
    if (weight <= 0) return;
    setTotal(spotPrice * weight * (1 + markup / 100));
  }, [weightOz, markupPct, spotPrice]);

  async function calculate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/prices/calculator?weightOz=${weightOz}&markupPct=${markupPct}`);
      const json = await res.json();
      if (json.success) {
        setTotal(json.data.totalPriceUsd);
        setSpotPrice(json.data.spotPriceUsd);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant p-8">
      <h3 className="font-headline-sm text-headline-sm text-primary mb-6">Price Calculator</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
            Weight (Troy Ounces)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={weightOz}
            onChange={(e) => setWeightOz(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
            Markup (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={markupPct}
            onChange={(e) => setMarkupPct(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none"
          />
        </div>

        <button
          type="button"
          onClick={calculate}
          disabled={loading}
          className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>

        {spotPrice > 0 && (
          <div className="border-t border-outline-variant pt-6 space-y-3">
            <div className="flex justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">Spot Price (XAU/USD)</span>
              <span className="text-on-surface">${spotPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">Weight</span>
              <span className="text-on-surface">{weightOz} troy oz</span>
            </div>
            <div className="flex justify-between font-headline-sm text-headline-sm border-t-2 border-primary pt-3">
              <span className="text-primary">Total</span>
              <span className="text-primary">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
