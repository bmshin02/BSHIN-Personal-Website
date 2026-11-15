import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "primary" | "secondary";
  /* 0 removes the shadow; any other value keeps the soft card shadow. */
  shadowSize?: number;
  /* Clickable cards lift and glow on hover. */
  interactive?: boolean;
};

/*
 * Soft card: rounded corners, a thin border, a warm corner glow,
 * an accent edge highlight and a soft shadow tinted by the theme.
 */
function Panel({
  children,
  className = "",
  contentClassName = "",
  variant = "primary",
  shadowSize = 8,
  interactive = false,
}: PanelProps) {
  const backgroundClass =
    variant === "primary" ? "bg-panel" : "bg-panel-secondary";

  const shadowClass = shadowSize > 0 ? "shadow-card" : "";

  const interactiveClass = interactive
    ? "hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
    : "";

  return (
    <div
      data-card
      className={`
        group/card relative isolate
        rounded-2xl border border-frame/15
        transition-[translate,border-color,box-shadow] duration-200
        ${backgroundClass} ${shadowClass} ${interactiveClass}
        text-ink
        ${className}
      `}
    >
      {/* Warm corner glow */}
      <div
        aria-hidden="true"
        className={`
          card-glow pointer-events-none absolute inset-0 rounded-2xl
          transition-opacity duration-300
          ${interactive ? "opacity-70 group-hover/card:opacity-100" : ""}
        `}
      />

      {/* Top highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          shadow-[inset_0_1px_0_var(--theme-panel-highlight)]
          opacity-70
        "
      />

      {/* Accent edge */}
      <div
        aria-hidden="true"
        className="
          card-edge pointer-events-none absolute
          -top-px left-8 right-8 h-0.5
          rounded-full
        "
      />

      <div className={`relative ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default Panel;
