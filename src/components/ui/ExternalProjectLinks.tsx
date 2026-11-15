import type { IconType } from "react-icons";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { LuArrowUpRight, LuExternalLink, LuGamepad2, LuGlobe } from "react-icons/lu";
import { SiDevpost } from "react-icons/si";

import type { Project } from "../../data/projects";

type ExternalProjectLinksProps = {
  project: Project;
  compact?: boolean;
  /* Square icon buttons with the label as a tooltip (used on project cards). */
  iconOnly?: boolean;
};

/* Picks an icon from the link's label, e.g. "Source Code" -> GitHub. */
function getLinkIcon(label: string): IconType {
  const name = label.toLowerCase();

  if (name.includes("github") || name.includes("source")) return FaGithub;
  if (name.includes("devpost")) return SiDevpost;
  if (name.includes("youtube")) return FaYoutube;
  if (name.includes("game")) return LuGamepad2;
  if (name.includes("demo") || name.includes("site")) return LuGlobe;

  return LuExternalLink;
}

function ExternalProjectLinks({
  project,
  compact = false,
  iconOnly = false,
}: ExternalProjectLinksProps) {
  if (project.links.length === 0) {
    return null;
  }

  return (
    <>
      {project.links.map((link) => {
        const Icon = getLinkIcon(link.label);

        if (iconOnly) {
          return (
            <a
              key={`${project.id}-${link.label}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (opens in a new tab)`}
              title={link.label}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg border border-frame/20
                bg-panel text-ink
                shadow-soft-sm
                transition duration-150
                hover:-translate-y-0.5
                hover:border-accent/40
                hover:bg-panel-highlight
                hover:text-accent
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-accent/40
                active:translate-y-px
                active:shadow-soft-sm
              "
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </a>
          );
        }

        return (
          <a
            key={`${project.id}-${link.label}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center gap-1.5
              rounded-lg border border-frame/20
              bg-panel font-bold text-ink
              shadow-soft-sm
              transition duration-150
              hover:-translate-y-0.5
              hover:bg-panel-highlight
              hover:text-accent
              active:translate-y-px
              active:shadow-soft-sm
              ${compact ? "px-2.5 py-1.5 text-[11px]" : "px-3 py-1.5 text-xs"}
            `}
          >
            <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-accent" />
            {link.label}
            <LuArrowUpRight aria-hidden="true" className="h-3 w-3 shrink-0 text-muted" />
          </a>
        );
      })}
    </>
  );
}

export default ExternalProjectLinks;
