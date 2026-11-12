import { allEntries } from "@/lib/catalog";
import { site } from "@/lib/site";

const readyCount = allEntries.filter(
  (entry) => entry.item.status === "ready",
).length;

const questions = [
  {
    question: `What is ${site.name}?`,
    answer:
      "An open-source collection of animated React components. You copy a component into your project instead of installing a package.",
  },
  {
    question: "How many components are there?",
    answer: `${readyCount} are ready today and ${allEntries.length - readyCount} more are planned. The library is at an early stage and new ones are being added.`,
  },
  {
    question: "Can I use it in commercial projects?",
    answer: `Yes. It is released under the ${site.license} licence, with no extra clauses.`,
  },
  {
    question: "Do I need to install a package?",
    answer:
      "Not for the library itself. Some components use the Motion animation library, which the CLI installs for you.",
  },
  {
    question: "What does my project need?",
    answer:
      "React and Tailwind CSS. The components are written in TypeScript and work in Next.js, Vite and other React setups.",
  },
] as const;

export function Faq() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-3">
      <h2 className="text-3xl font-semibold tracking-tight">
        Questions, answered
      </h2>
      <div className="flex flex-col gap-2 lg:col-span-2">
        {questions.map((item) => (
          <details
            key={item.question}
            className="rounded-lg border border-border bg-surface px-4 py-3"
          >
            <summary className="cursor-pointer font-medium">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
