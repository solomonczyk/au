"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="bg-surface-container-low border border-outline-variant p-8 flex flex-col group hover:border-primary transition-all duration-300">
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative aspect-square mb-8 overflow-hidden bg-surface-container-highest">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
          />
          <span className="absolute top-4 right-4 bg-primary text-background font-label-caps text-[10px] px-2 py-1">
            IN STOCK
          </span>
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex gap-4 mb-4 font-body-sm text-body-sm text-on-surface-variant uppercase tracking-tighter">
          <span>{product.purity}</span>
          <span>{product.weight_oz} TROY OZ</span>
        </div>
        <div className="mb-4">
          <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
            INDICATIVE PRICE
          </span>
          <span className="text-primary font-headline-md text-headline-md">
            ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">
            +{product.premium}% over spot
          </span>
        </div>
      </div>
      <div className="space-y-4 pt-4 border-t border-outline-variant/30">
        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          Fully Insured Shipping
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                weight: `${product.weight_oz}oz`,
              })
            }
            className="w-full bg-primary text-background py-3 font-label-caps text-label-caps hover:bg-primary-container transition-colors active:opacity-80"
          >
            ADD TO ORDER
          </button>
          <Link
            href={`/catalog/${product.slug}`}
            className="w-full block text-center border border-outline-variant text-on-surface py-3 font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all active:opacity-80"
          >
            VIEW DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
}
