import { useEffect, useState } from "react";

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
        ml-auto flex h-9 w-10
        items-center justify-center
        border-2 border-frame
        bg-panel-secondary
        text-lg font-bold text-ink
        shadow-[3px_3px_0_var(--theme-shadow)]
        transition duration-150
        hover:-translate-x-0.5
        hover:-translate-y-0.5
        hover:bg-panel-highlight
        hover:text-accent
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-accent/40
        active:translate-x-0.5
        active:translate-y-0.5
        active:shadow-none
      "
    >
      <span aria-hidden="true">{isLightMode ? "☾" : "☀"}</span>
    </button>
  );
}

export default ThemeToggle;
