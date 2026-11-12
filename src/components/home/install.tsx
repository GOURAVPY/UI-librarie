import Link from "next/link";
import { installCommand } from "@/lib/catalog";
import { Window } from "./window";

export function InstallSection() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            One command, and the code is yours.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            The CLI copies the component&apos;s source into your project. There
            is no wrapper library to keep up to date and nothing to lock you in.
          </p>
          <Link
            href="/docs"
            className="mt-6 inline-block rounded-lg border border-border px-5 py-2.5 font-medium transition-colors hover:bg-surface-raised"
          >
            Installation guide
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Window title="Terminal">
            <p className="break-all">
              <span className="text-accent">$</span>{" "}
              {installCommand("scramble-text")}
            </p>
            <p className="mt-2 text-muted">✓ Added scramble-text.tsx</p>
          </Window>
        </div>
      </div>
    </section>
  );
}
