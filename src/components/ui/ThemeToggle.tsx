import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "light" | "dark";

/*
 * The inline script in index.html picks the theme
 * before first paint, so start from what it applied.
 */
function getInitialTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const isLightMode = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
      title={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
      className="
        ml-auto flex h-9 w-9
        items-center justify-center
        rounded-lg border border-frame/15
        bg-panel-secondary/70
        text-accent
        transition duration-150
        hover:border-frame/25
        hover:bg-panel-highlight
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-accent/40
        active:scale-95
      "
    >
      {isLightMode ? (
        <LuMoon aria-hidden="true" className="h-[18px] w-[18px]" />
      ) : (
        <LuSun aria-hidden="true" className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

export default ThemeToggle;
