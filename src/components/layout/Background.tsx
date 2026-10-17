import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";

export interface BackgroundProps {
  className?: string;
  children?: ReactNode;

  dotSize?: number;
  gap?: number;

  baseColor?: string;
  glowColor?: string;

  proximity?: number;
  glowIntensity?: number;

  waveSpeed?: number;
  driftAmount?: number;
  driftSpeed?: number;

  scrollParallax?: number;

  twinkleChance?: number;
  twinkleAmount?: number;
  twinkleSpeed?: number;

  showConnections?: boolean;
  connectionRadius?: number;
  connectionOpacity?: number;
}

type RGB = {
  r: number;
  g: number;
  b: number;
};

type CanvasSize = {
  width: number;
  height: number;
};

type RenderedDot = {
  column: number;
  row: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  red: number;
  green: number;
  blue: number;
  glow: number;
};

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
}

/*
 * Returns a consistent random-looking number.
 *
 * The same grid location and seed always return the same
 * result, which prevents dots from changing randomly while
 * scrolling.
 */
function seededRandom(column: number, row: number, seed: number) {
  const value =
    Math.sin(column * 12.9898 + row * 78.233 + seed * 37.719) * 43758.5453;

  return value - Math.floor(value);
}

function getDotKey(column: number, row: number) {
  return `${column}:${row}`;
}

function Background({
  className = "",
  children,

  dotSize = 2,
  gap = 24,

  baseColor = "#404040",
  glowColor = "#8b5cf6",

  proximity = 120,
  glowIntensity = 1,

  waveSpeed = 0.5,
  driftAmount = 2.5,
  driftSpeed = 1,

  /*
   * A positive value moves the dots upward when
   * the page scrolls downward.
   */
  scrollParallax = 0.08,

  /*
   * Only a small percentage of dots twinkle.
   */
  twinkleChance = 0.06,
  twinkleAmount = 0.5,
  twinkleSpeed = 1,

  /*
   * Connections appear only around the mouse.
   */
  showConnections = true,
  connectionRadius = 160,
  connectionOpacity = 0.12,
}: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasSizeRef = useRef<CanvasSize>({
    width: 0,
    height: 0,
  });

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
  });

  const scrollRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const baseRgb = useMemo(() => {
    return hexToRgb(baseColor);
  }, [baseColor]);

  const glowRgb = useMemo(() => {
    return hexToRgb(glowColor);
  }, [glowColor]);

  const buildCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext("2d");

    if (context) {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    canvasSizeRef.current = {
      width: rect.width,
      height: rect.height,
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const { width, height } = canvasSizeRef.current;

    if (width === 0 || height === 0) {
      return;
    }

    context.clearRect(0, 0, width, height);

    startTimeRef.current ??= performance.now();

    const elapsedSeconds = (performance.now() - startTimeRef.current) / 1000;

    const cellSize = dotSize + gap;
    const waveTime = elapsedSeconds * waveSpeed;

    /*
     * Positive scrollParallax means the dots move upward
     * while the page moves downward.
     */
    const scrollDistance = scrollRef.current * scrollParallax;

    const horizontalOffset = (width % cellSize) / 2;

    const verticalOffset = (height % cellSize) / 2;

    const overscan = Math.max(2, Math.ceil(driftAmount / cellSize) + 2);

    /*
     * Calculate which permanent world rows are currently
     * visible. This keeps scrolling smooth and avoids
     * overlapping duplicate dots.
     */
    const firstRow =
      Math.floor((scrollDistance - verticalOffset) / cellSize) - overscan;

    const lastRow =
      Math.ceil((scrollDistance + height - verticalOffset) / cellSize) +
      overscan;

    const firstColumn = Math.floor(-horizontalOffset / cellSize) - overscan;

    const lastColumn =
      Math.ceil((width - horizontalOffset) / cellSize) + overscan;

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const proximitySquared = proximity * proximity;

    const renderedDots: RenderedDot[] = [];
    const dotLookup = new Map<string, RenderedDot>();

    /*
     * Calculate every visible dot first.
     *
     * Lines are drawn after this step but before the dots,
     * so the dots remain visually on top.
     */
    for (let row = firstRow; row <= lastRow; row += 1) {
      for (let column = firstColumn; column <= lastColumn; column += 1) {
        const baseOpacity = 0.3 + seededRandom(column, row, 1) * 0.2;

        const phaseX = seededRandom(column, row, 2) * Math.PI * 2;

        const phaseY = seededRandom(column, row, 3) * Math.PI * 2;

        const speedX = 0.25 + seededRandom(column, row, 4) * 0.35;

        const speedY = 0.25 + seededRandom(column, row, 5) * 0.35;

        const movement =
          driftAmount * (0.4 + seededRandom(column, row, 6) * 0.6);

        const baseX = horizontalOffset + column * cellSize;

        const baseY = verticalOffset + row * cellSize - scrollDistance;

        const animatedX =
          baseX +
          Math.sin(elapsedSeconds * speedX * driftSpeed + phaseX) * movement;

        const animatedY =
          baseY +
          Math.cos(elapsedSeconds * speedY * driftSpeed + phaseY) * movement;

        if (
          animatedX < -cellSize ||
          animatedX > width + cellSize ||
          animatedY < -cellSize ||
          animatedY > height + cellSize
        ) {
          continue;
        }

        const differenceX = animatedX - mouseX;
        const differenceY = animatedY - mouseY;

        const distanceSquared =
          differenceX * differenceX + differenceY * differenceY;

        const wave =
          Math.sin(animatedX * 0.02 + animatedY * 0.02 + waveTime) * 0.5 + 0.5;

        /*
         * A small percentage of dots become stars.
         */
        const canTwinkle = seededRandom(column, row, 7) < twinkleChance;

        const twinklePhase = seededRandom(column, row, 8) * Math.PI * 2;

        const individualTwinkleSpeed =
          0.5 + seededRandom(column, row, 9) * 1.25;

        const rawTwinkle =
          Math.sin(
            elapsedSeconds * twinkleSpeed * individualTwinkleSpeed +
              twinklePhase,
          ) *
            0.5 +
          0.5;

        /*
         * Raising the value makes the twinkle appear briefly
         * instead of constantly pulsing.
         */
        const twinkle = canTwinkle
          ? Math.pow(rawTwinkle, 5) * twinkleAmount
          : 0;

        let opacity = baseOpacity + wave * 0.12 + twinkle * 0.45;

        let scale = 1 + wave * 0.18 + twinkle * 0.85;

        let red = baseRgb.r;
        let green = baseRgb.g;
        let blue = baseRgb.b;

        let glow = twinkle * 0.15;

        /*
         * Cursor glow effect.
         */
        if (distanceSquared < proximitySquared) {
          const distance = Math.sqrt(distanceSquared);

          const progress = 1 - distance / proximity;

          const easedProgress = progress * progress * (3 - 2 * progress);

          red = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * easedProgress);

          green = Math.round(
            baseRgb.g + (glowRgb.g - baseRgb.g) * easedProgress,
          );

          blue = Math.round(
            baseRgb.b + (glowRgb.b - baseRgb.b) * easedProgress,
          );

          opacity += easedProgress * 0.65;
          scale += easedProgress * 0.75;

          glow = Math.max(glow, easedProgress * glowIntensity);
        }

        opacity = Math.min(1, opacity);

        const dot: RenderedDot = {
          column,
          row,
          x: animatedX,
          y: animatedY,
          radius: (dotSize / 2) * scale,
          opacity,
          red,
          green,
          blue,
          glow,
        };

        renderedDots.push(dot);

        dotLookup.set(getDotKey(column, row), dot);
      }
    }

    /*
     * Draw faint connections near the cursor.
     *
     * Each dot connects only to the dot on its right and
     * below it, preventing duplicated lines.
     */
    if (showConnections && connectionRadius > 0 && mouseX > -500) {
      context.save();
      context.lineWidth = 1;

      const neighborDirections = [
        [1, 0],
        [0, 1],
      ] as const;

      for (const dot of renderedDots) {
        for (const [columnOffset, rowOffset] of neighborDirections) {
          const neighbor = dotLookup.get(
            getDotKey(dot.column + columnOffset, dot.row + rowOffset),
          );

          if (!neighbor) {
            continue;
          }

          const midpointX = (dot.x + neighbor.x) / 2;

          const midpointY = (dot.y + neighbor.y) / 2;

          const mouseDifferenceX = midpointX - mouseX;

          const mouseDifferenceY = midpointY - mouseY;

          const mouseDistance = Math.sqrt(
            mouseDifferenceX * mouseDifferenceX +
              mouseDifferenceY * mouseDifferenceY,
          );

          if (mouseDistance > connectionRadius) {
            continue;
          }

          const cursorProgress = 1 - mouseDistance / connectionRadius;

          const easedProgress = cursorProgress * cursorProgress;

          const alpha = connectionOpacity * easedProgress;

          context.beginPath();
          context.moveTo(dot.x, dot.y);
          context.lineTo(neighbor.x, neighbor.y);

          context.strokeStyle = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${alpha})`;

          context.stroke();
        }
      }

      context.restore();
    }

    /*
     * Draw glows first.
     */
    for (const dot of renderedDots) {
      if (dot.glow <= 0) {
        continue;
      }

      const glowRadius = dot.radius * 4;

      const gradient = context.createRadialGradient(
        dot.x,
        dot.y,
        0,
        dot.x,
        dot.y,
        glowRadius,
      );

      gradient.addColorStop(
        0,
        `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${dot.glow * 0.4})`,
      );

      gradient.addColorStop(
        0.5,
        `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${dot.glow * 0.1})`,
      );

      gradient.addColorStop(
        1,
        `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`,
      );

      context.beginPath();

      context.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2);

      context.fillStyle = gradient;
      context.fill();
    }

    /*
     * Draw the dots on top of the lines and glows.
     */
    for (const dot of renderedDots) {
      context.beginPath();

      context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

      context.fillStyle = `rgba(${dot.red}, ${dot.green}, ${dot.blue}, ${dot.opacity})`;

      context.fill();
    }
  }, [
    baseRgb,
    glowRgb,
    dotSize,
    gap,
    proximity,
    glowIntensity,
    waveSpeed,
    driftAmount,
    driftSpeed,
    scrollParallax,
    twinkleChance,
    twinkleAmount,
    twinkleSpeed,
    showConnections,
    connectionRadius,
    connectionOpacity,
  ]);

  useEffect(() => {
    buildCanvas();

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const resizeObserver = new ResizeObserver(buildCanvas);

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [buildCanvas]);

  useEffect(() => {
    const loop = () => {
      draw();
      animationRef.current = window.requestAnimationFrame(loop);
    };

    animationRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();

      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = {
        x: -1000,
        y: -1000,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden={!children}
      className={`
        pointer-events-none
        fixed inset-0 z-0
        overflow-hidden
        bg-background
        ${className}
      `}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Soft edge shading */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
        "
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 52%,
              color-mix(
                in srgb,
                var(--theme-background) 72%,
                transparent
              ) 100%
            )
          `,
        }}
      />

      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  );
}

export default Background;
