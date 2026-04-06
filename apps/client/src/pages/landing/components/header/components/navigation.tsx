import React from "react";
import { Link } from "react-router-dom";

const HeaderNavigation = () => {
  const routes = [
    { title: "Home", route: "/" },
    { title: "Servers", route: "/" },
    { title: "Pricing", route: "/" },
  ];
  return (
    <div className="flex gap-4">
      {routes.map((r) => (
        <Link
          to={r.route}
          className="text-slate-200 hover:text-slate-50 transition-all duration-300"
        >
          {r.title}
        </Link>
      ))}
    </div>
  );
};

export default HeaderNavigation;
