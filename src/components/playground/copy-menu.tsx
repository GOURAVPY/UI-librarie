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

  return <div ref={rootRef} className="relative" />;
}
