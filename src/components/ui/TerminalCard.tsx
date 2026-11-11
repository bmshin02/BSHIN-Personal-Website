import { useEffect, useState, type ReactNode } from "react";

import { experiences } from "../../data/experiences";
import { projects } from "../../data/projects";

type TerminalLine =
  | { kind: "command"; text: string }
  | { kind: "output"; text: string; mark?: "star" | "dot" };

/* "Junior Full-Stack Engineer (Contract)" -> "Junior Full-Stack Engineer" */
function shortRole(role: string) {
  return role.replace(/\s*\(.*?\)\s*$/, "");
}

/*
 * The script the terminal types. The current job and the featured
 * projects come from the data files, so they stay up to date.
 * Edit the fixed lines here.
 */
function buildScript(): TerminalLine[] {
  const lines: TerminalLine[] = [
    { kind: "command", text: "whoami" },
    { kind: "output", text: "Software developer · California" },
  ];

  const currentJob = experiences.find((item) => /present/i.test(item.date));

  if (currentJob) {
    lines.push(
      { kind: "command", text: "now" },
      {
        kind: "output",
        text: `${shortRole(currentJob.role)} @ ${currentJob.company}`,
      },
    );
  }

  lines.push(
    { kind: "command", text: "education" },
    { kind: "output", text: "M.S. Software Engineering @ UC Irvine" },
    { kind: "output", text: "B.S. Computer Science @ UC Riverside" },
  );

  const featured = projects.filter((project) => project.featured).slice(0, 3);

  if (featured.length > 0) {
    lines.push({ kind: "command", text: "ls projects --featured" });

    featured.forEach((project) => {
      lines.push({
        kind: "output",
        text: project.title,
        mark: project.winner ? "star" : "dot",
      });
    });
  }

  return lines;
}

const script = buildScript();

/* Typing speed and pauses, in milliseconds. */
const START_DELAY = 900;
const CHAR_DELAY = 55;
const AFTER_COMMAND = 320;
const BETWEEN_OUTPUTS = 110;
const BEFORE_COMMAND = 520;

type Progress = {
  /* Index of the line being written. */
  line: number;
  /* Characters of that line shown so far (commands only). */
  chars: number;
};

const finished: Progress = { line: script.length, chars: 0 };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type TerminalCardProps = {
  /* Type the script out; otherwise show it all at once. */
  animate: boolean;
  /* Shown in the title bar next to the dots. */
  avatarSrc: string;
  title: string;
  footer?: ReactNode;
};

/*
 * A small terminal window that types a short intro.
 * Every line keeps its space from the start, so nothing jumps
 * while it types. Screen readers get the full text at once.
 */
function TerminalCard({ animate, avatarSrc, title, footer }: TerminalCardProps) {
  const [progress, setProgress] = useState<Progress>(() =>
    animate && !prefersReducedMotion() ? { line: 0, chars: 0 } : finished,
  );

  const isDone = progress.line >= script.length;

  useEffect(() => {
    if (isDone) {
      return;
    }

    const current = script[progress.line];
    let delay: number;
    let next: Progress;

    if (current.kind === "command" && progress.chars < current.text.length) {
      /* Type the next character (the first one waits for the start delay). */
      const isFirst = progress.line === 0 && progress.chars === 0;
      delay = isFirst ? START_DELAY : CHAR_DELAY;
      next = { line: progress.line, chars: progress.chars + 1 };
    } else {
      /* Line complete: move on. */
      const upcoming = script[progress.line + 1];
      delay =
        current.kind === "command"
          ? AFTER_COMMAND
          : upcoming?.kind === "command"
            ? BEFORE_COMMAND
            : BETWEEN_OUTPUTS;
      next = { line: progress.line + 1, chars: 0 };
    }

    const timer = window.setTimeout(() => setProgress(next), delay);

    return () => window.clearTimeout(timer);
  }, [progress, isDone]);

  return (
    <div className="terminal overflow-hidden rounded-2xl border shadow-card">
      {/* Title bar */}
      <div className="terminal-bar flex items-center gap-3 border-b px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e0705c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e4b35b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#7fae6b]" />
        </span>

        <span className="ml-auto flex min-w-0 items-center gap-2">
          <img
            src={avatarSrc}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-[var(--term-prompt)]/60"
          />
          <span className="truncate font-mono text-[11px] text-[var(--term-muted)]">
            {title}
          </span>
        </span>
      </div>

      {/* Full text for screen readers */}
      <ul className="sr-only">
        {script.map((line, index) => (
          <li key={index}>
            {line.kind === "command" ? `Command: ${line.text}` : line.text}
          </li>
        ))}
      </ul>

      {/* The typed text */}
      <div
        aria-hidden="true"
        className="px-4 py-3.5 font-mono text-[12px] leading-[1.6] md:text-[11px] lg:text-[12.5px]"
      >
        {script.map((line, index) => {
          const isCurrent = index === progress.line;
          const isHidden = index > progress.line;

          if (line.kind === "command") {
            const typed = isCurrent ? line.text.slice(0, progress.chars) : line.text;

            return (
              <p
                key={index}
                className={`${index > 0 ? "mt-1.5" : ""} ${isHidden ? "invisible" : ""}`}
              >
                <span className="text-[var(--term-prompt)]">$ </span>
                <span className="text-[var(--term-ink)]">
                  {/* Hidden lines keep their full text so the height never changes */}
                  {isHidden ? line.text : typed}
                </span>
                {isCurrent && <span className="term-caret" />}
              </p>
            );
          }

          return (
            <p
              key={index}
              className={`
                flex gap-2 pl-3.5 text-[var(--term-muted)]
                ${isHidden || isCurrent ? "invisible" : ""}
              `}
            >
              {line.mark && (
                <span
                  className={
                    line.mark === "star"
                      ? "text-[var(--term-prompt)]"
                      : "text-[var(--term-dim)]"
                  }
                >
                  {line.mark === "star" ? "★" : "›"}
                </span>
              )}
              <span className={line.mark ? "text-[var(--term-ink)]" : ""}>
                {line.text}
              </span>
            </p>
          );
        })}

        {/* Waiting prompt once the script has finished */}
        <p className={`mt-1.5 ${isDone ? "" : "invisible"}`}>
          <span className="text-[var(--term-prompt)]">$ </span>
          <span className="term-caret term-caret-blink" />
        </p>
      </div>

      {footer && (
        <div className="terminal-bar border-t px-3 py-3">{footer}</div>
      )}
    </div>
  );
}

export default TerminalCard;
