import React from "react";
import { LogIn } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { DISCORD_AUTH_URL } from "@/utils/constants";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import UserDropdown from "@/components/user-dropdown";
import { useNavigate } from "react-router-dom";

type SizeType = "md" | "lg";

const EndMenu = ({ size = "md" }: { size?: SizeType }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const isAuthorized = !!user?.id;

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex gap-2">
      <ThemeToggle />
      {isAuthorized ? (
        <UserDropdown size={size} />
      ) : (
        <button
          onClick={() => handleLoginClick()}
          className="flex gap-2 items-center rounded-xl px-4 py-1 text-slate-200 border border-slate-200 hover:text-slate-800 hover:bg-slate-200 cursor-pointer transition-all duration-300"
        >
          <LogIn size={18} className="my-1.5" />
          <p className="hidden md:block">Login</p>
        </button>
      )}
    </div>
  );
};

export default EndMenu;
