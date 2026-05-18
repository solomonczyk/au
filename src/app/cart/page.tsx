"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg text-center">
        <span className="material-symbols-outlined text-[64px] text-outline mb-4 block">
          shopping_cart
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Your Cart is Empty</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
          Add some gold to your portfolio.
        </p>
        <Link
          href="/catalog"
          className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps inline-block hover:bg-primary-fixed-dim transition-all"
        >
          Browse Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-sm">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Shopping Cart</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {items.reduce((s, i) => s + i.quantity, 0)} items in your order
          </p>
        </div>
        <button
          onClick={clearCart}
          className="font-body-sm text-body-sm text-on-surface-variant hover:text-error transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-surface-container-low border border-outline-variant p-6 flex gap-6"
            >
              <div className="w-24 h-24 bg-surface-container-highest border border-outline-variant flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/catalog/${item.slug}`}
                  className="font-headline-sm text-headline-sm text-on-surface hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  {item.weight}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="font-body-md text-body-md w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-headline-sm text-headline-sm text-primary">
                      ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="font-body-sm text-body-sm text-on-surface-variant hover:text-error transition-colors mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-surface-container border border-outline-variant p-8 h-fit sticky top-32">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-6 border-b border-outline-variant pb-4">
            Order Summary
          </h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="text-on-surface">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between font-body-md text-body-md">
              <span className="text-on-surface-variant">Shipping</span>
              <span className="text-on-surface">Calculated at checkout</span>
            </div>
          </div>
          <div className="border-t-2 border-primary pt-4 mb-8">
            <div className="flex justify-between items-end">
              <span className="font-label-caps text-label-caps text-primary">Total</span>
              <span className="font-headline-md text-headline-md text-primary">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-primary-container text-on-primary-container py-4 font-label-caps text-label-caps text-center hover:bg-primary transition-all uppercase tracking-widest"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/catalog"
            className="block w-full text-center mt-4 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
