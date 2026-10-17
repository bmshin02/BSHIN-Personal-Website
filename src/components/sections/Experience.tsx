import { useState } from "react";
import { experiences } from "../../data/experiences";
import PixelPanel from "../ui/PixelPanel";

function Experience() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const toggleJob = (index: number) => {
    setExpandedJob((currentIndex) => {
      return currentIndex === index ? null : index;
    });
  };

  return (
    <section id="experience" className="scroll-mt-16 px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid grid-cols-12 gap-8">
          <PixelPanel
            className="col-span-12 lg:col-start-3 lg:col-span-8"
            contentClassName="p-5 sm:p-6"
          >
            <header>
              <p
                className="
                  text-xs font-bold uppercase
                  tracking-[0.25em] text-accent
                "
              >
                Experience
              </p>

              <h2
                className="
                  mt-2 text-2xl font-bold text-ink
                  sm:text-3xl
                "
              >
                Work experience
              </h2>

              <p
                className="
                  mt-3 max-w-2xl
                  text-sm leading-6 text-muted
                  sm:text-base
                "
              >
                Roles where I have developed software, created interactive
                experiences, and helped others learn technology.
              </p>
            </header>
          </PixelPanel>
        </div>

        {/* Experience timeline */}
        <div className="mt-4 space-y-4">
          {experiences.map((experience, index) => {
            const isExpanded = expandedJob === index;
            const isLast = index === experiences.length - 1;
            const detailsId = `experience-details-${index}`;

            return (
              <article
                key={`${experience.company}-${experience.role}`}
                className="grid grid-cols-12 gap-8"
              >
                {/* Desktop date and location */}
                <div
                  className="
                    hidden pt-4 pr-4 text-right
                    lg:col-span-2 lg:block
                  "
                >
                  <p className="text-xs font-bold text-panel-highlight">
                    {experience.date}
                  </p>

                  <p
                    className="
                      mt-1 text-xs leading-4
                      text-panel-highlight/70
                    "
                  >
                    {experience.location}
                  </p>
                </div>

                {/* Timeline and card */}
                <div
                  className="
                    relative col-span-12 pl-9
                    lg:col-start-3 lg:col-span-8 lg:pl-0
                  "
                >
                  {/* Timeline line */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none absolute
                        -bottom-11 left-2 top-7
                        border-l-2 border-dashed border-accent
                        lg:-left-6
                      "
                    />
                  )}

                  {/* Timeline marker */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      left-2 top-7 z-20
                      flex h-5 w-5 -translate-x-1/2
                      items-center justify-center
                      border-2 border-panel-highlight
                      bg-accent
                      shadow-[2px_2px_0_var(--theme-shadow)]
                      lg:-left-6
                    "
                  >
                    <span className="h-1.5 w-1.5 bg-accent-text" />
                  </div>

                  {/* Timeline connector */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute
                      left-2 top-[36px] z-0
                      w-7 border-t-2 border-dashed border-accent
                      lg:-left-6
                    "
                  />

                  <PixelPanel
                    variant="secondary"
                    shadowSize={4}
                    className="
                      transition-transform duration-200
                      hover:-translate-x-0.5
                      hover:-translate-y-0.5
                    "
                    contentClassName="overflow-hidden"
                  >
                    {/* Collapsed job summary */}
                    <button
                      type="button"
                      onClick={() => toggleJob(index)}
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      className="
                        w-full cursor-pointer p-4 text-left
                        text-ink outline-none
                        focus-visible:ring-4
                        focus-visible:ring-inset
                        focus-visible:ring-accent
                        sm:p-5
                      "
                    >
                      {/* Mobile date and location */}
                      <div
                        className="
                          mb-3 flex flex-wrap
                          gap-x-3 gap-y-1
                          lg:hidden
                        "
                      >
                        <p className="text-xs font-bold text-ink">
                          {experience.date}
                        </p>

                        <p className="text-xs text-muted">
                          {experience.location}
                        </p>
                      </div>

                      {/* Role, company, and expand button */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3
                            className="
                              text-lg font-bold leading-6
                              text-ink
                            "
                          >
                            {experience.role}
                          </h3>

                          <p className="mt-0.5 text-sm font-bold text-accent">
                            {experience.company}
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`
                            flex h-8 w-8 shrink-0
                            items-center justify-center
                            border-2 border-frame
                            bg-panel text-sm font-bold text-accent
                            shadow-[2px_2px_0_var(--theme-shadow)]
                            transition duration-300
                            ${
                              isExpanded
                                ? "translate-x-0.5 translate-y-0.5 rotate-180 shadow-none"
                                : ""
                            }
                          `}
                        >
                          ↓
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-muted">
                        {experience.description}
                      </p>

                      {/* Technology tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {experience.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="
                              border border-frame
                              bg-panel px-2 py-1
                              text-[10px] font-bold text-ink
                              shadow-[1px_1px_0_var(--theme-shadow)]
                            "
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      <p
                        className="
                          mt-4 text-[10px] font-bold uppercase
                          tracking-[0.15em] text-accent
                        "
                      >
                        {isExpanded ? "Hide details" : "View details"}
                      </p>
                    </button>

                    {/* Expandable details */}
                    <div
                      id={detailsId}
                      className={`
                        grid transition-[grid-template-rows]
                        duration-500 ease-in-out
                        ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                      `}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="
                            border-t-2 border-dashed
                            border-divider/50
                            px-4 pb-5 pt-4
                            sm:px-5
                          "
                        >
                          {/* Responsibilities */}
                          <h4
                            className="
                              text-xs font-bold uppercase
                              tracking-[0.18em] text-ink
                            "
                          >
                            Highlights
                          </h4>

                          <ul className="mt-3 space-y-2">
                            {experience.responsibilities.map(
                              (responsibility) => (
                                <li
                                  key={responsibility}
                                  className="
                                    flex gap-2
                                    text-sm leading-6 text-muted
                                  "
                                >
                                  <span
                                    aria-hidden="true"
                                    className="
                                      mt-2.5 h-1.5 w-1.5
                                      shrink-0 bg-accent
                                      shadow-[1px_1px_0_var(--theme-shadow)]
                                    "
                                  />

                                  <span>{responsibility}</span>
                                </li>
                              ),
                            )}
                          </ul>

                          {/* Photos */}
                          {experience.photos.length > 0 && (
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                              {experience.photos.map((photo, photoIndex) => (
                                <img
                                  key={photo}
                                  src={photo}
                                  alt={`${experience.company} work sample ${
                                    photoIndex + 1
                                  }`}
                                  loading="lazy"
                                  className="
                                      aspect-video w-full object-cover
                                      border-2 border-frame
                                      bg-panel
                                      shadow-[3px_3px_0_var(--theme-shadow)]
                                    "
                                />
                              ))}
                            </div>
                          )}

                          {/* Video */}
                          {experience.video && (
                            <video
                              controls
                              preload="metadata"
                              className="
                                mt-4 aspect-video w-full
                                border-2 border-frame
                                bg-frame
                                shadow-[3px_3px_0_var(--theme-shadow)]
                              "
                            >
                              <source src={experience.video} type="video/mp4" />
                              Your browser does not support video playback.
                            </video>
                          )}

                          {/* External links */}
                          {experience.links.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {experience.links.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="
                                    border-2 border-frame
                                    bg-accent px-3 py-1.5
                                    text-xs font-bold text-accent-text
                                    shadow-[3px_3px_0_var(--theme-shadow)]
                                    transition duration-150
                                    hover:-translate-x-0.5
                                    hover:-translate-y-0.5
                                    hover:bg-accent-hover
                                    active:translate-x-0.5
                                    active:translate-y-0.5
                                    active:shadow-none
                                  "
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}

                          {/* Empty sample message */}
                          {experience.photos.length === 0 &&
                            !experience.video &&
                            experience.links.length === 0 && (
                              <p className="mt-4 text-sm text-muted">
                                Work samples will be added soon.
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </PixelPanel>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
