# Maksim Hrusheuski — Portfolio

Personal portfolio of a full-stack software engineer, live at **https://grandstar363.github.io/**.

The content (experience, projects, skills, reviews, education) is imported from the public
[Twine profile](https://www.twine.net/Maksim999) into a validated JSON snapshot. The site is then
prerendered to static HTML and deployed to GitHub Pages.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Zod ·
Vitest + Testing Library · Playwright + axe · GitHub Actions.

Every page is rendered at build time by Server Components. Client-side JavaScript is limited to a few
small pieces: the mobile menu, the timer that rotates the background scenes (and the hero strip that
names them), the intro loader's counter, and the theme toggle. All motion is CSS-first and turns off
for visitors who prefer reduced motion. Light and dark themes follow the OS setting until the visitor
picks one.

## Architecture

```
scripts/twine-sync/   Ingestion: fetch Twine → validate raw shapes → map to domain → write snapshot + media
src/content/          Contract: Zod domain schema, generated profile.json, hand-authored site.config.ts
src/shared/           Domain-agnostic UI primitives and helpers
src/features/<name>/  Isolated features (hero, backdrop, loader, theme, experience, projects, skills, reviews, education, contact, navigation)
src/app/              Composition: routes, layout, metadata; the only place features meet
```

ESLint enforces the layer boundaries: features can't import each other, shared code can't import
domain code, and ingestion can only use the schema. See [ARCHITECTURE.md](ARCHITECTURE.md) for the
full guidelines.

## Scripts

| Command                           | What it does                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`                     | Local dev server                                                                |
| `npm run sync`                    | Re-import the Twine profile into `src/content/profile.json` and `public/media/` |
| `npm run lint` / `npm run format` | ESLint (incl. architecture rules) / Prettier                                    |
| `npm run typecheck`               | Route type generation + `tsc`                                                   |
| `npm test`                        | Unit and component tests (Vitest)                                               |
| `npm run build`                   | Static export to `out/`                                                         |
| `npm run e2e`                     | Playwright + axe against the built `out/` (run `build` first)                   |

## Updating content

1. `npm run sync`
2. Review the diff of `src/content/profile.json` and `public/media/`
3. Commit and push to `main`. CI verifies, builds and deploys.

Never hand-edit the snapshot. If something imports badly, fix the mapper or parser in
`scripts/twine-sync/`, add a test, and re-sync. Hand-written values such as email, navigation and
the featured stack live in `src/content/site.config.ts`.

## Deploying to Netlify

`netlify.toml` holds the build settings (`npm run build`, publish `out/`, Node 24), so importing the
repository in Netlify needs no manual configuration. Netlify exposes the site's primary address as
`URL` during builds, and the site uses it for canonical links, the sitemap and social previews. Set
`SITE_URL` to override it, for example when a custom domain is the primary address.
