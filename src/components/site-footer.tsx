import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {site.name} is open source under the {site.license} licence.
        </p>
        <a
          href={site.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          View the source on GitHub
        </a>
      </div>
    </footer>
  );
}
