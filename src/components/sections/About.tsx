import type { IconType } from "react-icons";
import {
  LuArrowUpRight,
  LuBot,
  LuBriefcase,
  LuTrophy,
  LuGraduationCap,
  LuMusic,
  LuSearch,
} from "react-icons/lu";

import Panel from "../ui/Panel";

type Fact = {
  label: string;
  value: string;
  detail: string;
  icon: IconType;
  /* Section the card links to, if any. */
  href?: string;
  /* Marks the card as current with a pulsing dot. */
  live?: boolean;
};

const facts: Fact[] = [
  {
    label: "Now",
    value: "Software Engineer",
    detail: "Building AI Agents at Beyond3",
    icon: LuBriefcase,
    href: "#experience",
    live: true,
  },
  {
    label: "Studying",
    value: "M.S. Software Engineering",
    detail: "UC Irvine, Graduating Dec 2027",
    icon: LuGraduationCap,
    href: "#education",
  },
  {
    label: "Looking for",
    value: "Summer 2027 Internship",
    detail: "Full-Time Roles After Dec 2027",
    icon: LuSearch,
    href: "#contact",
  },
  {
    label: "Featured",
    value: "SignLingo at ZotHack",
    detail: "Winner of Best Overall",
    icon: LuTrophy,
    href: "#projects",
  },
  {
    label: "What I build",
    value: "AI Agents, Apps, Games",
    detail: "Hackathon to Production",
    icon: LuBot,
    href: "#projects",
  },
  {
    label: "Off hours",
    value: "Music, Gym, Pickleball",
    detail: "I Also Love Games!",
    icon: LuMusic,
  },
];

function About() {
  return (
    <section id="about" className="scroll-mt-16 px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-x-4 gap-y-8 sm:gap-x-8">
        <Panel
          className="col-span-12 lg:col-start-3 lg:col-span-8"
          contentClassName="p-6 sm:p-8"
        >
          <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-accent before:h-0.5 before:w-6 before:rounded-full before:bg-accent">
            About
          </p>

          <h2 className="mt-3 text-4xl font-pixel font-normal text-ink sm:text-5xl">
            A bit about me
          </h2>

          <p className="mt-3 text-base leading-7 text-muted">
            I'm looking for a software engineering internship for Summer 2027
            and full-time roles after December 2027. Right now I'm a software
            engineer at Beyond3, a startup in Irvine, where I build AI agents
            and full-stack features, while finishing my Master's at
            UC&nbsp;Irvine. Outside work I build apps and games, and I spend my
            free time creating music and participating in hackathons.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {facts.map(({ label, value, detail, icon: Icon, href, live }) => {
              const content = (
                <>
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className="
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-lg bg-accent/10 text-accent
                        transition-colors duration-200
                        group-hover/fact:bg-accent group-hover/fact:text-accent-text
                      "
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                      {label}
                    </span>

                    {live && (
                      <span aria-hidden="true" className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                    )}

                    {href && (
                      <LuArrowUpRight
                        aria-hidden="true"
                        className="
                          ml-auto h-4 w-4 text-muted opacity-0
                          transition duration-200
                          group-hover/fact:translate-x-0.5 group-hover/fact:-translate-y-0.5
                          group-hover/fact:text-accent group-hover/fact:opacity-100
                          group-focus-visible/fact:opacity-100
                        "
                      />
                    )}
                  </div>

                  <p className="mt-3 text-lg font-pixel font-normal leading-6 text-ink">
                    {value}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted">{detail}</p>
                </>
              );

              const cardClasses = `
                group/fact block h-full
                rounded-xl border border-frame/15
                bg-panel-secondary p-4
                shadow-soft-sm
                transition duration-200
                ${href ? "hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40" : ""}
              `;

              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className={cardClasses}>
                      {content}
                    </a>
                  ) : (
                    <div className={cardClasses}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </section>
  );
}

export default About;
