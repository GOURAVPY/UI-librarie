"use client";

import { useEffect, useRef, useState } from "react";

export interface CopyMenuItem {
  readonly label: string;
  /** The text placed on the clipboard. */
  readonly text: string;
}

export interface CopyMenuLink {
  readonly label: string;
  readonly href: string;
}

const ITEM_CLASS =
  "block w-full rounded-md px-3 py-1.5 text-left text-sm hover:bg-surface-raised";

export function CopyMenu({
  items,
  links,
}: {
  items: readonly CopyMenuItem[];
  links: readonly CopyMenuLink[];
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // While open, close on Escape or on a press outside the menu.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return <div ref={rootRef} className="relative" />;
}
