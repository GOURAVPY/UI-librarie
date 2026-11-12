import Link from "next/link";
import { site } from "@/lib/site";

export function ClosingBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
      <div className="hero-glow rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Make your next page move.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Start with the components that are ready, and watch the repo for
          new ones.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/components"
            className="rounded-lg bg-accent px-5 py-2.5 font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Browse components
          </Link>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border px-5 py-2.5 font-medium transition-colors hover:bg-surface-raised"
          >
            View on GitHub
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
