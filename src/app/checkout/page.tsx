import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout | AUREUM GOLD",
  description: "Complete your purchase of precious metals.",
};

export default function CheckoutPage() {
  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg">
      <header className="mb-section-padding-sm border-l-2 border-primary pl-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Checkout</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Review your order and complete payment.
        </p>
      </header>
      <CheckoutForm />
    </main>
  );
}
