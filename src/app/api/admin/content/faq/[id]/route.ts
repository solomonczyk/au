import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  for (const key of ["question", "answer", "category", "sortOrder", "isActive"]) {
    if (body[key] !== undefined) data[key] = body[key];
  }

  const updated = await prisma.faqItem.update({ where: { id }, data });
  return apiSuccess(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const { id } = await params;
  await prisma.faqItem.delete({ where: { id } });
  return apiSuccess({ deleted: true });
}
