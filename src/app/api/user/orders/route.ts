import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      paymentStatus: true,
      totalUsd: true,
      shippingMethod: true,
      createdAt: true,
      items: {
        select: { productName: true, quantity: true },
      },
    },
  });

  const data = orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    totalUsd: Number(order.totalUsd),
    shippingMethod: order.shippingMethod,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((i) => ({ name: i.productName, quantity: i.quantity })),
  }));

  return apiSuccess(data);
}
