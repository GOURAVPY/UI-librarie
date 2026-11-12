"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

type TabKey = "preview" | "code";

const tabs: readonly { key: TabKey; label: string }[] = [
  { key: "preview", label: "Preview" },
  { key: "code", label: "Code" },
];

function nextTab(key: string, active: TabKey): TabKey | undefined {
  if (key === "Home") return "preview";
  if (key === "End") return "code";
  if (key === "ArrowRight" || key === "ArrowLeft") {
    return active === "preview" ? "code" : "preview";
  }
  return undefined;
}

export function PreviewTabs({
  preview,
  code,
}: {
  preview: ReactNode;
  code: ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("preview");
  const baseId = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = nextTab(event.key, active);
    if (!next) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Component view"
        onKeyDown={handleKeyDown}
        className="mb-3 inline-flex rounded-lg border border-border bg-surface p-1 text-sm"
      >
        {tabs.map((tab) => {
          const selected = tab.key === active;
          return (
            <button
              key={tab.key}
              id={`${baseId}-tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.key)}
              className={
                selected
                  ? "rounded-md bg-surface-raised px-4 py-1.5 font-medium text-foreground"
                  : "rounded-md px-4 py-1.5 text-muted transition-colors hover:text-foreground"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={`${baseId}-panel-preview`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${baseId}-tab-preview`}
        hidden={active !== "preview"}
      >
        {preview}
      </div>
      <div
        id={`${baseId}-panel-code`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${baseId}-tab-code`}
        hidden={active !== "code"}
      >
        {code}
      </div>
    </div>
  );
}
