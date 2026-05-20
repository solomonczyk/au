"use client";

import { OrderStatusBadge } from "./OrdersTable";

interface OrderImage {
  url: string;
  altText?: string;
}

interface OrderProduct {
  id: string;
  name: string;
  images?: OrderImage[];
}

interface OrderItem {
  id: string;
  quantity: number;
  unitPriceUsd: number;
  product: OrderProduct;
}

interface StatusHistory {
  status: string;
  changedAt: string;
  note?: string;
}

interface ShippingAddress {
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalUsd: number;
  subtotalUsd: number;
  shippingCostUsd: number;
  salesTaxUsd: number;
  shippingMethod: string;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
  shippingAddress?: ShippingAddress | null;
  statusHistory: StatusHistory[];
}

export function OrderDetail({ order }: { order: Order }) {
  const createdDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Order {order.orderNumber}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Placed on {createdDate}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items */}
      <section className="bg-surface-container-low border border-outline-variant divide-y divide-outline-variant">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-6">
            <div className="w-16 h-16 bg-surface-container-highest border border-outline-variant flex items-center justify-center shrink-0">
              {item.product.images?.[0]?.url ? (
                <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-contain" />
              ) : (
                <span className="material-symbols-outlined text-outline">image</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body-md text-body-md text-on-surface font-medium">{item.product.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Qty: {item.quantity}</p>
            </div>
            <p className="font-body-md text-body-md text-on-surface shrink-0">
              ${Number(item.unitPriceUsd).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </section>

      {/* Summary + Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Shipping */}
        {order.shippingAddress && (
          <section className="bg-surface-container-low border border-outline-variant p-6">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Shipping Address</h3>
            <div className="font-body-md text-body-md text-on-surface space-y-1">
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-on-surface-variant text-body-sm">Method: {order.shippingMethod}</p>
            </div>
          </section>
        )}

        {/* Totals */}
        <section className="bg-surface-container-low border border-outline-variant p-6">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Order Summary</h3>
          <div className="space-y-3 font-body-md text-body-md">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span className="text-on-surface">${Number(order.subtotalUsd).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Shipping</span>
              <span className="text-on-surface">${Number(order.shippingCostUsd).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Tax</span>
              <span className="text-on-surface">${Number(order.salesTaxUsd).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-outline-variant font-headline-sm text-headline-sm">
              <span className="text-primary">Total</span>
              <span className="text-primary">
                ${Number(order.totalUsd).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Status History */}
      {order.statusHistory && order.statusHistory.length > 0 && (
        <section className="bg-surface-container-low border border-outline-variant p-6">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Order Timeline</h3>
          <div className="space-y-4">
            {order.statusHistory.map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
                  {i < order.statusHistory.length - 1 && <div className="w-px flex-1 bg-outline-variant mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-label-caps text-label-caps text-on-surface">
                      {h.status.replace(/_/g, " ")}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {new Date(h.changedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {h.note && <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{h.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
