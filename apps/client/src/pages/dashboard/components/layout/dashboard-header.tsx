import EndMenu from "@/pages/landing/components/header/components/end-menu";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full p-4 bg-slate-800 rounded-b-[18px]">
      <div
        className="flex gap-4 items-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/logo.png" className="w-[66px]" />
        <p className="text-3xl font-bold">AstraCord</p>
      </div>

      <EndMenu size="lg" />
    </div>
  );
};

export default DashboardHeader;
