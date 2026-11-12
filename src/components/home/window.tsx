import type { ReactNode } from "react";

/** A small app-window frame used for code and terminal mock-ups. */
export function Window({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
