import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const { id } = await params;
  const body = await request.json();
  const { quantity } = body;

  if (!quantity || quantity < 1) {
    return apiError("INVALID_INPUT", "quantity must be at least 1", 400);
  }

  const item = await prisma.cartItem.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!item) return apiError("NOT_FOUND", "Cart item not found", 404);

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });

  return apiSuccess({ id: updated.id, productId: updated.productId, quantity: updated.quantity });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const { id } = await params;

  const item = await prisma.cartItem.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!item) return apiError("NOT_FOUND", "Cart item not found", 404);

  await prisma.cartItem.delete({ where: { id } });

  return apiSuccess({ deleted: true });
}
