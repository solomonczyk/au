import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return apiSuccess(articles.map((a) => ({ ...a, createdAt: a.createdAt.toISOString(), updatedAt: a.updatedAt.toISOString(), publishedAt: a.publishedAt?.toISOString() || null })));
}

export async function POST(request: Request) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") return apiError("FORBIDDEN", "Admin access required", 403);

  const body = await request.json();
  const { slug, title, excerpt, content, categorySlug, metaTitle, metaDescription, isPublished } = body;

  if (!slug || !title || !content) {
    return apiError("INVALID_INPUT", "slug, title, and content are required", 400);
  }

  const article = await prisma.article.create({
    data: {
      slug,
      title,
      excerpt: excerpt || null,
      content,
      categorySlug: categorySlug || null,
      authorId: session?.user?.id,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
    },
  });

  return apiSuccess(article, undefined, 201);
}
