import { socialLinks } from "../../config/sociallinks";
import PixelPanel from "../ui/pixelpanel";
import TypewriterText from "../ui/typewritertext";

function Hero() {
  return (
    <section
      id="home"
      className="
        flex min-h-[calc(100vh-4rem)]
        scroll-mt-16 items-center
        px-4 py-12
        sm:px-6 sm:py-14
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-12 gap-8">
          <PixelPanel
            className="
              col-span-12
              lg:col-start-3 lg:col-span-8
            "
            contentClassName="
              p-6
              sm:p-8
              lg:p-10
            "
          >
            <div
              className="
                grid gap-10
                md:grid-cols-[minmax(0,1fr)_17rem]
                md:items-center
                lg:gap-12
              "
            >
              {/* LEFT SIDE */}
              <div className="min-w-0">
                {/* Top labels */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="
                      border-2 border-frame
                      bg-panel-secondary
                      px-3 py-1.5
                      text-[10px] font-bold uppercase
                      tracking-[0.2em] text-accent
                      shadow-[2px_2px_0_var(--theme-shadow)]
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
                    <span
                      aria-hidden="true"
                      className="
                        h-2.5 w-2.5
                        border border-frame
                        bg-accent
                      "
                    />
                    Portfolio online
                  </span>
                </div>

                {/* Intro */}
                <p
                  className="
                    mt-7
                    text-xs font-bold uppercase
                    tracking-[0.3em] text-muted
                    sm:text-sm
                  "
                >
                  Hi, my name is ...
                </p>

                <h1
                  className="
                    mt-3
                    text-4xl font-bold uppercase
                    leading-none text-ink
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  Brandon Shin
                </h1>

                <div className="my-6 border-t-2 border-dashed border-divider/50" />

                {/* Typewriter */}
                <p
                  className="
                    min-h-[2rem]
                    max-w-2xl
                    text-lg font-bold
                    leading-7 text-ink
                    sm:text-xl sm:leading-8
                  "
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
                  className="
                    mt-4 max-w-xl
                    text-sm leading-6 text-muted
                    sm:text-base sm:leading-7
                  "
                >
                  Computer science graduate interested in building software,
                  creating content, and continuously learning new technologies.
                </p>

                {/* Main buttons */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="
                      inline-flex h-12 items-center justify-center
                      border-2 border-frame
                      bg-accent px-5
                      text-sm font-bold uppercase
                      tracking-wide text-accent-text
                      shadow-[4px_4px_0_var(--theme-shadow)]
                      transition duration-150

                      hover:-translate-x-0.5
                      hover:-translate-y-0.5
                      hover:bg-accent-hover
                      hover:shadow-[6px_6px_0_var(--theme-shadow)]

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40

                      active:translate-x-1
                      active:translate-y-1
                      active:shadow-none
                    "
                  >
                    View projects
                  </a>

                  <a
                    href="#about"
                    className="
                      inline-flex h-12 items-center justify-center
                      border-2 border-frame
                      bg-panel-secondary px-5
                      text-sm font-bold uppercase
                      tracking-wide text-ink
                      shadow-[4px_4px_0_var(--theme-shadow)]
                      transition duration-150

                      hover:-translate-x-0.5
                      hover:-translate-y-0.5
                      hover:bg-panel-highlight
                      hover:text-accent
                      hover:shadow-[6px_6px_0_var(--theme-shadow)]

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40

                      active:translate-x-1
                      active:translate-y-1
                      active:shadow-none
                    "
                  >
                    About me
                  </a>
                </div>

                {/* Current status */}
                <div
                  className="
                    mt-7
                    flex w-fit items-center gap-3
                    border-2 border-frame
                    bg-panel-secondary
                    px-4 py-2.5
                    shadow-[2px_2px_0_var(--theme-shadow)]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-3 w-3 shrink-0
                      border border-frame
                      bg-accent
                    "
                  />

                  <p className="text-xs font-bold text-ink sm:text-sm">
                    UC Irvine Master of SWE student
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <aside className="mx-auto w-full max-w-[17rem]">
                <div
                  className="
                    border-2 border-frame
                    bg-panel-secondary
                    p-4
                    shadow-[5px_5px_0_var(--theme-shadow)]
                  "
                >
                  {/* Profile image */}
                  <div
                    className="
                      aspect-square w-full overflow-hidden
                      border-4 border-frame
                      bg-panel
                      shadow-[4px_4px_0_var(--theme-shadow)]
                    "
                  >
                    <img
                      src="/images/profile.png"
                      alt="Brandon Shin"
                      className="
                        h-full w-full
                        object-cover object-center
                      "
                    />
                  </div>

                  {/* Player title */}
                  <div className="mt-5 text-center">
                    <p
                      className="
                        text-xs font-bold uppercase
                        tracking-[0.2em] text-muted
                      "
                    >
                      Developer
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t-2 border-dashed border-divider/50" />

                  {/* Player stats */}
                  <dl className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <dt
                        className="
                          text-[10px] font-bold uppercase
                          tracking-wider text-muted
                        "
                      >
                        Focus
                      </dt>

                      <dd className="text-xs font-bold text-ink">Software</dd>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <dt
                        className="
                          text-[10px] font-bold uppercase
                          tracking-wider text-muted
                        "
                      >
                        Location
                      </dt>

                      <dd className="text-xs font-bold text-ink">California</dd>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <dt
                        className="
                          text-[10px] font-bold uppercase
                          tracking-wider text-muted
                        "
                      >
                        Status
                      </dt>

                      <dd className="text-xs font-bold text-accent">
                        Available
                      </dd>
                    </div>
                  </dl>

                  {/* Divider */}
                  <div className="my-4 border-t-2 border-dashed border-divider/50" />

                  {/* Connect label */}
                  <p
                    className="
                      mb-3 text-center
                      text-[10px] font-bold uppercase
                      tracking-[0.2em] text-muted
                    "
                  >
                    Connect
                  </p>

                  {/* Social links */}
                  <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      const isEmail = link.label.toLowerCase() === "email";
                      const isResume = link.label.toLowerCase() === "resume";

                      const isWide = isEmail || isResume;

                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          aria-label={link.label}
                          title={link.label}
                          className={`
                            flex h-9 items-center justify-center
                            gap-2
                            border-2 border-frame
                            bg-panel
                            px-2
                            text-[10px] font-bold
                            text-accent
                            shadow-[2px_2px_0_var(--theme-shadow)]
                            transition duration-150

                            hover:-translate-x-0.5
                            hover:-translate-y-0.5
                            hover:bg-accent
                            hover:text-accent-text
                            hover:shadow-[3px_3px_0_var(--theme-shadow)]

                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-accent/40

                            active:translate-x-0.5
                            active:translate-y-0.5
                            active:shadow-none

                            ${isWide ? "col-span-2" : ""}
                          `}
                        >
                          {Icon && (
                            <Icon
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0"
                            />
                          )}

                          {isEmail ? (
                            <span className="truncate">
                              {link.displayText ?? link.label}
                            </span>
                          ) : (
                            <span>{link.displayText ?? link.label}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </PixelPanel>
        </div>

        {/* Bottom prompt */}
        <div className="mt-8 flex justify-center">
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
            <span className="animate-pulse">Press start to explore</span>

            <span
              aria-hidden="true"
              className="
                flex h-8 w-8 items-center justify-center
                border-2 border-frame
                bg-panel-secondary
                text-base text-accent
                shadow-[2px_2px_0_var(--theme-shadow)]
                transition duration-150

                group-hover:translate-y-1
                group-hover:bg-panel-highlight
              "
            >
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
