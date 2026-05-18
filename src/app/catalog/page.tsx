import { products } from "@/lib/products";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";

export const metadata = {
  title: "Physical Gold Bullion | AUREUM GOLD",
  description:
    "Institutional-grade gold bullion bars and coins. LBMA-certified, fully insured, and available for nationwide delivery.",
};

export default function CatalogPage() {
  return (
    <>
      {/* Disclaimer */}
      <div className="w-full bg-surface-container-low border-b border-outline-variant py-3">
        <div className="max-w-container-max mx-auto px-gutter text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Prices are indicative only. Final price confirmed at order placement.
          </p>
        </div>
      </div>

      <main className="max-w-container-max mx-auto px-gutter py-section-padding-sm">
        {/* Page Header */}
        <header className="mb-section-padding-sm border-l-2 border-primary pl-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Physical Gold Bullion
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Institutional-grade security and uncompromising purity. Secure your wealth with
            LBMA-certified physical gold assets, fully insured and vaulted at the highest standards.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-gutter">
          <FilterSidebar />
          <ProductGrid products={products} />
        </div>
      </main>
    </>
  );
}
