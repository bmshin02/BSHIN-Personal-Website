import type { Project } from "./types";

export const cypherCode: Project = {
  id: "cypher-code",
  slug: "cypher-code",

  title: "Cypher Code",

  shortDescription:
    "An AR app that teaches encryption in an undergraduate computer science course, demoed to 100+ students.",

  description:
    "Cypher Code is an AR app, built at UC Riverside's XCITE center, that teaches encryption in an undergraduate computer science course. " +
    "Students turn the knobs of an AR arcade machine and watch the Caesar cipher shift each letter, instead of only reading about it. " +
    "I co-led coding on the three-person team.",

  image: "/images/projects/enigmamachine/cover.webp",

  imageAlt: "The Cypher Code AR arcade machine that teaches the Caesar cipher",

  gallery: [],

  category: "App",

  date: "Oct. 2023 – Jun. 2025",

  status: "completed",

  technologies: ["Unity", "C#", "AR", "iOS"],

  featured: false,

  role:
    "I co-led coding on a three-person team, building the Caesar cipher machine in Unity and C# " +
    "and turning the professors' learning goals into features beginners could use.",

  problem:
    "Encryption is hard for beginner computer science students to picture when it's taught only through text, diagrams, or algorithms. " +
    "Students can follow each step on paper without seeing how the steps transform a message.",

  solution:
    "We built the Caesar cipher as an AR arcade machine. Students turn its knobs and see how each letter shifts, " +
    "so the link between the key, the cipher, and the encrypted output is something they can try for themselves.",

  features: [
    "The Caesar cipher as an AR arcade machine, built in Unity and C#.",
    "Knobs that show how each letter shifts.",
    "A designer's 3D model turned into a working AR exhibit.",
    "Beginner-friendly features shaped by the professors' learning goals.",
  ],

  challenges: [
    "Turning an abstract idea into something students could see and handle.",
    "Keeping the app simple enough for students with little computer science background.",
  ],

  results: [
    "Demoed to 100+ computer science students, with positive feedback in post-class surveys.",
    "Used in an undergraduate computer science course.",
  ],

  youtubeUrl: "",

  links: [],
};
