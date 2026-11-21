export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C++", "C#", "Swift", "PHP", "Luau"],
  },
  {
    title: "Frameworks",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "FastAPI",
      "Tailwind CSS",
      "OpenAI Agents SDK",
      "OpenCV",
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GCP",
      "Docker",
      "Terraform",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    title: "AI & Tools",
    skills: [
      "Claude Code",
      "Claude API",
      "OpenAI API",
      "Gemini API",
      "MCP",
      "Git",
      "Jira",
      "Playwright",
      "pytest",
      "Vitest",
      "Unity",
      "AR/VR",
    ],
  },
];
