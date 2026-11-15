import { education } from "../../data/education";
import Panel from "../ui/Panel";

function Education() {
  return (
    <section id="education" className="scroll-mt-16 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid grid-cols-12 gap-8">
          <Panel
            className="col-span-12 lg:col-start-3 lg:col-span-8"
            contentClassName="p-5 sm:p-6"
          >
            <header>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-accent before:h-0.5 before:w-6 before:rounded-full before:bg-accent sm:text-sm">
                Education
              </p>

              <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                Academic background
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                My academic experience in computer science and professional
                software engineering.
              </p>

              <div className="mt-4 h-px bg-linear-to-r from-accent/60 via-divider/25 to-transparent" />
            </header>
          </Panel>
        </div>

        {/* Individual education panels */}
        <div className="mt-2 space-y-2">
          {education.map((item) => (
            <div
              key={`${item.school}-${item.degree}`}
              className="grid grid-cols-12 gap-8"
            >
              <Panel
                variant="secondary"
                className="
                  col-span-12
                  transition-transform duration-200
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
                            rounded-lg border border-frame/20
                            bg-accent px-2.5 py-1
                            text-[10px] font-bold uppercase
                            tracking-wide text-accent-text
                            shadow-soft-sm
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
                <div className="mt-4 border-t border-divider/20 pt-4">
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
                            mt-2 h-2 w-2 rounded-full shrink-0
                            bg-accent
                            shadow-soft-sm
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
                          rounded-lg border border-frame/20
                          bg-panel px-2.5 py-1
                          text-[11px] font-bold text-ink
                          tag-pop
                          shadow-soft-sm
                          hover:bg-panel-highlight
                          hover:text-accent
                        "
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
