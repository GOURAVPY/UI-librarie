import Link from "next/link";
import { allEntries } from "@/lib/catalog";
import { site } from "@/lib/site";

const readyCount = allEntries.filter(
  (entry) => entry.item.status === "ready",
).length;

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
      <p className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
        {readyCount} components ready · {site.license} licence
      </p>
    </section>
  );
}
