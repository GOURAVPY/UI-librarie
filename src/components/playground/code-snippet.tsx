"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";

interface CodeSnippetProps {
  label: string;
  code: string;
  /** Starts collapsed with an "Expand snippet" button. For long files. */
  collapsible?: boolean;
}

export function CodeSnippet({
  label,
  code,
  collapsible = false,
}: CodeSnippetProps) {
  const [expanded, setExpanded] = useState(!collapsible);
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <span className="text-sm font-medium">{label}</span>
        <CopyButton text={code} label={label} />
      </div>
    </div>
  );
}
