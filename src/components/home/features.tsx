const features = [
  {
    title: "The code is yours",
    body: "Components are copied into your project as plain source files. Read them, change them, keep them.",
  },
  {
    title: "One-command install",
    body: "Add any component with the shadcn CLI, or copy it straight from the Code tab.",
  },
] as const;

export function Features() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
      <h2 className="text-3xl font-semibold tracking-tight">What&apos;s inside</h2>
    </section>
  );
}
