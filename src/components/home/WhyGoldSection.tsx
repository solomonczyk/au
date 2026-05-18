import Link from "next/link";

export function WhyGoldSection() {
  return (
    <section className="py-section-padding-lg bg-surface">
      <div className="max-w-4xl mx-auto px-gutter text-center">
        <span className="font-label-caps text-label-caps text-primary mb-8 block">
          THE ULTIMATE STORE OF VALUE
        </span>
        <h2 className="font-display text-headline-lg text-on-surface mb-12 leading-tight">
          A Timeless Hedge Against Uncertainty.
        </h2>
        <div className="space-y-8 font-body-lg text-body-lg text-on-surface-variant leading-relaxed text-left border-l-2 border-outline-variant pl-12 ml-6">
          <p>
            In an era of digital volatility and inflationary pressure, physical gold remains the
            bedrock of financial stability. It is the only asset that is not someone else&apos;s
            liability&mdash;a tangible, portable, and universally recognized store of value.
          </p>
          <p>
            Aureum Gold facilitates this transition from speculative wealth to permanent value. We
            provide the modern infrastructure required for institutional-grade gold ownership,
            ensuring your legacy is protected by the very metal that has anchored economies for
            millennia.
          </p>
        </div>
        <div className="mt-20 pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-left">
            <p className="font-label-caps text-label-caps text-on-surface-variant">
              LATEST MARKET INSIGHT
            </p>
            <p className="font-body-md text-body-md text-on-surface mt-2">
              Gold reaches 6-month high amid shifting monetary policy.
            </p>
          </div>
          <Link
            href="/about"
            className="font-label-caps text-label-caps text-primary hover:underline flex items-center gap-2"
          >
            Read Market Reports
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
