import type { Project } from "./types";

export const rankingVideoCompiler: Project = {
  id: "ranking-video-compiler",
  slug: "ranking-video-compiler",

  title: "Ranking Video Compiler",

  shortDescription:
    "A full-stack tool that turns TikTok, Instagram, Reddit, and YouTube clips into ranked short-form videos.",

  description:
    "Ranking Video Compiler turns clips from TikTok, Instagram, Reddit, and YouTube into ranked short-form videos. " +
    "Users import clips by URL, rank them with drag and drop, trim and preview them, and compile a finished 60-second video in about 3–5 minutes. " +
    "I used it to make about 40 videos for my BubboRanks YouTube channel, which reached 500K views and 2K subscribers in a month.",

  image: "/images/projects/rankingvideocompiler/cover.webp",

  imageAlt:
    "Ranking Video Compiler editor showing an ordered list of video clips",

  gallery: [
    "/images/projects/rankingvideocompiler/pic1.webp",
    "/images/projects/rankingvideocompiler/pic2.webp",
    "/images/projects/rankingvideocompiler/pic3.webp",
    "/images/projects/rankingvideocompiler/pic4.webp",
  ],

  category: "Web",

  date: "Jun. 2026 – Jul. 2026",

  status: "completed",

  technologies: [
    "React",
    "TypeScript",
    "Vite",
    "Node.js",
    "Express",
    "Python",
    "FFmpeg",
    "yt-dlp",
  ],

  featured: false,

  role: "Full-stack developer responsible for designing the interface, building the backend API, organizing project files, and developing the video processing workflow.",

  problem:
    "Creating ranking videos manually requires downloading clips, organizing files, placing videos in the correct order, and combining them through separate editing tools." +
    " Additionally, there were only paid services online available which would limit the user's usage based on the plan they had.",

  solution:
    "I built a free tool that runs locally, with a React/TypeScript frontend, an Express API, and a Python video pipeline. " +
    "It brings importing, ranking, trimming, previewing, and compiling into one app, replacing the paid ranking-video services.",

  features: [
    "Import short-form clips by URL from TikTok, Instagram, Reddit, and YouTube.",
    "Drag-and-drop ranking with clip previews.",
    "Trimming for each clip.",
    "A title editor that matches the final video.",
    "Compiles a 60-second video in about 3–5 minutes.",
    "Each project keeps its clips in its own job folder, so they survive a page refresh.",
  ],

  challenges: [
    "Keeping the visual clip order synchronized with the backend compilation order",
    "Managing input and output files for separate user projects",
    "Connecting the React frontend with the Node.js and Python workflow",
    "Handling unavailable or restricted videos from external platforms",
  ],

  results: [
    "Made about 40 videos for BubboRanks on YouTube, reaching 500K views and 2K subscribers in a month.",
    "Replaced paid ranking-video services with a free tool that runs locally.",
    "Cut a video's build time to about 3–5 minutes for a 60-second compilation.",
  ],

  youtubeUrl: "https://www.youtube.com/embed/vo7Qgxa4z7k?si=WZRtjqmqPQ0Eku4j",

  links: [
    {
      label: "View on GitHub",
      url: "https://github.com/bmshin02/Ranking-Clips-Compiler",
    },
    {
      label: "YouTube Test Channel",
      url: "https://www.youtube.com/@BubboRanks",
    },
  ],
};
