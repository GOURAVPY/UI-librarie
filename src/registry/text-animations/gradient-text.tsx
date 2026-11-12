"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const DEFAULT_COLORS = ["#b9f86a", "#5ac8fa", "#b9f86a"] as const;

export interface GradientTextProps {
  children: ReactNode;
  /** Gradient colours, left to right. Repeat the first one last for a smooth loop. */
  colors?: readonly string[];
  /** Seconds for one pass of the gradient. */
  duration?: number;
  className?: string;
}
