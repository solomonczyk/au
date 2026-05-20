"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PricePoint {
  timestamp: string;
  xauUsd: number;
}

const periods = [
  { key: "1d", label: "1D" },
  { key: "1w", label: "1W" },
  { key: "1m", label: "1M" },
  { key: "6m", label: "6M" },
  { key: "1y", label: "1Y" },
];

export function PriceChart() {
  const [period, setPeriod] = useState("1w");
  const [data, setData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/prices/history?period=${period}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json.data.points || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [period]);

  const formatDate = (ts: string) => {
    const d = new Date(ts);
    if (period === "1d") return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    if (period === "1w") return d.toLocaleDateString("en-US", { weekday: "short" });
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="bg-surface-container-low border border-outline-variant p-8">
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse font-body-md text-body-md text-on-surface-variant">Loading chart data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Gold Price History</h3>
        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={`px-4 py-2 font-label-caps text-label-caps transition-colors ${
                period === p.key
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333535" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatDate}
                stroke="#99907c"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                stroke="#99907c"
                fontSize={12}
                tickLine={false}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1c1c",
                  border: "1px solid #4d4635",
                  borderRadius: 0,
                }}
                labelFormatter={(ts) => new Date(ts).toLocaleString("en-US")}
                formatter={(value) => [
                  `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                  "XAU/USD",
                ]}
              />
              <Line
                type="monotone"
                dataKey="xauUsd"
                stroke="#f2ca50"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-on-surface-variant font-body-md">
            No price data available yet
          </div>
        )}
      </div>
    </div>
  );
}
