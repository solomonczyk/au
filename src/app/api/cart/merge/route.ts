import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const body = await request.json();
  const { items } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return apiError("INVALID_INPUT", "items array is required", 400);
  }

  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  const results: { productId: string; quantity: number; merged: "added" | "updated" }[] = [];

  for (const item of items) {
    if (!productMap.has(item.productId)) continue;

    const existing = await prisma.cartItem.findFirst({
      where: { userId: session.user.id, productId: item.productId },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: Math.max(existing.quantity, item.quantity || 1) },
      });
      results.push({ productId: item.productId, quantity: Math.max(existing.quantity, item.quantity || 1), merged: "updated" });
    } else {
      await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          productId: item.productId,
          quantity: item.quantity || 1,
          priceAtAddUsd: 0,
        },
      });
      results.push({ productId: item.productId, quantity: item.quantity || 1, merged: "added" });
    }
  }

  return apiSuccess({ merged: results });
}
