"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error?.message || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/auth/login?registered=true");
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error-container text-on-error-container p-4 font-body-sm text-body-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="John Smith"
          className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-email" className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
          Email Address
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          required
          placeholder="john@example.com"
          className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-password" className="font-label-caps text-label-caps uppercase text-on-surface-variant block">
          Password
        </label>
        <input
          id="reg-password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Min. 8 characters, 1 number, 1 uppercase"
          className="w-full bg-surface-container border border-outline-variant p-4 text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
}
