import type { Project } from "../../data/projects";

import ExternalProjectLinks from "../ui/ExternalProjectLinks";
import PixelPanel from "../ui/PixelPanel";
import ProjectStatusBadge from "../ui/ProjectStatusBadge";
import WinnerBadge from "../ui/WinnerBadge";
import TechnologyTags from "../ui/TechnologyTags";

import ProjectInsightsPanel from "./ProjectInsightsPanel";

type ProjectDetailPanelProps = {
  project: Project;
  onBack: () => void;
};

function ProjectDetailPanel({ project, onBack }: ProjectDetailPanelProps) {
  /*
   * Empty values are removed before rendering.
   * This prevents broken media elements and blank
   * category badges from appearing.
   */
  const hasVideo = Boolean(project.youtubeUrl?.trim());
  const hasMainImage = Boolean(project.image?.trim());
  const hasCategory = Boolean(project.category?.trim());

  const galleryImages = project.gallery.filter(
    (image) => image.trim().length > 0,
  );

  const hasGallery = galleryImages.length > 0;

  return (
    <div className="pb-10">
      {/* Top back button */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-start-3 lg:col-span-8">
          <button
            type="button"
            onClick={onBack}
            className="
              border-2 border-frame
              bg-panel-secondary px-4 py-2
              text-sm font-bold text-ink
              shadow-[3px_3px_0_var(--theme-shadow)]
              transition duration-150
              hover:-translate-x-0.5
              hover:-translate-y-0.5
              hover:bg-panel-highlight
              hover:text-accent
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-accent/40
              active:translate-x-0.5
              active:translate-y-0.5
              active:shadow-none
            "
          >
            ← Back to projects
          </button>
        </div>
      </div>

      {/* Project heading and preview */}
      <div className="mt-6 grid grid-cols-12 gap-8">
        <PixelPanel
          className="
            col-span-12
            lg:col-start-3 lg:col-span-8
          "
          contentClassName="p-5 sm:p-8"
        >
          <header
            className={`
              grid gap-6
              ${
                hasMainImage
                  ? "md:grid-cols-[minmax(0,1fr)_220px] md:items-center"
                  : ""
              }
            `}
          >
            {/* Project information */}
            <div className="min-w-0">
              {/* Project title */}
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                {project.title}
              </h2>

              {/* Category, status, and date */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {hasCategory && (
                  <span
                    className="
                      border border-frame
                      bg-panel-secondary px-2 py-1
                      text-[10px] font-bold uppercase
                      tracking-wide text-muted
                    "
                  >
                    {project.category}
                  </span>
                )}

                <ProjectStatusBadge status={project.status} />

                {project.winner && <WinnerBadge />}

                <span className="text-xs font-bold uppercase tracking-wide text-accent">
                  {project.date}
                </span>
              </div>

              <p className="mt-4 max-w-3xl whitespace-pre-line text-base leading-7 text-muted">
                {project.description}
              </p>

              <div className="mt-5">
                <TechnologyTags technologies={project.technologies} />
              </div>
            </div>

            {/* Small project preview */}
            {hasMainImage && (
              <div
                className="
                  w-full max-w-sm
                  justify-self-center
                  md:max-w-none
                  md:justify-self-end
                "
              >
                <img
                  src={project.image}
                  alt={project.imageAlt || `${project.title} preview`}
                  className="
                    aspect-video w-full object-cover
                    border-4 border-frame
                    bg-panel
                    shadow-[4px_4px_0_var(--theme-shadow)]
                  "
                />
              </div>
            )}
          </header>
        </PixelPanel>
      </div>

      {/* Video */}
      {hasVideo && (
        <div className="mt-8 grid grid-cols-12 gap-8">
          <PixelPanel
            className="
              col-span-12
              lg:col-start-3 lg:col-span-8
            "
            contentClassName="overflow-hidden"
          >
            <div
              className="
                border-b-2 border-dashed
                border-divider/50
                px-5 py-4 sm:px-6
              "
            >
              <p className="pt-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
                Project video
              </p>

              <h3 className=" mt-1 text-2xl font-bold text-ink sm:text-3xl">
                Project demonstration
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                A demonstration of the project’s gameplay, systems, and
                interactions.
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <iframe
                src={project.youtubeUrl}
                title={`${project.title} demonstration`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="
                  aspect-video w-full
                  border-4 border-frame
                  bg-frame
                  shadow-[4px_4px_0_var(--theme-shadow)]
                "
              />
            </div>
          </PixelPanel>
        </div>
      )}

      {/* Gallery */}
      {hasGallery && (
        <section className="mt-8">
          <div className="grid grid-cols-12 gap-8">
            <PixelPanel
              variant="secondary"
              shadowSize={4}
              className="
                col-span-12
                lg:col-start-3 lg:col-span-8
              "
              contentClassName="p-5 sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                Project gallery
              </p>

              <h3 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
                Screenshots and visuals
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                A closer look at the project’s interface, gameplay, and systems.
              </p>
            </PixelPanel>
          </div>

          <div className="mt-5 grid grid-cols-12 gap-8">
            <div
              className="
                col-span-12 grid gap-5
                sm:grid-cols-2
                lg:col-start-3 lg:col-span-8
              "
            >
              {galleryImages.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  loading="lazy"
                  className="
                    aspect-video w-full object-cover
                    border-4 border-frame
                    bg-panel
                    shadow-[5px_5px_0_var(--theme-shadow)]
                  "
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Role and problem */}
      {(project.role || project.problem) && (
        <div className="mt-8 grid grid-cols-12 gap-8">
          <div
            className="
              col-span-12 grid items-stretch gap-5
              md:grid-cols-2
              lg:col-start-3 lg:col-span-8
            "
          >
            {project.role && (
              <PixelPanel
                variant="secondary"
                shadowSize={4}
                className="h-full"
                contentClassName="h-full p-5 sm:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  My role
                </p>

                <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  What I worked on
                </h3>

                <div className="mt-4 border-t border-dashed border-divider/50" />

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                  {project.role}
                </p>
              </PixelPanel>
            )}

            {project.problem && (
              <PixelPanel
                variant="secondary"
                shadowSize={4}
                className="h-full"
                contentClassName="h-full p-5 sm:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  The problem
                </p>

                <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
                  What did it solve
                </h3>

                <div className="mt-4 border-t border-dashed border-divider/50" />

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                  {project.problem}
                </p>
              </PixelPanel>
            )}
          </div>
        </div>
      )}

      {/* Solution */}
      {project.solution && (
        <div className="mt-6 grid grid-cols-12 gap-8">
          <PixelPanel
            variant="secondary"
            shadowSize={4}
            className="
              col-span-12
              lg:col-start-3 lg:col-span-8
            "
            contentClassName="p-5 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              The solution
            </p>

            <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
              How I approached it
            </h3>

            <div className="mt-4 border-t border-dashed border-divider/50" />

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
              {project.solution}
            </p>
          </PixelPanel>
        </div>
      )}

      {/* Features, challenges, and results */}
      {(project.features.length > 0 ||
        project.challenges.length > 0 ||
        project.results.length > 0) && (
        <div className="mt-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-start-3 lg:col-span-8">
            <ProjectInsightsPanel
              key={project.id}
              features={project.features}
              challenges={project.challenges}
              results={project.results}
            />
          </div>
        </div>
      )}

      {/* External links */}
      {project.links.length > 0 && (
        <div className="mt-8 grid grid-cols-12 gap-8">
          <PixelPanel
            variant="secondary"
            shadowSize={4}
            className="
              col-span-12
              lg:col-start-3 lg:col-span-8
            "
            contentClassName="p-5 sm:p-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Explore the project
            </p>

            <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
              Project links
            </h3>

            <div className="mt-4 border-t border-dashed border-divider/50" />

            <div className="mt-5 flex flex-wrap gap-3">
              <ExternalProjectLinks project={project} />
            </div>
          </PixelPanel>
        </div>
      )}

      {/* Bottom back button */}
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div
          className="
            col-span-12 flex justify-center
            lg:col-start-3 lg:col-span-8
          "
        >
          <button
            type="button"
            onClick={onBack}
            className="
              border-2 border-frame
              bg-panel-secondary px-5 py-2.5
              text-sm font-bold text-ink
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
            ← Back to projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPanel;
