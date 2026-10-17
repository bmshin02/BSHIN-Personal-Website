export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "C#", "C++", "Java", "PHP", "SQL", "Luau"],
  },
  {
    title: "Web & Backend",
    skills: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "PostgreSQL",
    ],
  },
  {
    title: "Game & Interactive",
    skills: [
      "Unity",
      "Roblox Studio",
      "AR",
      "VR",
      "iOS",
      "Game Systems",
      "UI Development",
    ],
  },
  {
    title: "Tools, Data & Media",
    skills: [
      "GitHub",
      "Jira",
      "VS Code",
      "OpenCV",
      "Cloudflare Pages",
      "Vercel",
      "Render",
    ],
  },
];
