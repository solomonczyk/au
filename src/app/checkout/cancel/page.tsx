import Link from "next/link";

export const metadata = {
  title: "Payment Cancelled | AUREUM GOLD",
  description: "Your payment was cancelled.",
};

export default function CancelPage() {
  return (
    <main className="max-w-2xl mx-auto px-gutter py-section-padding-lg text-center">
      <div className="bg-surface-container-low border border-outline-variant p-12">
        <span className="material-symbols-outlined text-[64px] text-warning mb-4 block">cancel</span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Payment Cancelled</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          Your payment was not processed. Your items are still in your cart.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/checkout"
            className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps inline-block hover:bg-primary-fixed-dim transition-all"
          >
            Try Again
          </Link>
          <Link
            href="/catalog"
            className="bg-surface-container-high text-on-surface px-10 py-4 font-label-caps text-label-caps inline-block hover:bg-surface-container transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
