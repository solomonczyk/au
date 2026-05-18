export default function AccountDashboardPage() {
  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Dashboard</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Welcome back to your Aureum portfolio.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        {[
          { label: "Portfolio Value", value: "$124,500.00", sub: "+2.4% this month" },
          { label: "Gold Holdings", value: "48.5 oz", sub: "1.51 kg total" },
          { label: "Active Orders", value: "2", sub: "1 pending delivery" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-colors"
          >
            <span className="font-label-caps text-label-caps text-primary uppercase">
              {card.label}
            </span>
            <div className="mt-4 font-headline-md text-headline-md text-on-surface">{card.value}</div>
            <div className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-container-lowest border border-outline-variant">
        <div className="px-8 py-6 border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Activity</h3>
        </div>
        <div className="divide-y divide-outline-variant">
          {[
            { date: "May 15, 2026", desc: "Gold Bar - PAMP Suisse 1oz", amount: "$2,342.15", status: "Delivered" },
            { date: "May 10, 2026", desc: "Gold American Eagle 1oz", amount: "$2,415.80", status: "Processing" },
            { date: "Apr 28, 2026", desc: "Deposit - Wire Transfer", amount: "+$25,000.00", status: "Completed" },
          ].map((item) => (
            <div key={item.date + item.desc} className="flex justify-between items-center px-8 py-5 hover:bg-surface-container-high transition-colors">
              <div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{item.date}</p>
                <p className="font-body-md text-body-md text-on-surface">{item.desc}</p>
              </div>
              <div className="text-right">
                <p className="font-body-md text-body-md text-on-surface">{item.amount}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
