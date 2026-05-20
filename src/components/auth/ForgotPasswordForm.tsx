"use client";

import { useState } from "react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error?.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setSent(true);
    } catch {
      setError("An unexpected error occurred");
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="max-w-md mx-auto px-gutter py-section-padding-lg text-center">
        <div className="bg-surface-container-low border border-outline-variant p-12">
          <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">mail</span>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Check Your Email</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            If an account with that email exists, we&apos;ve sent a password reset link.
          </p>
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-body-md"
          >
            Back to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-gutter py-section-padding-lg">
      <header className="text-center mb-12">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Reset Password</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </header>

      <div className="bg-surface-container-low border border-outline-variant p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-error-container text-on-error-container p-4 font-body-sm text-body-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <div className="text-center">
            <Link href="/auth/login" className="font-body-sm text-body-sm text-primary hover:underline">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
