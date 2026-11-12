import type { ComponentStatus } from "@/lib/catalog";

const labels: Record<ComponentStatus, string> = {
  planned: "Coming soon",
  ready: "Ready",
};

export function StatusBadge({ status }: { status: ComponentStatus }) {
  return (
    <span
      className={
        status === "ready"
          ? "rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
          : "rounded-full border border-border px-2 py-0.5 text-xs text-muted"
      }
    >
      {labels[status]}
    </span>
  );
}
