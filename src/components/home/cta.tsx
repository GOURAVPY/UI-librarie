import Link from "next/link";
import { site } from "@/lib/site";

export function ClosingBanner() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
      <div className="hero-glow rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Make your next page move.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Start with the components that are ready, and watch the repo for
          new ones.
        </p>
      </div>
    </section>
  );
}
