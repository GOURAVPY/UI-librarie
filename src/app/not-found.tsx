import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 text-muted">
        That page does not exist, or the component has not been added yet.
      </p>
      <Link
        href="/components"
        className="mt-6 rounded-lg border border-border px-5 py-2.5 font-medium transition-colors hover:bg-surface-raised"
      >
        Browse components
      </Link>
    </main>
  );
}
