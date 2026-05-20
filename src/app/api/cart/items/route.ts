import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          images: { where: { isPrimary: true }, take: 1 },
        },
      },
    },
    orderBy: { addedAt: "asc" },
  });

  const data = items.map((item) => ({
    id: item.id,
    productId: item.productId,
    slug: item.product.slug,
    name: item.product.name,
    price: Number(item.priceAtAddUsd),
    quantity: item.quantity,
    image: item.product.images[0]?.url || null,
    weight: `${Number(item.product.weightTroyOz).toFixed(3)} oz`,
    stockQuantity: item.product.stockQuantity,
  }));

  return apiSuccess(data);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const body = await request.json();
  const { productId, quantity } = body;

  if (!productId || !quantity || quantity < 1) {
    return apiError("INVALID_INPUT", "productId and quantity (min 1) are required", 400);
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.isActive) {
    return apiError("NOT_FOUND", "Product not found", 404);
  }

  const existing = await prisma.cartItem.findFirst({
    where: { userId: session.user.id, productId },
  });

  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
    return apiSuccess({ id: updated.id, productId, quantity: updated.quantity });
  }

  const item = await prisma.cartItem.create({
    data: {
      userId: session.user.id,
      productId,
      quantity,
      priceAtAddUsd: 0, // calculated server-side in pricing service
    },
  });

  return apiSuccess({ id: item.id, productId, quantity: item.quantity }, undefined, 201);
}
