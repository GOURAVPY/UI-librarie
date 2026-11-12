"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { allEntries, componentHref } from "@/lib/catalog";
import { isTyping } from "./keyboard-nav";

const MAX_RESULTS = 6;

export function SearchBox() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const term = query.trim().toLowerCase();
  const results = term
    ? allEntries
        .filter((entry) => entry.item.name.toLowerCase().includes(term))
        .slice(0, MAX_RESULTS)
    : [];

  // "/" focuses the search box from anywhere on the page.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || isTyping(event.target)) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative hidden md:block">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…  /"
        aria-label="Search components"
        className="w-44 rounded-md border border-border bg-surface px-3 py-1.5 text-sm placeholder:text-muted"
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          setQuery("");
          event.currentTarget.blur();
        }}
      />
      {term ? (
        <ul className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-surface p-1.5 shadow-2xl shadow-black/50">
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">No components found</li>
          ) : null}
          {results.map(({ item, category }) => (
            <li key={item.slug}>
              <Link
                href={componentHref(item.slug)}
                onClick={() => setQuery("")}
                className="flex items-center justify-between gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-surface-raised"
              >
                {item.name}
                <span className="text-xs text-muted">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
