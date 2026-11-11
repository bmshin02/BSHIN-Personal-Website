import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { LuArrowDown } from "react-icons/lu";

import { projectCategories, projects } from "../../data/projects";

import type { Project } from "../../data/projects";

import FeaturedProjectCard from "../cards/FeaturedProjectCard";
import ProjectArchiveRow from "../cards/ProjectArchiveRow";
import ProjectDetailPanel from "../panels/ProjectDetailPanel";
import Panel from "../ui/Panel";
import ProjectPanel from "../ui/ProjectPanel";

type ProjectsView = "featured" | "all";

export type ProjectsHandle = {
  closeCaseStudy: () => void;
};

type ProjectsProps = {
  ref?: Ref<ProjectsHandle>;
  onCaseStudyChange?: (isOpen: boolean) => void;
};

const slideDuration = 700;

function Projects({ ref, onCaseStudyChange }: ProjectsProps) {
  const [projectsView, setProjectsView] = useState<ProjectsView>("featured");

  const [activeCategory, setActiveCategory] = useState("All");

  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null,
  );

  const [displayedProject, setDisplayedProject] = useState<Project | null>(
    null,
  );

  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const featuredGridClasses =
    featuredProjects.length === 1
      ? "md:grid-cols-1"
      : featuredProjects.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  const scrollToProjectSection = () => {
    window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleViewChange = (view: ProjectsView) => {
    setProjectsView(view);
    setExpandedProjectId(null);

    if (view === "all") {
      setActiveCategory("All");
    }

    scrollToProjectSection();
  };

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) {
      return;
    }

    setActiveCategory(category);
    setExpandedProjectId(null);
  };

  const handleProjectToggle = (projectId: string) => {
    setExpandedProjectId((currentProjectId) =>
      currentProjectId === projectId ? null : projectId,
    );
  };

  const handleOpenProject = (project: Project) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);

      closeTimeoutRef.current = null;
    }

    /*
     * The list must be visible while it performs
     * the outgoing swipe animation.
     */

    setDisplayedProject(project);
    setExpandedProjectId(null);

    onCaseStudyChange?.(true);

    window.requestAnimationFrame(() => {
      setShowProjectDetails(true);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  };

  const handleCloseProject = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);

      closeTimeoutRef.current = null;
    }

    /*
     * Make the list visible before the track
     * begins swiping back toward it.
     */

    setShowProjectDetails(false);

    onCaseStudyChange?.(false);

    /*
     * Keep the project details mounted until the
     * closing swipe animation has completed.
     */
    closeTimeoutRef.current = window.setTimeout(() => {
      setDisplayedProject(null);
      closeTimeoutRef.current = null;
    }, slideDuration);
  };

  /*
   * Lets the page close the case study, for example
   * when a header link is clicked.
   */
  useImperativeHandle(ref, () => ({
    closeCaseStudy: handleCloseProject,
  }));

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={
        displayedProject
          ? {
              opacity: 1,
              transform: "none",
              filter: "none",
            }
          : undefined
      }
      className="
        isolate scroll-mt-16
        overflow-hidden px-6 py-10
      "
    >
      {/* Case study transition viewport */}
      <div className="relative isolate overflow-hidden">
        {/* Sliding track */}
        <div
          className={`
      flex w-full items-start
      transform-gpu
      transition-transform
      duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
      will-change-transform
      md:duration-700
      motion-reduce:transition-none
      ${showProjectDetails ? "-translate-x-full" : "translate-x-0"}
    `}
        >
          {/* Project list screen */}
          <div
            aria-hidden={showProjectDetails}
            className={`
        relative w-full min-w-full shrink-0
        [backface-visibility:hidden]
        [contain:paint]
        transition-opacity
        duration-150
        motion-reduce:transition-none
        ${showProjectDetails ? "pointer-events-none opacity-0" : "opacity-100"}
      `}
          >
            <div className="mx-auto max-w-7xl">
              {/* Heading */}
              <div className="grid grid-cols-12 gap-8">
                <Panel
                  className="col-span-12 lg:col-start-3 lg:col-span-8"
                  contentClassName="p-5 sm:p-6"
                >
                  <header>
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-accent before:h-0.5 before:w-6 before:rounded-full before:bg-accent sm:text-sm">
                      Projects
                    </p>

                    <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                          {projectsView === "featured"
                            ? "Featured work"
                            : "Project archive"}
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                          {projectsView === "featured"
                            ? "A selection of projects that best represent my work in software, games, and interactive technology."
                            : "Browse my complete collection of applications, games, educational experiences, and software projects."}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewChange("featured")}
                          aria-pressed={projectsView === "featured"}
                          className={`
                      rounded-lg border border-frame/20
                      px-3 py-1.5
                      text-xs font-bold
                      shadow-soft-sm
                      transition duration-150
                      hover:-translate-y-0.5
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40
                      ${
                        projectsView === "featured"
                          ? "bg-accent text-accent-text"
                          : "bg-panel-secondary text-ink hover:bg-panel-highlight hover:text-accent"
                      }
                    `}
                        >
                          Featured
                        </button>

                        <button
                          type="button"
                          onClick={() => handleViewChange("all")}
                          aria-pressed={projectsView === "all"}
                          className={`
                      rounded-lg border border-frame/20
                      px-3 py-1.5
                      text-xs font-bold
                      shadow-soft-sm
                      transition duration-150
                      hover:-translate-y-0.5
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40
                      ${
                        projectsView === "all"
                          ? "bg-accent text-accent-text"
                          : "bg-panel-secondary text-ink hover:bg-panel-highlight hover:text-accent"
                      }
                    `}
                        >
                          All projects
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 h-px bg-linear-to-r from-accent/60 via-divider/25 to-transparent" />

                    {projectsView === "all" && (
                      <div className="mt-5">
                        <div className="flex flex-wrap gap-3">
                          {projectCategories.map((category) => {
                            const isActive = activeCategory === category;

                            return (
                              <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryChange(category)}
                                aria-pressed={isActive}
                                className={`
                            rounded-lg border border-frame/20
                            px-3 py-1.5
                            text-xs font-bold
                            shadow-soft-sm
                            transition duration-150
                            hover:-translate-y-0.5
                            ${
                              isActive
                                ? "bg-accent text-accent-text"
                                : "bg-panel-secondary text-ink hover:bg-panel-highlight hover:text-accent"
                            }
                          `}
                              >
                                {category}
                              </button>
                            );
                          })}
                        </div>

                        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">
                          {filteredProjects.length}{" "}
                          {filteredProjects.length === 1
                            ? "project"
                            : "projects"}
                        </p>
                      </div>
                    )}
                  </header>
                </Panel>
              </div>

              {/* Featured projects */}
              {projectsView === "featured" && (
                <>
                  <div className="mt-7 grid grid-cols-12 gap-8">
                    <div
                      className={`
                  col-span-12 grid items-stretch gap-5
                  lg:col-start-3 lg:col-span-8
                  ${featuredGridClasses}
                `}
                    >
                      {featuredProjects.map((project) => (
                        <FeaturedProjectCard
                          key={project.id}
                          project={project}
                          onOpenProject={handleOpenProject}
                        />
                      ))}

                      {featuredProjects.length === 0 && (
                        <ProjectPanel
                          className="md:col-span-3"
                          contentClassName="p-6 text-center"
                        >
                          <p className="text-sm text-muted">
                            No featured projects have been selected yet.
                          </p>
                        </ProjectPanel>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleViewChange("all")}
                      className="
                  group/browse
                  inline-flex items-center gap-2
                  rounded-xl border border-frame/20
                  bg-panel-secondary px-5 py-2.5
                  text-sm font-bold text-ink
                  shadow-soft
                  transition duration-150
                  hover:-translate-y-0.5
                  hover:border-accent/40
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
                      Browse all projects
                      <LuArrowDown
                        aria-hidden="true"
                        className="
                          h-4 w-4 text-accent
                          transition-transform duration-200
                          group-hover/browse:translate-y-0.5
                        "
                      />
                    </button>
                  </div>
                </>
              )}

              {/* Project archive */}
              {projectsView === "all" && (
                <>
                  <div className="mt-7 grid grid-cols-12 gap-8">
                    <div className="col-span-12 space-y-4 lg:col-start-3 lg:col-span-8">
                      {filteredProjects.map((project) => (
                        <ProjectArchiveRow
                          key={project.id}
                          project={project}
                          expanded={expandedProjectId === project.id}
                          onToggle={handleProjectToggle}
                          onOpenProject={handleOpenProject}
                        />
                      ))}

                      {filteredProjects.length === 0 && (
                        <ProjectPanel contentClassName="p-6 text-center">
                          <p className="text-sm text-muted">
                            No projects are currently available in this
                            category.
                          </p>
                        </ProjectPanel>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleViewChange("featured")}
                      className="
                  rounded-lg border border-frame/20
                  bg-panel-secondary px-5 py-2.5
                  text-sm font-bold text-ink
                  shadow-soft
                  transition duration-150
                  hover:-translate-y-0.5
                  hover:bg-panel-highlight
                  hover:text-accent
                  active:translate-y-px
                  active:shadow-soft-sm
                "
                    >
                      ↑ Back to featured projects
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Case study screen */}
          <div
            aria-hidden={!showProjectDetails}
            className={`
        relative w-full min-w-full shrink-0
        [backface-visibility:hidden]
        [contain:paint]
        transition-opacity
        duration-300
        motion-reduce:transition-none
        ${showProjectDetails ? "opacity-100" : "pointer-events-none opacity-0"}
      `}
          >
            <div className="mx-auto max-w-7xl">
              {displayedProject && (
                <ProjectDetailPanel
                  key={displayedProject.id}
                  project={displayedProject}
                  allProjects={projects}
                  onBack={handleCloseProject}
                  onOpenProject={handleOpenProject}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
