import type { Project } from "./types";

export const rhythmPlus: Project = {
  id: "rhythmplus",
  slug: "rhythmplus",

  title: "Rhythm Plus",

  shortDescription:
    "A physical rhythm game that combines real-time software logic, state management, and hardware inputs to recreate a tile-based music experience.",

  description:
    "Rhythm Plus is a class project where I developed a physical version of a tile-based rhythm game using Arduino and software engineering fundamentals. " +
    "The project focused on designing responsive game logic, managing player input, coordinating timing-based events, and integrating software behavior with physical hardware.",

  image: "/images/projects/rhythmplus/cover.png",

  imageAlt: "Rhythm Plus physical Arduino rhythm game",

  gallery: [],

  category: "Embedded Systems",

  date: "Apr. 2024 – Jun. 2024",

  status: "completed",

  technologies: ["Arduino", "Embedded Systems", "Hardware", "C++"],

  featured: false,

  role:
    "I designed and programmed the game's core software logic, including player input handling, game states, timing behavior, and communication between the software and physical components. " +
    "I also helped structure the system so that input, game logic, and hardware output could operate together reliably during gameplay.",

  problem:
    "I wanted to recreate the responsiveness of a digital rhythm game using physical controls. " +
    "The main challenge was coordinating timing-sensitive player input, game state, and hardware behavior so that the experience remained responsive and consistent.",

  solution:
    "I developed a software-driven game loop that processed physical player inputs, tracked the current game state, and triggered the appropriate game responses based on timing. " +
    "The software coordinated the Arduino's input and output components while separating gameplay logic from hardware interaction, making the system easier to test, debug, and extend.",

  features: [
    "Physical recreation of a tile-based rhythm game",

    "Arduino-based game logic and hardware control",

    "Physical player inputs connected to the game system",

    "Music and rhythm-based player interaction",

    "Real-time communication between software logic and physical hardware",
  ],

  challenges: [
    "Translating a digital rhythm-game concept into a physical interactive experience",

    "Coordinating hardware inputs with the timing of the game",

    "Creating responsive interaction between physical components and software",

    "Applying embedded systems concepts to build a complete playable project",
  ],

  results: [
    "Designed and implemented timing-sensitive game logic using structured state management",
    "Developed real-time input handling for physical player controls",
    "Integrated software logic with external hardware components through Arduino",
    "Improved my understanding of modular system design, debugging, and event-driven programming",
    "Applied software engineering concepts to a real-time interactive application",
  ],

  youtubeUrl: "https://www.youtube.com/embed/5x_CPQOT2js",

  links: [],
};
