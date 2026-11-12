import Link from "next/link";
import { allEntries, catalog, componentHref } from "@/lib/catalog";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";

const steps = [
  {
    title: "Browse",
    body: "Pick a component from the catalog, grouped by what it does.",
  },
  {
    title: "Preview",
    body: "See it running live and read the props it accepts.",
  },
  {
    title: "Copy or install",
    body: "Copy the source, or add it to your project with one command. The code is yours to change.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <Showcase />

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <span className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-medium">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
          <p className="text-sm text-muted">
            {allEntries.length} components planned
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
    </main>
  );
}
