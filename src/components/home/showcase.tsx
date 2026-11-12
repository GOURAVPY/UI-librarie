import Link from "next/link";
import { allEntries, componentHref } from "@/lib/catalog";
import { registry } from "@/registry";

/** Catalog entries that have a built component and a live preview. */
const builtEntries = allEntries.filter((entry) => entry.item.slug in registry);

export function Showcase() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">See them in action</h2>
    </section>
  );
}
