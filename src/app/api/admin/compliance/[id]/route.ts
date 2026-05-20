import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN" && (session?.user as { role?: string })?.role !== "COMPLIANCE_OFFICER") {
    return apiError("FORBIDDEN", "Admin access required", 403);
  }

  const { id } = await params;
  const body = await request.json();

  if (body.resolved) {
    const updated = await prisma.complianceAlert.update({
      where: { id },
      data: { resolved: true, resolvedBy: session?.user?.email || "admin", resolvedAt: new Date() },
    });
    return apiSuccess(updated);
  }

  return apiError("INVALID_INPUT", "Specify resolved: true to resolve the alert", 400);
}
