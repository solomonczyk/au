import Link from "next/link";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    slug: string;
    name: string;
    weightTroyOz: number;
    weightGrams: number;
    images?: { url: string; altText?: string }[];
    stockQuantity: number;
  };
  addedAt: string;
}

export function WishlistGrid({ items }: { items: WishlistItem[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-surface-container-low border border-outline-variant p-12 text-center">
        <span className="material-symbols-outlined text-[48px] text-outline mb-4 block">favorite_border</span>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">Your wishlist is empty.</p>
        <Link
          href="/catalog"
          className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps inline-block hover:bg-primary-fixed-dim transition-all"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-surface-container-low border border-outline-variant p-6 group hover:border-primary transition-all"
        >
          <Link href={`/catalog/${item.product.slug}`}>
            <div className="aspect-square mb-4 bg-surface-container-highest border border-outline-variant flex items-center justify-center overflow-hidden">
              {item.product.images?.[0]?.url ? (
                <img
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  className="w-full h-full object-contain grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                />
              ) : (
                <span className="material-symbols-outlined text-outline text-[48px]">image</span>
              )}
            </div>
          </Link>
          <Link href={`/catalog/${item.product.slug}`}>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 leading-tight">{item.product.name}</h3>
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
            {item.product.weightTroyOz} oz | {item.product.weightGrams}g
          </p>
        </div>
      ))}
    </div>
  );
}
