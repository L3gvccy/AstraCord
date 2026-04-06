import React from "react";
import HeaderNavigation from "./components/navigation";
import EndMenu from "./components/end-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="flex items-center gap-6 bg-slate-800 border border-slate-500 shadow-lg shadow-cyan-800/20 rounded-2xl px-4 py-2">
        <Link to="/">
          <img src="/logo.png" className="w-10" />
        </Link>

        <HeaderNavigation />
        <EndMenu />
      </div>
    </header>
  );
};

export default Header;
