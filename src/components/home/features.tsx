const features = [
  {
    title: "The code is yours",
    body: "Components are copied into your project as plain source files. Read them, change them, keep them.",
  },
  {
    title: "One-command install",
    body: "Add any component with the shadcn CLI, or copy it straight from the Code tab.",
  },
  {
    title: "Respects reduced motion",
    body: "Every component checks the visitor's motion setting and shows the final state without animating.",
  },
  {
    title: "Screen-reader friendly",
    body: "Animated text is hidden from assistive technology, which reads the plain text instead.",
  },
  {
    title: "TypeScript and Tailwind",
    body: "Typed props with sensible defaults, styled with Tailwind classes you can override.",
  },
  {
    title: "Plain MIT licence",
    body: "Free for personal and commercial work, with no extra clauses.",
  },
] as const;

export function Features() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">What&apos;s inside</h2>
    </section>
  );
}
