import type { IconType } from "react-icons";
import { LuGamepad2, LuGlasses, LuGlobe, LuSparkles } from "react-icons/lu";

import Panel from "../ui/Panel";

type FocusArea = {
  label: string;
  icon: IconType;
};

const focusAreas: FocusArea[] = [
  { label: "Full-stack web", icon: LuGlobe },
  { label: "Games", icon: LuGamepad2 },
  { label: "AI and XR", icon: LuSparkles },
  { label: "Education tech", icon: LuGlasses },
];

function About() {
  return (
    <section id="about" className="scroll-mt-16 px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8">
        <Panel
          className="col-span-12 lg:col-start-3 lg:col-span-8"
          contentClassName="p-6 sm:p-8"
        >
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-accent before:h-0.5 before:w-6 before:rounded-full before:bg-accent">
              About
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Brandon Shin
            </h2>

            <div className="my-5 h-px bg-linear-to-r from-accent/60 via-divider/25 to-transparent" />

            <div className="space-y-4 leading-7 text-muted">
              <p className="text-lg leading-8 text-ink/90">
                I am a computer science graduate from UC Riverside and
                currently a Master of Software Engineering student at
                UC&nbsp;Irvine.
              </p>

              <p>
                Through my professional experience and personal projects, I
                have built web applications, developed games, explored
                emerging technologies such as AI and XR, and created
                educational technology experiences.
              </p>

              <p>
                I enjoy exploring new technologies and combining technical
                problem-solving with creative thinking to build meaningful and
                engaging experiences. I use AI-assisted tools to accelerate
                parts of my workflow while reviewing, testing, and refining
                the results myself.
              </p>
            </div>

            {/* What I work on */}
            <ul aria-label="What I work on" className="mt-6 flex flex-wrap gap-2">
              {focusAreas.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="
                    tag-pop
                    flex items-center gap-1.5
                    rounded-full border border-accent/25
                    bg-accent/8 px-3 py-1.5
                    text-xs font-bold text-ink
                    hover:bg-accent/15
                  "
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>
    </section>
  );
}

export default About;
