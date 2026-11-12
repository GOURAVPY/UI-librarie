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
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span aria-hidden="true" className="size-2 rounded-full bg-border" />
        <span aria-hidden="true" className="size-2 rounded-full bg-border" />
        <span aria-hidden="true" className="size-2 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {children}
      </div>
    </div>
  );
}
