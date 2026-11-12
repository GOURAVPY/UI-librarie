"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SidebarNav } from "./sidebar-nav";

/** Collapsible library menu for small screens; closes after navigation. */
export function MobileNav() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  return (
    <details ref={detailsRef} className="border-b border-border py-3 md:hidden">
      <summary className="cursor-pointer text-sm font-medium">
        Browse the library
      </summary>
      <div className="pt-4">
        <SidebarNav />
      </div>
    </details>
  );
}
