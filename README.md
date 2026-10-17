# BSHIN Personal Website

Personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. Deployed on Vercel.

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build to dist/
npm run lint     # run ESLint
npm run preview  # serve the production build locally
```

## Project structure

```
public/                 Static files served as-is (images, videos, resume)
src/
  main.tsx              App entry point
  App.tsx               Routes
  index.css             Tailwind setup and theme colors
  pages/                Route-level pages (Portfolio, Guestbook)
  components/
    layout/             Header and animated background
    sections/           Portfolio page sections (Hero, About, Projects, ...)
    cards/              Project cards and archive rows
    panels/             Project case-study panels
    ui/                 Small reusable pieces (PixelPanel, ThemeToggle, ...)
  data/                 Site content: education, experiences, skills, social links
    projects/           One file per project, plus shared types
```

## Adding a project

1. Create `src/data/projects/<projectName>.ts` exporting a `Project` (see `types.ts`).
2. Add its images under `public/images/projects/<project-id>/`.
3. Import it and add it to the `projects` list in `src/data/projects/index.ts`.
   Set `featured: true` to show it in the featured grid (first three are shown).
