import { socialLinks } from "../../data/socialLinks";
import PixelPanel from "../ui/PixelPanel";

function Contact() {
  const emailLink = socialLinks.find(
    (link) => link.label.toLowerCase() === "email",
  );

  const contactLinks = socialLinks.filter(
    (link) => link.label.toLowerCase() !== "email",
  );

  const emailAddress =
    emailLink?.displayText ?? emailLink?.href.replace("mailto:", "") ?? "";

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
        <PixelPanel className="w-full" contentClassName="p-6 sm:p-8">
          {/* TOP ROW */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="
                text-xs font-bold uppercase
                tracking-[0.18em] text-accent
              "
            >
              Contact
            </p>

            <div
              className="
                flex items-center gap-2
                border border-frame
                bg-panel-secondary
                px-2.5 py-1.5
                text-[9px] font-bold uppercase
                tracking-[0.14em] text-muted
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2 w-2
                  border border-frame
                  bg-accent
                "
              />
              Open to opportunities
            </div>
          </div>

          {/* MAIN MESSAGE */}
          <div className="mt-5">
            <h2
              className="
                max-w-xl
                text-2xl font-bold leading-tight text-ink
                sm:text-3xl
              "
            >
              Have something interesting in mind?
            </h2>

            <p
              className="
                mt-3 max-w-2xl
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
          <div className="my-6 border-t-2 border-dashed border-divider/50" />

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
                    mb-2
                    text-[10px] font-bold uppercase
                    tracking-[0.18em] text-muted
                  "
                >
                  Best way to reach me
                </p>

                <a
                  href={emailLink.href}
                  className="
                    group
                    inline-flex h-11 items-center
                    border-2 border-frame
                    bg-accent
                    text-sm font-bold text-accent-text
                    shadow-[3px_3px_0_var(--theme-shadow)]
                    transition duration-150

                    hover:-translate-x-0.5
                    hover:-translate-y-0.5
                    hover:bg-accent-hover
                    hover:shadow-[5px_5px_0_var(--theme-shadow)]

                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-accent/40

                    active:translate-x-1
                    active:translate-y-1
                    active:shadow-none
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex h-full w-10
                      items-center justify-center
                      border-r-2 border-frame
                      bg-panel-secondary
                      text-base font-bold text-accent
                      transition
                      group-hover:bg-panel-highlight
                    "
                  >
                    @
                  </span>

                  <span className="px-4">{emailAddress}</span>
                </a>
              </div>
            )}

            {/* SOCIALS */}
            <div>
              <p
                className="
                  mb-2
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
                        inline-flex h-9 items-center justify-center
                        gap-2
                        border-2 border-frame
                        bg-panel-secondary px-3
                        text-xs font-bold text-ink
                        shadow-[2px_2px_0_var(--theme-shadow)]
                        transition duration-150

                        hover:-translate-x-0.5
                        hover:-translate-y-0.5
                        hover:bg-panel-highlight
                        hover:text-accent
                        hover:shadow-[3px_3px_0_var(--theme-shadow)]

                        focus-visible:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-accent/40

                        active:translate-x-0.5
                        active:translate-y-0.5
                        active:shadow-none
                      "
                    >
                      {Icon && (
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-accent"
                        />
                      )}

                      <span>{link.displayText ?? link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </PixelPanel>
      </div>
    </section>
  );
}

export default Contact;
