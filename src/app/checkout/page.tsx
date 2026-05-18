"use client";

import { useCartStore } from "@/lib/store/cart";
import Link from "next/link";

export default function CheckoutPage() {
  const { items } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const premium = subtotal * 0.02;
  const shipping = 25.0;
  const insurance = 15.0;
  const total = subtotal + premium + shipping + insurance;

  if (items.length === 0) {
    return (
      <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Nothing to Checkout</h1>
        <Link
          href="/catalog"
          className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps inline-block"
        >
          Browse Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Checkout Process */}
        <div className="lg:col-span-8 space-y-12">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-outline-variant pb-4">
            {[
              { label: "Cart", active: false, completed: true },
              { label: "Details", active: true, completed: false },
              { label: "Payment", active: false, completed: false },
              { label: "Review", active: false, completed: false },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                {i > 0 && <div className="w-8 h-px bg-outline-variant hidden sm:block" />}
                <div
                  className={`flex items-center gap-2 ${
                    step.completed
                      ? "text-primary"
                      : step.active
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-on-surface-variant opacity-50"
                  }`}
                >
                  {step.completed && (
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  )}
                  <span className="font-label-caps text-label-caps">{step.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Details Form */}
          <section className="space-y-8">
            <h2 className="font-headline-sm text-headline-sm text-primary">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Johnathan Sterling"
                  className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="sterling@private-wealth.com"
                  className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">
                  Shipping Address
                </label>
                <input
                  type="text"
                  placeholder="100 Wall Street, Penthouse B, New York, NY"
                  className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (212) 555-0198"
                  className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="font-headline-sm text-headline-sm text-primary">Payment Method</h2>
              <div className="bg-surface-variant text-on-surface-variant px-3 py-1 font-label-caps text-[10px] tracking-widest uppercase">
                Demo Mode
              </div>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-8 opacity-40 cursor-not-allowed">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 md:col-span-3">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Card Number
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="•••• •••• •••• ••••"
                    className="w-full bg-surface-container-lowest border border-outline-variant p-4 text-on-surface cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="MM/YY"
                    className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">
                    CVV
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder="•••"
                    className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Compliance + Submit */}
          <section className="space-y-6 pt-6">
            <div className="flex flex-col gap-4">
              {[
                "I accept the Terms of Service and understand the cancellation policy",
                "I have read and understood the Risk Disclosure",
                "I confirm I am 18+ and legally eligible to purchase precious metals",
              ].map((label) => (
                <label
                  key={label}
                  className="flex items-start gap-4 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 bg-transparent border-2 border-primary text-primary focus:ring-0 rounded-none"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
            <p className="font-body-sm text-body-sm text-primary italic opacity-80 pt-4">
              * Prices may change until order is confirmed due to live market volatility.
            </p>
            <button className="w-full bg-primary-container text-on-primary-container py-6 font-headline-sm text-headline-sm hover:bg-primary transition-all duration-300 uppercase tracking-widest shadow-lg">
              Place Order
            </button>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-4">
          <div className="bg-surface-container border border-outline-variant p-8 sticky top-32">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-8 border-b border-outline-variant pb-4">
              Order Summary
            </h3>

            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 mb-8">
                <div className="w-24 h-24 bg-surface-container-lowest border border-outline-variant flex items-center justify-center p-2 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-caps text-label-caps text-primary mb-1">Item Details</p>
                  <h4 className="font-body-md font-bold text-on-surface truncate">{item.name}</h4>
                  <p className="font-body-sm text-on-surface-variant">Quantity: {item.quantity}</p>
                  <p className="font-body-md text-primary mt-2">
                    ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}

            <div className="space-y-4 border-t border-outline-variant pt-6">
              {[
                ["Subtotal", `$${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}`],
                ["Spread/Premium", `$${premium.toLocaleString("en-US", { minimumFractionDigits: 2 })}`],
                ["Secured Shipping", `$${shipping.toFixed(2)}`],
                ["Transit Insurance", `$${insurance.toFixed(2)}`],
                ["Estimated Tax", "$0.00"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between font-body-sm text-on-surface-variant">
                  <span>{label}</span>
                  <span className="text-on-surface">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-primary flex justify-between items-end">
              <div>
                <p className="font-label-caps text-label-caps text-primary">Total Amount</p>
                <p className="font-body-sm text-on-surface-variant italic">USD</p>
              </div>
              <span className="font-headline-md text-headline-md text-primary">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="mt-12 space-y-4">
              {[
                ["verified_user", "LBMA Certified Bullion"],
                ["encrypted", "Institutional Grade Security"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary">{icon}</span>
                  <span className="text-body-sm uppercase font-label-caps">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
