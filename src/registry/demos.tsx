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
