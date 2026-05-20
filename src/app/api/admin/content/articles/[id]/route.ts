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

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) return apiError("NOT_FOUND", "Article not found", 404);

  const data: Record<string, unknown> = {};
  for (const key of ["slug", "title", "excerpt", "content", "coverImageUrl", "categorySlug", "metaTitle", "metaDescription"]) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (body.isPublished !== undefined) {
    data.isPublished = body.isPublished;
    if (body.isPublished && !existing.publishedAt) data.publishedAt = new Date();
  }

  const updated = await prisma.article.update({ where: { id }, data });
  return apiSuccess({ ...updated, createdAt: updated.createdAt.toISOString(), updatedAt: updated.updatedAt.toISOString(), publishedAt: updated.publishedAt?.toISOString() || null });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const { id } = await params;
  await prisma.article.delete({ where: { id } });
  return apiSuccess({ deleted: true });
}
