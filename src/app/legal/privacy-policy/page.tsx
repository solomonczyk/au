export const metadata = {
  title: "Privacy Policy | AUREUM GOLD",
  description: "How AUREUM GOLD collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-gutter py-section-padding-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8">Privacy Policy</h1>
      <div className="font-body-md text-body-md text-on-surface leading-relaxed space-y-6">
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly: name, email, phone, shipping address, payment information, and government-issued ID for compliance purposes. We also collect browsing data through cookies and analytics.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">2. How We Use Your Information</h2>
          <p>We use your information to process orders, verify identity, comply with legal obligations (including AML/KYC), improve our services, and send order-related communications. We do not sell your personal information.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">3. Data Security</h2>
          <p>We implement industry-standard encryption and security measures. Sensitive data including government IDs is encrypted at rest using AES-256-GCM. Payment data is handled directly by Stripe and never stored on our servers.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">4. Data Retention</h2>
          <p>We retain your data for as long as necessary to fulfill the purposes described in this policy, or as required by law (typically 5 years for compliance records). You may request deletion of your data, subject to legal obligations.</p>
        </section>
      </div>
    </main>
  );
}
