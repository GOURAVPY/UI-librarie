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

  async function handleCopy(item: CopyMenuItem) {
    try {
      await navigator.clipboard.writeText(item.text);
      setStatus(`Copied: ${item.label}`);
    } catch {
      // Clipboard access can be blocked by the browser; tell the user.
      setStatus("Copy failed");
    }
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:bg-surface-raised"
      >
        Copy <span aria-hidden="true">▾</span>
      </button>
      <span role="status" className="sr-only">
        {status}
      </span>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-30 mt-2 w-60 rounded-xl border border-border bg-surface p-1.5 shadow-2xl shadow-black/50"
        >
          <p className="px-3 py-1 text-xs text-muted">Copy</p>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => handleCopy(item)}
              className={ITEM_CLASS}
            >
              {item.label}
            </button>
          ))}
          <p className="mt-1 px-3 py-1 text-xs text-muted">Open in</p>
          {links.map((link) => (
            <a
              key={link.label}
              role="menuitem"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={ITEM_CLASS}
            >
              {link.label}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
