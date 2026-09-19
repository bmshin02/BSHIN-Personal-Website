import PixelPanel from "../ui/pixelpanel";

type SkillGroup = {
  title: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
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

function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid grid-cols-12 gap-8">
          <PixelPanel
            className="col-span-12 lg:col-start-3 lg:col-span-8"
            contentClassName="p-5 sm:p-6"
          >
            <header>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent sm:text-sm">
                Skills
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                Technologies &amp; tools
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                Technologies I have used to build web applications, games,
                interactive experiences, and software tools.
              </p>

              <div className="mt-4 border-t-2 border-dashed border-divider/50" />
            </header>
          </PixelPanel>
        </div>

        {/* Compact skill groups */}
        <div className="ml-2 mt-6 grid grid-cols-12 gap-8">
          <div
            className="
              col-span-12 grid gap-4
              md:grid-cols-2
              lg:col-start-3 lg:col-span-8
            "
          >
            {skillGroups.map((group) => (
              <PixelPanel
                key={group.title}
                variant="secondary"
                shadowSize={0}
                className="
                  transition-transform duration-200
                  hover:-translate-x-0.5
                  hover:-translate-y-0.5
                "
                contentClassName="p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="
                      h-3 w-3 shrink-0
                      border border-frame
                      bg-accent
                      shadow-[2px_2px_0_var(--theme-shadow)]
                    "
                  />

                  <h3 className="text-base font-bold text-ink sm:text-lg">
                    {group.title}
                  </h3>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        border border-frame
                        bg-panel px-2 py-1
                        text-[10px] font-bold text-ink
                        shadow-[1px_1px_0_var(--theme-shadow)]
                        transition duration-150
                        hover:-translate-x-0.5
                        hover:-translate-y-0.5
                        hover:bg-panel-highlight
                        hover:text-accent
                        sm:text-[11px]
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </PixelPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
