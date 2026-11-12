"use client";

import { useState } from "react";
import { CodeSnippet } from "./code-snippet";

interface CodePanelProps {
  slug: string;
  installCommand: string;
  dependencies: readonly string[];
  usage: string;
  source: string;
}

type InstallMode = "cli" | "manual";

export function CodePanel({
  slug,
  installCommand,
  dependencies,
  usage,
  source,
}: CodePanelProps) {
  const [mode, setMode] = useState<InstallMode>("cli");
  const manualCommand =
    dependencies.length > 0
      ? `npm install ${dependencies.join(" ")}`
      : "# No packages to install";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div
          role="group"
          aria-label="Install method"
          className="mb-2 inline-flex rounded-lg border border-border bg-surface p-1 text-xs"
        >
          {(["cli", "manual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className={
                mode === option
                  ? "rounded-md bg-surface-raised px-3 py-1 font-medium"
                  : "rounded-md px-3 py-1 text-muted hover:text-foreground"
              }
            >
              {option === "cli" ? "CLI" : "Manual"}
            </button>
          ))}
        </div>
      </div>
      <CodeSnippet label="Usage" code={usage} />
      <CodeSnippet label={`${slug}.tsx`} code={source} collapsible />
    </div>
  );
}
