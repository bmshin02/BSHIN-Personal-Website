import type { Project } from "./projecttypes";

export const Webmining: Project = {
  id: "webmining",
  slug: "webmining",

  title: "Webmining",

  shortDescription:
    "A Roblox mining game where players mine mutated rocks and sell.",

  description:
    "A progression-focused Roblox mining game where players explore the world, mine dynamically spawned rock nodes, and collect Shards with unique mutations. A synchronized global weather system causes the same weather event to occur across every active server, changing the appearance and properties of available resources. Players combine their Shards into Geodes that inherit existing mutations and can develop new ones from specific mutation combinations. The resulting Gems can be collected or sold for Rupees, encouraging players to continue searching for increasingly rare and valuable combinations.",

  image: "/images/projects/webmining/coverwebmining.png",

  imageAlt: "webmining image",

  gallery: [
    "/images/projects/webmining/pic1.png",
    "/images/projects/webmining/pic2.png",
    "/images/projects/webmining/pic3.png",
    "/images/projects/webmining/pic4.png",
  ],

  category: "Game",
  date: "Apr. 2025 – Sep. 2025",
  status: "completed",

  technologies: ["Roblox Studio", "Game Systems", "UI Development", "Luau"],

  featured: false,

  role: "I worked as a solo game developer responsible for designing and programming the mining mechanics, resource systems, player progression, upgrades, weather events, art, animations, and user interface in Roblox Studio.",

  problem:
    "I wanted to create an addicting game that followed and innovated trending mechanics from popular Roblox games such item progression, interesting mutations, and collection fun.",

  solution:
    "I created an engaging mining game where a variety of rock nodes spawn " +
    "throughout the world and mutate based on changing weather conditions. " +
    "These mutations can alter individual nodes by changing their size, " +
    "appearance, particle effects, and other properties. Players use a pickaxe " +
    "to mine the nodes and collect Shards, which can be combined into Geodes. " +
    "Geodes inherit mutations from their Shards and can also develop entirely " +
    "new mutations when certain mutation pairs are combined. Players can open " +
    "their Geodes to obtain Gems, sell them for Rupees, and continue searching " +
    "for rare Gems with the most valuable mutation combinations.",

  features: [
    "Infinite game loop where players are encouraged to search for the rarest gem with most valuable mutation combinations",
    "Satisfying mining mechanics through sounds and effects.",
    "Mutation system with near endless combinations",
    "Various rock node spawning system that dynamically creates different nodes based on weather",
    "Rotating weather system with 10 different weathers that modifies the environment visually and mechanically",
    "Rotating shop system with assortment of pickaxes and items that players can buy with Rupees",
    "Synchronized systems, meaning all active servers experience the same shop rotation and weather rotation",
    "Save system that saves the players inventory and progression",
    "Interactive UI system",
  ],

  challenges: [
    "Designing a system that doesn't overload server and client resources.",
    "Balancing resource rewards, geode values, and item costs",
    "Ensuring that overlapping mutation effects won't create conflicts for 2D and 3D assets",
    "Creating art for an exponential amount of mutations and items as well ensuring no conflicts",
    "Designing 3D models, main map, sound effects, and animations",
  ],

  results: [
    "Designed and implemented reusable, modular systems for resource-node spawning, mining, inventory management, synchronized global weather, and object mutations in Roblox Studio.",
    "Expanded my skills in game and systems design, client-server communication, user experience, animation, 3D modeling, and 2D asset creation.",
    "Strengthened my experience with Luau, event-driven programming, and Roblox game systems",
  ],

  youtubeUrl: "https://www.youtube.com/embed/_H0-aysFvy8?si=ujWU01qTpmKj5IH4",

  links: [
    // {
    //   label: "Source code",
    //   url: "https://github.com/your-username/portfolio",
    // },
  ],
};
