import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  LuArrowDown,
  LuArrowRight,
  LuDownload,
  LuFileText,
  LuGraduationCap,
  LuUserRound,
} from "react-icons/lu";

import { socialLinks } from "../../data/socialLinks";
import { useDraggable } from "../../hooks/useDraggable";
import TerminalCard from "../ui/TerminalCard";
import TypewriterText from "../ui/TypewriterText";

const resumeLink = socialLinks.find((link) => link.label === "Resume");

type HeroWindow = "photo" | "terminal" | "status";

/* The entrance plays on the first load only, not after a case study closes. */
let heroHasEntered = false;

/* When the photo and status windows pop up after the page loads, in milliseconds. */
const WINDOWS_POP_DELAY = 1100;

/* The lines of the looking-for.txt window. "wide" lines hide where the window is small. */
const statusLines: { content?: ReactNode; wide?: boolean }[] = [
  {
    content: (
      <span className="inline-flex items-center gap-2 text-[var(--term-ink)]">
        Looking for SWE roles
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
      </span>
    ),
  },
  {},
  { content: "Summer 2027  internship" },
  { content: "Dec 2027+    full-time" },
  { content: "Focus        SWE", wide: true },
  { wide: true },
  {
    content: (
      <a
        href="#contact"
        className="
          inline-block py-1
          text-[var(--term-prompt)] underline decoration-[var(--term-prompt)]/40
          underline-offset-[3px] transition-colors
          hover:text-[var(--term-ink)] hover:decoration-[var(--term-ink)]
        "
      >
        Get in touch -&gt;
      </a>
    ),
    wide: true,
  },
];

function Hero() {
  const [playEntrance] = useState(() => !heroHasEntered);

  /* The windows can be dragged around the hero; the last one touched sits in front. */
  const sectionRef = useRef<HTMLElement>(null);
  const photoDrag = useDraggable(sectionRef);
  const terminalDrag = useDraggable(sectionRef);
  const statusDrag = useDraggable(sectionRef);
  /* Stacking order, back to front. Touching a window moves it to the front. */
  const [windowOrder, setWindowOrder] = useState<HeroWindow[]>(["terminal", "status", "photo"]);
  const bringToFront = (name: HeroWindow) =>
    setWindowOrder((order) =>
      order[order.length - 1] === name ? order : [...order.filter((w) => w !== name), name],
    );
  const zIndex = (name: HeroWindow) => ({ zIndex: 10 + windowOrder.indexOf(name) });

  /*
   * The photo and status windows pop up shortly after the terminal appears,
   * as it starts typing (not after it finishes, which takes several seconds).
   */
  const [windowsShown, setWindowsShown] = useState(!playEntrance);

  /* Command typed in the terminal for the hovered or focused link button. */
  const [linkCommand, setLinkCommand] = useState("");

  useEffect(() => {
    if (windowsShown) {
      return;
    }

    const timer = window.setTimeout(() => setWindowsShown(true), WINDOWS_POP_DELAY);

    return () => window.clearTimeout(timer);
  }, [windowsShown]);

  const popIn = (delay: number) =>
    windowsShown
      ? {
          className: playEntrance ? "window-pop" : "",
          style: { "--pop-delay": `${delay}ms` } as CSSProperties,
        }
      : { className: "invisible", style: undefined };

  useEffect(() => {
    heroHasEntered = true;
  }, []);

  /* Props for one staggered entrance step. */
  const enter = (delay: number, fromSide = false) =>
    playEntrance
      ? {
          className: fromSide ? "hero-in-side" : "hero-in",
          style: { "--hero-delay": `${delay}ms` } as CSSProperties,
        }
      : { className: "", style: undefined };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="
        relative flex min-h-[calc(100svh-4rem)]
        scroll-mt-16 flex-col
        px-4 sm:px-6
      "
    >
      {/* Fills the first screen; the content sits straight on the background */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col xl:max-w-7xl">
        <div className="flex flex-1 items-center py-10 sm:py-14 short:py-6">
          <div
            className="
              grid w-full gap-10
              md:grid-cols-[minmax(0,1fr)_20rem]
              md:items-center
              lg:grid-cols-[minmax(0,1fr)_21rem]
              lg:gap-12
              xl:grid-cols-[minmax(0,1fr)_37.25rem]
              xl:gap-12
            "
          >
            {/* LEFT SIDE */}
            <div className="min-w-0">
              {/* Top labels */}
              <div
                className={`flex flex-wrap items-center gap-3 ${enter(150).className}`}
                style={enter(150).style}
              >
                <span
                  className="
                    rounded-lg border border-frame/20
                    bg-panel-secondary
                    px-3 py-1.5
                    text-[10px] font-bold uppercase
                    tracking-[0.2em] text-accent
                    shadow-soft-sm
                    sm:text-xs
                  "
                >
                  Software Engineer
                </span>

                <span
                  className="
                    flex items-center gap-2
                    text-[10px] font-bold uppercase
                    tracking-wider text-muted
                    sm:text-xs
                  "
                >
                  <LuGraduationCap aria-hidden="true" className="h-4 w-4 text-accent" />
                  M.S. Software Engineering · UC Irvine
                </span>
              </div>

              {/* Intro */}
              <p
                className={`
                  mt-7 short:mt-5
                  text-xs font-bold uppercase
                  tracking-[0.22em] text-muted
                  sm:text-sm
                  ${enter(230).className}
                `}
                style={enter(230).style}
              >
                Hi, my name is ...
              </p>

              <h1
                className={`
                  mt-3 pb-1
                  font-pixel font-normal text-ink
                  text-[clamp(2.75rem,16vw,4rem)] uppercase
                  leading-[0.9]
                  sm:text-[5rem]
                  lg:text-[6rem]
                  xl:text-[6.5rem]
                  ${enter(300).className}
                `}
                style={enter(300).style}
              >
                Brandon Shin
              </h1>

              <div
                className={`my-6 short:my-4 h-px bg-linear-to-r from-accent/60 via-divider/30 to-transparent ${enter(370).className}`}
                style={enter(370).style}
              />

              {/* Typewriter */}
              <p
                className={`
                  min-h-[2rem]
                  max-w-2xl
                  text-lg font-bold
                  leading-7 text-ink
                  sm:text-xl sm:leading-8
                  ${enter(430).className}
                `}
                style={enter(430).style}
              >
                I am{" "}
                <TypewriterText
                  words={[
                    "an AI Agent Builder",
                    "a Full-Stack Developer",
                    "a Game Developer",
                    "a Hackathon Regular",
                    "a Music Producer",
                    "ready for the next challenge",
                  ]}
                />
              </p>

              <p
                className={`
                  mt-4 max-w-xl
                  text-sm leading-6 text-muted
                  lg:text-lg lg:leading-8
                  sm:text-base sm:leading-7
                  ${enter(490).className}
                `}
                style={enter(490).style}
              >
                I build AI agents, full-stack apps, and games that people
                actually use.
              </p>

              {/* Main buttons */}
              <div
                className={`mt-7 short:mt-5 flex flex-wrap gap-3 ${enter(560).className}`}
                style={enter(560).style}
              >
                <a
                  href="#projects"
                  className="
                    group/button
                    inline-flex h-12 items-center justify-center gap-2
                    rounded-xl border border-frame/20
                    bg-accent px-5
                    text-sm font-bold uppercase
                    tracking-wide text-accent-text
                    shadow-soft
                    transition duration-150

                    hover:-translate-y-0.5
                    hover:bg-accent-hover
                    hover:shadow-soft-lg

                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-accent/40

                    active:translate-y-px
                    active:shadow-soft-sm
                  "
                >
                  View projects
                  <LuArrowRight
                    aria-hidden="true"
                    className="
                      h-4 w-4 transition-transform duration-200
                      group-hover/button:translate-x-1
                    "
                  />
                </a>

                <a
                  href="#about"
                  className="
                    inline-flex h-12 items-center justify-center gap-2
                    rounded-xl border border-frame/20
                    bg-panel-secondary px-5
                    text-sm font-bold uppercase
                    tracking-wide text-ink
                    shadow-soft
                    transition duration-150

                    hover:-translate-y-0.5
                    hover:bg-panel-highlight
                    hover:text-accent
                    hover:shadow-soft-lg

                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-accent/40

                    active:translate-y-px
                    active:shadow-soft-sm
                  "
                >
                  <LuUserRound aria-hidden="true" className="h-4 w-4 text-accent" />
                  About me
                </a>

                {resumeLink && (
                  <a
                    href={resumeLink.href}
                    download="BrandonShin_Resume.pdf"
                    className="
                      inline-flex h-12 items-center justify-center gap-2
                      rounded-xl border border-frame/20
                      bg-panel-secondary px-5
                      text-sm font-bold uppercase
                      tracking-wide text-ink
                      shadow-soft
                      transition duration-150

                      hover:-translate-y-0.5
                      hover:bg-panel-highlight
                      hover:text-accent
                      hover:shadow-soft-lg

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40

                      active:translate-y-px
                      active:shadow-soft-sm
                    "
                  >
                    <LuDownload aria-hidden="true" className="h-4 w-4 text-accent" />
                    Resume
                  </a>
                )}
              </div>
            </div>

            {/*
             * RIGHT SIDE: three draggable windows.
             * Wide screens: the terminal on the left, the photo beside it and
             * the looking-for window under the photo.
             * Smaller screens: the photo on top, the terminal under it, and the
             * looking-for window over the terminal's corner.
             * The photo and looking-for windows pop up after the terminal types.
             */}
            <aside className="relative mx-auto flex w-full max-w-md flex-col md:max-w-none xl:flex-row xl:items-start">
              {/* Terminal window: below the photo on smaller screens, on the left on wide ones */}
              <div
                className={`
                  relative mr-[7%] -mt-7 md:right-6
                  xl:right-0 xl:mr-0 xl:mt-0 xl:w-[21rem] xl:shrink-0
                  ${enter(250, true).className}
                `}
                style={{ ...enter(250, true).style, ...zIndex("terminal") }}
                onPointerDown={() => bringToFront("terminal")}
              >
                <div {...terminalDrag.windowProps}>
                  <TerminalCard
                    animate={playEntrance}
                    title="~/brandon"
                    barProps={terminalDrag.handleProps}
                    promptCommand={linkCommand}
                    footer={
                      <div className="grid grid-cols-4 gap-2">
                        {socialLinks.map((link) => {
                          const Icon = link.icon;
                          const opensNewTab = link.external;

                          return (
                            <a
                              key={link.label}
                              href={link.href}
                              target={opensNewTab ? "_blank" : undefined}
                              rel={opensNewTab ? "noopener noreferrer" : undefined}
                              aria-label={
                                opensNewTab
                                  ? `${link.label} (opens in a new tab)`
                                  : link.label
                              }
                              title={link.displayText ?? link.label}
                              onMouseEnter={() => setLinkCommand(link.command ?? "")}
                              onMouseLeave={() => setLinkCommand("")}
                              onFocus={() => setLinkCommand(link.command ?? "")}
                              onBlur={() => setLinkCommand("")}
                              className="
                                flex h-11 items-center justify-center md:h-9
                                rounded-lg border border-[var(--term-line)]
                                bg-[var(--term-bg)] text-[var(--term-prompt)]
                                transition duration-150

                                hover:-translate-y-0.5
                                hover:bg-[var(--term-prompt)]
                                hover:text-[var(--term-bg)]

                                focus-visible:outline-none
                                focus-visible:ring-4
                                focus-visible:ring-accent/40

                                active:translate-y-px
                              "
                            >
                              {Icon && (
                                <Icon aria-hidden="true" className="h-4 w-4" />
                              )}
                            </a>
                          );
                        })}
                      </div>
                    }
                  />
                </div>
              </div>

              {/* Photo and looking-for windows: a column beside the terminal on wide screens */}
              <div className="contents xl:-mt-5 xl:ml-3 xl:flex xl:w-[15.5rem] xl:shrink-0 xl:flex-col">
                {/* Photo window */}
                <div
                  className={`
                    relative top-6 order-first ml-auto w-[58%] short:w-[46%]
                    xl:top-0 xl:order-none xl:ml-0 xl:w-full!
                    ${popIn(0).className}
                  `}
                  style={{ ...popIn(0).style, ...zIndex("photo") }}
                  onPointerDown={() => bringToFront("photo")}
                >
                  <div {...photoDrag.windowProps}>
                    <figure
                      className="
                        group/photo terminal
                        overflow-hidden rounded-2xl border shadow-card
                        transition-transform duration-300
                        hover:-translate-y-1.5
                      "
                    >
                      <div
                        {...photoDrag.handleProps}
                        className={`terminal-bar flex items-center gap-3 border-b px-3 py-2 ${photoDrag.handleProps.className}`}
                      >
                        <span aria-hidden="true" className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#e0705c]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#e4b35b]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#7fae6b]" />
                        </span>

                        <span className="ml-auto truncate font-mono text-[11px] text-[var(--term-muted)]">
                          brandon.png
                        </span>
                      </div>

                      <div className="aspect-[4/3] overflow-hidden short:aspect-[16/10] xl:aspect-[4/3]!">
                        <img
                          src="/images/profile.webp"
                          alt="Brandon Shin smiling behind his laptop"
                          width={800}
                          height={600}
                          className="
                            h-full w-full object-cover object-top
                            transition-transform duration-500
                            group-hover/photo:scale-[1.03]
                          "
                        />
                      </div>
                    </figure>
                  </div>
                </div>

                {/* Status window: what I'm looking for. Over the terminal's lower right on smaller screens, under the photo on wide ones. */}
                <div
                  className={`
                    relative mt-3 order-last ml-auto w-[78%]
                    md:absolute md:right-2 md:bottom-[3.75rem] md:mt-0 md:w-52
                    xl:relative xl:right-auto xl:bottom-auto xl:order-none xl:mt-3 xl:w-full
                    ${popIn(220).className}
                  `}
                  style={{ ...popIn(220).style, ...zIndex("status") }}
                  onPointerDown={() => bringToFront("status")}
                >
                  <div {...statusDrag.windowProps}>
                    <div
                      className="
                        terminal
                        overflow-hidden rounded-xl border shadow-card
                      "
                    >
                      <div
                        {...statusDrag.handleProps}
                        className={`terminal-bar flex items-center gap-3 border-b px-3 py-1.5 ${statusDrag.handleProps.className}`}
                      >
                        <span aria-hidden="true" className="flex gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#e0705c]" />
                          <span className="h-2 w-2 rounded-full bg-[#e4b35b]" />
                          <span className="h-2 w-2 rounded-full bg-[#7fae6b]" />
                        </span>

                        <span className="flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-[var(--term-muted)]">
                          <LuFileText aria-hidden="true" className="h-3 w-3 shrink-0 text-[var(--term-dim)]" />
                          <span className="truncate">looking-for.txt</span>
                        </span>
                      </div>

                      {/*
                        * Shown like a plain-text file: line numbers, plain lines and a status bar.
                        * Lines marked "wide" only show where the window has room (wide screens and phones).
                        */}
                      <ol className="py-2.5 font-mono text-[11px] leading-[1.75] text-[var(--term-muted)] xl:py-3 xl:text-[12px]">
                        {statusLines.map((line, index) => (
                          <li
                            key={index}
                            className={`grid grid-cols-[1.5rem_1fr] pr-2.5 xl:grid-cols-[1.75rem_1fr] ${line.wide ? "md:max-xl:hidden" : ""}`}
                          >
                            <span
                              aria-hidden="true"
                              className="select-none border-r border-[var(--term-line)] pr-2 text-right text-[var(--term-dim)]"
                            >
                              {index + 1}
                            </span>

                            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-pre pl-2.5">
                              {line.content ?? "\u00a0"}
                            </span>
                          </li>
                        ))}
                      </ol>

                      {/* Status bar */}
                      <div className="terminal-bar flex items-center justify-between border-t px-3 py-1 font-mono text-[10px] text-[var(--term-dim)]">
                        <span>Plain Text</span>
                        <span>UTF-8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom prompt */}
        <div
          className={`
            flex justify-center pb-8 max-md:hidden
            [@media(max-height:640px)]:hidden
            ${enter(800).className}
          `}
          style={enter(800).style}
        >
          <a
            href="#about"
            aria-label="Scroll to the About section"
            className="
              group flex flex-col items-center gap-2
              text-center
              text-[10px] font-bold uppercase
              tracking-[0.25em] text-muted
              transition hover:text-accent
              sm:text-xs
            "
          >
            <span>Press start to explore</span>

            <span
              aria-hidden="true"
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg border border-frame/20
                bg-panel-secondary
                text-accent
                shadow-soft-sm
                transition duration-150
                group-hover:bg-panel-highlight
              "
            >
              <LuArrowDown className="hero-bob h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
