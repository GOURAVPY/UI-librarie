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
] as const;
