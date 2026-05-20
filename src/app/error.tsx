"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-2xl mx-auto px-gutter py-section-padding-lg text-center">
      <span className="font-display text-[120px] leading-none text-error/20 font-bold block">500</span>
      <h1 className="font-headline-lg text-headline-lg text-on-surface mt-8 mb-4">Something Went Wrong</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest inline-block hover:bg-primary-fixed-dim transition-all"
      >
        Try Again
      </button>
    </main>
  );
}
