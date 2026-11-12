"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

export interface SplitTextProps {
  /** The text to reveal. */
  text: string;
  /** Reveal one letter or one word at a time. */
  by?: "letter" | "word";
  /** Seconds between one piece and the next. */
  stagger?: number;
  /** Seconds each piece takes to appear. */
  duration?: number;
  className?: string;
}

/** Splits a word into the pieces that animate separately. */
function toPieces(word: string, by: "letter" | "word"): string[] {
  return by === "word" ? [word] : Array.from(word);
}
