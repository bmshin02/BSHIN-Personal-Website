import { useEffect, useState } from "react";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuCheck,
  LuCopy,
  LuMail,
} from "react-icons/lu";

import { socialLinks } from "../../data/socialLinks";
import Panel from "../ui/Panel";

function Contact() {
  const emailLink = socialLinks.find(
    (link) => link.label.toLowerCase() === "email",
  );

  const contactLinks = socialLinks.filter(
    (link) => link.label.toLowerCase() !== "email",
  );

  const emailAddress =
    emailLink?.displayText ?? emailLink?.href.replace("mailto:", "") ?? "";

  const [copied, setCopied] = useState(false);

  /* "Copied" switches back to "Copy" after two seconds. */
  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 2000);

    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
    } catch {
      /* Clipboard blocked: fall back to opening the mail app. */
      window.location.href = emailLink?.href ?? "";
    }
  };

  return (
    <section
      id="contact"
      className="
        scroll-mt-16
        px-4 pt-32 pb-70
        sm:px-6
      "
    >
      <div className="mx-auto w-full max-w-4xl">
        <Panel className="w-full" contentClassName="p-6 sm:p-10">
          {/* TOP ROW */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="
                flex items-center gap-3
                text-xs font-bold uppercase
                tracking-[0.25em] text-accent
                before:h-0.5 before:w-6
                before:rounded-full before:bg-accent
                sm:text-sm
              "
            >
              Contact
            </p>

            <div
              className="
                flex items-center gap-2
                rounded-full border border-frame/20
                bg-panel-secondary
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em] text-muted
              "
            >
              <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </div>
          </div>

          {/* MAIN MESSAGE */}
          <div className="mt-6">
            <h2
              className="
                max-w-2xl
                text-3xl font-extrabold leading-[1.1]
                tracking-tight text-ink
                sm:text-4xl
              "
            >
              Have something interesting in mind?
            </h2>

            <p
              className="
                mt-4 max-w-2xl
                text-sm leading-6 text-muted
                sm:text-base sm:leading-7
              "
            >
              I am always interested in software engineering, game development,
              educational technology, and creative projects where I can build
              something meaningful.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="my-8 h-px bg-linear-to-r from-accent/60 via-divider/30 to-transparent" />

          {/* CONTACT ACTIONS */}
          <div
            className="
              grid gap-6
              sm:grid-cols-[minmax(0,1fr)_auto]
              sm:items-end
            "
          >
            {/* EMAIL */}
            {emailLink && (
              <div>
                <p
                  className="
                    mb-3
                    text-[10px] font-bold uppercase
                    tracking-[0.18em] text-muted
                  "
                >
                  Best way to reach me
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href={emailLink.href}
                    className="
                      group/email
                      inline-flex h-12 min-w-0 items-center gap-3
                      rounded-xl border border-frame/20
                      bg-accent px-5
                      text-sm font-bold text-accent-text
                      shadow-soft
                      transition duration-150

                      hover:-translate-y-0.5
                      hover:bg-accent-hover
                      hover:shadow-soft-lg

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40

                      active:translate-y-px
                      active:shadow-soft-sm
                    "
                  >
                    <LuMail aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span className="truncate">{emailAddress}</span>
                    <LuArrowRight
                      aria-hidden="true"
                      className="
                        h-4 w-4 shrink-0
                        transition-transform duration-200
                        group-hover/email:translate-x-1
                      "
                    />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={copied ? "Email address copied" : "Copy email address"}
                    title={copied ? "Copied" : "Copy email address"}
                    className="
                      inline-flex h-12 items-center justify-center gap-2
                      rounded-xl border border-frame/20
                      bg-panel-secondary px-3.5 sm:px-4
                      text-xs font-bold text-ink
                      shadow-soft-sm
                      transition duration-150

                      hover:-translate-y-0.5
                      hover:bg-panel-highlight
                      hover:text-accent
                      hover:shadow-soft

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-accent/40

                      active:translate-y-px
                    "
                  >
                    {copied ? (
                      <LuCheck aria-hidden="true" className="h-4 w-4 text-accent" />
                    ) : (
                      <LuCopy aria-hidden="true" className="h-4 w-4 text-accent" />
                    )}
                    <span aria-live="polite" className="sr-only sm:not-sr-only">
                      {copied ? "Copied" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* SOCIALS */}
            <div>
              <p
                className="
                  mb-3
                  text-[10px] font-bold uppercase
                  tracking-[0.18em] text-muted
                  sm:text-right
                "
              >
                Elsewhere
              </p>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                {contactLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className="
                        group/social
                        inline-flex h-12 items-center justify-center
                        gap-2
                        rounded-xl border border-frame/20
                        bg-panel-secondary px-4
                        text-sm font-bold text-ink
                        shadow-soft-sm
                        transition duration-150

                        hover:-translate-y-0.5
                        hover:border-accent/40
                        hover:bg-panel-highlight
                        hover:text-accent
                        hover:shadow-soft

                        focus-visible:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-accent/40

                        active:translate-y-px
                        active:shadow-soft-sm
                      "
                    >
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-accent"
                        />
                      )}

                      <span>{link.displayText ?? link.label}</span>

                      {link.external && (
                        <LuArrowUpRight
                          aria-hidden="true"
                          className="
                            h-3.5 w-3.5 shrink-0 text-muted
                            transition-transform duration-200
                            group-hover/social:-translate-y-0.5
                            group-hover/social:translate-x-0.5
                            group-hover/social:text-accent
                          "
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

export default Contact;
