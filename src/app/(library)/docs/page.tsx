import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { installCommand } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Introduction",
  description: `What ${site.name} is and how to use it.`,
};

export default function DocsPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Introduction</h1>
      <p className="mt-3 text-muted">
        {site.name} is an open-source collection of animated React components.
        It is not an npm package. You copy a component into your project, so
        the code is yours to read and change.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Two ways to add a component
      </h2>

      <h3 className="mt-6 font-medium">1. Install with the CLI</h3>
      <p className="mt-1 mb-3 text-sm text-muted">
        In a project that uses shadcn/ui, run the command shown on the
        component&apos;s page. For example:
      </p>
      <CodeBlock label="Terminal" code={installCommand("split-text")} />

      <h3 className="mt-6 font-medium">2. Copy the code</h3>
      <p className="mt-1 text-sm text-muted">
        Open a component, switch to the Code tab, and copy the source into
        your project.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Status</h2>
      <p className="mt-2 text-muted">
        The library is at an early stage. The site and its flow are in place;
        the components themselves are being added. Pages marked “Coming soon”
        show a placeholder until then.
      </p>

      <p className="mt-8">
        <Link
          href="/components"
          className="font-medium text-accent hover:underline"
        >
          Browse the components
        </Link>
      </p>
    </article>
  );
}
