export const metadata = {
  title: "Gold Prices & Charts | AUREUM GOLD",
  description: "Live gold prices (XAU/USD, XAU/EUR), interactive charts, and historical data.",
};

export default function PricesPage() {
  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg">
      <header className="mb-section-padding-sm border-l-2 border-primary pl-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
          Live Gold Prices
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Real-time precious metals pricing with interactive charts and historical data.
        </p>
      </header>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
        {[
          { pair: "XAU/USD", price: "$2,042.50", change: "+0.45%", up: true },
          { pair: "XAU/EUR", price: "€1,892.30", change: "+0.38%", up: true },
          { pair: "XAU/GBP", price: "£1,618.75", change: "-0.12%", up: false },
        ].map((item) => (
          <div
            key={item.pair}
            className="bg-surface-container-low border border-outline-variant p-8"
          >
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              {item.pair}
            </span>
            <div className="mt-4 flex items-end justify-between">
              <span className="font-headline-md text-headline-md text-on-surface">{item.price}</span>
              <span
                className={`font-label-caps text-label-caps flex items-center gap-1 ${
                  item.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.up ? "arrow_drop_up" : "arrow_drop_down"}
                </span>
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-surface-container-low border border-outline-variant p-12 text-center">
        <span className="material-symbols-outlined text-[64px] text-outline mb-4 block">
          monitoring
        </span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
          Interactive Price Chart
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Interactive chart with 1D / 1W / 1M / 1Y periods coming soon.
        </p>
      </div>
    </main>
  );
}
