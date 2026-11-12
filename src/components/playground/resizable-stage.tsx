"use client";

import type { ReactNode } from "react";

const MIN_WIDTH = 280;
/** Pixels the width changes per arrow-key press. */
const KEY_STEP = 16;

interface ResizableStageProps {
  /** Preview width in pixels, or null to fill the available space. */
  width: number | null;
  onWidthChange: (width: number) => void;
  children: ReactNode;
}

export function ResizableStage({
  width,
  onWidthChange,
  children,
}: ResizableStageProps) {
  return (
    <div className="preview-stage relative overflow-hidden rounded-lg border border-border">
      {children}
    </div>
  );
}
