import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { WishlistGrid } from "@/components/account/WishlistGrid";

export const metadata = { title: "Wishlist | AUREUM GOLD" };

export default async function WishlistPage() {
  const session = await requireAuth();

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: { images: { where: { isPrimary: true }, take: 1 } },
      },
    },
    orderBy: { addedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Wishlist</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Your saved gold products.
        </p>
      </div>

      <WishlistGrid items={items as any} />
    </div>
  );
}
