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
