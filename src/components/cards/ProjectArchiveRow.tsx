import type { Project } from "../../data/projects";

import ExternalProjectLinks from "../ui/ExternalProjectLinks";
import ProjectPanel from "../ui/ProjectPanel";
import ProjectStatusBadge from "../ui/ProjectStatusBadge";
import WinnerBadge from "../ui/WinnerBadge";
import TechnologyTags from "../ui/TechnologyTags";

type ProjectArchiveRowProps = {
  project: Project;
  expanded: boolean;
  onToggle: (projectId: string) => void;
  onOpenProject: (project: Project) => void;
};

function ProjectArchiveRow({
  project,
  expanded,
  onToggle,
  onOpenProject,
}: ProjectArchiveRowProps) {
  const detailsId = `project-details-${project.id}`;

  return (
    <ProjectPanel
      className="
        group
        transition-transform duration-200
        hover:-translate-x-0.5
        hover:-translate-y-0.5
      "
      contentClassName="overflow-hidden"
    >
      {/* Compact row */}
      <button
        type="button"
        onClick={() => onToggle(project.id)}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="
          flex w-full cursor-pointer
          items-center gap-4
          p-4 text-left text-ink
          transition-colors duration-200
          hover:bg-panel-highlight/10
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-frame
          sm:p-5
        "
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="
              hidden h-16 w-24 shrink-0
              border-2 border-frame
              bg-panel object-cover
              shadow-[2px_2px_0_var(--theme-shadow)]
              sm:block
            "
          />
        ) : (
          <div
            aria-hidden="true"
            className="
              hidden h-16 w-24 shrink-0
              border-2 border-frame
              bg-panel
              shadow-[2px_2px_0_var(--theme-shadow)]
              sm:block
            "
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-ink transition-colors duration-200 group-hover:text-accent sm:text-lg">
              {project.title}
            </h3>

            <span className="border border-frame bg-panel px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted">
              {project.category}
            </span>

            <ProjectStatusBadge status={project.status} compact />

            {project.winner && <WinnerBadge compact />}
          </div>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
            {project.date}
          </p>

          <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted sm:text-sm">
            {project.shortDescription}
          </p>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {project.technologies.slice(0, 3).map((technology) => (
              <span
                key={technology}
                className="text-[11px] font-bold text-accent"
              >
                {technology}
              </span>
            ))}

            {project.technologies.length > 3 && (
              <span className="text-[11px] text-muted">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        <span
          aria-hidden="true"
          className={`
            flex h-8 w-8 shrink-0
            items-center justify-center
            border-2 border-frame
            bg-panel font-bold text-accent
            shadow-[2px_2px_0_var(--theme-shadow)]
            transition duration-300
            group-hover:-translate-x-0.5
            group-hover:-translate-y-0.5
            group-hover:bg-panel-highlight
            ${
              expanded
                ? "translate-x-0.5 translate-y-0.5 rotate-180 shadow-none"
                : ""
            }
          `}
        >
          ↓
        </span>
      </button>

      {/* Expandable content */}
      <div
        id={detailsId}
        className={`
          grid transition-[grid-template-rows]
          duration-500 ease-in-out
          ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden">
          <div className="border-t-2 border-dashed border-divider/50 px-4 pb-5 pt-4 sm:px-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              About this project
            </h4>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              {project.description}
            </p>

            <div className="mt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Technologies
              </p>

              <TechnologyTags technologies={project.technologies} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-dashed border-divider/50 pt-4">
              <button
                type="button"
                onClick={() => onOpenProject(project)}
                className="
                  border-2 border-frame
                  bg-accent px-3 py-1.5
                  text-xs font-bold text-accent-text
                  shadow-[2px_2px_0_var(--theme-shadow)]
                  transition duration-150
                  hover:-translate-x-0.5
                  hover:-translate-y-0.5
                  hover:bg-accent-hover
                  active:translate-x-0.5
                  active:translate-y-0.5
                  active:shadow-none
                "
              >
                Full case study →
              </button>

              <ExternalProjectLinks project={project} />
            </div>
          </div>
        </div>
      </div>
    </ProjectPanel>
  );
}

export default ProjectArchiveRow;
