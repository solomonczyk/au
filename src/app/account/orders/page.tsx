export default function OrdersPage() {
  const orders = [
    { id: "AUR-2026-0042", date: "May 15, 2026", items: "1oz Gold Bar - PAMP Suisse", total: "$2,342.15", status: "Delivered" },
    { id: "AUR-2026-0041", date: "May 10, 2026", items: "1oz Gold American Eagle", total: "$2,415.80", status: "Processing" },
    { id: "AUR-2026-0038", date: "Apr 28, 2026", items: "10oz Gold Bar - Valcambi", total: "$23,285.00", status: "Delivered" },
  ];

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Order History</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Track and manage your gold purchases.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {["Order", "Date", "Items", "Total", "Status"].map((h) => (
                <th key={h} className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-body-md text-on-surface">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                <td className="py-5 px-6 font-medium text-primary">{order.id}</td>
                <td className="py-5 px-6">{order.date}</td>
                <td className="py-5 px-6">{order.items}</td>
                <td className="py-5 px-6">{order.total}</td>
                <td className="py-5 px-6">
                  <span className={`px-2 py-1 text-xs border rounded ${
                    order.status === "Delivered"
                      ? "bg-primary-container/10 text-primary border-primary/20"
                      : "bg-surface-container-highest text-on-surface-variant border-outline-variant"
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
