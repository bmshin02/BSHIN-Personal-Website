import type { Project } from "../../data/projects";

import ExternalProjectLinks from "../ui/ExternalProjectLinks";
import ProjectPanel from "../ui/ProjectPanel";
import ProjectStatusBadge from "../ui/ProjectStatusBadge";
import TechnologyTags from "../ui/TechnologyTags";

type FeaturedProjectCardProps = {
  project: Project;
  onOpenProject: (project: Project) => void;
};

function FeaturedProjectCard({
  project,
  onOpenProject,
}: FeaturedProjectCardProps) {
  return (
    <ProjectPanel
      className="
        group h-full
        transition-transform duration-200
        hover:-translate-x-1
        hover:-translate-y-1
      "
      contentClassName="h-full"
    >
      <article className="flex h-full flex-col p-4 sm:p-5">
        {/* Project image */}
        <div
          className="
            relative shrink-0 overflow-hidden
            border-2 border-frame
            bg-panel
            shadow-[3px_3px_0_var(--theme-shadow)]
          "
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              className="
                aspect-video w-full object-cover
                transition-transform duration-300
                group-hover:scale-[1.03]
              "
            />
          ) : (
            <div aria-hidden="true" className="aspect-video w-full" />
          )}

          <div className="absolute right-2 top-2">
            <ProjectStatusBadge status={project.status} compact />
          </div>
        </div>

        {/* Category and date */}
        <div className="mt-4 flex min-h-6 flex-wrap items-center justify-between gap-2">
          <span
            className="
              border border-frame
              bg-panel px-2 py-1
              text-[9px] font-bold uppercase
              tracking-wide text-muted
            "
          >
            {project.category}
          </span>

          <span
            className="
              text-[10px] font-bold uppercase
              tracking-[0.14em] text-accent
            "
          >
            {project.date}
          </span>
        </div>

        {/* Project title */}
        <h3
          className="
            mt-3 min-h-[3rem]
            text-lg font-bold leading-6
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
            mt-2 min-h-[4.5rem]
            line-clamp-3
            text-sm leading-6 text-muted
          "
        >
          {project.shortDescription}
        </p>

        {/* Technologies and actions */}
        <div className="mt-auto pt-5">
          <p
            className="
              mb-2 text-[10px] font-bold
              uppercase tracking-[0.14em]
              text-muted
            "
          >
            Technologies
          </p>

          {/* Consistent space for technology tags */}
          <div className="min-h-[3.75rem]">
            <TechnologyTags technologies={project.technologies} limit={4} />
          </div>

          {/* Consistent space for one or two button rows */}
          <div
            className="
              mt-4 flex min-h-[5.25rem]
              flex-wrap content-start
              items-start gap-2
              border-t border-dashed
              border-divider/50 pt-4
            "
          >
            <button
              type="button"
              onClick={() => onOpenProject(project)}
              className="
                border-2 border-frame
                bg-accent px-3 py-2
                text-xs font-bold text-accent-text
                shadow-[2px_2px_0_var(--theme-shadow)]
                transition duration-150
                hover:-translate-x-0.5
                hover:-translate-y-0.5
                hover:bg-accent-hover
                hover:shadow-[3px_3px_0_var(--theme-shadow)]
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-accent/40
                active:translate-x-0.5
                active:translate-y-0.5
                active:shadow-none
              "
            >
              View case study →
            </button>

            <ExternalProjectLinks project={project} compact />
          </div>
        </div>
      </article>
    </ProjectPanel>
  );
}

export default FeaturedProjectCard;
