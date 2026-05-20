"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  zipCode: string;
}

function PaymentStep({
  clientSecret,
  onBack,
}: {
  clientSecret: string;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (submitError) {
      setError(submitError.message || "Payment failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-surface-container-low border border-outline-variant p-8 mb-6">
        <PaymentElement />
      </div>
      {error && (
        <div className="bg-error-container text-on-error-container p-4 font-body-sm text-body-sm mb-6">{error}</div>
      )}
      <div className="flex gap-4">
        <button type="button" onClick={onBack} className="bg-surface-container-high text-on-surface px-10 py-4 font-label-caps">
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-primary text-on-primary py-4 font-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
}

function CheckoutInner({ onStripeReady }: { onStripeReady: (cs: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  return null; // stripe/elements are initialized for PaymentStep
}

export function CheckoutForm() {
  const { items } = useCartStore();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [clientSecret, setClientSecret] = useState("");
  const [pkKey, setPkKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 25;
  const total = subtotal + shipping;

  async function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderItems = items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      }));

      const res = await fetch("/api/checkout/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress: form,
          guestEmail: form.email || undefined,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.error?.message || "Checkout initialization failed");
        setLoading(false);
        return;
      }

      setClientSecret(json.data.clientSecret);
      setStep("payment");
    } catch {
      setError("Network error");
    }
    setLoading(false);
  }

  const pk = pkKey || (typeof document !== "undefined" && document.querySelector<HTMLMetaElement>("meta[name='stripe-key']")?.content);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8">
        {step === "shipping" ? (
          <form onSubmit={handleShippingSubmit} className="space-y-8">
            <section className="space-y-6">
              <h2 className="font-headline-sm text-headline-sm text-primary">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="First Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
                <Field label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <div className="md:col-span-2">
                  <Field label="Street Address" value={form.line1} onChange={(v) => setForm({ ...form, line1: v })} required />
                </div>
                <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
                <Field label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} required />
                <Field label="ZIP Code" value={form.zipCode} onChange={(v) => setForm({ ...form, zipCode: v })} required />
              </div>
            </section>

            {error && (
              <div className="bg-error-container text-on-error-container p-4 font-body-sm text-body-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 font-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : `Continue to Payment — $${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            </button>
          </form>
        ) : clientSecret && pk ? (
          <Elements stripe={loadStripe(pk)} options={{ clientSecret }}>
            <PaymentStep clientSecret={clientSecret} onBack={() => setStep("shipping")} />
          </Elements>
        ) : null}
      </div>

      <aside className="lg:col-span-4">
        <div className="bg-surface-container border border-outline-variant p-8 sticky top-32">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-8 border-b border-outline-variant pb-4">Order Summary</h3>
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 mb-6">
              <div className="w-20 h-20 bg-surface-container-lowest border border-outline-variant flex items-center justify-center p-2 flex-shrink-0">
                {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body-md font-bold text-on-surface truncate">{item.name}</p>
                <p className="font-body-sm text-on-surface-variant">Qty: {item.quantity}</p>
                <p className="font-body-md text-primary mt-1">${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          ))}
          <div className="space-y-3 border-t border-outline-variant pt-6">
            <div className="flex justify-between font-body-sm text-on-surface-variant">
              <span>Subtotal</span>
              <span className="text-on-surface">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-body-sm text-on-surface-variant">
              <span>Shipping</span>
              <span className="text-on-surface">${shipping.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t-2 border-primary flex justify-between items-end">
            <div>
              <p className="font-label-caps text-label-caps text-primary">Total</p>
              <p className="font-body-sm text-on-surface-variant italic">USD</p>
            </div>
            <span className="font-headline-md text-headline-md text-primary">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label-caps text-label-caps text-on-surface-variant">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
      />
    </div>
  );
}
