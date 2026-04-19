import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import DashboardHeader from "./components/layout/dashboard-header";
import DashboardNav from "./components/layout/dashboard-nav";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col gap-4 px-4">
        <DashboardHeader />

        <div className="relative flex gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className={`absolute top-3 z-30 flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 shadow-lg transition-all duration-300 hover:bg-white/5 hover:text-white ${
              isSidebarCollapsed ? "left-[46px]" : "left-[165px]"
            }`}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>

          <DashboardNav isCollapsed={isSidebarCollapsed} />

          <main className="min-h-[calc(100vh-92px)] flex-1 rounded-[20px] border border-white/5 bg-[#18243b] transition-all duration-300">
            contentplaceholder
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
