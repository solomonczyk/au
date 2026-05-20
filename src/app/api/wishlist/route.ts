import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          images: { where: { isPrimary: true }, take: 1 },
        },
      },
    },
    orderBy: { addedAt: "desc" },
  });

  const data = items.map((item) => ({
    id: item.id,
    productId: item.productId,
    slug: item.product.slug,
    name: item.product.name,
    image: item.product.images[0]?.url || null,
    price: Number(item.product.fixedPriceUsd || 0),
    weight: `${Number(item.product.weightTroyOz).toFixed(3)} oz`,
    inStock: item.product.stockQuantity > 0,
    addedAt: item.addedAt.toISOString(),
  }));

  return apiSuccess(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const body = await request.json();
  const { productId } = body;

  if (!productId) return apiError("INVALID_INPUT", "productId is required", 400);

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.isActive) {
    return apiError("NOT_FOUND", "Product not found", 404);
  }

  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (existing) return apiSuccess({ id: existing.id, productId, alreadyExisted: true });

  const item = await prisma.wishlistItem.create({
    data: { userId: session.user.id, productId },
  });

  return apiSuccess({ id: item.id, productId, alreadyExisted: false }, undefined, 201);
}
