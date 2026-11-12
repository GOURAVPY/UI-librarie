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
    </section>
  );
}
