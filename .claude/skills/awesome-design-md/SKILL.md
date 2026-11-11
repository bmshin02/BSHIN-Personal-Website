---
name: awesome-design-md
description: >-
  Library of 84 ready-made DESIGN.md design systems (Linear, Vercel, Stripe, Apple, Notion, Figma,
  Spotify, x.ai, Raycast, Supabase, Tesla and more) from voltagent/awesome-design-md, each with
  colour tokens, typography scale, spacing, radii, components and do's/don'ts. Use when the user
  wants to pick a visual direction or design language for this site, asks to make it "look like"
  a named company or site, wants to compare styles, or wants a DESIGN.md to build or restyle
  against.
---

# Awesome DESIGN.md

`<skill>` is this folder. It holds:

- `catalog.md`: one line per design system. Read this first; it is small.
- `designs/<name>.md`: the full DESIGN.md for each (4-30 KB). Read only the ones you shortlist.
- `LICENSE`: MIT, from VoltAgent. Source: https://github.com/voltagent/awesome-design-md

## Picking a design

1. **The user named one** ("make it look like Linear"): open `designs/<name>.md` (match loosely:
   `linear.app`, `mistral.ai`, `x.ai`, `together.ai`, `opencode.ai` keep their dots; Claude is `claude-ai`, renamed so macOS never loads it as a CLAUDE.md) and use it.
2. **The user wants options**: read `catalog.md`, shortlist 3-4 that fit the site's purpose and
   audience, and give each a one-line pitch (canvas light/dark, accent colour, type feel, what it
   would do for this site). Let the user choose; the visual direction is their call.
3. **Blends** ("Linear's layout with Stripe's colour") are fine: read both and say which file
   wins for which part (tokens, type, components).

## Applying one

Read the chosen file in full before writing code. Most have YAML frontmatter tokens (`colors`,
`typography`, `rounded`, `spacing`, `components`) followed by prose sections (Overview, Colors,
Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts). Older-format files are prose
only with numbered sections; the tokens are inline in backticks.

1. **Tokens first.** Map colours, type scale, radii and spacing into the project's token layer
   before touching components. In this repo that is the Tailwind v4 `@theme` block in
   `src/index.css` (Vite + React + TypeScript). Name tokens by role (`--color-canvas`, `--color-ink`,
   `--color-accent`), not by the source brand.
2. **Then components**, following the file's Components and Do's/Don'ts sections. Shared class
   strings live in `src/components/ui/styles.ts`.
3. **Respect the file's rules on what not to do** (shadows, radius limits, where the accent may
   appear). Those are what make the result read as that system rather than generic.

## Borrow the system, not the brand

These files describe real companies' sites. The portfolio must stay the owner's own:

- Never use the source company's name, logo, wordmark, product names, imagery or copy on the site.
- Proprietary fonts (Sohne, Circular, Aeonik, SF Pro, brand fonts) are not available: use the
  substitute the file names, or a close free Google Font, and say which.
- A signature brand colour can be kept as a reference point, but prefer shifting it so the site
  doesn't read as a clone of that company.

## Working with this project

- The redesign happens on the `redesign` branch. Test locally (`npm run dev`, http://localhost:5173);
  don't push or deploy without the user asking, because pushes trigger Vercel previews.
- Run `npx tsc -b`, `npm run lint` and `npm run build` after changes.
- `design-taste-frontend` (taste-skill) is also installed. If both are in play and they disagree,
  ask the user which wins rather than silently mixing them.

## Updating the library

To refresh from upstream: clone `https://github.com/voltagent/awesome-design-md`, copy each
`design-md/<name>/DESIGN.md` to `designs/<name>.md`, and regenerate `catalog.md` (one row per file:
the frontmatter `description`'s first sentence, or the first prose paragraph for older files).
Save Claude's file as `designs/claude-ai.md`: on macOS a `claude.md` is read as CLAUDE.md instructions.
