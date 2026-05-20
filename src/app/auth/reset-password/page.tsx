import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | AUREUM GOLD",
  description: "Set a new password for your AUREUM GOLD account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main className="max-w-md mx-auto px-gutter py-section-padding-lg text-center">
        <div className="bg-surface-container-low border border-outline-variant p-12">
          <p className="font-body-md text-body-md text-on-surface-variant">Loading...</p>
        </div>
      </main>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
