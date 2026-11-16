import { fileURLToPath } from "node:url";

export const TWINE_ORIGIN = "https://www.twine.net";
export const TWINE_USERNAME = "Maksim999";

const root = (relative: string) =>
  fileURLToPath(new URL(`../../${relative}`, import.meta.url));

export const SNAPSHOT_FILE = root("src/content/profile.json");
export const PUBLIC_DIR = root("public");
