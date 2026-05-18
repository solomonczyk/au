"use client";

import Link from "next/link";

export function FilterSidebar() {
  return (
    <aside className="w-full md:w-1/4 space-y-10">
      <div>
        <h3 className="font-label-caps text-label-caps text-primary uppercase mb-6 tracking-widest">
          Product Type
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="rounded-none border-outline bg-transparent text-primary focus:ring-primary w-5 h-5"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              Gold Bars
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="rounded-none border-outline bg-transparent text-primary focus:ring-primary w-5 h-5"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
              Gold Coins
            </span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="font-label-caps text-label-caps text-primary uppercase mb-6 tracking-widest">
          Weight
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {["1/10oz", "1/4oz", "1oz", "10oz", "1kg"].map((w) => (
            <button
              key={w}
              className="border border-outline-variant py-2 px-3 text-body-sm font-body-sm hover:border-primary transition-colors text-on-surface-variant"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-label-caps text-label-caps text-primary uppercase mb-6 tracking-widest">
          Purity
        </h3>
        <div className="space-y-3">
          {["99.9% fine", "99.99% fine"].map((p) => (
            <label key={p} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="purity"
                defaultChecked={p === "99.99% fine"}
                className="rounded-full border-outline bg-transparent text-primary focus:ring-primary w-5 h-5"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                {p}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-label-caps text-label-caps text-primary uppercase mb-6 tracking-widest">
          Price Range
        </h3>
        <div className="relative h-1 bg-surface-container-highest rounded-full mt-4 mb-2">
          <div className="absolute h-1 bg-primary left-0 right-1/4 rounded-full" />
          <div className="absolute w-4 h-4 bg-primary rounded-full -top-1.5 left-0" />
          <div className="absolute w-4 h-4 bg-primary rounded-full -top-1.5 right-1/4" />
        </div>
        <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
          <span>$200</span>
          <span>$50,000+</span>
        </div>
      </div>
      <div className="bg-surface-container-low p-6 border border-outline-variant">
        <h4 className="font-headline-sm text-headline-sm text-primary mb-2">Private Vaulting</h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          Store your assets in our ultra-secure LBMA facilities.
        </p>
        <Link
          href="/about"
          className="text-primary font-label-caps text-label-caps flex items-center gap-2 group"
        >
          LEARN MORE
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </aside>
  );
}
