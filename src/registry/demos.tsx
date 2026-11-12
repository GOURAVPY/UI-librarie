"use client";

import type { ReactNode } from "react";

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
