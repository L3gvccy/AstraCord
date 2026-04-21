import React, { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import DashboardHeader from "./components/layout/dashboard-header";
import DashboardNav from "./components/layout/dashboard-nav";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (!isSidebarCollapsed) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isSidebarCollapsed]);

  return (
    <div className="flex h-screen w-full justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col gap-4 px-4 py-4 overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />

        <div className="relative flex flex-1 min-h-0 gap-3">
          <DashboardNav
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
          />

          <main className="flex-1 min-h-0 overflow-y-auto rounded-[20px] border border-white/5 bg-slate-900 transition-all duration-300">
            contentplaceholder
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
