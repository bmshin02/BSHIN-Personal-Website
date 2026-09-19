import type { Project } from "./projecttypes";

export const rankingVideoCompiler: Project = {
  id: "ranking-video-compiler",
  slug: "ranking-video-compiler",

  title: "Ranking Video Compiler",

  shortDescription:
    'A full stack application for content creation of the viral "Ranking Clips" trend by letting users easily compile and download uploaded arranged clips.',

  description:
    "Ranking Video Compiler is a web application that helps users create ranked short-form video compilations. Users can import clips from supported URLs, preview and reorder them, remove unwanted clips, and combine the final sequence into one completed video.",

  image: "/images/projects/rankingvideocompiler/cover.png",

  imageAlt:
    "Ranking Video Compiler editor showing an ordered list of video clips",

  gallery: [
    "/images/projects/rankingvideocompiler/pic1.png",
    "/images/projects/rankingvideocompiler/pic2.png",
    "/images/projects/rankingvideocompiler/pic3.png",
    "/images/projects/rankingvideocompiler/pic4.png",
  ],

  category: "Web",

  date: "Jun. 2026 – Present",

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

  featured: true,

  role: "Full-stack developer responsible for designing the interface, building the backend API, organizing project files, and developing the video processing workflow.",

  problem:
    "Creating ranking videos manually requires downloading clips, organizing files, placing videos in the correct order, and combining them through separate editing tools." +
    " Additionally, there were only paid services online available which would limit the user's usage based on the plan they had.",

  solution:
    "I created a browser-based workflow that brings clip importing, previewing, reordering, deletion, file management, and video compilation into a single application and can be " +
    'ran on a local machine. Additionally I created a Youtube Channel "BubboRanks " which gained around 2k subscribers within a month through only Ranking videos created via this web app.',
  features: [
    "Import short-form videos from supported URLs including Youtube, Reddit, Instagram, and Tiktok.",
    "Preview imported clips inside the editor",
    "Reorder clips using a drag-and-drop interface",
    "Delete unwanted clips from a project",
    "Store videos inside separate job folders",
    "Compile ordered clips into one output video",
    "Preserve imported clips when the page is refreshed",
  ],

  challenges: [
    "Keeping the visual clip order synchronized with the backend compilation order",
    "Managing input and output files for separate user projects",
    "Connecting the React frontend with the Node.js and Python workflow",
    "Handling unavailable or restricted videos from external platforms",
  ],

  results: [
    'Created a "Ranking Clips" Youtube channel to test the effectiveness of the template',
    "Built a working full-stack prototype for importing and organizing video clips",
    "Created a reusable job-based file-storage structure",
    "Reduced the number of manual steps needed to prepare ranking compilations",
    "Integrated frontend controls with a Python and FFmpeg media-processing pipeline",
  ],

  youtubeUrl: "https://www.youtube.com/embed/vo7Qgxa4z7k?si=WZRtjqmqPQ0Eku4j",

  links: [
    {
      label: "YouTube Test Channel",
      url: "https://www.youtube.com/@BubboRanks",
    },
  ],
};
