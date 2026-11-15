import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  LuArrowDown,
  LuArrowRight,
  LuGraduationCap,
  LuUserRound,
} from "react-icons/lu";

import { socialLinks } from "../../data/socialLinks";
import { useDraggable } from "../../hooks/useDraggable";
import TerminalCard from "../ui/TerminalCard";
import TypewriterText from "../ui/TypewriterText";

/* The entrance plays on the first load only, not after a case study closes. */
let heroHasEntered = false;

function Hero() {
  const [playEntrance] = useState(() => !heroHasEntered);

  /* The two windows can be dragged around the hero; the last one touched sits in front. */
  const sectionRef = useRef<HTMLElement>(null);
  const photoDrag = useDraggable(sectionRef);
  const terminalDrag = useDraggable(sectionRef);
  const [frontWindow, setFrontWindow] = useState<"photo" | "terminal">("photo");

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
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <div className="flex flex-1 items-center py-10 sm:py-14 short:py-6">
          <div
            className="
              grid w-full gap-10
              md:grid-cols-[minmax(0,1fr)_20rem]
              md:items-center
              lg:grid-cols-[minmax(0,1fr)_21rem]
              lg:gap-12
              xl:grid-cols-[minmax(0,1fr)_23rem]
              xl:gap-16
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
                  Software Developer
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
                  UC Irvine Master of SWE student
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
                  xl:text-[7rem]
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
                    "a Software Developer",
                    "a Game Developer",
                    "an Interactive Designer",
                    "a Lifelong Learner",
                    "a Full Stack Developer",
                    "a Music Producer",
                    "a Content Creator",
                    "a Problem Solver",
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
                Computer science graduate interested in building software,
                creating content, and continuously learning new technologies.
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
              </div>
            </div>

            {/*
             * RIGHT SIDE: two overlapping windows, a photo viewer in front
             * and a terminal behind it that types a short intro.
             * Both can be dragged by their title bars.
             */}
            <aside className="mx-auto w-full max-w-md md:max-w-none">
              {/* Photo window */}
              <div
                className={`
                  relative ml-auto w-[58%] short:w-[46%]
                  ${frontWindow === "photo" ? "z-20" : "z-10"}
                  ${enter(350, true).className}
                `}
                style={enter(350, true).style}
                onPointerDown={() => setFrontWindow("photo")}
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

                    <div className="aspect-[4/3] overflow-hidden short:aspect-[16/10]">
                      <img
                        src="/images/profile.png"
                        alt="Brandon Shin"
                        width={400}
                        height={400}
                        className="
                          h-full w-full object-cover object-[center_20%]
                          transition-transform duration-500
                          group-hover/photo:scale-[1.03]
                        "
                      />
                    </div>
                  </figure>
                </div>
              </div>

              {/* Terminal window: its title bar tucks under the photo */}
              <div
                className={`
                  relative mr-[7%] -mt-7
                  ${frontWindow === "terminal" ? "z-20" : "z-10"}
                  ${enter(250, true).className}
                `}
                style={enter(250, true).style}
                onPointerDown={() => setFrontWindow("terminal")}
              >
                <div {...terminalDrag.windowProps}>
                  <TerminalCard
                    animate={playEntrance}
                    title="~/brandon"
                    barProps={terminalDrag.handleProps}
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
                              className="
                                flex h-9 items-center justify-center
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
            </aside>
          </div>
        </div>

        {/* Bottom prompt */}
        <div
          className={`
            flex justify-center pb-8
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
