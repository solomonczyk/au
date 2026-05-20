import Link from "next/link";

interface OrderItem {
  id: string;
  quantity: number;
  product?: { id: string; name: string };
  name?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  createdAt: string;
  items: OrderItem[];
}

export function OrdersTable({
  orders,
  title = "Orders",
  showLink = true,
}: {
  orders: Order[];
  title?: string;
  showLink?: boolean;
}) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant">
      <div className="px-6 py-5 border-b border-outline-variant flex items-center justify-between">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
        {showLink && (
          <Link href="/account/orders" className="font-label-caps text-label-caps text-primary hover:underline">
            View All
          </Link>
        )}
      </div>
      {orders.length === 0 ? (
        <div className="px-6 py-12 text-center text-on-surface-variant font-body-md">
          No orders yet.{" "}
          <Link href="/catalog" className="text-primary hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-outline-variant">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-surface-container-high transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="font-body-md text-body-md text-on-surface font-medium truncate">
                  {order.orderNumber}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {order.items.map((i) => i.product?.name ?? i.name).join(", ")}
                </p>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="font-body-md text-body-md text-on-surface">
                  ${Number(order.totalUsd).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrderStatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    DELIVERED: "bg-emerald-900/20 text-emerald-400",
    COMPLETED: "bg-emerald-900/20 text-emerald-400",
    SHIPPED: "bg-blue-900/20 text-blue-400",
    PROCESSING: "bg-amber-900/20 text-amber-400",
    PAID: "bg-primary-container/10 text-primary",
    PAYMENT_PENDING: "bg-surface-container-highest text-on-surface-variant",
    CANCELLED: "bg-red-900/20 text-red-400",
    REFUNDED: "bg-red-900/20 text-red-400",
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 font-label-caps text-[10px] uppercase tracking-wider ${
        colorMap[status] || "bg-surface-container-highest text-on-surface-variant"
      }`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
