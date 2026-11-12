"use client";

import { useState, type ReactNode } from "react";

/** Wraps a preview with a button that plays its animation again. */
function Replayable({ children }: { children: ReactNode }) {
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col items-center gap-8">
      {/* A new key remounts the children, which restarts the animation. */}
      <div key={run}>{children}</div>
      <button
        type="button"
        onClick={() => setRun((current) => current + 1)}
        className="rounded-md border border-border bg-surface-raised px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
      >
        Replay
      </button>
    </div>
  );
}
