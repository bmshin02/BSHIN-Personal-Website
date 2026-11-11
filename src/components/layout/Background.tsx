import { useEffect, useRef, useState } from "react";

import { useThemeColor } from "../../hooks/useThemeColor";

import DotGrid from "./DotGrid";

/*
 * Aurora mesh background: soft fields of the theme's colours
 * that drift, warp and blend into each other, drawn by a small
 * WebGL shader. Scrolling nudges the colours along and a faint
 * light follows the cursor. The original dot grid sits on top.
 *
 * - Rendered at reduced resolution (it is all soft gradients)
 *   and capped at about 30fps.
 * - With reduced motion it is drawn once and holds still.
 * - Without WebGL it falls back to static CSS glows.
 */

const RENDER_SCALE = 0.5;
const FRAME_INTERVAL = 1000 / 30;

const VERTEX_SHADER = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uPointerStrength;

uniform vec3 uBase;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform float uStrength;

// 2D simplex noise by Ashima Arts (MIT licence)
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

float field(vec2 p, vec2 center, float radius) {
  vec2 d = p - center;
  return exp(-dot(d, d) / (radius * radius));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime;

  // Scrolling moves the colours along their paths.
  float phase = t * 0.6 + uScroll * 1.4;

  // Warp the space so the colour fields get soft, organic edges.
  vec2 warp = vec2(
    snoise(p * 1.1 + vec2(t * 0.05, -t * 0.04)),
    snoise(p * 1.1 + vec2(-t * 0.04, t * 0.05) + 7.3)
  );
  vec2 q = p + warp * 0.22;

  vec2 c1 = vec2(aspect * (0.22 + 0.16 * sin(phase * 0.31)), 0.82 + 0.14 * cos(phase * 0.23));
  vec2 c2 = vec2(aspect * (0.80 + 0.14 * cos(phase * 0.27)), 0.72 + 0.18 * sin(phase * 0.19));
  vec2 c3 = vec2(aspect * (0.55 + 0.25 * sin(phase * 0.17 + 1.0)), 0.22 + 0.15 * cos(phase * 0.29));
  vec2 c4 = vec2(aspect * (0.12 + 0.10 * cos(phase * 0.21 + 2.0)), 0.25 + 0.14 * sin(phase * 0.33));

  vec3 color = uBase;

  color = mix(color, uColor4, field(q, c4, 0.50) * uStrength);
  color = mix(color, uColor2, field(q, c2, 0.55) * uStrength);
  color = mix(color, uColor3, field(q, c3, 0.60) * uStrength);
  color = mix(color, uColor1, field(q, c1, 0.50) * uStrength);

  // Faint flowing streaks, like the bands of an aurora.
  float streak = snoise(vec2(q.x * 0.9 + t * 0.03, q.y * 2.2 - t * 0.02 + uScroll * 0.3));
  float band = smoothstep(0.18, 0.0, abs(streak));
  color = mix(color, uColor1, band * 0.06 * uStrength);

  // A soft light that follows the cursor.
  vec2 pointer = vec2(uPointer.x * aspect, uPointer.y);
  color = mix(color, uColor1, field(p, pointer, 0.30) * 0.22 * uPointerStrength * uStrength);

  // Gentle vignette.
  float vignette = smoothstep(1.25, 0.35, length((uv - 0.5) * vec2(1.2, 1.0)));
  color *= mix(0.86, 1.0, vignette);

  // Dither to avoid banding in the gradients.
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (dither - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
`;

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());

  return match
    ? [
        Number.parseInt(match[1], 16) / 255,
        Number.parseInt(match[2], 16) / 255,
        Number.parseInt(match[3], 16) / 255,
      ]
    : [0, 0, 0];
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Background shader failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function supportsWebGL() {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl"));
  } catch {
    return false;
  }
}

type Palette = {
  base: RGB;
  colors: [RGB, RGB, RGB, RGB];
  strength: number;
};

function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasWebGL, setHasWebGL] = useState(supportsWebGL);

  const base = useThemeColor("--theme-background", "#0f0b08");
  const color1 = useThemeColor("--theme-aurora-1", "#5c3a24");
  const color2 = useThemeColor("--theme-aurora-2", "#3a2418");
  const color3 = useThemeColor("--theme-aurora-3", "#6e4527");
  const color4 = useThemeColor("--theme-aurora-4", "#241812");
  const strength = useThemeColor("--theme-aurora-strength", "0.5");
  const dotColor = useThemeColor("--theme-dot", "#8a7663");
  const dotGlowColor = useThemeColor("--theme-dot-glow", "#e8b48a");

  const paletteRef = useRef<Palette | null>(null);

  /* Redraws one frame; used when motion is reduced. */
  const renderOnceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    paletteRef.current = {
      base: hexToRgb(base),
      colors: [
        hexToRgb(color1),
        hexToRgb(color2),
        hexToRgb(color3),
        hexToRgb(color4),
      ],
      strength: Number.parseFloat(strength) || 0.5,
    };

    renderOnceRef.current?.();
  }, [base, color1, color2, color3, color4, strength]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!hasWebGL || !canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER,
    );

    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Background program failed:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    /* One triangle that covers the whole screen. */
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);

    const uniforms = {
      resolution: uniform("uResolution"),
      time: uniform("uTime"),
      scroll: uniform("uScroll"),
      pointer: uniform("uPointer"),
      pointerStrength: uniform("uPointerStrength"),
      base: uniform("uBase"),
      colors: [
        uniform("uColor1"),
        uniform("uColor2"),
        uniform("uColor3"),
        uniform("uColor4"),
      ],
      strength: uniform("uStrength"),
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* Pointer in 0..1 with y pointing up, eased towards the target. */
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let pointerStrength = 0;
    let pointerTarget = 0;
    let smoothScroll = window.scrollY / window.innerHeight;

    const resize = () => {
      const width = Math.max(1, Math.round(window.innerWidth * RENDER_SCALE));
      const height = Math.max(
        1,
        Math.round(window.innerHeight * RENDER_SCALE),
      );

      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const startTime = performance.now();

    const render = (now: number) => {
      const palette = paletteRef.current;

      if (!palette) {
        return;
      }

      const seconds = reducedMotion ? 0 : (now - startTime) / 1000;

      if (!reducedMotion) {
        const targetScroll = window.scrollY / window.innerHeight;
        smoothScroll += (targetScroll - smoothScroll) * 0.08;

        pointer.x += (pointer.targetX - pointer.x) * 0.06;
        pointer.y += (pointer.targetY - pointer.y) * 0.06;
        pointerStrength += (pointerTarget - pointerStrength) * 0.05;
      }

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, seconds);
      gl.uniform1f(uniforms.scroll, reducedMotion ? 0 : smoothScroll);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform1f(uniforms.pointerStrength, pointerStrength);
      gl.uniform3fv(uniforms.base, palette.base);
      palette.colors.forEach((color, index) => {
        gl.uniform3fv(uniforms.colors[index], color);
      });
      gl.uniform1f(uniforms.strength, palette.strength);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();

    let animationFrame: number | null = null;
    let lastFrame = 0;

    if (reducedMotion) {
      renderOnceRef.current = () => render(performance.now());
      render(performance.now());
    } else {
      const loop = (now: number) => {
        animationFrame = window.requestAnimationFrame(loop);

        if (now - lastFrame < FRAME_INTERVAL) {
          return;
        }

        lastFrame = now;
        render(now);
      };

      animationFrame = window.requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resize();

      if (reducedMotion) {
        render(performance.now());
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX / window.innerWidth;
      pointer.targetY = 1 - event.clientY / window.innerHeight;
      pointerTarget = 1;
    };

    const handlePointerLeave = () => {
      pointerTarget = 0;
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setHasWebGL(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      renderOnceRef.current = null;

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      canvas.removeEventListener("webglcontextlost", handleContextLost);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [hasWebGL]);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0 z-0
        overflow-hidden
        bg-background
      "
    >
      {hasWebGL ? (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-glow bg-glow-a" />
          <div className="bg-glow bg-glow-b" />
          <div className="bg-glow bg-glow-c" />
        </div>
      )}

      {/* The original interactive dot grid, on top of the aurora */}
      <DotGrid
        dotSize={2}
        gap={34}
        baseColor={dotColor}
        glowColor={dotGlowColor}
        proximity={150}
        glowIntensity={0.9}
        waveSpeed={10}
        driftAmount={1.5}
        driftSpeed={3}
        connectionRadius={190}
        connectionOpacity={0.3}
        gridLineOpacity={0.08}
      />

      {/* Film grain */}
      <div className="bg-grain pointer-events-none" />
    </div>
  );
}

export default Background;
