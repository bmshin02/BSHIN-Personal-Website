import type { Project } from "./types";

export const signLingo: Project = {
  id: "signlingo",
  slug: "signlingo",

  title: "SignLingo (ZotHack 2026)",

  shortDescription:
    "A Mac app that teaches ASL fingerspelling with your webcam, and the Best Overall winner at ZotHack 2026.",

  description:
    "SignLingo is a Mac app that helps you learn ASL fingerspelling with your webcam. " +
    "Learn Letters mode shows each sign and tells you when you've got it right, and Spell Words mode has you fingerspell whole words. " +
    "I mentored the three-student team that built it at ZotHack 2026, where it won Best Overall.",

  image: "/images/projects/signlingo/cover.jpg",

  imageAlt:
    "The SignLingo team and their mentor holding the headphones they won at ZotHack 2026",

  gallery: [
    "/images/projects/signlingo/pic1.jpg",
    "/images/projects/signlingo/pic2.jpg",
    "/images/projects/signlingo/pic3.png",
  ],

  category: "App",

  date: "Oct. 2026",

  status: "completed",

  technologies: [
    "Python",
    "OpenCV",
    "MediaPipe",
    "PyInstaller",
    "Git",
    "GitHub",
  ],

  featured: false,

  role: "Mentor. I mentored Karen Huang, Etinosa Ogbeide, and Jeffrey Song through the 12-hour build, from planning and code review to judging prep and the Mac app release.",

  problem:
    "Learning ASL fingerspelling on your own is hard when there's no one to tell you whether each sign is right.",

  solution:
    "A webcam app that recognizes fingerspelled letters live, so learners get instant feedback on single letters and then on whole words.",

  features: [
    "Learn Letters mode, which shows each sign and tells you when you've got it right.",

    "Spell Words mode, which has you fingerspell whole words.",

    "Live recognition of all 26 letters from a webcam feed.",

    "A packaged Mac app release with an install guide.",
  ],

  challenges: [
    "Taking beginners from a webcam feed to live letter checks in one hackathon, which I handled by writing a step-by-step build guide and testing each step.",

    "Fitting the build into 12 hours, which I planned across camera, data, and UI/pitch roles with checkpoints and backup plans for each.",

    "Keeping the codebase clean and well organized under time pressure by reviewing the team's code throughout the hackathon.",

    "Getting the team ready for judging, from the live demo and Devpost write-up to explaining their own code.",
  ],

  results: [
    "Won Best Overall at ZotHack 2026 with an app that recognizes all 26 letters live.",

    "Published the v1.0.0 Mac app release and wrote its install guide.",
  ],

  youtubeUrl: "https://www.youtube.com/embed/i5b9kULTUGg",

  links: [
    {
      label: "View on Devpost",
      url: "https://devpost.com/software/signlingo-l79ict",
    },
    {
      label: "View on GitHub",
      url: "https://github.com/karenhuang314/sign-language-cv",
    },
  ],
};
