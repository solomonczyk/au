import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Create Account | AUREUM GOLD",
  description: "Create your AUREUM GOLD account to start buying and selling precious metals.",
};

export default function RegisterPage() {
  return (
    <main className="max-w-md mx-auto px-gutter py-section-padding-lg">
      <header className="text-center mb-12">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Open Account</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Begin your journey with institutional-grade gold investing.
        </p>
      </header>

      <div className="bg-surface-container-low border border-outline-variant p-8 space-y-6">
        <RegisterForm />

        <div className="text-center pt-4">
          <Link
            href="/auth/login"
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Already have an account? <span className="text-primary underline">Sign In</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
