"use client";

import { useState } from "react";

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ text: "Password updated successfully.", error: false });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: json.error?.message || "Failed to update password.", error: true });
      }
    } catch {
      setMessage({ text: "Something went wrong.", error: true });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-low border border-outline-variant p-6 space-y-5">
      <h3 className="font-headline-sm text-headline-sm text-primary">Change Password</h3>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-label-caps text-on-surface-variant">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-label-caps text-on-surface-variant">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-caps text-label-caps text-on-surface-variant">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-surface-container-lowest border border-outline-variant p-3 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      {message && (
        <div
          className={`p-3 font-body-sm text-body-sm ${
            message.error ? "bg-red-900/20 text-red-400" : "bg-emerald-900/20 text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
