"use client";

import { useRef, type ReactNode } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={trackRef}
      className="preview-stage relative overflow-hidden rounded-lg border border-border"
    >
      <div
        style={{ width: width ?? "100%" }}
        className="relative flex min-h-80 max-w-full items-center justify-center border-r border-border bg-background p-6 pr-8 text-center"
      >
        {children}
      </div>
    </div>
  );
}
