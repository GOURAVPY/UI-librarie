"use client";

import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const RESET_DELAY_MS = 1800;

const labels: Record<CopyState, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Copy failed",
};

export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), RESET_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      // Clipboard access can be blocked by the browser; tell the user.
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-md border border-border bg-surface-raised px-2.5 py-1 text-xs text-muted transition-colors hover:text-foreground"
    >
      <span aria-live="polite">{labels[state]}</span>
    </button>
  );
}
