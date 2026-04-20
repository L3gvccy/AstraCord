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
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col gap-4 px-4 pb-4">
        <DashboardHeader toggleSidebar={toggleSidebar} />

        <div className="relative flex gap-3">
          <DashboardNav
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
          />

          <main className="min-h-[calc(100vh-92px)] flex-1 rounded-[20px] border border-white/5 bg-[#18243b] transition-all duration-300">
            contentplaceholder
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
