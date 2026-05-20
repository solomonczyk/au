import Link from "next/link";

export const metadata = { title: "404 — Page Not Found | AUREUM GOLD" };

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-gutter py-section-padding-lg text-center">
      <span className="font-display text-[120px] leading-none text-primary/20 font-bold block">404</span>
      <h1 className="font-headline-lg text-headline-lg text-on-surface mt-8 mb-4">Page Not Found</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest inline-block hover:bg-primary-fixed-dim transition-all">
        Back to Home
      </Link>
    </main>
  );
}
