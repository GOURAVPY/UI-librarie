"use client";

import { useState } from "react";
import { demos, initialValues, type ControlValues } from "@/registry/demos";
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

  return preview;
}
