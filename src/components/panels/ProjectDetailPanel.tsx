import { useState, type ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendar,
  LuExpand,
  LuLayers,
  LuLightbulb,
  LuTarget,
  LuUserRound,
} from "react-icons/lu";

import type { Project } from "../../data/projects";

import ExternalProjectLinks from "../ui/ExternalProjectLinks";
import ImageLightbox from "../ui/ImageLightbox";
import Panel from "../ui/Panel";
import ProjectStatusBadge from "../ui/ProjectStatusBadge";
import WinnerBadge from "../ui/WinnerBadge";
import TechnologyTags from "../ui/TechnologyTags";

import ProjectInsightsPanel from "./ProjectInsightsPanel";

type ProjectDetailPanelProps = {
  project: Project;
  /* Every project, in display order, for the previous / next links. */
  allProjects: Project[];
  onBack: () => void;
  onOpenProject: (project: Project) => void;
};

/* The case study sits in the middle eight of twelve columns on large screens. */
const columnClass = "col-span-12 lg:col-start-3 lg:col-span-8";

function Row({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-12 gap-8 ${className}`}>
      <div className={columnClass}>{children}</div>
    </div>
  );
}

/* Small eyebrow label with an accent bar, matching the section headings. */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="
        flex items-center gap-3
        text-xs font-bold uppercase tracking-[0.22em] text-accent
        before:h-0.5 before:w-6 before:rounded-full before:bg-accent
      "
    >
      {children}
    </p>
  );
}

const backButtonClass = `
  group/back
  inline-flex items-center gap-2
  rounded-xl border border-frame/20
  bg-panel-secondary px-4 py-2
  text-sm font-bold text-ink
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
`;

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" onClick={onBack} className={backButtonClass}>
      <LuArrowLeft
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-hover/back:-translate-x-0.5"
      />
      Back to projects
    </button>
  );
}

type StoryPart = {
  label: string;
  icon: IconType;
  text: string;
};

function ProjectDetailPanel({
  project,
  allProjects,
  onBack,
  onOpenProject,
}: ProjectDetailPanelProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /*
   * Empty values are removed before rendering.
   * This prevents broken media elements and blank
   * category badges from appearing.
   */
  const hasVideo = Boolean(project.youtubeUrl?.trim());
  const hasMainImage = Boolean(project.image?.trim());
  const hasCategory = Boolean(project.category?.trim());

  const screenshots = project.gallery.filter(
    (image) => image.trim().length > 0,
  );

  /*
   * With a video on top, the cover image would otherwise never show,
   * so it leads the gallery instead.
   */
  const galleryImages =
    hasVideo && hasMainImage && !screenshots.includes(project.image)
      ? [project.image, ...screenshots]
      : screenshots;

  const hasGallery = galleryImages.length > 0;

  const storyParts: StoryPart[] = [
    { label: "The problem", icon: LuTarget, text: project.problem },
    { label: "The solution", icon: LuLightbulb, text: project.solution },
    { label: "My role", icon: LuUserRound, text: project.role },
  ].filter((part) => part.text?.trim());

  const hasInsights =
    project.features.length > 0 ||
    project.challenges.length > 0 ||
    project.results.length > 0;

  /* Previous and next projects wrap around the list. */
  const currentIndex = allProjects.findIndex((item) => item.id === project.id);
  const hasNeighbours = currentIndex !== -1 && allProjects.length > 1;
  const previousProject = hasNeighbours
    ? allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]
    : null;
  const nextProject = hasNeighbours
    ? allProjects[(currentIndex + 1) % allProjects.length]
    : null;

  return (
    <div className="pb-10">
      {/* Top back button */}
      <Row>
        <BackButton onBack={onBack} />
      </Row>

      {/* Project heading */}
      <Row className="mt-6">
        <Panel contentClassName="p-5 sm:p-8">
          <header>
            <Eyebrow>Case study</Eyebrow>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {project.title}
              </h2>

              {project.winner && (
                <div className="pt-1.5">
                  <WinnerBadge />
                </div>
              )}
            </div>

            <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-7 text-muted">
              {project.description}
            </p>

            <div className="mt-5">
              <TechnologyTags technologies={project.technologies} />
            </div>

            {/* Key facts and links */}
            <div
              className="
                mt-6 flex flex-col gap-5
                border-t border-divider/25 pt-5
                md:flex-row md:items-center md:justify-between
              "
            >
              <dl className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    <LuCalendar aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                    Timeline
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {project.date}
                  </dd>
                </div>

                {hasCategory && (
                  <div>
                    <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      <LuLayers aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                      Type
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">
                      {project.category}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    Status
                  </dt>
                  <dd className="mt-1">
                    <ProjectStatusBadge status={project.status} />
                  </dd>
                </div>
              </dl>

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <ExternalProjectLinks project={project} />
                </div>
              )}
            </div>
          </header>
        </Panel>
      </Row>

      {/* Video, or the cover image when there is no video */}
      {(hasVideo || hasMainImage) && (
        <Row className="mt-8">
          <Panel contentClassName="p-5 sm:p-6">
            <Eyebrow>{hasVideo ? "Demo" : "Preview"}</Eyebrow>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              {hasVideo ? "See it in action" : "A look at the project"}
            </h3>

            <div className="mt-5">
              {hasVideo ? (
                <iframe
                  src={project.youtubeUrl}
                  title={`${project.title} demonstration`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="
                    aspect-video w-full
                    rounded-xl border border-frame/20
                    bg-black
                    shadow-soft
                  "
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.imageAlt || `${project.title} preview`}
                  className="
                    aspect-video w-full object-cover
                    rounded-xl border border-frame/20
                    bg-panel
                    shadow-soft
                  "
                />
              )}
            </div>
          </Panel>
        </Row>
      )}

      {/* Overview: problem, solution and role */}
      {storyParts.length > 0 && (
        <Row className="mt-8">
          <Panel contentClassName="p-5 sm:p-8">
            <Eyebrow>Overview</Eyebrow>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Why I built it and how
            </h3>

            <div className="mt-6 divide-y divide-divider/20">
              {storyParts.map(({ label, icon: Icon, text }) => (
                <div
                  key={label}
                  className="
                    grid gap-3 py-5 first:pt-0 last:pb-0
                    md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8
                  "
                >
                  <h4 className="flex items-center gap-3 self-start text-sm font-bold text-ink">
                    <span
                      aria-hidden="true"
                      className="
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-lg border border-accent/25
                        bg-accent/10 text-accent
                      "
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </h4>

                  <p className="whitespace-pre-line text-sm leading-7 text-muted md:pt-1">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </Row>
      )}

      {/* Gallery */}
      {hasGallery && (
        <Row className="mt-8">
          <Panel contentClassName="p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Gallery</Eyebrow>

                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                  Screenshots
                </h3>
              </div>

              <p className="text-xs font-semibold text-muted">
                {galleryImages.length}{" "}
                {galleryImages.length === 1 ? "image" : "images"}
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {galleryImages.map((image, index) => {
                /* An odd count lets the first image span the full width. */
                const isWide =
                  index === 0 && galleryImages.length % 2 === 1;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open screenshot ${index + 1} of ${galleryImages.length}`}
                    className={`
                      group/shot relative block overflow-hidden
                      rounded-xl border border-frame/20
                      bg-panel shadow-soft-sm
                      transition duration-200
                      hover:border-accent/40 hover:shadow-soft
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40
                      ${isWide ? "sm:col-span-2" : ""}
                    `}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="
                        aspect-video w-full object-cover
                        transition-transform duration-500
                        group-hover/shot:scale-[1.03]
                      "
                    />

                    <span
                      aria-hidden="true"
                      className="
                        absolute bottom-2.5 right-2.5
                        flex h-8 w-8 items-center justify-center
                        rounded-lg bg-black/55 text-white
                        opacity-0 backdrop-blur-sm
                        transition-opacity duration-200
                        group-hover/shot:opacity-100
                        group-focus-visible/shot:opacity-100
                      "
                    >
                      <LuExpand className="h-4 w-4" />
                    </span>
                  </button>
                );
              })}
            </div>
          </Panel>
        </Row>
      )}

      {/* Features, challenges, and results */}
      {hasInsights && (
        <Row className="mt-8">
          <ProjectInsightsPanel
            key={project.id}
            features={project.features}
            challenges={project.challenges}
            results={project.results}
          />
        </Row>
      )}

      {/* Previous and next projects */}
      {previousProject && nextProject && (
        <Row className="mt-8">
          <nav
            aria-label="More projects"
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              { item: previousProject, label: "Previous project", next: false },
              { item: nextProject, label: "Next project", next: true },
            ].map(({ item, label, next }) => (
              <button
                key={label}
                type="button"
                onClick={() => onOpenProject(item)}
                className={`
                  group/nav flex min-w-0 items-center gap-4
                  rounded-2xl border border-frame/15
                  bg-panel p-3 text-left
                  shadow-card
                  transition-[translate,border-color,box-shadow] duration-200
                  hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-accent/40
                  ${next ? "sm:flex-row-reverse sm:text-right" : ""}
                `}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="
                      aspect-video w-24 shrink-0
                      rounded-lg border border-frame/20
                      object-cover
                    "
                  />
                ) : null}

                <span className="min-w-0 flex-1">
                  <span
                    className={`
                      flex items-center gap-1.5
                      text-[10px] font-bold uppercase tracking-[0.16em] text-muted
                      ${next ? "sm:justify-end" : ""}
                    `}
                  >
                    {!next && (
                      <LuArrowLeft
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-accent transition-transform duration-200 group-hover/nav:-translate-x-0.5"
                      />
                    )}
                    {label}
                    {next && (
                      <LuArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-accent transition-transform duration-200 group-hover/nav:translate-x-0.5"
                      />
                    )}
                  </span>

                  <span className="mt-1 block truncate text-sm font-bold text-ink transition-colors group-hover/nav:text-accent">
                    {item.title}
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </Row>
      )}

      {/* Bottom back button */}
      <div className="mt-10 flex justify-center">
        <BackButton onBack={onBack} />
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          index={lightboxIndex}
          title={project.title}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default ProjectDetailPanel;
