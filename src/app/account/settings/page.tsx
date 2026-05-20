"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: "", phone: "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setProfile({ name: json.data.name || "", phone: json.data.phone || "" });
        }
      })
      .catch(console.error);
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const json = await res.json();
      if (json.success) setSaved(true);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }

  return (
    <div className="p-gutter py-12 max-w-2xl">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Settings</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your profile and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <section className="bg-surface-container-low border border-outline-variant p-8 space-y-6">
          <h3 className="font-headline-sm text-headline-sm text-primary">Profile</h3>

          <Field label="Full Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
          <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />

          {saved && (
            <div className="bg-emerald-900/20 text-emerald-400 p-4 font-body-sm text-body-sm">Profile updated.</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </section>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-label-caps text-label-caps text-on-surface-variant">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-container-lowest border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
      />
    </div>
  );
}
