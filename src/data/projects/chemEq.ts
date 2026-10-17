import type { Project } from "./types";

export const chemEq: Project = {
  id: "chemeq",
  slug: "chemeq",

  title: "ChemEQ",

  shortDescription:
    "An interactive chemistry learning application that helps students visualize dynamic equilibrium through real-time molecular simulations.",

  description:
    "ChemEQ is an interactive educational application developed to help undergraduate chemistry students better understand dynamic chemical equilibrium. " +
    "The application visualizes the equilibrium between NO₂ and N₂O₄ and allows students to manipulate conditions such as concentration, temperature, and pressure. " +
    "As these variables change, students receive visual feedback showing how the chemical system responds, making an abstract chemistry concept easier to explore and understand.",

  image: "/images/projects/chemeq/cover.png",

  imageAlt:
    "ChemEQ educational chemistry application demonstrating dynamic equilibrium",

  gallery: [],

  category: "App",

  date: "Jun. 2023 – Sep. 2024",

  status: "completed",

  technologies: [
    "Unity",
    "C#",
    "AR",
    "iOS",
    "UI/UX Design",
    "Interactive Simulation",
  ],

  featured: true,

  role: "My responsibilities included programming interactive systems in Unity, implementing the student interface, creating visual feedback for chemical reactions, testing the application, and refining the experience based on classroom needs.",

  problem:
    "Dynamic chemical equilibrium can be difficult for students to understand because the reactions occur at the molecular level and cannot be directly observed. " +
    "Traditional diagrams and equations explain the concept mathematically, but they do not always help students develop an intuitive understanding of how a system responds when concentration, temperature, or pressure changes.",

  solution:
    "I helped develop an interactive simulation that allows students to directly manipulate the conditions of a chemical equilibrium system and observe the results visually. " +
    "The application models the equilibrium between NO₂ and N₂O₄, allowing students to adjust concentration, temperature, and pressure while seeing how the molecular population responds. " +
    "By combining interactive controls with visual molecular feedback, the application turns an abstract chemistry concept into an experience students can experiment with and observe in real time.",

  features: [
    "Interactive simulation of the equilibrium between NO₂ and N₂O₄",

    "Controls for changing concentration, temperature, and pressure",

    "Real-time visual feedback showing how changes affect chemical equilibrium",

    "Molecular visualization designed to make microscopic chemical processes easier to understand",

    "Student-focused interface designed for use during chemistry instruction",

    "Interactive learning experience built with Unity and deployed for iOS",

    "Designed for classroom demonstrations and hands-on student exploration",
  ],

  challenges: [
    "Translating an abstract chemistry concept into an intuitive interactive experience",

    "Representing changes in chemical equilibrium visually while keeping the experience understandable for introductory chemistry students",

    "Designing controls that allowed students to experiment without making the interface overly complicated",

    "Connecting scientific concepts provided by faculty with software and interaction design",

    "Balancing educational accuracy with an engaging visual presentation",

    "Testing and refining the application for use in an actual classroom environment",
  ],

  results: [
    "Developed an interactive educational application used by more than 50 students across approximately two years",

    "Supported undergraduate chemistry instruction and educational demonstrations through interactive visualization",

    "Collaborated directly with faculty to translate chemistry learning objectives into software features",

    "Expanded my experience developing educational technology with Unity, C#, interactive simulations, and mobile applications",

    "Strengthened my ability to communicate and collaborate across software development and academic subject areas",
  ],

  youtubeUrl: "https://www.youtube.com/embed/eLVTgadYfOQ?si=dk_yU3nseiwXRtqQ",

  links: [
    {
      label: "Source Code",
      url: "https://github.com/Zelocity/XCITE-Chem-Equilibrium-AR",
    },
  ],
};
