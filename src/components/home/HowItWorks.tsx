export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Create your account",
      desc: "Simple, secure registration with professional identity verification.",
    },
    {
      num: "02",
      title: "Choose your bullion",
      desc: "Select from a curated range of high-purity bars and internationally recognized coins.",
    },
    {
      num: "03",
      title: "Secure Delivery or Vaulting",
      desc: "Receive your gold via discreet, insured shipping or choose a high-security vaulting solution.",
    },
  ];

  return (
    <section className="py-section-padding-lg bg-surface-container-lowest border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="font-label-caps text-label-caps text-primary mb-4 block">
              THE PROCESS
            </span>
            <h2 className="font-display text-headline-lg text-on-surface mb-12">
              Your Journey to Tangible Wealth.
            </h2>
            <div className="space-y-12">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-8">
                  <span className="font-display text-headline-lg text-outline-variant shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                      {step.title}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square border border-outline-variant p-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCswLnHlUfOI1GxL5CQ1Ww34bzeMzbT5IbSRFjIHJbGQ_TdnThReA1ZCmq2HdRLpdyAE4T2fsjqXu3mz-foyapE9yOEZS_dPSSvSsO7WAuR6rw3_P4gJ_DfgBOiXWMGQcvDNKjVqbKFbNWAfJoc_N903R0Z8oh_cCX4-3ydbYpMnKA0I6jo9HvimuWoQINse3PsLhea-cnJ2Cb5DEiQOFTwGoq1AIdlRInLJZ9lEZyDJbWoMA-C7qs_lElBPXqC48NuIie06VYaLX2b"
                alt="Gold coin on dark surface"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary p-12 hidden xl:block">
              <span className="font-display text-headline-lg text-on-primary">24k</span>
              <p className="font-label-caps text-label-caps text-on-primary mt-2">
                Purity Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
