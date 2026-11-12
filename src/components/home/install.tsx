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
        </div>
      </div>
    </section>
  );
}
