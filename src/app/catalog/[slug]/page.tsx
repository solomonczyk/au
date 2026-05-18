"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store/cart";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg text-center">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Product Not Found</h1>
        <Link href="/catalog" className="text-primary hover:underline">
          &larr; Back to Catalog
        </Link>
      </main>
    );
  }

  const related = products.filter((p) => p.type === product.type && p.id !== product.id).slice(0, 4);

  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-sm">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant mb-12">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-primary transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-surface-container-highest border border-outline-variant overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
              {product.name}
            </h1>
            <div className="flex gap-6 font-body-sm text-body-sm text-on-surface-variant uppercase tracking-tighter mb-6">
              <span>{product.purity}</span>
              <span>{product.weight_oz} TROY OZ</span>
              <span>{product.weight_grams}g</span>
            </div>
          </div>

          <div className="border-t border-outline-variant pt-8">
            <span className="font-label-caps text-label-caps text-on-surface-variant block mb-2">
              INDICATIVE PRICE
            </span>
            <span className="font-display text-headline-lg text-primary">
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant block mt-2">
              +{product.premium}% premium over spot price
            </span>
          </div>

          <div className="border-t border-outline-variant pt-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Description</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-outline-variant pt-8">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">
              Specifications
            </h3>
            <dl className="space-y-4 font-body-md text-body-md">
              {[
                ["Manufacturer", product.manufacturer],
                ["Purity", product.purity],
                ["Weight", `${product.weight_grams}g (${product.weight_oz} troy oz)`],
                ["Type", product.type === "bar" ? "Gold Bar" : "Gold Coin"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <dt className="text-on-surface-variant">{label}</dt>
                  <dd className="text-on-surface font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-4 pt-4">
            {product.features.map((f) => (
              <div key={f} className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  verified
                </span>
                <span className="font-body-md text-body-md">{f}</span>
              </div>
            ))}
          </div>

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
            className="w-full bg-primary text-on-primary py-5 font-label-caps text-label-caps text-[14px] hover:bg-primary-fixed-dim transition-all duration-300 uppercase tracking-widest"
          >
            Add to Cart
          </button>

          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm justify-center">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            Fully Insured Shipping &bull; LBMA Certified
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-outline-variant pt-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/catalog/${p.slug}`}
                className="bg-surface-container-low border border-outline-variant p-6 group hover:border-primary transition-all duration-300"
              >
                <div className="aspect-square mb-4 bg-surface-container-highest overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                  />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{p.name}</h3>
                <span className="text-primary font-headline-md text-headline-md">
                  ${p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
