import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user || ((session.user as { role?: string }).role !== "ADMIN" && (session.user as { role?: string }).role !== "COMPLIANCE_OFFICER")) {
    return apiError("FORBIDDEN", "Admin access required", 403);
  }

  const [
    totalProducts,
    totalOrders,
    totalRevenue,
    pendingOrders,
    complianceAlerts,
    totalUsers,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalUsd: true }, where: { paymentStatus: "CAPTURED" } }),
    prisma.order.count({ where: { status: "PAYMENT_PENDING" } }),
    prisma.complianceAlert.count({ where: { resolved: false } }),
    prisma.user.count(),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { orderNumber: true, totalUsd: true, status: true, createdAt: true },
    }),
  ]);

  return apiSuccess({
    totalProducts,
    totalOrders,
    totalRevenueUsd: Number(totalRevenue._sum.totalUsd || 0),
    pendingOrders,
    complianceAlerts,
    totalUsers,
    recentOrders: recentOrders.map((o) => ({
      ...o,
      totalUsd: Number(o.totalUsd),
      createdAt: o.createdAt.toISOString(),
    })),
  });
}
