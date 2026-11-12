import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { catalog, componentHref } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Components",
  description: "Every component in the library, grouped by category.",
};

export default function ComponentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Every component in the library, grouped by category. Open one to see
        its preview, code and install command.
      </p>

      {catalog.map((category) => (
        <section key={category.slug} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            {category.name}
          </h2>
          <p className="mt-1 text-sm text-muted">{category.description}</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {category.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={componentHref(item.slug)}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-muted"
                >
                  <div
                    aria-hidden="true"
                    className="preview-stage flex h-32 items-center justify-center border-b border-border font-mono text-xs text-muted"
                  >
                    preview
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium">{item.name}</h3>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
