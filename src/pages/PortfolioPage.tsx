import { useLayoutEffect, useRef, useState } from "react";

import Header from "../components/layout/Header";
import Background from "../components/layout/Background";
import SectionFadeManager from "../components/ui/SectionFadeManager";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Education from "../components/sections/Education";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

function PortfolioPage() {
  const [isProjectCaseStudyOpen, setIsProjectCaseStudyOpen] = useState(false);

  const wasCaseStudyOpenRef = useRef(false);

  /*
   * When the case study closes, the hidden homepage
   * sections return. Move directly to Projects before
   * the browser paints the restored page.
   */
  useLayoutEffect(() => {
    const wasCaseStudyOpen = wasCaseStudyOpenRef.current;

    if (wasCaseStudyOpen && !isProjectCaseStudyOpen) {
      const projectsSection = document.getElementById("projects");

      if (projectsSection) {
        const htmlElement = document.documentElement;

        const previousScrollBehavior = htmlElement.style.scrollBehavior;

        /*
         * Temporarily override your global
         * scroll-behavior: smooth setting.
         */
        htmlElement.style.scrollBehavior = "auto";

        const headerHeight = 64;

        const projectTop =
          projectsSection.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: projectTop,
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

          <Projects onCaseStudyChange={setIsProjectCaseStudyOpen} />

          {!isProjectCaseStudyOpen && <Contact />}
        </main>
      </div>
    </div>
  );
}

export default PortfolioPage;
