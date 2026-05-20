"use client";

import { useState, useEffect } from "react";

export default function AdminContentPage() {
  const [tab, setTab] = useState<"articles" | "faq">("articles");
  const [articles, setArticles] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/content/articles")
      .then((r) => r.json())
      .then((j) => { if (j.success) setArticles(j.data); })
      .catch(console.error);

    fetch("/api/admin/content/faq")
      .then((r) => r.json())
      .then((j) => { if (j.success) setFaqs(j.data); })
      .catch(console.error);
  }, []);

  return (
    <div className="p-gutter py-12">
      <div className="mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Content Management</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage articles, blog posts, and FAQ.</p>
      </div>

      <div className="flex gap-1 mb-8 border-b border-outline-variant">
        {(["articles", "faq"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-6 py-3 font-label-caps text-label-caps transition-colors ${
              tab === t ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {t === "articles" ? "Articles" : "FAQ"}
          </button>
        ))}
      </div>

      {tab === "articles" && (
        <div className="bg-surface-container-lowest border border-outline-variant">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                {["Title", "Slug", "Status", "Published"].map((h) => (
                  <th key={h} className="py-4 px-6 font-label-caps text-label-caps text-on-surface-variant uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-body-md text-on-surface">
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-outline-variant">
                  <td className="py-5 px-6">{a.title}</td>
                  <td className="py-5 px-6 text-on-surface-variant">{a.slug}</td>
                  <td className="py-5 px-6">
                    <span className={`px-2 py-1 text-xs border ${a.isPublished ? "bg-emerald-900/20 text-emerald-400" : "bg-surface-container-highest text-on-surface-variant"}`}>
                      {a.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-5 px-6">{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr><td colSpan={4} className="py-12 text-center text-on-surface-variant">No articles yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "faq" && (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-surface-container-low border border-outline-variant p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface">{faq.question}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">{faq.answer}</p>
                  {faq.category && <span className="font-label-caps text-label-caps text-primary mt-2 inline-block">{faq.category}</span>}
                </div>
                <span className={`px-2 py-1 text-xs border ${faq.isActive ? "bg-emerald-900/20 text-emerald-400" : "bg-surface-container-highest text-on-surface-variant"}`}>
                  {faq.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant font-body-md">No FAQ items.</div>
          )}
        </div>
      )}
    </div>
  );
}
