import type { Project } from "./types";

export const fishGame: Project = {
  id: "fishgame",
  slug: "fishgame",

  title: "Fish.exe",

  shortDescription:
    "A Roblox collection game where players mutate fish and find endless combinations in search for rare combinations and high value fish.",

  description:
    "A progression-based Roblox game centered around growing and collecting fish. " +
    "Players maintain their own fish tank where fish continuously spawn, grow, and develop " +
    "different mutations as the player experiments. As players earn currency, " +
    "they can expand their fishtank and add more mutations, and collect increasingly rare fish. " +
    "The game focuses on creating a relaxing collection loop while giving players reasons " +
    "to continue searching for unique and valuable mutation combinations.",

  image: "/images/projects/fishgame/cover.png",

  imageAlt: "fish.exe Roblox game showing a player's fish tank",

  gallery: [
    "/images/projects/fishgame/pic1.png",
    "/images/projects/fishgame/pic2.png",
    "/images/projects/fishgame/pic3.png",
    "/images/projects/fishgame/pic4.png",
  ],

  category: "Game",

  date: "Oct. 2025 – Jan. 2026",

  status: "completed",

  technologies: ["Roblox Studio", "Game Systems", "UI Development", "Luau"],

  featured: false,

  role:
    "I worked as the programmer, within a team, responsible for systems involved including fish spawn, " +
    "mutation, inventory, save progression, microtransactions, fish tank, fish swim pathing, " +
    "and overall gameplay experience in Roblox Studio.",

  problem:
    "I wanted to create the next biggest Roblox game along with another experienced developer." +
    " The game should be simple but easy to understand for children but also rewarding." +
    " The main challenge was creating " +
    "enough variation and progression around a simple fish-growing mechanic so that " +
    "discovering new fish would continue to feel rewarding.",

  solution:
    "I designed the game around a continuous fish collection loop. Fish spawn inside " +
    "the player's tank and can develop mutations via buttons that modify their appearance and value. " +
    "Mutations such as Fire, Freeze, Shock, Rainbow, and Scales can create many different " +
    "visual combinations, giving players rare fish to search for and collect. Players can " +
    "interact with their fish, manage their collection, sell fish for currency, and use " +
    "their earnings to purchase upgrades that increase the capacity of their tank. " +
    "I separated major gameplay features into reusable systems so spawning, mutations, " +
    "inventory management, upgrades, UI, and fish interactions could be maintained and " +
    "expanded independently.",

  features: [
    "Continuous fish spawning system that populates each player's tank with collectible fish",

    "Mutation system that allows fish to develop visual traits such as Fire, Freeze, Shock, Rainbow, and Scales",

    "Mutation combinations that create a large variety of visually unique fish",

    "Fish growth and collection loop that encourages players to search for increasingly rare fish",

    "Tank capacity upgrade system that allows players to expand how many fish they can maintain",

    "Shop and progression systems that allow players to spend earned currency on upgrades",

    "Interactive fish selection system for viewing and managing individual fish",

    "Custom camera transitions that focus the player's view on selected fish and interface elements",

    "Fish swim pathing so that fish in the tank look more realistic to how a fish would swim.",

    "Save system for maintaining player progression and collected fish between sessions",
  ],

  challenges: [
    "Managing a large number of fish while limiting how many active objects were rendered and simulated at once",

    "Designing mutation effects that could be combined without conflicting with one another",

    "Creating a reusable system that could apply mutations consistently across many different fish",

    "Keeping fish selection, camera movement, UI state, and gameplay interactions synchronized",

    "Making sure that client and server sides were never overloaded at any point during gameplay.",

    "Designing the collection loop so that finding rare fish remained rewarding without making common fish feel meaningless",
  ],

  results: [
    "Designed and implemented modular systems for fish spawning, mutations, inventory management, progression, shops, and tank upgrades in Roblox Studio",

    "Created a flexible mutation architecture capable of applying and combining multiple visual modifications on individual fish",

    "Improved my understanding of object management, client-server communication, event-driven programming, and performance optimization in Roblox",

    "Expanded my experience with game design, systems design, Luau, UI/UX, animation, 3D assets, and progression-based gameplay",
  ],

  youtubeUrl: "https://www.youtube.com/embed/4aaiOj7vTGU?si=VXj9q-as6udmxMUk",

  links: [
    {
      label: "Visit Game",
      url: "https://www.roblox.com/games/96878044536108/Fish-exe",
    },
  ],
};
