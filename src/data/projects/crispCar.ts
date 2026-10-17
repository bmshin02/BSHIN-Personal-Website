import type { Project } from "./types";

export const crispCar: Project = {
  id: "crispcar",
  slug: "crispcar",

  title: "Crisp Car (Autonomous Car)",

  shortDescription:
    "A miniature autonomous vehicle that uses computer vision to follow lanes, recognize traffic signs, and make real-time navigation decisions.",

  description:
    "A senior design project developed alongside three teammates to build a miniature autonomous vehicle capable of navigating a roadway using computer vision. " +
    "The vehicle processes camera input in real time to identify lane markings, recognize traffic signs, and determine how it should respond to its environment. " +
    "The project combined computer vision, autonomous navigation, and software-controlled vehicle behavior into a complete real-time system.",

  image: "/images/projects/crispcar/cover.png",

  imageAlt: "Miniature autonomous line-following car developed using OpenCV",

  gallery: [
    "/images/projects/crispcar/pic1.png",
    "/images/projects/crispcar/pic2.png",
  ],

  category: "Embedded Systems",

  date: "Sep. 2024 - Mar. 2025",

  status: "completed",

  technologies: [
    "OpenCV",
    "Computer Vision",
    "Object Detection",
    "Autonomous Navigation",
    "Image Processing",
  ],

  featured: false,

  role:
    "I worked as a Software Engineer on a four-person team, focusing on the computer vision and autonomous navigation systems. " +
    "My responsibilities included processing camera input with OpenCV, implementing lane-following behavior, developing traffic sign recognition, and connecting visual detections to the vehicle's driving decisions.",

  problem:
    "The vehicle needed to navigate a miniature roadway autonomously while responding to visual information in real time. " +
    "This required the software to reliably identify lane boundaries and traffic signs from a continuously changing camera feed, then translate those detections into appropriate navigation behavior.",

  solution:
    "We developed a computer vision pipeline using OpenCV to process live camera input and identify important features of the roadway. " +
    "Lane detection was used to determine the vehicle's position relative to the path and continuously adjust its movement to remain on course. " +
    "Traffic sign recognition allowed the vehicle to detect environmental instructions and modify its behavior accordingly. " +
    "These systems were integrated with the vehicle's navigation logic to create a real-time feedback loop between visual perception and autonomous movement.",

  features: [
    "Real-time camera processing using OpenCV",

    "Lane and line detection for autonomous path following",

    "Traffic sign recognition using computer vision",

    "Navigation logic that converts visual information into vehicle movement",

    "Real-time steering adjustments based on the vehicle's position relative to the roadway",

    "Traffic-rule behavior triggered by recognized road signs",

    "Integrated perception and navigation system for autonomous driving",

    "Collaborative development across a four-person engineering team",
  ],

  challenges: [
    "Maintaining reliable lane detection as the vehicle moved and the camera perspective changed",

    "Processing camera data quickly enough to make real-time navigation decisions",

    "Reducing false detections when identifying road markings and traffic signs",

    "Translating computer vision output into stable vehicle movement",

    "Integrating independently developed software components into a single autonomous system",

    "Testing and tuning navigation behavior within a physical environment",
  ],

  results: [
    "Developed a functional miniature autonomous vehicle capable of following a designated roadway using computer vision",

    "Implemented OpenCV-based lane detection and traffic sign recognition systems",

    "Connected real-time visual perception with autonomous navigation and vehicle behavior",

    "Strengthened my experience with computer vision, image processing, real-time software systems, and debugging",

    "Gained experience developing and integrating software as part of a four-person engineering team",
  ],

  youtubeUrl: "https://www.youtube.com/embed/pNHY8S76BCI?si=5h_6uALsItXQmY5S",

  links: [
    {
      label: "Source Code",
      url: "https://github.com/Buenexity/OpenCV-Autonomous-Car",
    },
  ],
};
