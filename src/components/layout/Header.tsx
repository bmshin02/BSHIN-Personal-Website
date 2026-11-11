import { useEffect, useRef, useState, type MouseEvent } from "react";

import { LuHouse, LuMenu, LuX } from "react-icons/lu";

import ThemeToggle from "../ui/ThemeToggle";

type NavigationLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  forcedActiveHref?: string | null;
  caseStudyOpen?: boolean;
  onCaseStudyExit?: (sectionId: string) => void;
};

const navigationLinks: NavigationLink[] = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionHrefs = ["#home", ...navigationLinks.map((link) => link.href)];

function Header({
  forcedActiveHref = null,
  caseStudyOpen = false,
  onCaseStudyExit,
}: HeaderProps) {
  const [activeHref, setActiveHref] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  const pendingHrefRef = useRef<string | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);

  /*
   * When a case study is open, only Projects appears
   * in the normal navigation.
   */
  const visibleNavigationLinks = caseStudyOpen
    ? navigationLinks.filter((link) => link.href === "#projects")
    : navigationLinks;

  /*
   * forcedActiveHref is used while viewing a project
   * case study. Otherwise use the section detected
   * from scrolling.
   */
  const displayedActiveHref = forcedActiveHref ?? activeHref;

  useEffect(() => {
    const sections = sectionHrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let animationFrameId: number | null = null;

    const getDistanceFromBottom = () => {
      return (
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight)
      );
    };

    const hasReachedClickedSection = (section: HTMLElement, href: string) => {
      const rect = section.getBoundingClientRect();

      if (href === "#contact") {
        return getDistanceFromBottom() <= 32;
      }

      const expectedTop = 64;
      const allowedDifference = 60;

      return Math.abs(rect.top - expectedTop) <= allowedDifference;
    };

    const updateActiveSection = () => {
      /*
       * Don't change the scroll-detected active
       * section while a forced section is being used.
       */
      if (forcedActiveHref) {
        return;
      }

      const pendingHref = pendingHrefRef.current;

      /*
       * Keep a clicked navigation link active while
       * smooth scrolling is taking place.
       */
      if (pendingHref) {
        const pendingSection = document.getElementById(pendingHref.slice(1));

        setActiveHref(pendingHref);

        if (
          pendingSection &&
          hasReachedClickedSection(pendingSection, pendingHref)
        ) {
          pendingHrefRef.current = null;

          if (pendingTimeoutRef.current !== null) {
            window.clearTimeout(pendingTimeoutRef.current);

            pendingTimeoutRef.current = null;
          }
        }

        return;
      }

      /*
       * Contact is the final section.
       */
      if (getDistanceFromBottom() <= 32) {
        const contactSection = document.getElementById("contact");

        if (contactSection) {
          setActiveHref("#contact");
          return;
        }
      }

      /*
       * Use a point about 40% down the screen to
       * decide which section the user is viewing.
       */
      const focusPoint = window.innerHeight * 0.4;

      let closestSection = sections[0];
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        let distance: number;

        if (rect.top <= focusPoint && rect.bottom >= focusPoint) {
          distance = 0;
        } else {
          distance = Math.min(
            Math.abs(rect.top - focusPoint),
            Math.abs(rect.bottom - focusPoint),
          );
        }

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestSection = section;
        }
      });

      setActiveHref(`#${closestSection.id}`);
    };

    const scheduleUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        updateActiveSection();
        animationFrameId = null;
      });
    };

    updateActiveSection();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);

      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      if (pendingTimeoutRef.current !== null) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, [forcedActiveHref]);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    /*
     * The other sections are hidden while a case study
     * is open, so let the page close it and scroll.
     */
    if (caseStudyOpen && onCaseStudyExit) {
      setMenuOpen(false);
      window.history.replaceState(null, "", href);
      onCaseStudyExit(href.slice(1));
      return;
    }

    const section = document.getElementById(href.slice(1));

    if (!section) {
      return;
    }

    pendingHrefRef.current = href;

    setActiveHref(href);
    setMenuOpen(false);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);

    if (pendingTimeoutRef.current !== null) {
      window.clearTimeout(pendingTimeoutRef.current);
    }

    pendingTimeoutRef.current = window.setTimeout(() => {
      pendingHrefRef.current = null;
      pendingTimeoutRef.current = null;
    }, 2000);
  };

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        h-16
        border-b border-frame/10
        bg-panel/85 text-ink
        shadow-soft-sm
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto grid h-full max-w-7xl
          grid-cols-12 gap-8 px-6
        "
      >
        <div
          className="
            relative col-span-12
            flex h-full items-center
            lg:col-start-3 lg:col-span-8
          "
        >
          {/* HOME BUTTON */}
          <a
            href="#home"
            onClick={(event) => handleNavigation(event, "#home")}
            aria-label="Home"
            title="Home"
            className="
              group flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg border border-frame/15
              bg-panel-secondary/70
              text-accent
              transition duration-150

              hover:border-frame/25
              hover:bg-panel-highlight

              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-accent/40

              active:scale-95
            "
          >
            <LuHouse aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2} />
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Page sections"
            className="
              absolute left-1/2 top-1/2
              hidden
              -translate-x-1/2
              -translate-y-1/2
              xl:block
            "
          >
            <ul className="flex items-center gap-1">
              {visibleNavigationLinks.map((link) => {
                /*
                 * When activeHref is "#home",
                 * none of these links match.
                 *
                 * This means nothing is highlighted
                 * while viewing the Hero section.
                 */
                const isActive = displayedActiveHref === link.href;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => handleNavigation(event, link.href)}
                      aria-current={isActive ? "location" : undefined}
                      className={`
                          inline-flex items-center
                          whitespace-nowrap
                          rounded-full
                          px-3.5 py-1.5
                          text-[12px] font-semibold
                          uppercase tracking-[0.08em]
                          transition-colors duration-150

                          focus-visible:outline-none
                          focus-visible:ring-4
                          focus-visible:ring-accent/40

                          ${
                            isActive
                              ? `
                                bg-accent/15
                                text-accent
                              `
                              : `
                                text-muted

                                hover:bg-panel-secondary/80
                                hover:text-ink
                              `
                          }
                        `}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            {/* MOBILE MENU BUTTON */}
            {!caseStudyOpen && (
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                className="
              group flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg border border-frame/15
              bg-panel-secondary/70
              text-accent
              transition duration-150

              hover:border-frame/25
              hover:bg-panel-highlight

              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-accent/40

              active:scale-95

                  xl:hidden
                "
              >
                {menuOpen ? (
                  <LuX aria-hidden="true" className="h-[18px] w-[18px]" />
                ) : (
                  <LuMenu aria-hidden="true" className="h-[18px] w-[18px]" />
                )}
              </button>
            )}
          </div>

          {/* MOBILE NAVIGATION */}
          {menuOpen && !caseStudyOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Mobile page sections"
              className="
                absolute right-0
                top-[calc(100%+8px)]
                w-52
                rounded-lg border border-frame/20
                bg-panel p-3
                shadow-soft
                xl:hidden
              "
            >
              <ul className="space-y-2">
                {navigationLinks.map((link) => {
                  const isActive = displayedActiveHref === link.href;

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => handleNavigation(event, link.href)}
                        aria-current={isActive ? "location" : undefined}
                        className={`
                          flex w-full items-center
                          justify-between
                          rounded-lg border border-frame/20
                          px-3 py-2
                          text-xs font-bold
                          uppercase tracking-wide
                          transition duration-150

                          ${
                            isActive
                              ? `
                                bg-accent/15
                                text-accent
                              `
                              : `
                                bg-panel-secondary
                                text-ink

                                hover:bg-panel-highlight
                                hover:text-accent
                              `
                          }
                        `}
                      >
                        <span>{link.label}</span>

                        <span
                          aria-hidden="true"
                          className={`
                            h-2.5 w-2.5 rounded-full
                            border border-frame/25

                            ${isActive ? "bg-accent" : "bg-panel"}
                          `}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
