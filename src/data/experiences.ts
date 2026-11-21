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
  /* Other roles held at the same place, each shown under its own heading. */
  otherRoles?: { role: string; responsibilities: string[] }[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Beyond3",
    role: "Software Engineer",
    date: "Oct 2026 – Present",
    location: "Irvine, California",
    description:
      "Building full-stack features and AI agents for a startup that rates 2,500+ defense companies.",
    responsibilities: [
      "Shipped 95 pull requests in under six weeks across AI features, the web app, data, testing, and security.",
      "Built the AI assistant on every page and the MCP server behind it (about 60 data tools); moving it to OpenAI's Agents SDK and adding reusable skills raised correct answers from 23 to 28 of 41.",
      "Compared two agent designs and shipped the one that routed 88% of questions correctly, up from 40%, and stopped the AI from stating made-up numbers as facts.",
      "Fixed 30+ user-facing bugs and a security bug that exposed one government office's private lists to another, rebuilt messaging as a Slack-style workspace, and made search 2.4x faster.",
      "Built an admin dashboard of user journeys and AI costs, and fixed search and filters to support onboarding 23,000 companies.",
      "Stepped up as project manager, running Jira standups and sprints and turning government users' feedback into features.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "OpenAI Agents SDK",
      "MCP",
      "GitHub Actions",
      "Claude Code",
      "Playwright",
      "Jira",
    ],
    photos: [],
    video: "",
    links: [],
  },
  {
    company: "Tatum Tech",
    role: "Software Engineer Intern",
    date: "Jul 2026 – Sep 2026",
    location: "Remote",
    description:
      "Built web features for MIKROS, Tatum Tech's analytics platform for indie game developers, and led its five-person PHP web team.",
    responsibilities: [
      "Led a five-person PHP web team, running 6 Jira sprints and writing about 20 tickets with clear requirements.",
      "Reviewed teammates' pull requests on GitHub and fixed front-end bugs on the company website.",
      "Built MIKROS documentation pages and researched the analytics indie game developers need most.",
    ],
    technologies: ["PHP", "CodeIgniter", "JavaScript", "XAMPP", "Jira", "Git", "GitHub"],
    photos: ["/images/experience/tatumgames/tatumgamesweb.webp"],
    video: "",
    links: [
      {
        label: "Visit Tatum Tech",
        url: "https://tatumgames.com",
      },
    ],
  },
  {
    company: "Black Rocket Productions",
    role: "Technology Instructor",
    date: "Mar 2026 – May 2026",
    location: "Santa Clarita, California",
    description:
      "Taught coding, game design, and creative technology to elementary students through hands-on projects.",
    responsibilities: [
      "Taught coding, game design, and creative technology to 60 elementary students through hands-on projects.",
      "Helped students build and debug their projects, solving technical and design problems.",
    ],
    technologies: ["Teaching", "Game Development", "Programming"],
    photos: [
      "/images/experience/blackrocket/blackrocketweb.webp",
      "/images/experience/blackrocket/blackrocketlogo.webp",
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
    company: "XCITE, UC Riverside",
    role: "Undergraduate Software Engineer",
    date: "Apr 2023 – Jun 2025",
    location: "Riverside, California",
    description:
      "Built educational AR and VR apps in Unity for UC Riverside classes in computer science, chemistry, and theatre, and taught Unity as a learning assistant and camp instructor.",
    responsibilities: [
      "Built three AR/VR apps in Unity and C# with professors in CS, chemistry, and theatre, leading a four-person team for two years.",
      "Co-led coding on Cypher Code, an encryption AR app demoed to 100+ students, and programmed ChemEQ, a chemistry simulation 50+ students used in class.",
      "Shipped the apps to iPhones and iPads through Xcode and TestFlight.",
    ],
    otherRoles: [
      {
        role: "Learning Assistant",
        responsibilities: [
          "Co-designed a Unity and VR theatre course for 16 students with XCITE's Executive Director.",
          "Built a dialogue-timed story system and scene triggers so students with no coding background could build their own VR scenes.",
        ],
      },
      {
        role: "Instructor",
        responsibilities: [
          "Led Unity and C# workshops for 60+ high schoolers at two XCITE STEM summer camps.",
          "Released a mobile game demo with two teammates for hands-on camp activities.",
        ],
      },
    ],
    technologies: ["Unity", "C#", "AR", "VR", "iOS", "Xcode", "TestFlight", "Git"],
    photos: [
      "/images/experience/xcite/unityclass.webp",
      "/images/experience/xcite/classroom.webp",
      "/images/experience/xcite/vrphoto.webp",
      "/images/experience/xcite/labphoto.webp",
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
    date: "Jan 2019 – Jan 2021",
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
      "/images/experience/steam-design/SteamArt1.webp",
      "/images/experience/steam-design/SteamArt2.webp",
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
