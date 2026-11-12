"use client";

import type {
  Control,
  ControlValue,
  ControlValues,
  RangeControl,
  SelectControl,
} from "@/registry/demos";

interface CustomizePanelProps {
  controls: readonly Control[];
  values: ControlValues;
  onChange: (name: string, value: ControlValue) => void;
  onReset: () => void;
}

const ROW_CLASS =
  "flex items-center justify-between gap-3 rounded-md bg-surface-raised px-3 py-2 text-sm";

interface FieldProps<T extends Control> {
  control: T;
  value: ControlValue;
  onChange: (name: string, value: ControlValue) => void;
}

function TextField({ control, value, onChange }: FieldProps<Control>) {
  return (
    <label className={ROW_CLASS}>
      <span className="text-muted">{control.label}</span>
      <input
        type="text"
        value={String(value)}
        onChange={(event) => onChange(control.name, event.target.value)}
        className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1 text-right"
      />
    </label>
  );
}

function RangeField({ control, value, onChange }: FieldProps<RangeControl>) {
  return (
    <label className={ROW_CLASS}>
      <span className="text-muted">{control.label}</span>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={Number(value)}
        onChange={(event) => onChange(control.name, Number(event.target.value))}
        className="min-w-0 flex-1 accent-accent"
      />
      <span className="w-14 text-right font-mono text-xs">
        {value}
        {control.unit}
      </span>
    </label>
  );
}

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
