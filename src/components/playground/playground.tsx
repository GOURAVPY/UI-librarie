"use client";

import { useState } from "react";
import { demos, initialValues, type ControlValues } from "@/registry/demos";

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

  return null;
}
