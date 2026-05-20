import { Suspense } from "react";
import Link from "next/link";
import { VerifyEmailContent } from "@/components/auth/VerifyEmailContent";

export const metadata = {
  title: "Email Verified | AUREUM GOLD",
};

export default function VerifyEmailPage() {
  return (
    <main className="max-w-md mx-auto px-gutter py-section-padding-lg text-center">
      <div className="bg-surface-container-low border border-outline-variant p-12">
        <Suspense fallback={
          <div>
            <span className="material-symbols-outlined text-[48px] text-primary mb-4 block animate-pulse">sync</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Verifying your email...</p>
          </div>
        }>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </main>
  );
}
