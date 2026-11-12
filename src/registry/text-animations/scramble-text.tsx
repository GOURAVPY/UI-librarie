"use client";

import { useEffect, useState } from "react";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/** How many ticks pass before one more character settles. */
const TICKS_PER_CHARACTER = 3;

export interface ScrambleTextProps {
  /** The text to settle on. */
  text: string;
  /** Milliseconds between shuffles. */
  speed?: number;
  /** The characters to shuffle through. */
  characters?: string;
  className?: string;
}

function randomCharacter(characters: string): string {
  return characters[Math.floor(Math.random() * characters.length)] ?? "";
}

/** Keeps the first `settled` characters and shuffles the rest. Spaces stay. */
function scramble(letters: string[], settled: number, characters: string): string {
  return letters
    .map((letter, index) =>
      index < settled || letter === " " ? letter : randomCharacter(characters),
    )
    .join("");
}

export function ScrambleText({
  text,
  speed = 40,
  characters = DEFAULT_CHARACTERS,
  className,
}: ScrambleTextProps) {
  // Starts as the real text so it is readable before JavaScript runs.
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const letters = Array.from(text);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // With reduced motion the first tick shows the final text and stops.
    let tick = reduceMotion ? letters.length * TICKS_PER_CHARACTER : 0;

    const timer = window.setInterval(() => {
      const settled = Math.floor(tick / TICKS_PER_CHARACTER);
      setDisplay(scramble(letters, settled, characters));
      if (settled >= letters.length) window.clearInterval(timer);
      tick += 1;
    }, speed);
    return () => window.clearInterval(timer);
  }, [text, speed, characters]);

  return <span className={className}>{display}</span>;
}
