import { useEffect, useState } from "react";

function readColor(variableName: string, fallback: string) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  return value || fallback;
}

/*
 * Returns a theme CSS variable (for example "--theme-dot") as a string
 * and updates it when the theme toggle changes the <html> class.
 */
export function useThemeColor(variableName: string, fallback: string) {
  const [color, setColor] = useState(() => readColor(variableName, fallback));

  useEffect(() => {
    const update = () => setColor(readColor(variableName, fallback));

    update();

    const observer = new MutationObserver(update);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [variableName, fallback]);

  return color;
}
