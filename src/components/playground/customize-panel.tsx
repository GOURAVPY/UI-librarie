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
