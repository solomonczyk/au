"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "./ProductGrid";

interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  weightGrams: number;
  weightTroyOz: number;
  purityPercent: number;
  manufacturer: string | null;
  stockQuantity: number;
  isFeatured: boolean;
  primaryImage: string | null;
  categories: string[];
}

interface ApiResponse {
  success: boolean;
  data: Product[];
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    filteredTotal?: number;
  };
}

export function ProductGridWithData({ searchParams }: { searchParams: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<ApiResponse["meta"]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?${searchParams}`)
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        if (json.success) {
          setProducts(json.data);
          setMeta(json.meta);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) {
    return (
      <section className="w-full md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-surface-container-low border border-outline-variant p-6 animate-pulse">
              <div className="aspect-square bg-surface-container-higher mb-4" />
              <div className="h-4 bg-surface-container-higher rounded w-3/4 mb-2" />
              <div className="h-4 bg-surface-container-higher rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full md:w-3/4">
      {meta && (
        <div className="flex justify-between items-center mb-6">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {meta.filteredTotal ?? meta.total} product{(meta.filteredTotal ?? meta.total) !== 1 ? "s" : ""}
          </p>
          {meta.totalPages > 1 && (
            <div className="flex gap-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Page {meta.page} of {meta.totalPages}
              </span>
            </div>
          )}
        </div>
      )}
      <ProductGrid products={products} />
    </section>
  );
}
