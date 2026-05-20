import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN" && (session?.user as { role?: string })?.role !== "COMPLIANCE_OFFICER") {
    return apiError("FORBIDDEN", "Admin access required", 403);
  }

  const [alerts, sanctionsChecks] = await Promise.all([
    prisma.complianceAlert.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.sanctionsCheck.findMany({ orderBy: { checkedAt: "desc" }, take: 50 }),
  ]);

  return apiSuccess({
    alerts: alerts.map((a) => ({ ...a, createdAt: a.createdAt.toISOString(), resolvedAt: a.resolvedAt?.toISOString() || null })),
    sanctionsChecks: sanctionsChecks.map((s) => ({ ...s, checkedAt: s.checkedAt.toISOString() })),
  });
}
