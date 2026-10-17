import type { Project } from "./types";

export const enigmaMachine: Project = {
  id: "enigma-machine",
  slug: "enigma-machine",

  title: "Enigma Machine",

  shortDescription:
    "An interactive educational application that helps introductory computer science students explore encryption through a visual cipher machine.",

  description:
    "An educational technology project developed to make introductory encryption concepts more interactive and approachable for computer science students. " +
    "The application allows students to experiment with a virtual cipher machine and observe how input is transformed into encrypted output. " +
    "By combining interactive visualization with hands-on experimentation, the project turns an abstract computer science concept into an experience students can directly explore.",

  image: "/images/projects/enigmamachine/cover.jpg",

  imageAlt: "Interactive Enigma Machine educational application",

  gallery: [
    // "/images/projects/enigma-machine/pic1.png",
    // "/images/projects/enigma-machine/pic2.png",
    // "/images/projects/enigma-machine/pic3.png",
  ],

  category: "App",

  date: "Oct 2023 – Jun 2025",

  status: "completed",

  technologies: ["Unity", "C#", "AR", "UI/UX Design", "Interactive Learning"],

  featured: false,

  role:
    "I worked as an undergraduate developer on the project, helping design and program the interactive learning experience in Unity. " +
    "My responsibilities included implementing application behavior, building interactive interfaces, creating visual feedback for the cipher process, testing the application, and refining the experience for use by introductory computer science students.",

  problem:
    "Encryption can be difficult for beginner computer science students to understand when it is introduced only through written explanations, diagrams, or algorithms. " +
    "Students may understand the individual steps conceptually without seeing how those steps work together to transform information.",

  solution:
    "I helped develop an interactive cipher-machine experience that allows students to provide input and visually observe how it is transformed through the encryption process. " +
    "The application presents the underlying concept through direct interaction and visual feedback, giving students an opportunity to experiment with encryption instead of only reading about it. " +
    "The goal was to make the relationship between input, cipher behavior, and encrypted output easier to understand.",

  features: [
    "Interactive cipher-machine simulation for introductory computer science education",

    "Visual representation of the encryption process",

    "User input that produces corresponding encrypted output",

    "Interactive controls designed to encourage experimentation with cipher behavior",

    "Student-focused interface designed for classroom use",

    "Visual feedback that helps connect encryption concepts with their resulting output",

    "Interactive educational experience developed using Unity and C#",
  ],

  challenges: [
    "Translating an abstract encryption concept into an understandable interactive experience",

    "Designing an interface that was accessible to students with limited prior computer science experience",

    "Representing the cipher process visually without overwhelming students with unnecessary complexity",

    "Connecting course learning objectives with appropriate software interactions",

    "Testing and refining the application for use in an educational environment",
  ],

  results: [
    "Developed an interactive educational application demonstrated to more than 100 students",

    "Supported introductory computer science instruction through interactive visualization",

    "Received positive student feedback from classroom use and demonstrations",

    "Collaborated with faculty to translate computer science learning objectives into software features",

    "Expanded my experience with Unity, C#, interactive application development, UI/UX, and educational technology",
  ],

  youtubeUrl: "",

  links: [
    {
      label: "Source Code",
      url: "https://github.com/Zelocity/XCITE-Chem-Equilibrium-AR",
    },
  ],
};
