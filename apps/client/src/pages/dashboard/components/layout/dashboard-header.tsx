import EndMenu from "@/pages/landing/components/header/components/end-menu";
import { PanelRightClose } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex relative justify-between w-full px-4 py-4 bg-slate-900 rounded-[20px]">
      <button
        className="flex lg:hidden items-center justify-center"
        onClick={toggleSidebar}
      >
        <PanelRightClose size={24} className="opacity-85" />
      </button>

      <div
        className="absolute left-1/2 -translate-x-1/2 top-2 flex items-center gap-4 cursor-pointer md:static md:translate-x-0"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.png" className="w-14 md:w-15" />
        <p className="hidden md:block text-2xl font-bold">AstraCord</p>
      </div>

      <EndMenu size="md" />
    </div>
  );
};

export default DashboardHeader;
