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
      planned("split-text", "Split Text", "Reveals a line letter by letter or word by word."),
      planned("gradient-text", "Gradient Text", "Text filled with a slowly moving gradient."),
      planned("scramble-text", "Scramble Text", "Characters shuffle before settling on the final text."),
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
