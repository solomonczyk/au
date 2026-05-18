export const metadata = {
  title: "Sell Gold | AUREUM GOLD",
  description:
    "Request a valuation quote for your gold bullion, coins, or scrap. Professional assaying and competitive pricing.",
};

export default function SellPage() {
  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-sm md:py-section-padding-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        {/* Left Column: Form */}
        <div className="md:col-span-7">
          <header className="mb-12">
            <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-background mb-4">
              Request a Selling Quote
            </h1>
            <p className="text-on-surface-variant text-body-lg">
              Provide details of your bullion or gold assets for a guaranteed premium valuation within
              2 hours.
            </p>
          </header>

          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                  Item Type
                </label>
                <select className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors appearance-none">
                  <option>Gold Bar</option>
                  <option>Gold Coin</option>
                  <option>Gold Jewelry/Scrap</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                  Purity/Karat
                </label>
                <select className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors appearance-none">
                  <option>24K 99.99%</option>
                  <option>22K</option>
                  <option>18K</option>
                  <option>14K</option>
                  <option>10K</option>
                  <option>Unknown</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                  Approximate Weight
                </label>
                <div className="flex">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="flex-1 bg-surface-container border border-outline-variant border-r-0 p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  />
                  <select className="w-24 bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors appearance-none">
                    <option>Grams</option>
                    <option>Troy Oz</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                  Shipping ZIP Code
                </label>
                <input
                  type="text"
                  placeholder="Enter ZIP"
                  className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                Photo Upload
              </label>
              <div className="border-2 border-dashed border-outline-variant bg-surface-container-low h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors group">
                <span className="material-symbols-outlined text-outline group-hover:text-primary text-4xl mb-2">
                  upload_file
                </span>
                <p className="text-body-sm text-on-surface-variant">
                  Drop files here or <span className="text-primary underline">browse</span>
                </p>
                <p className="text-[10px] text-outline mt-1 uppercase tracking-widest">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm text-on-background">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-container text-on-primary-container py-5 font-bold uppercase tracking-widest hover:bg-primary transition-colors shadow-lg"
            >
              Submit Request for Valuation
            </button>
          </form>
        </div>

        {/* Right Column: Info */}
        <div className="md:col-span-5 space-y-8">
          <div className="w-full h-80 relative overflow-hidden group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO90GAgK-I6sVF3zsdelWj--l2Akw95xwzWqVzZvgfSQRqkFe1KrqUzzIAT4Hfc1cBbPkdcIE6kJxsjEfC2vZPRB_gQ3auxs-Tma9mZRQf6GWiEiT-ltd_Il6Xb-xQ5wl8RN_JrOIv08aX2hEXG5Ww56SM0vMFyMnPpi_RbfSlAFxunIQN_g9eERlTF7NP1DTqCu7UEAsfA0v3BK_NL80yDbd5o9FwYoofj95JGl4ji078ocYZREjWp4NtXOZX9091Ea_-LLALjGLR"
              alt="Premium Gold Bullion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>

          <section className="bg-surface-container p-8 md:p-10 border border-outline-variant">
            <h2 className="font-headline-md text-headline-md text-on-background mb-8 border-b border-outline-variant pb-4">
              Our Valuation Process
            </h2>
            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Spot Price Reference",
                  desc: "Quotes are tied to real-time LBMA spot prices, ensuring you receive the most accurate market value at the moment of request.",
                },
                {
                  num: "02",
                  title: "Purity Testing",
                  desc: "Professional assaying upon receipt. We use advanced X-ray fluorescence to verify purity without damaging your items.",
                },
                {
                  num: "03",
                  title: "Final Offer",
                  desc: "A formal, legally binding offer is sent via secure message after physical inspection of weight and condition.",
                },
                {
                  num: "04",
                  title: "Instant Payout",
                  desc: "Funds released immediately upon your approval via wire transfer or gold-backed credit to your Aureum account.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-6">
                  <span className="text-primary font-display text-headline-lg opacity-30 leading-none">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-label-caps text-label-caps uppercase text-primary mb-1">
                      {step.title}
                    </h4>
                    <p className="text-body-sm text-on-surface-variant">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-primary/5 border border-primary/30 p-8 flex gap-6">
            <div className="flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl">warning</span>
            </div>
            <div>
              <p className="text-body-sm text-on-surface font-medium leading-relaxed">
                Estimate is NOT a final offer. Final price depends on inspection, current market
                price, purity, weight, condition, and applicable fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
