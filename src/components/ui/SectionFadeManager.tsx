import { useEffect } from "react";

function SectionFadeManager() {
  useEffect(() => {
    /*
     * Look the sections up on every update instead of once, so a
     * section that React re-creates (for example after a hot reload)
     * still gets marked active and does not stay faded.
     */
    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));

    const main = document.querySelector("main");

    if (!main) {
      return;
    }

    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      const sections = getSections();
      const viewportCenter = window.innerHeight / 2;

      const visibleSections = sections.filter((section) => {
        const rect = section.getBoundingClientRect();

        return rect.bottom > 0 && rect.top < window.innerHeight;
      });

      if (visibleSections.length === 0) {
        return;
      }

      let activeSection = visibleSections[0];
      let smallestDistance = Number.POSITIVE_INFINITY;

      visibleSections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        let distanceFromCenter: number;

        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          // The viewport center is currently inside this section.
          distanceFromCenter = 0;
        } else if (rect.bottom < viewportCenter) {
          // The section is above the viewport center.
          distanceFromCenter = viewportCenter - rect.bottom;
        } else {
          // The section is below the viewport center.
          distanceFromCenter = rect.top - viewportCenter;
        }

        if (distanceFromCenter < smallestDistance) {
          smallestDistance = distanceFromCenter;
          activeSection = section;
        }
      });

      sections.forEach((section) => {
        section.dataset.activeSection =
          section === activeSection ? "true" : "false";
      });
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

    // Recalculate when expandable content changes section height.
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(main);

    // Recalculate when sections are added, removed or re-created.
    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(main, { childList: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      resizeObserver.disconnect();
      mutationObserver.disconnect();

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      getSections().forEach((section) => {
        delete section.dataset.activeSection;
      });
    };
  }, []);

  return null;
}

export default SectionFadeManager;
