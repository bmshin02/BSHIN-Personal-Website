import { useEffect, useState } from "react";

type TypewriterTextProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
};

function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseDuration = 1500,
  className = "",
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      return;
    }

    const currentWord = words[wordIndex] ?? "";

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    /*
     * The full phrase has finished typing.
     * Wait before beginning to delete it.
     */
    if (!isDeleting && displayedText === currentWord) {
      delay = pauseDuration;
    }

    /*
     * The phrase has been completely deleted.
     * Briefly wait before typing the next phrase.
     */
    if (isDeleting && displayedText === "") {
      delay = 300;
    }

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && displayedText === currentWord) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayedText === "") {
        setIsDeleting(false);

        setWordIndex((currentIndex) => {
          return (currentIndex + 1) % words.length;
        });

        return;
      }

      const nextLength = isDeleting
        ? displayedText.length - 1
        : displayedText.length + 1;

      setDisplayedText(currentWord.slice(0, nextLength));
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    displayedText,
    wordIndex,
    isDeleting,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  if (words.length === 0) {
    return null;
  }

  return (
    <>
      <span
        aria-hidden="true"
        className={`
          inline-block min-w-[23ch]
          text-accent
          ${className}
        `}
      >
        {displayedText}

        <span className="ml-0.5 animate-pulse text-accent">|</span>
      </span>

      <span className="sr-only">{words.join(", ")}</span>
    </>
  );
}

export default TypewriterText;
