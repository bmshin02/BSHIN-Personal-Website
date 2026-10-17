import type { Project } from "../../data/projects";

type ExternalProjectLinksProps = {
  project: Project;
  compact?: boolean;
};

function ExternalProjectLinks({
  project,
  compact = false,
}: ExternalProjectLinksProps) {
  if (project.links.length === 0) {
    return null;
  }

  return (
    <>
      {project.links.map((link) => (
        <a
          key={`${project.id}-${link.label}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            border-2 border-frame
            bg-panel font-bold text-ink
            shadow-[2px_2px_0_var(--theme-shadow)]
            transition duration-150
            hover:-translate-x-0.5
            hover:-translate-y-0.5
            hover:bg-panel-highlight
            hover:text-accent
            active:translate-x-0.5
            active:translate-y-0.5
            active:shadow-none
            ${compact ? "px-2.5 py-1.5 text-[11px]" : "px-3 py-1.5 text-xs"}
          `}
        >
          {link.label} ↗
        </a>
      ))}
    </>
  );
}

export default ExternalProjectLinks;
