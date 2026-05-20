import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aureumgold.com";

export default async function sitemap() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/catalog`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/prices`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/articles`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/sell`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/legal/terms-of-service`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy-policy`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE_URL}/legal/risk-disclosure`, lastModified: new Date(), priority: 0.3 },
  ];

  const articlePages = articles.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    lastModified: a.updatedAt,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
