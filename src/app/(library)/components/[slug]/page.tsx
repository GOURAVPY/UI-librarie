import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CodeBlock } from "@/components/code-block";
import { PreviewTabs } from "@/components/preview-tabs";
import { StatusBadge } from "@/components/status-badge";
import {
  allEntries,
  componentHref,
  findEntry,
  installCommand,
  neighbours,
  type CatalogEntry,
  type CatalogItem,
} from "@/lib/catalog";

type Props = PageProps<"/components/[slug]">;

export function generateStaticParams() {
  return allEntries.map((entry) => ({ slug: entry.item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) return {};
  return { title: entry.item.name, description: entry.item.description };
}

export default function ComponentPage({ params }: Props) {
  // Next.js requires URL data to be read inside a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <ComponentContent params={params} />
    </Suspense>
  );
}

async function ComponentContent({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const entry = findEntry(slug);
  if (!entry) notFound();

  const { item, category } = entry;
  const { previous, next } = neighbours(slug);

  return (
    <article>
      <p className="text-sm text-muted">{category.name}</p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{item.name}</h1>
        <StatusBadge status={item.status} />
      </div>
      <p className="mt-2 max-w-2xl text-muted">{item.description}</p>

      <div className="mt-8">
        <PreviewTabs
          preview={<PreviewPlaceholder item={item} />}
          code={
            <CodeBlock
              label={`${item.slug}.tsx`}
              code={`// The source for ${item.name} will appear here once it is built.`}
            />
          }
        />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Install</h2>
        <p className="mt-1 mb-3 text-sm text-muted">
          Run this in a project that uses shadcn/ui. The command will work once
          this component is published.
        </p>
        <CodeBlock label="Terminal" code={installCommand(item.slug)} />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Props</h2>
        <PropsTable item={item} />
      </section>

      <nav
        aria-label="Other components"
        className="mt-12 flex items-stretch justify-between gap-4 border-t border-border pt-6"
      >
        <NeighbourLink entry={previous} direction="Previous" />
        <NeighbourLink entry={next} direction="Next" />
      </nav>
    </article>
  );
}

function PreviewPlaceholder({ item }: { item: CatalogItem }) {
  return (
    <div className="preview-stage flex min-h-80 flex-col items-center justify-center gap-2 rounded-lg border border-border p-6 text-center">
      <p className="font-medium">{item.name} preview</p>
      <p className="max-w-sm text-sm text-muted">
        The live preview will appear here once this component is built.
      </p>
    </div>
  );
}

function PropsTable({ item }: { item: CatalogItem }) {
  if (item.props.length === 0) {
    return (
      <p className="mt-3 rounded-lg border border-dashed border-border p-4 text-sm text-muted">
        Props will be listed here once this component is built.
      </p>
    );
  }

  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-muted">
          <tr>
            <th scope="col" className="px-4 py-2 font-medium">Prop</th>
            <th scope="col" className="px-4 py-2 font-medium">Type</th>
            <th scope="col" className="px-4 py-2 font-medium">Default</th>
            <th scope="col" className="px-4 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {item.props.map((prop) => (
            <tr key={prop.name} className="border-t border-border">
              <td className="px-4 py-2 font-mono">{prop.name}</td>
              <td className="px-4 py-2 font-mono text-muted">{prop.type}</td>
              <td className="px-4 py-2 font-mono text-muted">
                {prop.defaultValue}
              </td>
              <td className="px-4 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NeighbourLink({
  entry,
  direction,
}: {
  entry: CatalogEntry | undefined;
  direction: "Previous" | "Next";
}) {
  if (!entry) return <span />;
  return (
    <Link
      href={componentHref(entry.item.slug)}
      className={`rounded-lg border border-border px-4 py-3 transition-colors hover:bg-surface ${
        direction === "Next" ? "text-right" : ""
      }`}
    >
      <span className="block text-xs text-muted">{direction}</span>
      <span className="font-medium">{entry.item.name}</span>
    </Link>
  );
}
