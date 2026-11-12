"use client";

import type { ReactNode } from "react";
import { GradientText } from "./text-animations/gradient-text";
import { ScrambleText } from "./text-animations/scramble-text";
import { SplitText } from "./text-animations/split-text";

export type ControlValue = string | number;
export type ControlValues = Readonly<Record<string, ControlValue>>;

interface ControlBase {
  /** The prop this control sets. */
  readonly name: string;
  readonly label: string;
}

export interface TextControl extends ControlBase {
  readonly kind: "text";
  readonly initial: string;
}

export interface RangeControl extends ControlBase {
  readonly kind: "range";
  readonly initial: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  /** Shown after the value, for example "s" or "ms". */
  readonly unit: string;
}

export interface SelectControl extends ControlBase {
  readonly kind: "select";
  readonly initial: string;
  readonly options: readonly string[];
}

export type Control = TextControl | RangeControl | SelectControl;

export interface Demo {
  readonly controls: readonly Control[];
  /** True when the animation plays once, so the preview needs a Replay button. */
  readonly playsOnce: boolean;
  /** Renders the component with the current control values. */
  readonly render: (values: ControlValues) => ReactNode;
  /** The usage snippet for the current control values. */
  readonly usage: (values: ControlValues) => string;
}

/** Starting values for a demo's controls. */
export function initialValues(controls: readonly Control[]): ControlValues {
  return Object.fromEntries(
    controls.map((control) => [control.name, control.initial]),
  );
}

const HEADING_CLASS = "text-3xl font-semibold tracking-tight sm:text-5xl";

const splitText: Demo = {
  playsOnce: true,
  controls: [
    { kind: "text", name: "text", label: "Text", initial: "Words that arrive in style" },
    { kind: "select", name: "by", label: "Split by", initial: "letter", options: ["letter", "word"] },
    { kind: "range", name: "stagger", label: "Stagger", initial: 0.04, min: 0.01, max: 0.2, step: 0.01, unit: "s" },
    { kind: "range", name: "duration", label: "Duration", initial: 0.5, min: 0.1, max: 2, step: 0.1, unit: "s" },
  ],
  render: (values) => (
    <SplitText
      text={String(values.text)}
      by={values.by === "word" ? "word" : "letter"}
      stagger={Number(values.stagger)}
      duration={Number(values.duration)}
      className={HEADING_CLASS}
    />
  ),
  usage: (values) => `import { SplitText } from "@/components/ui/split-text";

<SplitText
  text=${JSON.stringify(values.text)}
  by="${values.by}"
  stagger={${values.stagger}}
  duration={${values.duration}}
/>`,
};

const gradientText: Demo = {
  playsOnce: false,
  controls: [
    { kind: "text", name: "text", label: "Text", initial: "Colour that keeps moving" },
    { kind: "range", name: "duration", label: "Duration", initial: 4, min: 1, max: 12, step: 0.5, unit: "s" },
  ],
  render: (values) => (
    <GradientText duration={Number(values.duration)} className={HEADING_CLASS}>
      {String(values.text)}
    </GradientText>
  ),
  usage: (values) => `import { GradientText } from "@/components/ui/gradient-text";

<GradientText duration={${values.duration}}>
  ${values.text}
</GradientText>`,
};

const scrambleText: Demo = {
  playsOnce: true,
  controls: [
    { kind: "text", name: "text", label: "Text", initial: "DECODING THE MESSAGE" },
    { kind: "range", name: "speed", label: "Speed", initial: 40, min: 10, max: 150, step: 5, unit: "ms" },
  ],
  render: (values) => (
    <ScrambleText
      text={String(values.text)}
      speed={Number(values.speed)}
      className="font-mono text-2xl font-semibold sm:text-4xl"
    />
  ),
  usage: (values) => `import { ScrambleText } from "@/components/ui/scramble-text";

<ScrambleText text=${JSON.stringify(values.text)} speed={${values.speed}} />`,
};

/** Interactive demos, keyed by catalog slug. */
export const demos: Readonly<Record<string, Demo>> = {
  "split-text": splitText,
  "gradient-text": gradientText,
  "scramble-text": scrambleText,
};
