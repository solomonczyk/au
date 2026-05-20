import { PriceChart } from "@/components/prices/PriceChart";
import { PriceCalculator } from "@/components/prices/PriceCalculator";
import { PriceCards } from "@/components/prices/PriceCards";

export const metadata = {
  title: "Gold Prices & Charts | AUREUM GOLD",
  description: "Live gold prices (XAU/USD), interactive charts, and historical data.",
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

      <div className="mb-16">
        <PriceCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-16">
        <div className="lg:col-span-2">
          <PriceChart />
        </div>
        <div>
          <PriceCalculator />
        </div>
      </div>
    </main>
  );
}
