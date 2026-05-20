import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ResetPasswordSchema } from "@/lib/validations/auth";
import { verifyToken } from "@/lib/tokens";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ResetPasswordSchema.safeParse(body);
    if (!parsed.success) return apiValidationError(parsed.error);

    const { token, password } = parsed.data;

    const identifier = await verifyToken(token);
    if (!identifier) {
      return apiError("INVALID_TOKEN", "Token is invalid or expired", 400);
    }

    // identifier format: "reset:{userId}"
    const userId = identifier.replace("reset:", "");
    if (!userId) {
      return apiError("INVALID_TOKEN", "Token is invalid or expired", 400);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return apiSuccess({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return apiError("INTERNAL_ERROR", "An unexpected error occurred", 500);
  }
}
