import { useState } from "react";

import PixelPanel from "../ui/PixelPanel";

type ProjectInsightSection = "features" | "challenges" | "results";

type ProjectInsightsPanelProps = {
  features: string[];
  challenges: string[];
  results: string[];
};

type InsightSection = {
  id: ProjectInsightSection;
  label: string;
  shortLabel: string;
  items: string[];
};

function ProjectInsightsPanel({
  features,
  challenges,
  results,
}: ProjectInsightsPanelProps) {
  const sections: InsightSection[] = [
    {
      id: "features",
      label: "Key features",
      shortLabel: "Features",
      items: features,
    },
    {
      id: "challenges",
      label: "Development challenges",
      shortLabel: "Challenges",
      items: challenges,
    },
    {
      id: "results",
      label: "Results and takeaways",
      shortLabel: "Results",
      items: results,
    },
  ];

  const availableSections = sections.filter(
    (section) => section.items.length > 0,
  );

  const [activeSectionId, setActiveSectionId] = useState<ProjectInsightSection>(
    availableSections[0]?.id ?? "features",
  );

  const activeSection =
    availableSections.find((section) => section.id === activeSectionId) ??
    availableSections[0];

  if (!activeSection) {
    return null;
  }

  return (
    <PixelPanel
      variant="secondary"
      shadowSize={5}
      contentClassName="overflow-hidden"
    >
      {/* Panel heading */}
      <div
        className="
          border-b-2 border-dashed border-divider/50
          bg-panel-highlight/10
          px-4 py-4
          sm:px-5
        "
      >
        <p
          className="
              pt-3 text-xs font-bold uppercase tracking-[0.18em] text-accent
          "
        >
          Project breakdown
        </p>

        <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
          Development overview
        </h3>

        {/* Section tabs */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {availableSections.map((section) => {
            const isActive = section.id === activeSection.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSectionId(section.id)}
                aria-pressed={isActive}
                className={`
                  min-w-0
                  border-2 border-frame
                  px-2 py-2.5
                  text-xs font-bold
                  shadow-[2px_2px_0_var(--theme-shadow)]
                  transition duration-150
                  hover:-translate-x-0.5
                  hover:-translate-y-0.5
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-accent/40
                  ${
                    isActive
                      ? "bg-accent text-accent-text"
                      : "bg-panel text-ink hover:bg-panel-highlight hover:text-accent"
                  }
                `}
              >
                <span className="block truncate">{section.shortLabel}</span>

                <span
                  className={`
                    mt-1 block text-[9px]
                    uppercase tracking-wide
                    ${isActive ? "text-accent-text/80" : "text-muted"}
                  `}
                >
                  {section.items.length}{" "}
                  {section.items.length === 1 ? "item" : "items"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected section */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="
                h-3 w-3 shrink-0
                border border-frame
                bg-accent
                shadow-[1px_1px_0_var(--theme-shadow)]
              "
            />

            <h4 className="text-base font-bold text-ink sm:text-lg">
              {activeSection.label}
            </h4>
          </div>

          <span
            className="
              hidden text-[9px] font-bold
              uppercase tracking-[0.16em]
              text-muted sm:block
            "
          >
            {activeSection.items.length}{" "}
            {activeSection.items.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {/* One-column list */}
        <ul className="mt-4 space-y-2.5">
          {activeSection.items.map((item, index) => (
            <li
              key={`${activeSection.id}-${index}`}
              className="
                group flex items-start gap-3
                border-l-4 border-accent
                bg-panel/35
                px-4 py-3
                transition-colors duration-150
                hover:bg-panel-highlight/15
              "
            >
              <span
                aria-hidden="true"
                className="
                  mt-[7px] h-1.5 w-1.5
                  shrink-0 bg-accent
                "
              />

              <p className="text-sm leading-6 text-muted">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </PixelPanel>
  );
}

export default ProjectInsightsPanel;
