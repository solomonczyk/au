import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const { productId } = await params;

  const item = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (!item) return apiError("NOT_FOUND", "Wishlist item not found", 404);

  await prisma.wishlistItem.delete({ where: { id: item.id } });

  return apiSuccess({ deleted: true });
}
