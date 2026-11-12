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

export function SplitText({
  text,
  by = "letter",
  stagger = 0.04,
  duration = 0.5,
  className,
}: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ").map((word) => toPieces(word, by));
  // Position of each word's first piece in the whole sequence.
  const starts = words.map((_, index) =>
    words.slice(0, index).reduce((total, pieces) => total + pieces.length, 0),
  );

  return (
    <span className={className}>
      {/* Screen readers get the plain text; the animated pieces are hidden. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
