"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError("Missing reset token");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error?.message || "Failed to reset password");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("An unexpected error occurred");
    }
    setLoading(false);
  }

  if (!token) {
    return (
      <main className="max-w-md mx-auto px-gutter py-section-padding-lg text-center">
        <div className="bg-surface-container-low border border-outline-variant p-12">
          <span className="material-symbols-outlined text-[48px] text-error mb-4 block">error</span>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Invalid Link</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/auth/forgot-password" className="text-primary hover:underline font-body-md">
            Request a new reset link
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="max-w-md mx-auto px-gutter py-section-padding-lg text-center">
        <div className="bg-surface-container-low border border-outline-variant p-12">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">check_circle</span>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Password Reset</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Your password has been successfully reset.
          </p>
          <Link
            href="/auth/login"
            className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps inline-block hover:bg-primary-fixed-dim transition-all"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="space-y-6">
      <header className="text-center mb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Set New Password</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Enter your new password below.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-error-container text-on-error-container p-4 font-body-sm text-body-sm">{error}</div>
        )}
        <div className="space-y-2">
          <label htmlFor="new-password" className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters, 1 number, 1 uppercase"
            className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
