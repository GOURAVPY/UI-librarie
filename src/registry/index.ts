import type { ComponentType } from "react";
import {
  GradientTextPreview,
  ScrambleTextPreview,
  SplitTextPreview,
} from "./previews";

export interface RegistryEntry {
  /** Live demo shown on the component page. */
  readonly Preview: ComponentType;
  /** Source file, relative to src/registry. */
  readonly file: string;
}

/** Built components, keyed by their catalog slug. */
export const registry: Readonly<Record<string, RegistryEntry>> = {
  "split-text": { Preview: SplitTextPreview, file: "text-animations/split-text.tsx" },
  "gradient-text": { Preview: GradientTextPreview, file: "text-animations/gradient-text.tsx" },
  "scramble-text": { Preview: ScrambleTextPreview, file: "text-animations/scramble-text.tsx" },
};
