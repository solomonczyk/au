import Link from "next/link";

export const metadata = {
  title: "Articles & Insights | AUREUM GOLD",
  description: "Gold market analysis, investing insights, and precious metals news.",
};

interface Article {
  slug: string;
  title: string;
  excerpt: string | null;
  categorySlug: string | null;
  publishedAt: string | null;
}

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/articles`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="max-w-container-max mx-auto px-gutter py-section-padding-lg">
      <header className="mb-section-padding-sm border-l-2 border-primary pl-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Articles & Insights</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Gold market analysis, investing insights, and precious metals news.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="bg-surface-container-low border border-outline-variant p-12 text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">No articles published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-surface-container-low border border-outline-variant p-8 hover:border-primary transition-all group"
            >
              {article.categorySlug && (
                <span className="font-label-caps text-label-caps text-primary uppercase">{article.categorySlug}</span>
              )}
              <h3 className="font-headline-sm text-headline-sm text-on-surface mt-3 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-3 line-clamp-3">{article.excerpt}</p>
              )}
              {article.publishedAt && (
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-4">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
