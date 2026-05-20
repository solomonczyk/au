import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      _count: { select: { orders: true, addresses: true } },
    },
  });

  if (!user) return apiError("NOT_FOUND", "User not found", 404);

  return apiSuccess({
    ...user,
    emailVerified: user.emailVerified?.toISOString() || null,
    createdAt: user.createdAt.toISOString(),
  });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return apiError("UNAUTHORIZED", "Authentication required", 401);

  const body = await request.json();
  const { name, phone } = body;

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { ...(name !== undefined && { name }), ...(phone !== undefined && { phone }) },
    select: { id: true, email: true, name: true, phone: true },
  });

  return apiSuccess(user);
}
