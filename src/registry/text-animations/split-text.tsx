"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

export interface SplitTextProps {
  /** The text to reveal. */
  text: string;
  /** Reveal one letter or one word at a time. */
  by?: "letter" | "word";
}
