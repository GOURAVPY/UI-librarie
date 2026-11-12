import Link from "next/link";
import { allEntries, catalog, componentHref } from "@/lib/catalog";
import { ClosingBanner } from "@/components/home/cta";
import { Faq } from "@/components/home/faq";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { InstallSection } from "@/components/home/install";
import { Showcase } from "@/components/home/showcase";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <Showcase />

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
          <p className="text-sm text-muted">
            {allEntries.length} components, ready and planned
          </p>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.map((category) => {
            const first = category.items[0];
            return (
              <li key={category.slug}>
                <Link
                  href={first ? componentHref(first.slug) : "/components"}
                  className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-muted"
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">
                    {category.description}
                  </p>
                  <p className="mt-4 font-mono text-xs text-muted">
                    {category.items.length}{" "}
                    {category.items.length === 1 ? "component" : "components"}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <InstallSection />
      <Faq />
      <ClosingBanner />
    </main>
  );
}
