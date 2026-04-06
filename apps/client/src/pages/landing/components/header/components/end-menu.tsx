import React from "react";
import { LogIn } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const EndMenu = () => {
  return (
    <div className="flex gap-2">
      <ThemeToggle />
      <button className="flex gap-2 items-center rounded-xl px-4 py-1 text-slate-200 border border-slate-200 hover:text-slate-800 hover:bg-slate-200 cursor-pointer transition-all duration-300">
        <LogIn size={18} />
        <p>Login</p>
      </button>
    </div>
  );
};

export default EndMenu;
