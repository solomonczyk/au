"use client";

import { useState, useEffect } from "react";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  orderNumber: string;
  status: string;
  totalUsd: number;
  shippingMethod: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/orders")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setOrders(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (status: string) => {
    const colors: Record<string, string> = {
      DELIVERED: "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
      COMPLETED: "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
      SHIPPED: "bg-blue-900/20 text-blue-400 border-blue-800/30",
      PROCESSING: "bg-amber-900/20 text-amber-400 border-amber-800/30",
      PAID: "bg-primary-container/10 text-primary border-primary/20",
      PAYMENT_PENDING: "bg-surface-container-highest text-on-surface-variant border-outline-variant",
      CANCELLED: "bg-red-900/20 text-red-400 border-red-800/30",
    };
    return colors[status] || "bg-surface-container-highest text-on-surface-variant border-outline-variant";
  };

  if (loading) {
    return <div className="p-gutter py-12">
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-surface-container-high border border-outline-variant" />
        ))}
      </div>
    </div>;
  }

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Order History</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Track and manage your gold purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-surface-container-low border border-outline-variant p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-outline mb-4 block">receipt_long</span>
          <p className="font-body-md text-body-md text-on-surface-variant">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                {["Order", "Date", "Items", "Total", "Status"].map((h) => (
                  <th key={h} className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-body-md text-on-surface">
              {orders.map((order) => (
                <tr key={order.orderNumber} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                  <td className="py-5 px-6 font-medium text-primary">{order.orderNumber}</td>
                  <td className="py-5 px-6">{new Date(order.createdAt).toLocaleDateString("en-US")}</td>
                  <td className="py-5 px-6">{order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}</td>
                  <td className="py-5 px-6">${order.totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="py-5 px-6">
                    <span className={`px-2 py-1 text-xs border ${statusColor(order.status)}`}>
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
