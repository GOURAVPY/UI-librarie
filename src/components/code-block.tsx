import { highlight, type Language } from "@/lib/highlight";
import { CopyButton } from "./copy-button";
import { HighlightedLine } from "./highlighted-line";

export function CodeBlock({
  code,
  label,
  language = "bash",
}: {
  code: string;
  label: string;
  /** Which colouring rules to use. */
  language?: Language;
}) {
  const lines = highlight(code, language);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <span className="font-mono text-xs text-muted">{label}</span>
        <CopyButton text={code} label={label} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>
          {lines.map((line, index) => (
            // min-h keeps blank lines from collapsing to nothing.
            <span key={index} className="block min-h-[1lh]">
              <HighlightedLine tokens={line} />
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
