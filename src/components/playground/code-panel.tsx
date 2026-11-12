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
      <CodeSnippet label="Usage" code={usage} />
      <CodeSnippet label={`${slug}.tsx`} code={source} collapsible />
    </div>
  );
}
