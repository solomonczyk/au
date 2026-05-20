export const metadata = {
  title: "Terms of Service | AUREUM GOLD",
  description: "Terms and conditions for purchasing precious metals from AUREUM GOLD.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-gutter py-section-padding-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8">Terms of Service</h1>
      <div className="font-body-md text-body-md text-on-surface leading-relaxed space-y-6">
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the AUREUM GOLD website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">2. Precious Metals Purchase</h2>
          <p>All purchases are subject to availability and price confirmation. Prices are based on real-time market rates and may change until payment is confirmed. Title transfers upon delivery.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">3. Shipping & Delivery</h2>
          <p>All shipments are fully insured. Delivery times are estimates and not guaranteed. Signature is required upon delivery. We only ship to verified addresses within the United States.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">4. Returns & Refunds</h2>
          <p>Returns are accepted within 14 days of delivery for products in original condition. A restocking fee of up to 5% may apply. Certain products, such as custom orders, are non-returnable.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">5. Compliance</h2>
          <p>AUREUM GOLD complies with all applicable US laws including FinCEN regulations, IRS reporting requirements (Form 8300 for cash transactions over $10,000, Form 1099-B for applicable sales), and OFAC sanctions. You agree to provide accurate information for compliance purposes.</p>
        </section>
      </div>
    </main>
  );
}
