import { site } from "./site";

export type ComponentStatus = "planned" | "ready";

export interface CatalogProp {
  readonly name: string;
  readonly type: string;
  readonly defaultValue: string;
  readonly description: string;
}

export interface CatalogItem {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly status: ComponentStatus;
  readonly props: readonly CatalogProp[];
}

export interface CatalogCategory {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly items: readonly CatalogItem[];
}

/**
 * The catalog drives the sidebar, the catalog grid and every component page.
 * To add a component later: add an entry here, then register its preview
 * and source. Items marked "planned" show a placeholder page.
 */
export const catalog: readonly CatalogCategory[] = [
  {
    slug: "text-animations",
    name: "Text Animations",
    description: "Headlines and copy that reveal, shift and react.",
    items: [
      ready("split-text", "Split Text", "Reveals a line letter by letter or word by word.", [
        { name: "text", type: "string", defaultValue: "required", description: "The text to reveal." },
        { name: "by", type: '"letter" | "word"', defaultValue: '"letter"', description: "Reveal one letter or one word at a time." },
        { name: "stagger", type: "number", defaultValue: "0.04", description: "Seconds between one piece and the next." },
        { name: "duration", type: "number", defaultValue: "0.5", description: "Seconds each piece takes to appear." },
        { name: "className", type: "string", defaultValue: "none", description: "Classes for the wrapper." },
      ]),
      ready("gradient-text", "Gradient Text", "Text filled with a slowly moving gradient.", [
        { name: "children", type: "ReactNode", defaultValue: "required", description: "The text to colour." },
        { name: "colors", type: "string[]", defaultValue: "green, blue, green", description: "Gradient colours, left to right. Repeat the first one last for a smooth loop." },
        { name: "duration", type: "number", defaultValue: "4", description: "Seconds for one pass of the gradient." },
        { name: "className", type: "string", defaultValue: '""', description: "Classes for the text." },
      ]),
      ready("scramble-text", "Scramble Text", "Characters shuffle before settling on the final text.", [
        { name: "text", type: "string", defaultValue: "required", description: "The text to settle on." },
        { name: "speed", type: "number", defaultValue: "40", description: "Milliseconds between shuffles." },
        { name: "characters", type: "string", defaultValue: "A–Z and 0–9", description: "The characters to shuffle through." },
        { name: "className", type: "string", defaultValue: "none", description: "Classes for the wrapper." },
      ]),
    ],
  },
  {
    slug: "animations",
    name: "Animations",
    description: "Motion wrappers you can put around any element.",
    items: [
      planned("magnetic", "Magnetic", "Pulls its child towards the pointer when it comes close."),
      planned("click-spark", "Click Spark", "A small burst of sparks wherever the user clicks."),
    ],
  },
  {
    slug: "components",
    name: "Components",
    description: "Ready-made interface pieces with motion built in.",
    items: [
      planned("spotlight-card", "Spotlight Card", "A card lit by a soft glow that follows the pointer."),
      planned("tilt-card", "Tilt Card", "A card that tilts in 3D towards the pointer."),
    ],
  },
  {
    slug: "backgrounds",
    name: "Backgrounds",
    description: "Full-section backdrops that move quietly behind content.",
    items: [
      planned("aurora", "Aurora", "Soft bands of colour drifting like northern lights."),
    ],
  },
];

function ready(
  slug: string,
  name: string,
  description: string,
  props: readonly CatalogProp[],
): CatalogItem {
  return { slug, name, description, status: "ready", props };
}

function planned(slug: string, name: string, description: string): CatalogItem {
  return { slug, name, description, status: "planned", props: [] };
}

export interface CatalogEntry {
  readonly item: CatalogItem;
  readonly category: CatalogCategory;
}

export const allEntries: readonly CatalogEntry[] = catalog.flatMap((category) =>
  category.items.map((item) => ({ item, category })),
);

export function findEntry(slug: string): CatalogEntry | undefined {
  return allEntries.find((entry) => entry.item.slug === slug);
}

export function neighbours(slug: string): {
  previous: CatalogEntry | undefined;
  next: CatalogEntry | undefined;
} {
  const index = allEntries.findIndex((entry) => entry.item.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: allEntries[index - 1], next: allEntries[index + 1] };
}

export function installCommand(slug: string): string {
  return `npx shadcn@latest add ${site.registryNamespace}/${slug}`;
}

export function componentHref(slug: string): string {
  return `/components/${slug}`;
}
