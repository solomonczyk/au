export default function WalletPage() {
  return (
    <div className="p-gutter py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Wallet Ledger</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Real-time institutional asset auditing and transaction management.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
        <div className="bg-surface-container-low border border-outline-variant p-8 flex flex-col justify-between group hover:border-primary transition-colors">
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase">
              Available Account Credit
            </span>
            <div className="mt-4 font-headline-md text-headline-md text-on-surface">$12,450.00</div>
          </div>
          <div className="mt-6 flex items-center text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-primary mr-2">check_circle</span>
            Verified Liquid Funds
          </div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant p-8 flex flex-col justify-between group hover:border-primary transition-colors">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Pending Settlement
            </span>
            <div className="mt-4 font-headline-md text-headline-md text-on-surface">$2,100.00</div>
          </div>
          <div className="mt-6 flex items-center text-on-surface-variant text-sm">
            <span className="material-symbols-outlined mr-2">schedule</span>
            Estimated clearing: 24h
          </div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant p-8 flex flex-col justify-between group hover:border-primary transition-colors">
          <div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Gold Holdings Summary
            </span>
            <div className="mt-4 font-headline-md text-headline-md text-on-surface">2.5 troy oz</div>
          </div>
          <div className="mt-6 flex items-center text-on-surface-variant text-sm">
            <span className="material-symbols-outlined mr-2">token</span>
            LBMA Good Delivery Standard
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-surface-container-lowest border border-outline-variant overflow-hidden">
        {/* Filter Tabs */}
        <div className="flex border-b border-outline-variant bg-surface">
          {["All", "Deposits", "Purchases", "Sales", "Fees"].map((tab, i) => (
            <button
              key={tab}
              className={`px-8 py-4 font-label-caps text-label-caps transition-all ${
                i === 0
                  ? "text-primary border-b-2 border-primary bg-surface-container-high"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                {["Date", "Description", "Type", "Amount", "Balance"].map((h) => (
                  <th
                    key={h}
                    className={`py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase ${
                      h === "Amount" || h === "Balance" ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-body-md text-on-surface">
              {[
                {
                  date: "May 15, 2026",
                  desc: "Wire Transfer Deposit",
                  type: "Deposit",
                  typeColor: "primary",
                  amount: "+$10,000.00",
                  amountStyle: "text-primary",
                  balance: "$12,450.00",
                },
                {
                  date: "May 12, 2026",
                  desc: "Purchase: 1oz Gold Maple Leaf",
                  type: "Purchase",
                  typeColor: "neutral",
                  amount: "-$2,342.12",
                  amountStyle: "",
                  balance: "$2,450.00",
                },
                {
                  date: "May 8, 2026",
                  desc: "Gold Sale Proceed",
                  type: "Sale",
                  typeColor: "primary",
                  amount: "+$2,100.00",
                  amountStyle: "text-primary",
                  balance: "$4,792.12",
                },
                {
                  date: "May 1, 2026",
                  desc: "Vault Storage Fee",
                  type: "Fee",
                  typeColor: "error",
                  amount: "-$45.00",
                  amountStyle: "",
                  balance: "$2,692.12",
                },
              ].map((row) => (
                <tr
                  key={row.date + row.desc}
                  className="border-b border-outline-variant hover:bg-surface-container-high transition-colors"
                >
                  <td className="py-5 px-6">{row.date}</td>
                  <td className="py-5 px-6 font-medium">{row.desc}</td>
                  <td className="py-5 px-6">
                    <span
                      className={`px-2 py-1 text-xs border rounded ${
                        row.typeColor === "primary"
                          ? "bg-primary-container/10 text-primary border-primary/20"
                          : row.typeColor === "error"
                          ? "bg-error-container/10 text-error border-error-container/20"
                          : "bg-surface-container-highest text-on-surface-variant border-outline-variant"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className={`py-5 px-6 text-right font-semibold ${row.amountStyle}`}>
                    {row.amount}
                  </td>
                  <td className="py-5 px-6 text-right">{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export */}
      <div className="mt-12 flex justify-between items-center bg-surface-container-low border border-outline-variant p-8">
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface">Export Data</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Download monthly statements and audit-ready ledger logs.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border-2 border-outline-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-all">
            Download PDF
          </button>
          <button className="px-6 py-3 border-2 border-primary text-primary font-label-caps text-label-caps hover:bg-primary-container/10 transition-all">
            CSV Export
          </button>
        </div>
      </div>
    </div>
  );
}
