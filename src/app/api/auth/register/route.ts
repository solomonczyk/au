import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations/auth";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) return apiValidationError(parsed.error);

    const { email, password, name, phone } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return apiError("EMAIL_ALREADY_EXISTS", "Email is already registered", 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, passwordHash, name, phone },
    });

    const token = await createVerificationToken(user.id);
    await sendVerificationEmail(email, token);

    return apiSuccess(
      { userId: user.id, email: user.email, message: "Verification email sent" },
      undefined,
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    return apiError("INTERNAL_ERROR", "An unexpected error occurred", 500);
  }
}
