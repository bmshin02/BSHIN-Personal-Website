import { useEffect, useEffectEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";

type ImageLightboxProps = {
  images: string[];
  index: number;
  title: string;
  onChange: (index: number) => void;
  onClose: () => void;
};

/*
 * Full-screen viewer for project screenshots.
 * Escape closes it, the arrow keys step through the images,
 * and focus returns to whatever opened it.
 */
function ImageLightbox({
  images,
  index,
  title,
  onChange,
  onClose,
}: ImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const count = images.length;
  const hasMany = count > 1;

  const showPrevious = () => onChange((index - 1 + count) % count);
  const showNext = () => onChange((index + 1) % count);

  /* Always sees the latest index and handlers. */
  const handleKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowLeft" && hasMany) showPrevious();
    if (event.key === "ArrowRight" && hasMany) showNext();
  });

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => handleKey(event);

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  const controlClass = `
    flex h-11 w-11 items-center justify-center
    rounded-full border border-white/15
    bg-white/10 text-white
    backdrop-blur-md
    transition duration-150
    hover:bg-white/20
    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-accent/50
    active:scale-95
  `;

  /*
   * Rendered into <body> so no parent's transform or paint
   * containment can trap the fixed overlay.
   */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      className="
        lightbox-in fixed inset-0 z-[100]
        flex flex-col
        bg-black/85 backdrop-blur-sm
      "
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
        <p className="text-sm font-semibold text-white/80">
          {title}
          {hasMany && (
            <span className="ml-2 text-white/50">
              {index + 1} / {count}
            </span>
          )}
        </p>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={controlClass}
        >
          <LuX aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {/* Image */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20 sm:pb-10">
        <img
          key={images[index]}
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          onClick={(event) => event.stopPropagation()}
          className="
            lightbox-img max-h-full max-w-full
            rounded-xl object-contain
            shadow-2xl
          "
        />

        {hasMany && (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className={`${controlClass} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
            >
              <LuChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next screenshot"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className={`${controlClass} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
            >
              <LuChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ImageLightbox;
