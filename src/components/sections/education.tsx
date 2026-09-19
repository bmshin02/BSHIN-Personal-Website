import PixelPanel from "../ui/pixelpanel";

type EducationItem = {
  school: string;
  degree: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  coursework: string[];
  status?: string;
};

const education: EducationItem[] = [
  {
    school: "University of California, Irvine",
    degree: "Master of Software Engineering",
    date: "2026 – Expected 2027",
    location: "Irvine, California",
    status: "Current Student",
    description:
      "Graduate program focused on professional software development, team-based engineering, software architecture, testing, and large-scale application development.",
    highlights: [
      "Recipient of a $20,000 student fellowship.",
      "Participating in a studio-based curriculum centered on collaborative software development.",
      "Preparing for a Summer 2027 internship involving the design and delivery of a production-level software system.",
    ],
    coursework: ["Software Engineering", "AI"],
  },
  {
    school: "University of California, Riverside",
    degree: "Bachelor of Science in Computer Science",
    date: "Graduated 2025",
    location: "Riverside, California",
    description:
      "Completed a computer science degree with experience in software engineering, algorithms, databases, computer vision, web development, and interactive application development.",
    highlights: [
      "Developed educational augmented and virtual reality applications through the XCITE Center.",
      "Completed an autonomous vehicle senior project using OpenCV.",
      "Built projects involving web development, game development, and computer vision.",
    ],
    coursework: [
      "Data Structures",
      "Databases",
      "Data Analysis",
      "AI",
      "NLP",
      "Machine Learning",
      "Operating Systems",
      "Cyber Security",
      "Embedded Systems",
      "Software Engineering",
    ],
  },
];

function Education() {
  return (
    <section id="education" className="scroll-mt-16 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid grid-cols-12 gap-8">
          <PixelPanel
            className="col-span-12 lg:col-start-3 lg:col-span-8"
            contentClassName="p-5 sm:p-6"
          >
            <header>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent sm:text-sm">
                Education
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                Academic background
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                My academic experience in computer science and professional
                software engineering.
              </p>

              <div className="mt-4 border-t-2 border-dashed border-divider/50" />
            </header>
          </PixelPanel>
        </div>

        {/* Individual education panels */}
        <div className="mt-2 space-y-2">
          {education.map((item) => (
            <div
              key={`${item.school}-${item.degree}`}
              className="grid grid-cols-12 gap-8"
            >
              <PixelPanel
                variant="secondary"
                className="
                  col-span-12
                  transition-transform duration-200
                  hover:-translate-x-0.5
                  hover:-translate-y-0.5
                  lg:col-start-3 lg:col-span-8
                "
                contentClassName="p-5 sm:p-6"
              >
                {/* Degree, school, date, and location */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-ink sm:text-xl">
                        {item.degree}
                      </h3>

                      {item.status && (
                        <span
                          className="
                            border-2 border-frame
                            bg-accent px-2.5 py-1
                            text-[10px] font-bold uppercase
                            tracking-wide text-accent-text
                            shadow-[2px_2px_0_var(--theme-shadow)]
                          "
                        >
                          {item.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 font-bold text-accent">{item.school}</p>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <p className="text-sm font-bold text-ink">{item.date}</p>

                    <p className="mt-0.5 text-sm text-muted">{item.location}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-muted sm:text-base">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 border-t-2 border-dashed border-divider/40 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                    Highlights
                  </h4>

                  <ul className="mt-2 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-6 text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="
                            mt-2 h-2 w-2 shrink-0
                            bg-accent
                            shadow-[2px_2px_0_var(--theme-shadow)]
                          "
                        />

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coursework */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                    Coursework
                  </h4>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span
                        key={course}
                        className="
                          border-2 border-frame
                          bg-panel px-2.5 py-1
                          text-[11px] font-bold text-ink
                          shadow-[2px_2px_0_var(--theme-shadow)]
                          transition duration-150
                          hover:-translate-x-0.5
                          hover:-translate-y-0.5
                          hover:bg-panel-highlight
                          hover:text-accent
                        "
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </PixelPanel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
