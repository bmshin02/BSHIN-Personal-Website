import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { IconType } from "react-icons";
import { LuCheck, LuTrophy, LuWrench } from "react-icons/lu";

import Panel from "../ui/Panel";

type ProjectInsightSection = "features" | "challenges" | "results";

type ProjectInsightsPanelProps = {
  features: string[];
  challenges: string[];
  results: string[];
};

type InsightSection = {
  id: ProjectInsightSection;
  label: string;
  icon: IconType;
  items: string[];
};

function ProjectInsightsPanel({
  features,
  challenges,
  results,
}: ProjectInsightsPanelProps) {
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const sections: InsightSection[] = [
    { id: "features", label: "Features", icon: LuCheck, items: features },
    { id: "challenges", label: "Challenges", icon: LuWrench, items: challenges },
    { id: "results", label: "Results", icon: LuTrophy, items: results },
  ];

  const availableSections = sections.filter(
    (section) => section.items.length > 0,
  );

  const [activeSectionId, setActiveSectionId] = useState<ProjectInsightSection>(
    availableSections[0]?.id ?? "features",
  );

  const activeIndex = Math.max(
    availableSections.findIndex((section) => section.id === activeSectionId),
    0,
  );

  const activeSection = availableSections[activeIndex];

  if (!activeSection) {
    return null;
  }

  /* Arrow keys move between tabs, as in a standard tab list. */
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = availableSections.length;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (activeIndex + 1) % count;
    if (event.key === "ArrowLeft") nextIndex = (activeIndex - 1 + count) % count;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = count - 1;

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    setActiveSectionId(availableSections[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const ActiveIcon = activeSection.icon;

  return (
    <Panel contentClassName="p-5 sm:p-6">
      {/* Panel heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="
              flex items-center gap-3
              text-xs font-bold uppercase tracking-[0.22em] text-accent
              before:h-0.5 before:w-6 before:rounded-full before:bg-accent
            "
          >
            Breakdown
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
            What went into it
          </h3>
        </div>

        {/* Section tabs */}
        <div
          role="tablist"
          aria-label="Project breakdown"
          className="
            inline-flex self-start rounded-xl
            border border-frame/20 bg-panel-secondary p-1
            sm:self-auto
          "
        >
          {availableSections.map((section, index) => {
            const isActive = section.id === activeSection.id;

            return (
              <button
                key={section.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${baseId}-tab-${section.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveSectionId(section.id)}
                onKeyDown={handleTabKey}
                className={`
                  flex items-center gap-1.5
                  rounded-lg px-3 py-1.5
                  text-xs font-bold
                  transition duration-150
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-accent/40
                  ${
                    isActive
                      ? "bg-accent text-accent-text shadow-soft-sm"
                      : "text-muted hover:text-ink"
                  }
                `}
              >
                {section.label}
                <span
                  className={`
                    rounded-full px-1.5 text-[10px] tabular-nums
                    ${isActive ? "bg-accent-text/15" : "bg-frame/10"}
                  `}
                >
                  {section.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected section */}
      <ul
        key={activeSection.id}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeSection.id}`}
        className="
          insight-list mt-6 grid gap-x-6 gap-y-1
          md:grid-cols-2
        "
      >
        {activeSection.items.map((item, index) => (
          <li
            key={`${activeSection.id}-${index}`}
            style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
            className="
              flex items-start gap-3
              border-b border-divider/15
              py-3
            "
          >
            <span
              aria-hidden="true"
              className="
                mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center
                rounded-md border border-accent/25
                bg-accent/10 text-accent
              "
            >
              <ActiveIcon className="h-3.5 w-3.5" />
            </span>

            <p className="text-sm leading-6 text-muted">{item}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export default ProjectInsightsPanel;
