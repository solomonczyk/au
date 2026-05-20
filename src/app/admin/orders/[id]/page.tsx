"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then((j) => { if (j.success) { setOrder(j.data); setNewStatus(j.data.status); } })
      .catch(console.error);
  }, [id]);

  async function updateStatus() {
    if (!newStatus || newStatus === order.status) return;
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrder({ ...order, status: newStatus });
  }

  if (!order) return <div className="p-gutter py-12 animate-pulse">Loading...</div>;

  const statuses = ["PAYMENT_PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

  return (
    <div className="p-gutter py-12 max-w-4xl">
      <Link href="/admin/orders" className="font-label-caps text-label-caps text-primary hover:underline mb-6 inline-block">← Back to Orders</Link>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 mt-4">{order.orderNumber}</h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{new Date(order.createdAt).toLocaleString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-3">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Details</h3>
          <Row label="Status" value={order.status} />
          <Row label="Payment" value={order.paymentStatus} />
          <Row label="Total" value={`$${order.totalUsd.toLocaleString()}`} />
          <Row label="Shipping" value={order.shippingMethod} />
          <Row label="Customer" value={order.user?.email || "Guest"} />
        </div>

        <div className="bg-surface-container-low border border-outline-variant p-6 space-y-3">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Update Status</h3>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary outline-none"
          >
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            type="button"
            onClick={updateStatus}
            disabled={newStatus === order.status}
            className="w-full bg-primary text-on-primary py-3 font-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
          >
            Update
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant">
        <div className="px-6 py-4 border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Items</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          {order.items?.map((item: any, i: number) => (
            <div key={i} className="flex justify-between px-6 py-4">
              <span className="font-body-md text-body-md text-on-surface">{item.productName} x{item.quantity}</span>
              <span className="font-body-md text-body-md text-on-surface">${Number(item.unitPriceUsd).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-label-caps text-label-caps text-on-surface-variant">{label}</span>
      <span className="font-body-md text-body-md text-on-surface">{value}</span>
    </div>
  );
}
