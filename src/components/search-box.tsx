"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { allEntries, componentHref } from "@/lib/catalog";
import { isTyping } from "./keyboard-nav";

const MAX_RESULTS = 6;

export function SearchBox() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
      />
    </div>
  );
}
