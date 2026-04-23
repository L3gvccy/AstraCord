import React, { use, useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import DashboardHeader from "./components/layout/dashboard-header";
import DashboardNav from "./components/layout/dashboard-nav";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "@/utils/api-client";
import { GET_GUILD_BY_ID_URL } from "@/utils/constants";
import type { ChannelType, GuildType, RoleType } from "@astracord/shared";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardOutletContext } from "@/types/dashboard-outlet-context.type";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [guildInfo, setGuildInfo] = useState<GuildType | undefined>();
  const [channels, setChannels] = useState<[ChannelType]>();
  const [roles, setRoles] = useState<[RoleType]>();
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
      const channels: [ChannelType] = res.data.channels;
      const roles: [RoleType] = res.data.roles;
      setGuildInfo(guildInfo);
      setChannels(channels);
      setRoles(roles);
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

        {loading || !guildInfo ? (
          <div className="relative flex flex-1 min-h-0 gap-4">
            <div className="hidden lg:flex flex-col items-center min-w-64 w-auto rounded-[20px] overflow-hidden border border-white/5 bg-linear-to-b from-blue-950 to-slate-900 p-4">
              <div className="block h-10 w-full p-1">
                <Skeleton className="rounded-xl w-8 h-8 bg-slate-900" />
              </div>
              <div className="flex flex-col gap-2 items-center mb-6">
                <Skeleton className="rounded-full w-16 h-16 bg-slate-900" />
                <Skeleton className="rounded-md w-33 h-7 bg-slate-900" />
              </div>
              <div className="flex flex-col w-full gap-1 items-center mb-6">
                <Skeleton className="rounded-xl w-full h-9 bg-slate-900" />
                {Array.from({ length: 6 }, (_, index) => (
                  <Skeleton className="rounded-xl w-full h-9 ml-2 bg-slate-900" />
                ))}
                <Skeleton className="rounded-xl w-full h-9 bg-slate-900" />
                {Array.from({ length: 3 }, (_, index) => (
                  <Skeleton className="rounded-xl w-full h-9 ml-2 bg-slate-900" />
                ))}
                <Skeleton className="rounded-xl w-full h-9 bg-slate-900" />
                {Array.from({ length: 4 }, (_, index) => (
                  <Skeleton className="rounded-xl w-full h-9 ml-2 bg-slate-900" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 items-center justify-center rounded-[20px] border border-white/5 bg-linear-to-b from-blue-950 to-slate-900 p-4">
              <Skeleton className="rounded-full w-38 sm:w-44 h-38 sm:h-44 bg-slate-900" />
              <Skeleton className="rounded-md w-46 sm:w-76 h-10 sm:h-15 bg-slate-900" />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-1 min-h-0 gap-4">
            <DashboardNav
              guild={guildInfo}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
            />

            <main className="flex-1 p-4 min-h-0 overflow-y-auto rounded-[20px] border border-white/5 bg-linear-to-b from-blue-950 to-slate-900 transition-all duration-300">
              <Outlet
                context={
                  {
                    guildInfo,
                    channels,
                    roles,
                  } satisfies DashboardOutletContext
                }
              />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
