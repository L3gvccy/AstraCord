import GuildCard from "@/pages/guilds/components/guild-card";
import type { DashboardOutletContext } from "@/types/dashboard-outlet-context.type";
import { apiClient } from "@/utils/api-client";
import { GET_WELCOME_CONFIG_URL } from "@/utils/constants";
import type { WelcomeCfg } from "@astracord/shared";
import React, { use, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Welcome = () => {
  const { guildInfo, channels } = useOutletContext<DashboardOutletContext>();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<WelcomeCfg | undefined>();

  const getWelcomeCfg = async () => {
    if (!guildInfo) return;
    try {
      const res = await apiClient.get(GET_WELCOME_CONFIG_URL(guildInfo.id));
      console.log(res.data);
      setConfig(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWelcomeCfg();
  }, []);

  return <div className="h-screen">Welcome</div>;
};

export default Welcome;
