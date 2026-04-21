import React from "react";
import HeaderNavigation from "./components/navigation";
import EndMenu from "./components/end-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 flex w-full justify-center">
      <div className="relative flex items-center justify-between gap-6 bg-slate-800 border border-slate-500 shadow-lg shadow-cyan-800/20 rounded-2xl px-4 py-2 w-full max-w-114">
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0"
        >
          <img src="/logo.png" className="w-10" />
        </Link>

        <HeaderNavigation />

        <EndMenu />
      </div>
    </header>
  );
};

export default Header;
