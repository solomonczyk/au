"use client";

import { useState, useEffect } from "react";

export default function AdminCompliancePage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/compliance")
      .then((r) => r.json())
      .then((j) => { if (j.success) setAlerts(j.data.alerts); })
      .catch(console.error);
  }, []);

  async function resolveAlert(id: string) {
    await fetch(`/api/admin/compliance/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resolved: true }),
    });
    setAlerts(alerts.filter((a) => a.id !== id));
  }

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Compliance</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">{alerts.length} unresolved alerts</p>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-surface-container-low border border-outline-variant p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-emerald-400 mb-4 block">verified_user</span>
          <p className="font-body-md text-body-md text-on-surface-variant">No unresolved compliance alerts.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-surface-container-low border border-outline-variant p-6 flex justify-between items-start">
              <div>
                <span className={`px-2 py-1 text-xs border font-label-caps ${
                  alert.severity === "HIGH" ? "bg-red-900/20 text-red-400 border-red-800/30" :
                  alert.severity === "MEDIUM" ? "bg-amber-900/20 text-amber-400 border-amber-800/30" :
                  "bg-surface-container-highest text-on-surface-variant border-outline-variant"
                }`}>{alert.severity}</span>
                <span className="px-2 py-1 text-xs border bg-surface-container-highest text-on-surface-variant ml-2">{alert.type}</span>
                <p className="font-body-md text-body-md text-on-surface mt-3">{alert.description}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{new Date(alert.createdAt).toLocaleString()}</p>
              </div>
              <button
                type="button"
                onClick={() => resolveAlert(alert.id)}
                className="bg-primary text-on-primary px-6 py-2 font-label-caps text-label-caps hover:bg-primary-fixed-dim transition-all flex-shrink-0"
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
