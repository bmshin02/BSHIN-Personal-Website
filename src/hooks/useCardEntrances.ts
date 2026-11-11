import { useLayoutEffect } from "react";

/*
 * Cards (elements with data-card) rise into place the first time
 * they scroll into view, one after another when several appear at
 * once. The hero is skipped because it has its own entrance.
 *
 * Pass a value that changes when the page swaps its content (for
 * example when a case study opens) so new cards are picked up.
 */
export function useCardEntrances(contentKey: unknown) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-card]"),
    ).filter(
      (card) =>
        !card.dataset.enter &&
        !card.closest("#home") &&
        !card.parentElement?.closest("[data-card]"),
    );

    /* Hide before the first paint so nothing flashes. */
    cards.forEach((card) => {
      card.dataset.enter = "pending";
    });

    const finish = (event: AnimationEvent) => {
      const card = event.currentTarget as HTMLElement;

      if (event.target !== card) {
        return;
      }

      card.dataset.enter = "done";
      card.style.removeProperty("--enter-delay");
      card.removeEventListener("animationend", finish);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );

        arriving.forEach((entry, index) => {
          const card = entry.target as HTMLElement;

          card.style.setProperty(
            "--enter-delay",
            `${Math.min(index, 5) * 90}ms`,
          );
          card.addEventListener("animationend", finish);
          card.dataset.enter = "in";

          observer.unobserve(card);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();

      /*
       * Anything still waiting goes back to normal, so the next
       * run (or React StrictMode's second run) can pick it up.
       */
      cards.forEach((card) => {
        if (card.dataset.enter === "pending") {
          delete card.dataset.enter;
        }
      });
    };
  }, [contentKey]);
}
