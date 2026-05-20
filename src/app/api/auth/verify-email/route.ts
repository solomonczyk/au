import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return apiError("MISSING_TOKEN", "Verification token is required", 400);
  }

  const identifier = await verifyToken(token);
  if (!identifier) {
    return apiError("INVALID_TOKEN", "Token is invalid or expired", 400);
  }

  const user = await prisma.user.update({
    where: { id: identifier },
    data: { emailVerified: new Date() },
  });

  return apiSuccess({ email: user.email, message: "Email verified successfully" });
}
