import { LuArrowRight, LuCalendar } from "react-icons/lu";

import type { Project } from "../../data/projects";

import ExternalProjectLinks from "../ui/ExternalProjectLinks";
import ProjectPanel from "../ui/ProjectPanel";
import ProjectStatusBadge from "../ui/ProjectStatusBadge";
import WinnerBadge from "../ui/WinnerBadge";
import TechnologyTags from "../ui/TechnologyTags";

type FeaturedProjectCardProps = {
  project: Project;
  onOpenProject: (project: Project) => void;
};

function FeaturedProjectCard({
  project,
  onOpenProject,
}: FeaturedProjectCardProps) {
  const openProject = () => onOpenProject(project);

  return (
    <ProjectPanel
      interactive
      className="group h-full"
      contentClassName="h-full"
    >
      <article className="flex h-full flex-col p-4 sm:p-5">
        {/*
         * Project image: clicking it opens the case study. It is skipped
         * by the keyboard because the "View case study" button does the same.
         */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={openProject}
          className="
            relative block shrink-0 cursor-pointer overflow-hidden
            rounded-xl border border-frame/20
            bg-panel text-left
            shadow-soft-sm
          "
        >
          {project.image ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="
                aspect-video w-full object-cover
                transition-transform duration-500
                group-hover:scale-[1.04]
              "
            />
          ) : (
            <div className="aspect-video w-full" />
          )}

          {/* Soft shading so the badge reads on any image */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-linear-to-t from-black/30 via-transparent to-black/15
            "
          />

          {/* Hover hint */}
          <div
            className="
              pointer-events-none absolute inset-0
              flex items-center justify-center
              bg-black/35 opacity-0
              transition-opacity duration-300
              group-hover:opacity-100
            "
          >
            <span
              className="
                flex translate-y-1 items-center gap-1.5
                rounded-full bg-panel/90 px-3.5 py-1.5
                text-xs font-bold text-ink
                shadow-soft backdrop-blur-sm
                transition-transform duration-300
                group-hover:translate-y-0
              "
            >
              View case study
              <LuArrowRight className="h-3.5 w-3.5 text-accent" />
            </span>
          </div>

          <span className="absolute right-2.5 top-2.5">
            <ProjectStatusBadge status={project.status} compact />
          </span>
        </button>

        {/* Category, winner, and date */}
        <div className="mt-4 flex min-h-6 flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                rounded-full border border-frame/25
                bg-panel px-2.5 py-1
                text-[9px] font-bold uppercase
                tracking-wider text-muted
              "
            >
              {project.category}
            </span>

            {project.winner && <WinnerBadge />}
          </div>

          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted">
            <LuCalendar aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
            {project.date}
          </span>
        </div>

        {/* Project title */}
        <h3
          className="
            mt-3 line-clamp-2
            text-xl font-bold leading-7 tracking-tight
            text-ink
            transition-colors duration-200
            group-hover:text-accent
          "
        >
          {project.title}
        </h3>

        {/* Short description */}
        <p
          className="
            mt-2 md:min-h-[4.5rem]
            line-clamp-3
            text-sm leading-6 text-muted
          "
        >
          {project.shortDescription}
        </p>

        {/* Technologies and actions */}
        <div className="mt-auto pt-4">
          {/* Room for two rows of tags keeps the cards' buttons aligned */}
          <div className="md:min-h-[3.75rem]">
            <TechnologyTags technologies={project.technologies} limit={4} />
          </div>

          <div
            className="
              mt-4 flex items-center gap-2
              border-t border-divider/25 pt-4
            "
          >
            <button
              type="button"
              onClick={openProject}
              className="
                group/button
                inline-flex h-9 shrink-0 items-center gap-1.5
                whitespace-nowrap
                rounded-lg border border-frame/20
                bg-accent px-3
                text-xs font-bold text-accent-text
                shadow-soft-sm
                transition duration-150
                hover:-translate-y-0.5
                hover:bg-accent-hover
                hover:shadow-soft
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-accent/40
                active:translate-y-px
                active:shadow-soft-sm
              "
            >
              View case study
              <LuArrowRight
                aria-hidden="true"
                className="
                  h-3.5 w-3.5 transition-transform duration-200
                  group-hover/button:translate-x-0.5
                "
              />
            </button>

            <div className="ml-auto flex items-center gap-1.5">
              <ExternalProjectLinks project={project} iconOnly />
            </div>
          </div>
        </div>
      </article>
    </ProjectPanel>
  );
}

export default FeaturedProjectCard;
