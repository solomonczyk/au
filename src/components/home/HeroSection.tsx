import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[870px] flex items-center overflow-hidden border-b border-outline-variant">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAfnZup0b9m796FvaR5ZCsIpCByQ-Bsbe8c6WP9LAt9zP9J0fBysWu5-J-10kxVBoRaAaLAO-VVtataYigB7M3fGgqg0NRc_0uXrMWJS74i2WYYB1u0kfffXaWDp_0-JRxc63YrhYEYTkYPAHAwjNzGck_dFls0i9TppJ34CPXB_hy16VwbNQyMCK_2LVSuvdzVMqTFM9H02a-uxOsI3drIPBtsOzc6bBuhm6F0duVtcWxVx2B5c--WjPMfehRV7OCWV77BG_2uBrJ"
          alt="Gold bullion bars in secure vault"
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
      </div>
      <div className="relative z-20 max-w-container-max mx-auto px-gutter w-full">
        <div className="max-w-3xl space-y-8">
          <h1 className="font-display text-display-lg text-on-surface leading-tight">
            The Gold Standard of Modern Bullion Trading.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
            Secure, transparent, and US-focused. Buy, sell, and store physical gold with
            institutional-grade security and uncompromising discretion.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/catalog"
              className="bg-primary text-on-primary px-10 py-5 font-label-caps text-label-caps text-[14px] hover:bg-primary-fixed-dim transition-all duration-300"
            >
              Buy Gold
            </Link>
            <Link
              href="/sell"
              className="border-2 border-outline-variant text-on-surface px-10 py-5 font-label-caps text-label-caps text-[14px] hover:bg-surface-variant transition-all duration-300"
            >
              Sell Gold
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
