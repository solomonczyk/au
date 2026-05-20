import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import Link from "next/link";

export const metadata = {
  title: "Sign In | AUREUM GOLD",
  description: "Sign in to your AUREUM GOLD account.",
};

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto px-gutter py-section-padding-lg">
      <header className="text-center mb-12">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome Back</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Sign in to manage your portfolio and orders.
        </p>
      </header>

      <div className="bg-surface-container-low border border-outline-variant p-8 space-y-6">
        <LoginForm />

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-outline-variant" />
          <span className="font-body-sm text-body-sm text-on-surface-variant">or</span>
          <hr className="flex-1 border-outline-variant" />
        </div>

        <GoogleButton />

        <div className="text-center space-y-2 pt-4">
          <Link
            href="/auth/forgot-password"
            className="block font-body-sm text-body-sm text-primary hover:underline"
          >
            Forgot your password?
          </Link>
          <Link
            href="/auth/register"
            className="block font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Don&apos;t have an account? <span className="text-primary underline">Register</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
