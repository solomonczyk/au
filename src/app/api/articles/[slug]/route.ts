import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      slug: true, title: true, excerpt: true, content: true, categorySlug: true,
      coverImageUrl: true, metaTitle: true, metaDescription: true,
      publishedAt: true, createdAt: true, updatedAt: true,
    },
  });

  if (!article || !article.publishedAt) {
    return apiError("NOT_FOUND", "Article not found", 404);
  }

  return apiSuccess({
    ...article,
    publishedAt: article.publishedAt?.toISOString() || null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  });
}
