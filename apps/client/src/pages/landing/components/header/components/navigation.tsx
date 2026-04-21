import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeaderNavigation = () => {
  const routes = [
    { title: "Home", route: "/" },
    { title: "Servers", route: "/servers" },
    { title: "Pricing", route: "/pricing" },
  ];
  return (
    <>
      <div className="hidden md:flex gap-4">
        {routes.map((r) => (
          <Link
            to={r.route}
            className="text-slate-200 hover:text-slate-50 transition-all duration-300"
          >
            {r.title}
          </Link>
        ))}
      </div>
      <div className="flex md:hidden gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <List size={22} className="opacity-85" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit bg-slate-950/60 backdrop-blur-md mt-4">
            {routes.map((r) => (
              <DropdownMenuItem className="bg-transparent">
                <Link
                  to={r.route}
                  className="flex gap-2 items-center px-2 py-1 bg-transparent rounded-md transition-all duration-300"
                >
                  {r.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default HeaderNavigation;
