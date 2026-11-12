"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { catalog, componentHref } from "@/lib/catalog";

interface NavLink {
  readonly label: string;
  readonly href: string;
}

interface NavGroup {
  readonly title: string;
  readonly links: readonly NavLink[];
}

const groups: readonly NavGroup[] = [
  {
    title: "Get started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "All components", href: "/components" },
    ],
  },
  ...catalog.map((category) => ({
    title: category.name,
    links: category.items.map((item) => ({
      label: item.name,
      href: componentHref(item.slug),
    })),
  })),
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Library" className="flex flex-col gap-6 text-sm">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "block rounded-md bg-surface-raised px-3 py-1.5 font-medium text-foreground"
                        : "block rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
