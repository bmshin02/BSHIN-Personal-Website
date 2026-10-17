import { useLayoutEffect, useRef, useState } from "react";

import Header from "../components/layout/Header";
import Background from "../components/layout/Background";
import SectionFadeManager from "../components/ui/SectionFadeManager";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Education from "../components/sections/Education";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects, {
  type ProjectsHandle,
} from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

function PortfolioPage() {
  const [isProjectCaseStudyOpen, setIsProjectCaseStudyOpen] = useState(false);

  const wasCaseStudyOpenRef = useRef(false);

  const projectsRef = useRef<ProjectsHandle>(null);

  /*
   * Section to show once the case study closes.
   * Header links can change it; otherwise it is Projects.
   */
  const returnSectionIdRef = useRef("projects");

  const handleCaseStudyExit = (sectionId: string) => {
    returnSectionIdRef.current = sectionId;
    projectsRef.current?.closeCaseStudy();
  };

  /*
   * When the case study closes, the hidden homepage
   * sections return. Move directly to the return section
   * before the browser paints the restored page.
   */
  useLayoutEffect(() => {
    const wasCaseStudyOpen = wasCaseStudyOpenRef.current;

    if (wasCaseStudyOpen && !isProjectCaseStudyOpen) {
      const returnSection = document.getElementById(
        returnSectionIdRef.current,
      );

      returnSectionIdRef.current = "projects";

      if (returnSection) {
        const htmlElement = document.documentElement;

        const previousScrollBehavior = htmlElement.style.scrollBehavior;

        /*
         * Temporarily override your global
         * scroll-behavior: smooth setting.
         */
        htmlElement.style.scrollBehavior = "auto";

        const headerHeight = 64;

        /*
         * Home is the top of the page. Measuring it here
         * would include its fade-in offset.
         */
        const returnSectionTop =
          returnSection.id === "home"
            ? 0
            : returnSection.getBoundingClientRect().top +
              window.scrollY -
              headerHeight;

        window.scrollTo({
          top: returnSectionTop,
          left: 0,
          behavior: "auto",
        });

        htmlElement.style.scrollBehavior = previousScrollBehavior;
      }
    }

    wasCaseStudyOpenRef.current = isProjectCaseStudyOpen;
  }, [isProjectCaseStudyOpen]);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-page text-ink">
      {/* Background layer */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Background
          dotSize={1}
          gap={35}
          baseColor="#395254"
          glowColor="#ffefde"
          proximity={80}
          glowIntensity={0.5}
          waveSpeed={10}
          driftAmount={3}
          driftSpeed={3}
        />
      </div>

      {/* Website content */}
      <div className="relative z-10">
        <Header
          forcedActiveHref={isProjectCaseStudyOpen ? "#projects" : null}
          caseStudyOpen={isProjectCaseStudyOpen}
          onCaseStudyExit={handleCaseStudyExit}
        />

        <main className="pt-16">
          {!isProjectCaseStudyOpen && <SectionFadeManager />}

          {!isProjectCaseStudyOpen && (
            <>
              <Hero />
              <About />
              <Education />
              <Experience />
              <Skills />
            </>
          )}

          <Projects
            ref={projectsRef}
            onCaseStudyChange={setIsProjectCaseStudyOpen}
          />

          {!isProjectCaseStudyOpen && <Contact />}
        </main>
      </div>
    </div>
  );
}

export default PortfolioPage;
