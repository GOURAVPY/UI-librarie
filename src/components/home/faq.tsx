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
] as const;
