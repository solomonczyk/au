"use client";

import { useState, useEffect } from "react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  createdAt: string;
  user: { name: string | null; email: string } | null;
  items: { productName: string; quantity: number }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((j) => { if (j.success) setOrders(j.data); })
      .catch(console.error);
  }, []);

  const statusColor = (s: string) => {
    const m: Record<string, string> = {
      PAID: "text-primary border-primary/30 bg-primary-container/10",
      DELIVERED: "text-emerald-400 border-emerald-800/30 bg-emerald-900/20",
      PROCESSING: "text-amber-400 border-amber-800/30 bg-amber-900/20",
      PAYMENT_PENDING: "text-on-surface-variant border-outline-variant bg-surface-container-highest",
      CANCELLED: "text-red-400 border-red-800/30 bg-red-900/20",
    };
    return m[s] || "text-on-surface-variant border-outline-variant bg-surface-container-highest";
  };

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Orders</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{orders.length} total orders</p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {["Order", "Date", "Customer", "Items", "Total", "Status"].map((h) => (
                <th key={h} className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-body-md text-on-surface">
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                <td className="py-5 px-6 font-medium text-primary">{o.orderNumber}</td>
                <td className="py-5 px-6">{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="py-5 px-6">{o.user?.email || "Guest"}</td>
                <td className="py-5 px-6">{o.items.length} item(s)</td>
                <td className="py-5 px-6">${o.totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                <td className="py-5 px-6">
                  <span className={`px-2 py-1 text-xs border ${statusColor(o.status)}`}>{o.status}</span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-on-surface-variant">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
