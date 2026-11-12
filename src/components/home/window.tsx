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
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-surface-raised/90 shadow-2xl shadow-black/50 backdrop-blur ${className}`}
    >
      <div className="p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {children}
      </div>
    </div>
  );
}
