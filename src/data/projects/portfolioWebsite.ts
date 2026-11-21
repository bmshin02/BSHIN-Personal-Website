import type { Project } from "./types";

export const portfolioWebsite: Project = {
  id: "portfolio-website",
  slug: "portfolio-website",

  title: "Personal Portfolio Website",

  shortDescription:
    "This site: a React and TypeScript portfolio where new projects are added as data, with no UI changes.",

  description:
    "My portfolio site, built with React, TypeScript, Vite, and Tailwind CSS and deployed on Vercel. " +
    "Every project, job, and skill is a typed TypeScript object, so adding a new project means adding a data file, not touching the UI.",

  image: "/images/projects/portfolio/cover.webp",

  imageAlt:
    "The portfolio's hero with a pixel-font name, a photo window, and a terminal window",

  gallery: [],

  category: "Web",

  date: "Aug. 2026 – Sep. 2026",

  status: "completed",

  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "React Router",
    "Vercel",
  ],

  featured: false,

  role: "Solo developer and designer. I designed, built, and deployed the site.",

  problem:
    "I wanted one place to show my projects and experience in detail, and to keep it easy to update as I build more.",

  solution:
    "A config-driven model of typed TypeScript objects feeds reusable React components, so each new project renders its card, archive row, and case study without UI changes.",

  features: [
    "A config-driven data model of typed TypeScript objects for projects, experience, and skills.",

    "Reusable React components, including project detail panels, technology tags, and a theme toggle.",

    "Case studies with a demo video, gallery lightbox, and project-to-project navigation.",

    "A hero with a typing terminal and draggable windows, plus light and dark themes.",
  ],

  challenges: [
    "Keeping the layout readable on short laptop screens and small phones, so each section fits without awkward scrolling.",

    "Adding motion that feels alive while respecting reduced-motion settings.",
  ],

  results: [
    "New projects go live by adding one data file.",

    "Deployed on Vercel, with every push to main published automatically.",
  ],

  links: [
    {
      label: "Visit site",
      url: "https://www.bmshin.com",
    },
    {
      label: "View on GitHub",
      url: "https://github.com/bmshin02/BSHIN-Personal-Website",
    },
  ],
};
