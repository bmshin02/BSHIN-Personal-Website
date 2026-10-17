import type { CSSProperties, ReactNode } from "react";

type PixelPanelProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "primary" | "secondary";
  shadowSize?: number;
};

const pixelShape = `
  polygon(
    12px 0,
    calc(100% - 12px) 0,
    calc(100% - 12px) 4px,
    calc(100% - 4px) 4px,
    calc(100% - 4px) 12px,
    100% 12px,

    100% calc(100% - 12px),
    calc(100% - 4px) calc(100% - 12px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 12px) calc(100% - 4px),
    calc(100% - 12px) 100%,

    12px 100%,
    12px calc(100% - 4px),
    4px calc(100% - 4px),
    4px calc(100% - 12px),
    0 calc(100% - 12px),

    0 12px,
    4px 12px,
    4px 4px,
    12px 4px
  )
`;

function PixelPanel({
  children,
  className = "",
  contentClassName = "",
  variant = "primary",
  shadowSize = 8,
}: PixelPanelProps) {
  const backgroundClass =
    variant === "primary" ? "bg-panel" : "bg-panel-secondary";

  const safeShadowSize = Math.max(0, shadowSize);
  const edgeOffset = Math.round(safeShadowSize * 0.5);
  const hasShadow = safeShadowSize > 0;

  const deepShadowStyle = {
    clipPath: pixelShape,
    transform: `translate(
      ${safeShadowSize}px,
      ${safeShadowSize}px
    )`,
  } satisfies CSSProperties;

  const edgeStyle = {
    clipPath: pixelShape,
    transform: `translate(
      ${edgeOffset}px,
      ${edgeOffset}px
    )`,
  } satisfies CSSProperties;

  const frontPanelStyle = {
    clipPath: pixelShape,
  } satisfies CSSProperties;

  return (
    <div
      className={`
        relative isolate
        overflow-visible
        text-ink
        ${className}
      `}
    >
      {/* Deep shadow */}
      {hasShadow && (
        <div
          aria-hidden
          style={deepShadowStyle}
          className="
            pointer-events-none absolute inset-0 z-0
            bg-[var(--theme-panel-shadow)]
          "
        />
      )}
      {/* Middle 3D edge */}
      {hasShadow && (
        <div
          aria-hidden="true"
          style={edgeStyle}
          className="
            pointer-events-none
            absolute inset-0 z-10
            bg-edge
          "
        />
      )}

      {/* Front pixel border */}
      <div
        aria-hidden="true"
        style={frontPanelStyle}
        className="
          pointer-events-none
          absolute inset-0 z-20
          bg-frame p-[3px]
        "
      >
        <div
          style={{ clipPath: pixelShape }}
          className={`h-full w-full ${backgroundClass}`}
        />
      </div>

      {/* Top highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-5 right-5 top-1 z-30
          h-1 bg-panel-highlight/70
        "
      />

      {/* Bottom inner shading */}
      {hasShadow && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute bottom-1 left-5 right-5 z-30
            h-1 bg-edge/35
          "
        />
      )}

      {/* Panel content */}
      <div className={`relative z-40 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default PixelPanel;
