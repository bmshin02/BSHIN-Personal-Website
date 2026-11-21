import type { Project } from "./types";

export const fastPath: Project = {
  id: "fast-path",
  slug: "fast-path",

  title: "Fast Path",

  shortDescription:
    "A multi-agent AI tool that helps Orange County homeowners and city staff get ADU permit forms right.",

  description:
    "Fast Path takes a city's ADU (accessory dwelling unit) permit form, checks it against current state housing law, and hands back a corrected, filled-in form. " +
    "Homeowners answer a few questions instead of decoding legal language, and city staff get forms with stale statute citations fixed and flagged. " +
    "I built its multi-agent system with a four-person team at the Claude Impact Lab (UCI x SoCal Affordable Housing).",

  image: "/images/projects/fast-path/cover.webp",

  imageAlt:
    "The Fast Path landing page with an upload button and a preview of a filled-in ADU application form",

  gallery: [],

  category: "Web App",

  date: "Nov. 2026",

  status: "completed",

  technologies: [
    "Next.js",
    "TypeScript",
    "Claude API",
    "Zod",
    "pdf-lib",
    "pdf.js",
    "Vercel",
    "Claude Code",
  ],

  featured: true,

  role:
    "I built the multi-agent system on a four-person team: the Claude coordinator and its subagents, " +
    "the PDF producer, and the checks on model output, using Claude Code throughout the 4.5-hour build window.",

  problem:
    "ADU permit forms are long, legal, and easy to get wrong, and some cities' forms still cite outdated state statutes. " +
    "Homeowners struggle to fill them in correctly, and city staff spend time catching the same mistakes.",

  solution:
    "A Claude coordinator directs three subagents through typed Zod contracts: a parser reads the uploaded form, a compliance agent checks it against current law, and a producer edits the city's own PDF. " +
    "The coordinator passes document IDs and summaries rather than whole PDFs, can re-run subagents or search the web, and stops to ask the user when an upload looks wrong.",

  features: [
    "A coordinator agent directing parser, compliance, and producer subagents through typed Zod contracts.",

    "A producer that edits the city's own PDF with pdf.js and pdf-lib, rewriting stale statute citations in red.",

    "Code-side checks on model output: sourced statute mappings, one audit row per line, and no personal fields.",

    "A per-request model override, scoped with AsyncLocalStorage, to compare models live with no redeploy.",

    "Streamed agent progress from a Next.js API route, with a mock mode so teammates could build the UI in parallel.",
  ],

  challenges: [
    "Keeping the coordinator's context small: it passes document IDs and summaries instead of the PDFs themselves.",

    "Bounding the agent: the coordinator is capped at 8 tool calls and returns partial output with unverified items clearly listed.",

    "Model calls can fail, so I built a deterministic fallback that still produces a corrected form from the compliance data.",

    "Base64 encoding pushed uploads past Vercel's 4.5 MB request limit, which I fixed by capping files at 3 MB.",
  ],

  results: [
    "Reproduced the state housing department's finding on Anaheim's stale citations and flagged one more conflict.",

    "Cut cost by matching models to agents, using Opus only for legal compliance and Sonnet for everything else.",

    "Deployed to Vercel with a four-person team in a 4.5-hour build window.",
  ],

  links: [
    {
      label: "Live demo",
      url: "https://fast-path-oc.vercel.app",
    },
    {
      label: "View on GitHub",
      url: "https://github.com/bmshin02/fast-path-oc",
    },
  ],
};
