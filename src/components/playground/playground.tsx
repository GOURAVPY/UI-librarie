"use client";

import { useState } from "react";
import { demos, initialValues, type ControlValues } from "@/registry/demos";
import { PreviewTabs } from "@/components/preview-tabs";
import { site } from "@/lib/site";
import { CodePanel } from "./code-panel";
import { CopyMenu } from "./copy-menu";
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
  /** A ready-made request for an AI assistant, without the full source. */
  const prompt = `Add the ${name} component from ${site.name} to my React project.

Install it with:
${installCommand}

Then use it like this:
${usage}`;

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
      {demo.playsOnce ? (
        <button
          type="button"
          onClick={() => setRun((current) => current + 1)}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:bg-surface-raised"
        >
          Replay
        </button>
      ) : null}
      <CopyMenu
        items={[
          { label: "Copy prompt", text: `${prompt}\n\nSource:\n${source}` },
          { label: "Copy configured code", text: usage },
          { label: "Copy component source", text: source },
          { label: "Copy install command", text: installCommand },
        ]}
        links={[
          { label: "Open in ChatGPT", href: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}` },
          { label: "Open in Claude", href: `https://claude.ai/new?q=${encodeURIComponent(prompt)}` },
        ]}
      />
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
