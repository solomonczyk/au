"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token");
      return;
    }

    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(json.data?.message || "Email verified successfully");
        } else {
          setStatus("error");
          setMessage(json.error?.message || "Verification failed");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("An unexpected error occurred");
      });
  }, [token]);

  if (status === "loading") {
    return (
      <div>
        <span className="material-symbols-outlined text-[48px] text-primary mb-4 block animate-pulse">sync</span>
        <p className="font-body-md text-body-md text-on-surface-variant">Verifying your email...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <span className="material-symbols-outlined text-[48px] text-primary mb-4 block">check_circle</span>
        <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Email Verified</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">{message}</p>
        <Link
          href="/auth/login"
          className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps inline-block hover:bg-primary-fixed-dim transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <span className="material-symbols-outlined text-[48px] text-error mb-4 block">error</span>
      <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Verification Failed</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-8">{message}</p>
      <Link href="/" className="text-primary hover:underline font-body-md">
        Return to Home
      </Link>
    </div>
  );
}
