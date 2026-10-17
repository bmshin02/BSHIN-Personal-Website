import type { ProjectStatus } from "../../data/projects";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
  compact?: boolean;
};

function ProjectStatusBadge({
  status,
  compact = false,
}: ProjectStatusBadgeProps) {
  const isCompleted = status === "completed";

  return (
    <span
      className={`
        border font-bold uppercase tracking-wide
        ${compact ? "px-2 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]"}
        ${
          isCompleted
            ? "border-emerald-950 bg-emerald-700 text-emerald-50"
            : "border-amber-950 bg-amber-400 text-amber-950"
        }
      `}
    >
      {isCompleted ? "Completed" : "In progress"}
    </span>
  );
}

export default ProjectStatusBadge;
