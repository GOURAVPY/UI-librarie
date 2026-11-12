import Link from "next/link";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-block size-3 rounded-sm bg-accent"
          />
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1 rounded-md border border-border px-3 py-1.5 text-foreground transition-colors hover:bg-surface-raised"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
