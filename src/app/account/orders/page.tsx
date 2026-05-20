import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { OrdersTable } from "@/components/account/OrdersTable";

export const metadata = { title: "My Orders | AUREUM GOLD" };

export default async function OrdersPage() {
  const session = await requireAuth();

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: { select: { name: true } } } } },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Order History</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Track and manage your gold purchases.
        </p>
      </div>

      <OrdersTable orders={orders as any} title="My Orders" showLink={false} />
    </div>
  );
}
