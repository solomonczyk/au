import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: { select: { productName: true, quantity: true, unitPriceUsd: true } },
      user: { select: { name: true, email: true } },
    },
  });

  return apiSuccess(
    orders.map((o) => ({
      ...o,
      totalUsd: Number(o.totalUsd),
      subtotalUsd: Number(o.subtotalUsd),
      salesTaxUsd: Number(o.salesTaxUsd),
      shippingCostUsd: Number(o.shippingCostUsd),
      goldSpotAtOrderUsd: Number(o.goldSpotAtOrderUsd),
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
      user: o.user ? { name: o.user.name, email: o.user.email } : null,
    }))
  );
}
