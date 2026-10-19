import type { Project } from "./types";

export const signLingo: Project = {
  id: "signlingo",
  slug: "signlingo",

  title: "SignLingo",

  shortDescription:
    "A Mac app for practicing ASL fingerspelling with live webcam feedback, built at ZotHack 2026.",

  description:
    "SignLingo is a Mac app that helps you learn ASL fingerspelling with your webcam. " +
    "Learn Letters mode shows each sign and tells you when you've got it right, and Spell Words mode has you fingerspell whole words. " +
    "I mentored the three-student team that built it at ZotHack 2026, where it won Best Overall.",

  image: "/images/projects/signlingo/cover.jpg",

  imageAlt:
    "The SignLingo team and their mentor holding the headphones they won at ZotHack 2026",

  gallery: [
    "/images/projects/signlingo/pic4.png",
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

  featured: true,

  winner: true,

  role:
    "I mentored Karen Huang, Etinosa Ogbeide, and Jeffrey Song, a three-student team, through the 12-hour build at ZotHack 2026. " +
    "I wrote the step-by-step build guide the team worked from, planned the work across camera, data, and UI/pitch roles, and reviewed their code throughout the hackathon. " +
    "I then coached them for judging, from the live demo and Devpost write-up to explaining their own code, and published the v1.0.0 Mac app release with its install guide.",

  problem:
    "Learning the ASL fingerspelling alphabet from pictures, books, or videos shows you what each letter should look like, but not whether you are forming it correctly. " +
    "Some letters differ only in small changes to finger placement, and without someone to check each sign, a beginner has no way to know when they've got it right. " +
    "SignLingo focuses on fingerspelling practice, not on teaching ASL as a full language.",

  solution:
    "My build guide broke the app into small steps, each tested before moving on: read the webcam with OpenCV, find 21 points on the hand with MediaPipe, turn those points into numbers that don't depend on where the hand is or how big it looks, then compare them with saved examples of each letter. " +
    "The team built on that base with fingertip weighting, a k-nearest-neighbors vote across examples, and separate recognition of J and Z from the path the finger draws. " +
    "Splitting the work into camera, data, and UI/pitch roles with checkpoints and backup plans kept all three students building in parallel, and the finished app was packaged for Mac with PyInstaller.",

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
      label: "Devpost",
      url: "https://devpost.com/software/signlingo-l79ict",
    },
    {
      label: "GitHub",
      url: "https://github.com/karenhuang314/sign-language-cv",
    },
  ],
};
