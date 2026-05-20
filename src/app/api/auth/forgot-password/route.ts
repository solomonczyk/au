import { ForgotPasswordSchema } from "@/lib/validations/auth";
import { createPasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/email";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ForgotPasswordSchema.safeParse(body);
    if (!parsed.success) return apiValidationError(parsed.error);

    const { email } = parsed.data;
    const token = await createPasswordResetToken(email);

    // Always return success to prevent email enumeration
    if (token) {
      await sendPasswordResetEmail(email, token);
    }

    return apiSuccess({
      message: "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return apiError("INTERNAL_ERROR", "An unexpected error occurred", 500);
  }
}
