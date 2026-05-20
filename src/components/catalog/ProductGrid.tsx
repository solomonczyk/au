import { ProductCard } from "./ProductCard";

interface ProductGridItem {
  id: string;
  slug: string;
  name: string;
  type: string;
  weightGrams: number;
  weightTroyOz: number;
  manufacturer: string | null;
  stockQuantity: number;
  inStock: boolean;
  isFeatured: boolean;
  primaryImage: string | null;
  currentPriceUsd?: number;
}

export function ProductGrid({ products }: { products: ProductGridItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
