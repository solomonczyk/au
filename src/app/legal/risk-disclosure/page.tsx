export const metadata = {
  title: "Risk Disclosure | AUREUM GOLD",
  description: "Important risk disclosures for precious metals investors.",
};

export default function RiskDisclosurePage() {
  return (
    <main className="max-w-3xl mx-auto px-gutter py-section-padding-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface mb-8">Risk Disclosure</h1>
      <div className="font-body-md text-body-md text-on-surface leading-relaxed space-y-6">
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Market Risk</h2>
          <p>The price of gold and other precious metals can fluctuate significantly. Past performance is not indicative of future results. There is no guarantee of appreciation in the value of precious metals.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Liquidity Risk</h2>
          <p>Precious metals may not be as liquid as other investments. The buyback price may differ from the purchase price due to market conditions and spreads.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Counterparty Risk</h2>
          <p>While we work with LBMA-approved refiners and institutional vaults, no guarantee can be made against counterparty default. Assets held in vault storage are subject to the terms of the storage agreement.</p>
        </section>
        <section>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Regulatory Risk</h2>
          <p>Changes in tax laws, reporting requirements, or regulations affecting precious metals ownership could impact your investment. It is your responsibility to understand applicable laws.</p>
        </section>
      </div>
    </main>
  );
}
