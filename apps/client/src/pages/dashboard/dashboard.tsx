import React, { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import DashboardHeader from "./components/layout/dashboard-header";
import DashboardNav from "./components/layout/dashboard-nav";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/utils/api-client";
import { GET_GUILD_BY_ID_URL } from "@/utils/constants";
import type { GuildType } from "@astracord/shared";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [guildInfo, setGuildInfo] = useState<GuildType | undefined>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { guildId } = useParams();

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

  const getGuild = async () => {
    if (!guildId) {
      navigate("/servers");
      return;
    }
    try {
      const res = await apiClient.get(GET_GUILD_BY_ID_URL(guildId));
      const guildInfo: GuildType = res.data.guild;
      setGuildInfo(guildInfo);
      console.log(res.data);
    } catch (error) {
      navigate("/servers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuild();
  }, []);

  return (
    <div className="flex h-screen w-full justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col gap-4 px-4 py-4 overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />

        {loading && !guildInfo ? (
          <div>Loading...</div>
        ) : (
          <div className="relative flex flex-1 min-h-0 gap-3">
            <DashboardNav
              guild={guildInfo}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />

            <main className="flex-1 p-4 min-h-0 overflow-y-auto rounded-[20px] border border-white/5 bg-linear-to-b from-blue-950 to-slate-900 transition-all duration-300">
              <Outlet />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
