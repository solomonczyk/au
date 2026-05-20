"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("aurum-cookie-consent");
    if (!consent) setDismissed(false);
  }, []);

  function accept() {
    localStorage.setItem("aurum-cookie-consent", "accepted");
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-high border-t border-outline-variant p-6">
      <div className="max-w-container-max mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          We use cookies to improve your experience. By using our site, you agree to our{" "}
          <Link href="/legal/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>{" "}
          and <Link href="/legal/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>.
        </p>
        <button
          type="button"
          onClick={accept}
          className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-fixed-dim transition-all flex-shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
