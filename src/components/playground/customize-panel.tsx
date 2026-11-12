"use client";

import type { Control, ControlValue, ControlValues } from "@/registry/demos";

interface CustomizePanelProps {
  controls: readonly Control[];
  values: ControlValues;
  onChange: (name: string, value: ControlValue) => void;
  onReset: () => void;
}

const ROW_CLASS =
  "flex items-center justify-between gap-3 rounded-md bg-surface-raised px-3 py-2 text-sm";

export function CustomizePanel({
  controls,
  values,
  onChange,
  onReset,
}: CustomizePanelProps) {
  return (
    <section className="mt-4 rounded-lg border border-border bg-surface p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-medium">Customize</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-muted hover:text-foreground"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
