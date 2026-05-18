export const metadata = {
  title: "About Us | AUREUM GOLD",
  description:
    "Learn about Aureum Gold — our mission, our team, and our commitment to institutional-grade bullion trading.",
};

export default function AboutPage() {
  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg">
      <header className="mb-section-padding-sm border-l-2 border-primary pl-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">About Aureum Gold</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Institutional bullion specialists providing the architecture for physical wealth
          preservation in an increasingly digital world.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            Aureum Gold was founded on a simple principle: that physical gold remains the most
            reliable store of value in human history. In a world of digital assets and
            unprecedented monetary expansion, we provide a direct path to tangible wealth.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Our team brings together expertise from traditional bullion banking, institutional
            asset management, and secure logistics. We partner exclusively with LBMA-accredited
            refiners and mints to ensure every bar and coin meets the highest standards of purity
            and authenticity.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Every transaction is backed by fully insured logistics, institutional-grade vaulting
            options, and transparent pricing with no hidden fees. We serve a discerning clientele
            of high-net-worth individuals, family offices, and institutional investors across the
            United States.
          </p>
        </div>
        <div className="bg-surface-container-low border border-outline-variant p-8">
          <span className="font-label-caps text-label-caps text-primary block mb-6">
            OUR COMMITMENT
          </span>
          <div className="space-y-8">
            {[
              { icon: "verified", title: "LBMA Certified", desc: "All bullion sourced from LBMA Good Delivery refiners" },
              { icon: "security", title: "Fully Insured", desc: "Covered by Lloyd's of London from vault to delivery" },
              { icon: "transparency", title: "Transparent Pricing", desc: "Real-time spot prices with clear, itemized premiums" },
              { icon: "support", title: "Dedicated Support", desc: "Personal account managers for every client" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="material-symbols-outlined text-primary">{item.icon}</span>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
