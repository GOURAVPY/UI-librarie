"use client";

import {
  useRef,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

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

  /** Keeps a width between the minimum and the space available. */
  function clamp(next: number): number {
    const max = trackRef.current?.clientWidth ?? next;
    return Math.round(Math.min(Math.max(next, MIN_WIDTH), max));
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    // Only resize while this handle holds the pointer (a drag in progress).
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const left = trackRef.current?.getBoundingClientRect().left ?? 0;
    onWidthChange(clamp(event.clientX - left));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const current = width ?? trackRef.current?.clientWidth ?? MIN_WIDTH;
    const change = event.key === "ArrowLeft" ? -KEY_STEP : KEY_STEP;
    onWidthChange(clamp(current + change));
  }

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
