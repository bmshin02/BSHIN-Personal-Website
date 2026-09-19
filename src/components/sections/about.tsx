import PixelPanel from "../ui/pixelpanel";

const skills = ["Software", "Web", "Game", "Full Stack", "AI"];

// const skills = ["React", "TypeScript", "Unity", "C#", "Python", "AR / VR"];

function About() {
  return (
    <section id="about" className="scroll-mt-16 px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8">
        <PixelPanel
          className="col-span-12 lg:col-start-3 lg:col-span-8"
          contentClassName="p-6 sm:p-8"
        >
          <div className="grid items-start gap-8 md:grid-cols-[180px_minmax(0,1fr)]">
            {/* Profile image */}
            <div className="mx-auto w-44 md:mx-0 md:w-full">
              <img
                src="/images/profile2.png"
                alt="Brandon Shin"
                className="
                  aspect-square w-full object-cover
                  border-4 border-frame
                  bg-panel-secondary
                  shadow-[5px_5px_0_var(--theme-shadow)]
                "
              />
            </div>

            {/* About content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">
                About
              </p>

              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                Brandon Shin
              </h2>

              <div className="my-5 border-t-2 border-dashed border-divider/50" />

              <div className="space-y-4 leading-7 text-muted">
                <p>
                  I am a computer science graduate from UC Riverside and
                  currently a Master of Software Engineering student at UC
                  Irvine.
                </p>

                <p>
                  <p>
                    Through my professional experience and personal projects, I
                    have built web applications, developed games, explored
                    emerging technologies such as AI and XR, and created
                    educational technology experiences.
                  </p>
                </p>

                <p>
                  I enjoy exploring new technologies and combining technical
                  problem-solving with creative thinking to build meaningful and
                  engaging experiences. I use AI-assisted tools to accelerate
                  parts of my workflow while reviewing, testing, and refining
                  the results myself.
                </p>
              </div>

              {/* Skill tags */}
              <div className="mt-6 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      border-2 border-frame
                      bg-panel-secondary px-3 py-1.5
                      text-xs font-bold text-ink
                      shadow-[2px_2px_0_var(--theme-shadow)]
                      transition duration-150
                      hover:-translate-x-0.5
                      hover:-translate-y-0.5
                      hover:bg-panel-highlight
                      hover:text-accent
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  );
}

export default About;
