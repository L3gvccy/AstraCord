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
    <div className="flex relative justify-between w-full p-4 bg-slate-800 rounded-b-[18px]">
      <button
        className="flex md:hidden items-center justify-center"
        onClick={toggleSidebar}
      >
        <PanelRightClose />
      </button>
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.png" className="w-[66px]" />
        <p className="hidden md:block text-3xl font-bold">AstraCord</p>
      </div>

      <EndMenu size="lg" />
    </div>
  );
};

export default DashboardHeader;
