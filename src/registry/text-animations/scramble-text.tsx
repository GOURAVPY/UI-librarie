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
}
