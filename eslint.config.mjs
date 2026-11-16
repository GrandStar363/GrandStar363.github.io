import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const restrict = (...patterns) => [
  "error",
  {
    patterns: patterns.map(([group, message, extra]) => ({
      ...(group && { group }),
      message,
      ...extra,
    })),
  },
];

const NO_PARENT = [
  ["../*"],
  "Import siblings with ./ or other layers via the @/ alias.",
];
const NO_APP = [
  ["@/app", "@/app/*"],
  "Only the app layer composes; nothing imports from it.",
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/features/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(
        NO_PARENT,
        NO_APP,
        [
          ["@/features/*"],
          "Features are isolated: compose them in src/app instead.",
        ],
        [
          ["@/content", "@/content/*"],
          "Features get data via props; import content types only.",
          { allowTypeImports: true },
        ],
      ),
    },
  },
  {
    files: ["src/shared/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(NO_PARENT, NO_APP, [
        ["@/features/*", "@/content", "@/content/*"],
        "Shared code is domain-agnostic.",
      ]),
    },
  },
  {
    files: ["src/content/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(NO_APP, [
        ["@/features/*", "@/shared/ui/*"],
        "The content contract must not depend on UI.",
      ]),
    },
  },
  {
    files: ["scripts/**"],
    rules: {
      "@typescript-eslint/no-restricted-imports": restrict(
        NO_APP,
        [["@/features/*", "@/shared/*"], "Ingestion must not depend on UI."],
        [
          undefined,
          "Ingestion may only use the content schema.",
          { regex: "^@/content(?!/schema$)" },
        ],
      ),
    },
  },
  {
    // Static export with unoptimized images: this server-only primitive replaces next/image.
    files: ["src/shared/ui/Img.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
