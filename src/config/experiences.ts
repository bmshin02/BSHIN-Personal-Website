export type ExperienceLink = {
  label: string;
  url: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  photos: string[];
  video: string;
  links: ExperienceLink[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Tatum Games",
    role: "Software Development Intern",
    date: "Jul 2026 – Sept 2026",
    location: "Remote",
    description:
      "Contributed to the MIKROS ecosystem through web development, technical documentation, research, and platform integration.",
    responsibilities: [
      "Developed and updated PHP and CodeIgniter documentation pages.",
      "Worked with Git, GitHub, APIs, databases, and local XAMPP environments.",
      "Created technical documentation for MIKROS' ecosystem",
      "Used Jira to effectively plan and execute tasks in a team setting",
    ],
    technologies: ["Frontend", "Jira", "CodeIgniter", "Git", "JavaScript"],
    photos: ["/images/experience/tatumgames/tatumgamesweb.png"],
    video: "",
    links: [
      {
        label: "Visit Tatum Games",
        url: "https://tatumgames.com",
      },
    ],
  },
  {
    company: "Black Rocket Productions",
    role: "Technology Instructor",
    date: "Mar 2026 - May 2026",
    location: "Santa Clarita, California",
    description:
      "Taught students programming, game development, and creative technology through hands-on projects.",
    responsibilities: [
      "Guided students through programming and game-development activities.",
      "Helped students troubleshoot technical and design problems.",
      "Maintained an approachable and collaborative learning environment.",
    ],
    technologies: ["Teaching", "Game Development", "Programming"],
    photos: [
      "/images/experience/blackrocket/blackrocketweb.png",
      "/images/experience/blackrocket/blackrocketlogo.jpg",
    ],

    video: "",
    links: [
      {
        label: "Visit Black Rocket",
        url: "https://blackrocket.com/",
      },
    ],
  },
  {
    company: "UC Riverside XCITE Center",
    role: "Undergraduate Software Developer / Learning Assistent",
    date: "2023 - 2025",
    location: "Riverside, California",
    description:
      "Designed and developed educational AR and VR applications used to teach chemistry, computer science, and theater concepts.",
    responsibilities: [
      "Collaborated with UCR faculty to develop academic software and interactive learning tools supporting undergraduate education.",
      "Partnered with XCITE Executive Director Dr. Richard Edwards as a Learning Assistant to design a specialized course integrating theatrical concepts into VR experiences for 16 students.",
      "Led Unity and programming workshops for students participating in XCITE summer camps.",
    ],
    technologies: ["Unity", "C#", "AR", "VR", "iOS"],
    photos: [
      "/images/experience/xcite/unityclass.jpg",
      "/images/experience/xcite/classroom.jpg",
      "/images/experience/xcite/vrphoto.png",
      "/images/experience/xcite/labphoto.jpg",
    ],
    video: "/videos/experience/xcite/demo2.mov",
    links: [
      {
        label: "Visit XCITE",
        url: "https://teaching.ucr.edu/",
      },
    ],
  },
  {
    company: "Content Creator / Freelancer",
    role: "Profile Graphics Designer",
    date: "2019 - 2021",
    location: "Remote",
    description:
      "Founded and managed a freelance design business creating custom profile designs, producing educational content, and coordinating client commissions.",
    responsibilities: [
      "Completed over 400 commissions for over 300 clients, transforming their ideas and preferences into personalized visual layouts.",
      'Built and managed a YouTube channel "Zelocity,"  with over 4,000 subscribers, publishing tutorials that supported other creators, promoted design services, and attracted commission clients.',
      "Led a small design team by assigning commissions, reviewing completed work, providing feedback, and coordinating deadlines to maintain consistent quality.",
    ],
    technologies: [
      "Graphic Design",
      "Photoshop",
      "After Effects",
      "Premiere Pro",
      "Client Management",
      "Business",
    ],
    photos: [
      "/images/experience/steam-design/SteamArt1.jpg",
      "/images/experience/steam-design/SteamArt2.jpg",
    ],
    video: "",
    links: [
      {
        label: "View portfolio",
        url: "https://www.deviantart.com/zel0city",
      },
    ],
  },
];
