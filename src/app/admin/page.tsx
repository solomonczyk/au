"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenueUsd: number;
  pendingOrders: number;
  complianceAlerts: number;
  totalUsers: number;
  recentOrders: { orderNumber: string; totalUsd: number; status: string; createdAt: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((j) => { if (j.success) setStats(j.data); })
      .catch(console.error);
  }, []);

  const cards = [
    { label: "Revenue", value: stats ? `$${stats.totalRevenueUsd.toLocaleString()}` : "—", sub: `${stats?.totalOrders || 0} orders` },
    { label: "Products", value: stats?.totalProducts ?? "—", sub: "active listings" },
    { label: "Users", value: stats?.totalUsers ?? "—", sub: "registered" },
    { label: "Pending Orders", value: stats?.pendingOrders ?? "—", sub: "need attention", warn: (stats?.pendingOrders ?? 0) > 0 },
    { label: "Compliance", value: stats?.complianceAlerts ?? "—", sub: "unresolved alerts", warn: (stats?.complianceAlerts ?? 0) > 0 },
  ];

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Admin Dashboard</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Overview of your store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-gutter mb-12">
        {cards.map((card) => (
          <div key={card.label} className={`bg-surface-container-low border p-6 ${card.warn ? "border-warning" : "border-outline-variant"}`}>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">{card.label}</span>
            <div className="mt-3 font-headline-md text-headline-md text-on-surface">{card.value}</div>
            <div className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant">
        <div className="px-8 py-6 border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Orders</h3>
        </div>
        {stats?.recentOrders?.length ? (
          <div className="divide-y divide-outline-variant">
            {stats.recentOrders.map((order) => (
              <div key={order.orderNumber} className="flex justify-between px-8 py-5 hover:bg-surface-container-high">
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="font-body-md text-body-md text-on-surface">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-body-md text-on-surface">${order.totalUsd.toLocaleString()}</p>
                  <span className="font-body-sm text-body-sm text-primary">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-8 py-12 text-center text-on-surface-variant font-body-md">No orders yet.</div>
        )}
      </div>
    </div>
  );
}
