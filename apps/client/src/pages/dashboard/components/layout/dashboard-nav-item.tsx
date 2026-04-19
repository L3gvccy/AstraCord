import React from "react";
import { Circle } from "lucide-react";
import { NavLink } from "react-router-dom";

type DashboardNavItemProps = {
  title: string;
  href?: string;
  icon?: React.ElementType;
  isCollapsed?: boolean;
};

const DashboardNavItem: React.FC<DashboardNavItemProps> = ({
  title,
  href,
  icon: Icon = Circle,
  isCollapsed = false,
}) => {
  if (isCollapsed) {
    return (
      <div className="group relative flex justify-center">
        <NavLink
          to={href || "#"}
          end={false}
          className={({ isActive }) =>
            `flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              isActive
                ? "bg-violet-600 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
        </NavLink>

        <div className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
          {title}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={href || "#"}
      end={false}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all ${
          isActive
            ? "bg-violet-600 text-white"
            : "text-slate-300 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{title}</span>
    </NavLink>
  );
};

export default DashboardNavItem;
