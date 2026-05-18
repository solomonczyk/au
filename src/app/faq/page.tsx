export const metadata = {
  title: "FAQ | AUREUM GOLD",
  description: "Frequently asked questions about buying, selling, and storing physical gold.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I buy gold from Aureum?",
      a: "Simply browse our catalog, select your desired bars or coins, and proceed to checkout. You can create an account during checkout or continue as a guest. We offer multiple payment methods including bank wire and card.",
    },
    {
      q: "Is my gold insured during shipping?",
      a: "Yes, every shipment is fully insured by Lloyd's of London from the moment it leaves our vault until it reaches your door. Coverage is included in the shipping cost.",
    },
    {
      q: "What purity are your gold bars?",
      a: "All our gold bars are .9999 fine (99.99% pure), sourced exclusively from LBMA Good Delivery refiners. Our gold coins vary from 22K (91.67%) to .9999 fine depending on the mint.",
    },
    {
      q: "How is the price determined?",
      a: "Our prices are based on the real-time LBMA spot price of gold, plus a premium that covers refining, minting, logistics, and our margin. Premiums vary by product type and weight.",
    },
    {
      q: "Can I store my gold with Aureum?",
      a: "Yes, we offer institutional-grade vaulting solutions through our partner vaults. Your gold is fully allocated, insured, and audited regularly. You can request delivery at any time.",
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 14 days of delivery for products in their original condition and packaging. A restocking fee may apply. Contact our concierge team to initiate a return.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-gutter py-section-padding-lg">
      <header className="mb-16 text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Frequently Asked Questions
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Everything you need to know about buying and storing gold with Aureum.
        </p>
      </header>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="bg-surface-container-low border border-outline-variant group open:border-primary transition-colors"
          >
            <summary className="p-6 cursor-pointer font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors list-none flex justify-between items-center">
              {faq.q}
              <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                expand_more
              </span>
            </summary>
            <div className="px-6 pb-6 border-t border-outline-variant pt-4">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}
