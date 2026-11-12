import Link from "next/link";
import { site } from "@/lib/site";

interface FooterColumnProps {
  readonly title: string;
  readonly links: readonly { readonly label: string; readonly href: string }[];
}

const columns: readonly FooterColumnProps[] = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/components" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    title: "Project",
    links: [{ label: "GitHub", href: site.repoUrl }],
  },
];

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pt-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>
        {columns.map((column) => (
          <FooterColumn key={column.title} {...column} />
        ))}
      </div>
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
      {/* Decorative oversized wordmark that fades into the page. */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.28em] select-none bg-gradient-to-b from-border to-transparent bg-clip-text text-center text-[18vw] font-semibold leading-none tracking-tighter text-transparent"
      >
        {site.name}
      </p>
    </footer>
  );
}
