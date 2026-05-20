import Link from "next/link";
import { notFound } from "next/navigation";

interface Article {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  categorySlug: string | null;
  coverImageUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/articles/${slug}`, { cache: "no-store" });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.metaTitle || `${article.title} | AUREUM GOLD`,
    description: article.metaDescription || article.excerpt || "",
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  return (
    <main className="max-w-3xl mx-auto px-gutter py-section-padding-lg">
      <Link href="/articles" className="font-label-caps text-label-caps text-primary hover:underline mb-8 inline-block">
        ← Back to Articles
      </Link>

      <article>
        <header className="mb-12">
          {article.categorySlug && (
            <span className="font-label-caps text-label-caps text-primary uppercase">{article.categorySlug}</span>
          )}
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-3 mb-4">{article.title}</h1>
          {article.excerpt && (
            <p className="font-body-lg text-body-lg text-on-surface-variant">{article.excerpt}</p>
          )}
          {article.publishedAt && (
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-4">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          )}
        </header>

        <div className="prose prose-invert max-w-none font-body-md text-body-md text-on-surface leading-relaxed space-y-4">
          {article.content.split("\n").map((paragraph, i) => (
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          ))}
        </div>
      </article>
    </main>
  );
}
