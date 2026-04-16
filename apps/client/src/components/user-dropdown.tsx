import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { GemIcon, List, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { toast } from "sonner";
import { clearUser } from "@/store/userSlice";

type SizeType = "md" | "lg";

const UserDropdown = ({ size = "md" }: { size: SizeType }) => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    requestAnimationFrame(() => {
      localStorage.removeItem("jwt");
      dispatch(clearUser());
      toast.success("Logged out successfully");
    });
  };

  const sizes = {
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={`${sizes[size]} cursor-pointer rounded-full border-2 border-violet-400`}
        >
          <img
            src={user?.avatar ?? "/guild-logo-fallback.png"}
            alt="Avatar"
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-fit bg-slate-950/60 backdrop-blur-md mt-3"
      >
        <Link
          to="/profile"
          className="flex gap-2 items-center px-2 py-1 hover:bg-white/10 rounded-md transition-all duration-300"
        >
          <User size={18} />
          <p>Profile</p>
        </Link>
        <Link
          to="/servers"
          className="flex gap-2 items-center px-2 py-1 hover:bg-white/10 rounded-md transition-all duration-300"
        >
          <List size={18} />
          <p>My servers</p>
        </Link>
        <Link
          to="/profile"
          className="flex gap-2 items-center px-2 py-1 hover:bg-white/10 rounded-md transition-all duration-300"
        >
          <GemIcon size={18} />
          <p>Subscriptions</p>
        </Link>
        <DropdownMenuSeparator />
        <button
          onClick={() => {
            handleLogout();
          }}
          className="flex gap-2 items-center w-full px-2 py-1 text-red-400 hover:bg-white/10 rounded-md cursor-pointer transition-all duration-300"
        >
          <LogOut size={18} />
          <p>Logout</p>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
