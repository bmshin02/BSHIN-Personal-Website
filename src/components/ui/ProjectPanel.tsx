import type { CSSProperties, ReactNode } from "react";

type ProjectPanelProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  expanded?: boolean;
  shadowSize?: number;
};

const projectPixelShape = `
  polygon(
    8px 0,
    calc(100% - 8px) 0,

    calc(100% - 8px) 2px,
    calc(100% - 2px) 2px,

    calc(100% - 2px) 8px,
    100% 8px,

    100% calc(100% - 8px),
    calc(100% - 2px) calc(100% - 8px),

    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 8px) calc(100% - 2px),

    calc(100% - 8px) 100%,
    8px 100%,

    8px calc(100% - 2px),
    2px calc(100% - 2px),

    2px calc(100% - 8px),
    0 calc(100% - 8px),

    0 8px,
    2px 8px,

    2px 2px,
    8px 2px
  )
`;

function ProjectPanel({
  children,
  className = "",
  contentClassName = "",
  expanded = false,
  shadowSize = 5,
}: ProjectPanelProps) {
  const panelStyle = {
    clipPath: projectPixelShape,
    filter: `
      drop-shadow(
        ${shadowSize}px
        ${shadowSize}px
        0
        var(--theme-shadow)
      )
    `,
  } satisfies CSSProperties;

  return (
    <div
      className={`
        relative isolate overflow-visible
        text-ink
        ${className}
      `}
    >
      {/* Pixel border, background, and shadow */}
      <div
        aria-hidden="true"
        style={panelStyle}
        className={`
          pointer-events-none
          absolute inset-0 z-0
          p-[2px]
          ${expanded ? "bg-accent" : "bg-frame"}
        `}
      >
        <div
          style={{ clipPath: projectPixelShape }}
          className="h-full w-full bg-panel-secondary"
        />
      </div>

      {/* Top highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-3 right-3 top-0.5 z-10
          h-0.5 bg-panel-highlight/70
        "
      />

      {/* Bottom shading */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0.5 left-3 right-3 z-10
          h-0.5 bg-shadow/40
        "
      />

      <div className={`relative z-20 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default ProjectPanel;
