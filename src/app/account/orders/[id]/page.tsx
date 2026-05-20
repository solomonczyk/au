import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAuth } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { OrderDetail } from "@/components/account/OrderDetail";

export const metadata = { title: "Order Details | AUREUM GOLD" };

export default async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const session = await requireAuth();

  const order = await prisma.order.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: { include: { product: { include: { images: { orderBy: { sortOrder: "asc" } } } } } },
      shippingAddress: true,
      statusHistory: { orderBy: { changedAt: "asc" } },
    },
  });

  if (!order) notFound();

  const serialized = {
    ...order,
    totalUsd: Number(order.totalUsd),
    subtotalUsd: Number(order.subtotalUsd),
    shippingCostUsd: Number(order.shippingCostUsd),
    salesTaxUsd: Number(order.salesTaxUsd),
    items: order.items.map((i) => ({
      ...i,
      unitPriceUsd: Number(i.unitPriceUsd),
    })),
    createdAt: order.createdAt.toISOString(),
    statusHistory: order.statusHistory.map((h) => ({
      ...h,
      changedAt: h.changedAt.toISOString(),
    })),
  };

  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 font-body-md text-body-md text-primary hover:underline"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Orders
      </Link>
      <OrderDetail order={serialized as any} />
    </div>
  );
}
