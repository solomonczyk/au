"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function AdminProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((j) => { if (j.success) setProduct(j.data); })
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="p-gutter py-12 animate-pulse">Loading...</div>;

  return (
    <div className="p-gutter py-12 max-w-3xl">
      <Link href="/admin/products" className="font-label-caps text-label-caps text-primary hover:underline mb-6 inline-block">← Back to Products</Link>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8 mt-4">{product.name}</h2>

      <div className="bg-surface-container-low border border-outline-variant p-8 space-y-4">
        <Row label="SKU" value={product.sku} />
        <Row label="Slug" value={product.slug} />
        <Row label="Type" value={product.type} />
        <Row label="Weight" value={`${product.weightGrams}g (${product.weightTroyOz} oz)`} />
        <Row label="Purity" value={`${product.purityPercent}%`} />
        <Row label="Manufacturer" value={product.manufacturer || "—"} />
        <Row label="Stock" value={String(product.stockQuantity)} />
        <Row label="Markup" value={`${product.markupPercent}%`} />
        <Row label="Current Price" value={`$${product.currentPriceUsd?.toLocaleString() || "—"}`} />
        <Row label="Active" value={product.isActive ? "Yes" : "No"} />
        <Row label="Featured" value={product.isFeatured ? "Yes" : "No"} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-outline-variant pb-3">
      <span className="font-label-caps text-label-caps text-on-surface-variant">{label}</span>
      <span className="font-body-md text-body-md text-on-surface">{value}</span>
    </div>
  );
}
