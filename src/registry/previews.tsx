"use client";

import { useState, type ReactNode } from "react";

/** Wraps a preview with a button that plays its animation again. */
function Replayable({ children }: { children: ReactNode }) {
  const [run, setRun] = useState(0);
  return <div key={run}>{children}</div>;
}
