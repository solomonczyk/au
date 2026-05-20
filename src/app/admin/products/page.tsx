"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?perPage=100")
      .then((r) => r.json())
      .then((j) => { if (j.success) setProducts(j.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-gutter py-12 animate-pulse">Loading...</div>;

  return (
    <div className="p-gutter py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Products</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">{products.length} products</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {["Name", "Type", "Stock", "Status", "Featured"].map((h) => (
                <th key={h} className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-body-md text-on-surface">
            {products.map((p) => (
              <tr key={p.id} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                <td className="py-5 px-6">
                  <Link href={`/admin/products/${p.id}`} className="text-primary hover:underline">{p.name}</Link>
                </td>
                <td className="py-5 px-6 uppercase">{p.type}</td>
                <td className="py-5 px-6">{p.stockQuantity}</td>
                <td className="py-5 px-6">
                  <span className={`px-2 py-1 text-xs border ${p.isActive ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/30" : "bg-surface-container-highest text-on-surface-variant border-outline-variant"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-5 px-6">{p.isFeatured ? "★" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
