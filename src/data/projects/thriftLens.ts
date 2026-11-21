import type { Project } from "./types";

export const thriftLens: Project = {
  id: "thrift-lens",
  slug: "thrift-lens",

  title: "Thrift Lens",

  shortDescription:
    "A wearable AI assistant that spots items in thrift stores and whispers their resale prices to flippers.",

  description:
    "Thrift Lens watches what a thrift flipper is looking at, recognizes items, and quietly tells them when something is worth more than its tag price. " +
    "It detects objects with YOLO, prices them with Gemini, and only speaks up when it's confident the item is a good flip. " +
    "I built the backend and web client at the cOmpiled-16 hackathon at UC San Diego.",

  image: "/images/projects/thrift-lens/cover.webp",

  imageAlt:
    "The Thrift Lens app detecting a pair of headphones in its live camera view",

  gallery: [],

  category: "Web App",

  date: "Oct. 2026",

  status: "completed",

  technologies: [
    "Python",
    "FastAPI",
    "Ultralytics YOLO",
    "Gemini API",
    "asyncio",
    "pytest",
  ],

  featured: true,

  role:
    "Backend and web client developer. I built the Python/FastAPI pipeline, designed the decision logic and API contracts, " +
    "and built the browser camera client, planning the backend as 11 GitHub issues shipped through 5 merged pull requests.",

  problem:
    "Thrift flippers look through hundreds of items per visit and can't look up every one. " +
    "Good finds are easy to miss, and checking prices on a phone is slow.",

  solution:
    "A pipeline detects items with YOLO11, filters out junk, and prices the rest with Gemini, running each object's AI calls in parallel. " +
    "The assistant speaks only when confidence is high and the resale value beats the tag price.",

  features: [
    "A Python/FastAPI pipeline that detects items with YOLO11, filters junk, and prices the rest with Gemini.",

    "Decision logic that speaks only when confidence is high and the resale value beats the tag price.",

    "A perceptual cache that reuses price quotes on repeat sightings.",

    "A browser camera client with object stabilization, live detection boxes, a decision log, and spoken alerts.",
  ],

  challenges: [
    "One failed AI call could stall everything, so I ran each object's calls in parallel with asyncio and isolated failures.",

    "Repeated sightings of the same item wasted Gemini calls, which the perceptual cache solved.",

    "The web and iOS clients had to be built at the same time as the backend, so I defined per-object API contracts and the team built against stubs in parallel.",
  ],

  results: [
    "Covered the backend with about 80 pytest tests across cropping, decision rules, caching, and API clients.",

    "Cut Gemini calls, latency, and cost with the perceptual cache.",

    "Shipped the backend through 5 merged pull requests in the 5-hour build.",
  ],

  youtubeUrl: "https://www.youtube.com/embed/-nqxK2U75vo",

  links: [
    {
      label: "View on GitHub",
      url: "https://github.com/MasonD-007/lensthrift",
    },
  ],
};
