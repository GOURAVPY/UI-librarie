import Link from "next/link";
import { allEntries } from "@/lib/catalog";
import { site } from "@/lib/site";
import { GradientText } from "@/registry/text-animations/gradient-text";

const readyCount = allEntries.filter(
  (entry) => entry.item.status === "ready",
).length;

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <p className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
        {readyCount} components ready · {site.license} licence
      </p>
      <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
        Animated React components for sites that{" "}
        <GradientText>feel alive.</GradientText>
      </h1>
      <p className="mt-5 max-w-xl text-pretty text-lg text-muted">
        {site.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
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
          Star on GitHub
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
