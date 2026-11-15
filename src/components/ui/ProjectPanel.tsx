import type { ReactNode } from "react";

type ProjectPanelProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  /* An open project row gets an accent border. */
  expanded?: boolean;
  /* 0 removes the shadow; any other value keeps the soft shadow. */
  shadowSize?: number;
  /* Clickable cards lift and glow on hover. */
  interactive?: boolean;
};

/*
 * Soft card for project cards and archive rows: rounded corners,
 * a thin border, a warm corner glow, an accent edge highlight
 * and a soft shadow tinted by the active theme.
 */
function ProjectPanel({
  children,
  className = "",
  contentClassName = "",
  expanded = false,
  shadowSize = 5,
  interactive = false,
}: ProjectPanelProps) {
  const interactiveClass = interactive
    ? "hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
    : "";

  return (
    <div
      data-card
      className={`
        group/card relative isolate
        rounded-xl border bg-panel-secondary
        transition-[translate,border-color,box-shadow] duration-200
        ${expanded ? "border-accent/60" : "border-frame/15"}
        ${shadowSize > 0 ? "shadow-soft" : ""}
        ${interactiveClass}
        text-ink
        ${className}
      `}
    >
      {/* Warm corner glow */}
      <div
        aria-hidden="true"
        className={`
          card-glow pointer-events-none absolute inset-0 rounded-xl
          transition-opacity duration-300
          ${expanded ? "opacity-100" : "opacity-70 group-hover/card:opacity-100"}
        `}
      />

      {/* Top highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-xl
          shadow-[inset_0_1px_0_var(--theme-panel-highlight)]
          opacity-70
        "
      />

      {/* Accent edge */}
      <div
        aria-hidden="true"
        className="
          card-edge pointer-events-none absolute
          -top-px left-6 right-6 h-0.5
          rounded-full
        "
      />

      <div className={`relative ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default ProjectPanel;
