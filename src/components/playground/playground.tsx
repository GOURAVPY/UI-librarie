"use client";

import { useState } from "react";
import { demos, initialValues, type ControlValues } from "@/registry/demos";
import { PreviewTabs } from "@/components/preview-tabs";
import { CodePanel } from "./code-panel";
import { CustomizePanel } from "./customize-panel";
import { ResizableStage } from "./resizable-stage";

interface PlaygroundProps {
  slug: string;
  name: string;
  source: string;
  installCommand: string;
  dependencies: readonly string[];
}

const DEVICES = [
  { label: "Desktop", width: null },
  { label: "Tablet", width: 768 },
  { label: "Mobile", width: 375 },
] as const;

export function Playground({
  slug,
  name,
  source,
  installCommand,
  dependencies,
}: PlaygroundProps) {
  const demo = demos[slug];
  const [values, setValues] = useState<ControlValues>(() =>
    initialValues(demo?.controls ?? []),
  );
  /** Bumped by Replay to restart a play-once animation. */
  const [run, setRun] = useState(0);
  const [width, setWidth] = useState<number | null>(null);

  if (!demo) return null;
  const usage = demo.usage(values);

  const preview = (
    <div>
      <ResizableStage width={width} onWidthChange={setWidth}>
        {/* A new key remounts the demo, which restarts its animation. */}
        <div key={`${run}:${JSON.stringify(values)}`}>{demo.render(values)}</div>
      </ResizableStage>
      <CustomizePanel
        controls={demo.controls}
        values={values}
        onChange={(controlName, value) =>
          setValues((current) => ({ ...current, [controlName]: value }))
        }
        onReset={() => setValues(initialValues(demo.controls))}
      />
    </div>
  );

  const actions = (
    <>
      <div
        role="group"
        aria-label="Preview size"
        className="inline-flex rounded-lg border border-border bg-surface p-1 text-xs"
      >
        {DEVICES.map((device) => (
          <button
            key={device.label}
            type="button"
            aria-pressed={width === device.width}
            onClick={() => setWidth(device.width)}
            className={
              width === device.width
                ? "rounded-md bg-surface-raised px-2.5 py-1 font-medium"
                : "rounded-md px-2.5 py-1 text-muted hover:text-foreground"
            }
          >
            {device.label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <PreviewTabs
      actions={actions}
      preview={preview}
      code={
        <CodePanel
          slug={slug}
          installCommand={installCommand}
          dependencies={dependencies}
          usage={usage}
          source={source}
        />
      }
    />
  );
}
