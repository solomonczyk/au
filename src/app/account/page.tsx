import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { DashboardStats } from "@/components/account/DashboardStats";
import { OrdersTable } from "@/components/account/OrdersTable";
import { ActivityFeed } from "@/components/account/ActivityFeed";

export const metadata = { title: "Dashboard | AUREUM GOLD" };

export default async function AccountDashboardPage() {
  const session = await requireAuth();
  const userId = session.user.id;

  const [orders, wishlistCount, addressesCount] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: { include: { product: { select: { name: true } } } } },
    }),
    prisma.wishlistItem.count({ where: { userId } }),
    prisma.address.count({ where: { userId } }),
  ]);

  const totalStats = await prisma.order.aggregate({
    where: { userId, status: { notIn: ["CANCELLED", "REFUNDED"] } },
    _sum: { totalUsd: true },
  });

  const activeOrders = orders.filter(
    (o) => o.status === "PROCESSING" || o.status === "PAYMENT_PENDING"
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Dashboard</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Welcome back{session.user?.name ? `, ${session.user.name}` : ""}.
        </p>
      </div>

      <DashboardStats
        ordersCount={orders.length}
        totalSpentUsd={Number(totalStats._sum.totalUsd) || 0}
        wishlistCount={wishlistCount}
        activeOrders={activeOrders}
        addressesCount={addressesCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-gutter">
        <OrdersTable orders={orders as any} title="Recent Orders" />
        <ActivityFeed
          activities={orders.map((o) => ({
            id: o.id,
            type: "ORDER_CREATED",
            description: `Order ${o.orderNumber} — ${o.status.replace(/_/g, " ")}`,
            createdAt: o.createdAt.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
