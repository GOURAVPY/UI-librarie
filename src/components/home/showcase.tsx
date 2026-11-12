import Link from "next/link";
import { allEntries, componentHref } from "@/lib/catalog";
import { registry } from "@/registry";

/** Catalog entries that have a built component and a live preview. */
const builtEntries = allEntries.filter((entry) => entry.item.slug in registry);

export function Showcase() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">See them in action</h2>
      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {builtEntries.map(({ item, category }, index) => {
          const Preview = registry[item.slug].Preview;
          return (
            // The first card spans the full row so three cards fill the grid.
            <li
              key={item.slug}
              className={`overflow-hidden rounded-xl border border-border bg-surface ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="preview-stage flex min-h-64 items-center justify-center overflow-hidden p-6 text-center">
                <Preview />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
                <Link
                  href={componentHref(item.slug)}
                  className="font-medium hover:text-accent"
                >
                  {item.name}
                </Link>
                <span className="text-muted">{category.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
