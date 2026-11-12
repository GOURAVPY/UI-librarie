import { readFile } from "node:fs/promises";
import path from "node:path";

const REGISTRY_DIR = path.join(process.cwd(), "src", "registry");

/** Reads a component's source so the Code tab can show it. */
export async function readRegistrySource(file: string): Promise<string> {
  return readFile(path.join(REGISTRY_DIR, file), "utf8");
}
