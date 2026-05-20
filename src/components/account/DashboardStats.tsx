interface DashboardStatsProps {
  ordersCount: number;
  totalSpentUsd: number;
  wishlistCount: number;
  activeOrders: number;
  addressesCount: number;
}

export function DashboardStats({
  ordersCount,
  totalSpentUsd,
  wishlistCount,
  activeOrders,
  addressesCount,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Total Orders",
      value: ordersCount,
      sub: `${activeOrders} active`,
      icon: "receipt_long",
    },
    {
      label: "Total Spent",
      value: `$${totalSpentUsd.toLocaleString("en-US", { minimumFractionDigits: 0 })}`,
      sub: "USD",
      icon: "account_balance_wallet",
    },
    {
      label: "Wishlist",
      value: wishlistCount,
      sub: `${addressesCount} addresses`,
      icon: "favorite",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      {stats.map((s) => (
        <div key={s.label} className="bg-surface-container-low border border-outline-variant p-6 hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">{s.label}</span>
            <span className="material-symbols-outlined text-primary/40">{s.icon}</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface mb-1">
            {typeof s.value === "number" ? s.value : s.value}
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
