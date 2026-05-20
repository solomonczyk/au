import { prisma } from "@/lib/prisma";
import { apiSuccess } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, excerpt: true, categorySlug: true, publishedAt: true, coverImageUrl: true },
  });

  return apiSuccess(articles.map((a) => ({ ...a, publishedAt: a.publishedAt?.toISOString() || null })));
}
