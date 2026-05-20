"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Profile {
  name: string | null;
  email: string;
  _count: { orders: number; addresses: number };
}

export default function AccountDashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<{ orderNumber: string; totalUsd: number; status: string; createdAt: string; items: { name: string }[] }[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/user/profile").then((r) => r.json()),
      fetch("/api/user/orders").then((r) => r.json()),
    ]).then(([profileJson, ordersJson]) => {
      if (profileJson.success) setProfile(profileJson.data);
      if (ordersJson.success) setOrders(ordersJson.data);
    }).catch(console.error);
  }, []);

  const activeOrders = orders.filter((o) => o.status === "PROCESSING" || o.status === "PAYMENT_PENDING").length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Dashboard</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Welcome back{profile?.name ? `, ${profile.name}` : ""}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        <div className="bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-colors">
          <span className="font-label-caps text-label-caps text-primary uppercase">Total Orders</span>
          <div className="mt-4 font-headline-md text-headline-md text-on-surface">{profile?._count?.orders ?? "—"}</div>
          <div className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{activeOrders} active</div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-colors">
          <span className="font-label-caps text-label-caps text-primary uppercase">Saved Addresses</span>
          <div className="mt-4 font-headline-md text-headline-md text-on-surface">{profile?._count?.addresses ?? "—"}</div>
          <div className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
            <Link href="/account/settings" className="text-primary hover:underline">Manage</Link>
          </div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-colors">
          <span className="font-label-caps text-label-caps text-primary uppercase">Account Status</span>
          <div className="mt-4 font-headline-md text-headline-md text-on-surface">{profile?.email || "—"}</div>
          <div className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
            {profile?.name ? "Registered" : "Complete your profile"}
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant">
        <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Orders</h3>
          <Link href="/account/orders" className="font-label-caps text-label-caps text-primary hover:underline">View All</Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="divide-y divide-outline-variant">
            {recentOrders.map((order) => (
              <div key={order.orderNumber} className="flex justify-between items-center px-8 py-5 hover:bg-surface-container-high transition-colors">
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString("en-US")}</p>
                  <p className="font-body-md text-body-md text-on-surface">{order.orderNumber}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{order.items.map((i) => i.name).join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="font-body-md text-body-md text-on-surface">${order.totalUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                  <span className="font-body-sm text-body-sm text-primary">{order.status.replace(/_/g, " ")}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-8 py-12 text-center text-on-surface-variant font-body-md">
            No orders yet. <Link href="/catalog" className="text-primary hover:underline">Start shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
