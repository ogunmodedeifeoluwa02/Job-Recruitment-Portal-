import { Moon, Sun } from "lucide-react";
import { useTheme } from "../Core/Theme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#ff6b2c]/50 hover:text-[#ff6b2c]"
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}

export default ThemeToggle;
