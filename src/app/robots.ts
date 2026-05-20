const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aureumgold.com";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/account/", "/admin/", "/api/"] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
