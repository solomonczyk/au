import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      shippingAddress: true,
      statusHistory: { orderBy: { changedAt: "desc" } },
      user: { select: { name: true, email: true, phone: true } },
    },
  });

  if (!order) return apiError("NOT_FOUND", "Order not found", 404);

  return apiSuccess({
    ...order,
    totalUsd: Number(order.totalUsd),
    subtotalUsd: Number(order.subtotalUsd),
    salesTaxUsd: Number(order.salesTaxUsd),
    shippingCostUsd: Number(order.shippingCostUsd),
    goldSpotAtOrderUsd: Number(order.goldSpotAtOrderUsd),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((i) => ({ ...i, unitPriceUsd: Number(i.unitPriceUsd), subtotalUsd: Number(i.subtotalUsd), spotPriceAtOrder: Number(i.spotPriceAtOrder) })),
    statusHistory: order.statusHistory.map((h) => ({ ...h, changedAt: h.changedAt.toISOString() })),
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const { id } = await params;
  const body = await request.json();
  const { status, paymentStatus, adminNotes, trackingNumber, carrier } = body;

  const existing = await prisma.order.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Order not found", 404);

  const updated = await prisma.order.update({
    where: { id },
    data: {
      ...(status !== undefined && { status }),
      ...(paymentStatus !== undefined && { paymentStatus }),
      ...(adminNotes !== undefined && { adminNotes }),
      ...(trackingNumber !== undefined && { trackingNumber }),
      ...(carrier !== undefined && { carrier }),
    },
  });

  if (status) {
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        note: body.note || null,
        changedBy: session?.user?.name || session?.user?.email || "admin",
      },
    });
  }

  return apiSuccess({ id: updated.id, status: updated.status, paymentStatus: updated.paymentStatus });
}
