import { useTheme } from "@/contexts/theme-context";
import { Sun, Moon } from "lucide-react";
import React from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="cursor-pointer text-slate-200" onClick={toggleTheme}>
      {theme === "dark" ? <Moon size={22} /> : <Sun size={22} />}
    </button>
  );
};

export default ThemeToggle;
