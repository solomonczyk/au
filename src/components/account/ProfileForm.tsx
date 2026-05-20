"use client";

import { useState } from "react";

interface ProfileFormProps {
  user: { id: string; name: string | null; email: string; phone: string | null; emailVerified: Date | null };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: phone || null }),
      });
      const json = await res.json();
      if (json.success) setSaved(true);
    } catch {
      /* ignore */
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="bg-surface-container-low border border-outline-variant p-6 space-y-5">
      <h3 className="font-headline-sm text-headline-sm text-primary">Profile</h3>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-label-caps text-on-surface-variant">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="bg-surface-container-highest border border-outline-variant p-3 text-on-surface-variant cursor-not-allowed"
        />
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {user.emailVerified ? "✓ Verified" : "Not verified"}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-label-caps text-on-surface-variant">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-label-caps text-on-surface-variant">Phone (+1XXXXXXXXXX)</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      {saved && (
        <div className="bg-emerald-900/20 text-emerald-400 p-3 font-body-sm text-body-sm">Profile updated.</div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
