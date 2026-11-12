import type { ReactNode } from "react";
import { SidebarNav } from "@/components/sidebar-nav";

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 md:flex-row md:gap-10">
      <details className="border-b border-border py-3 md:hidden">
        <summary className="cursor-pointer text-sm font-medium">
          Browse the library
        </summary>
        <div className="pt-4">
          <SidebarNav />
        </div>
      </details>
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 md:block">
        <SidebarNav />
      </aside>
      <main className="min-w-0 flex-1 py-8 md:py-10">{children}</main>
    </div>
  );
}
