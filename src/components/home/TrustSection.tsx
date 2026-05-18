export function TrustSection() {
  const cards = [
    {
      icon: "shield_person",
      title: "Fully Insured Shipping",
      desc: "Every shipment is fully insured by Lloyd's of London, providing absolute peace of mind from our vault to your door.",
    },
    {
      icon: "verified",
      title: "Secure Verification",
      desc: "Rigorous multi-stage purity testing ensures every gram of gold meets the highest international standards.",
    },
    {
      icon: "monitoring",
      title: "Transparent Pricing",
      desc: "Real-time spot pricing with zero hidden fees. We believe in clear, honest transactions with no fine print.",
    },
    {
      icon: "public",
      title: "US-Focused Service",
      desc: "Based in the United States, we provide nationwide logistics and dedicated localized client support.",
    },
  ];

  return (
    <section className="py-section-padding-lg bg-surface">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-24">
          <span className="font-label-caps text-label-caps text-primary mb-4 block">
            INSTITUTIONAL INTEGRITY
          </span>
          <h2 className="font-display text-headline-lg text-on-surface">
            Built on Unwavering Trust.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-surface-container-low border border-outline-variant p-10 hover:border-primary/40 transition-colors group"
            >
              <span className="material-symbols-outlined text-primary mb-6 text-[40px]">
                {card.icon}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">
                {card.title}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
