/** Single place to rename the library or change its links. */
export const site = {
  name: "UI Librarie",
  tagline: "Animated React components you copy, paste and own.",
  description:
    "An open-source collection of animated React components. Browse, preview, then copy the code or install it with one command.",
  repoUrl: "https://github.com/GOURAVPY/UI-librarie",
  /** Used in install commands. Change when the site has a public URL. */
  registryNamespace: "@ui-librarie",
  license: "MIT",
} as const;

export const mainNav = [
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
] as const;
