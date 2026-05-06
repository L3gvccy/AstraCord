import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import { Switch } from "@/components/ui/switch";
import type { jtcConfig } from "@astracord/shared";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import JtcChannel from "./components/jtc-channel";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "@/types/dashboard-outlet-context.type";
import { apiClient } from "@/utils/api-client";
import { ADD_JTC_CHANNEL_URL, GET_JTC_CONFIG_URL } from "@/utils/constants";
import { toast } from "sonner";

const JoinToCreate = () => {
  const { guildInfo, channels, mainRef } =
    useOutletContext<DashboardOutletContext>();
  const voiceChannels = channels?.filter((channel) => channel.type === 2);
  const categories = channels?.filter((channel) => channel.type === 4);
  const [config, setConfig] = useState<jtcConfig>();
  const [initialConfig, setInitialConfig] = useState<jtcConfig>();
  const [loading, setLoading] = useState(false);
  const getJtcCfg = async () => {
    if (!guildInfo) return;

    try {
      const res = await apiClient.get(GET_JTC_CONFIG_URL(guildInfo.id));
      setConfig(res.data);
      setInitialConfig(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJtcCfg();
  }, []);

  useEffect(() => {
    console.log(config);
  }, [config]);

  const handleAddChannel = async () => {
    if (!guildInfo || !config) return;

    if (config.channels.length >= 5) {
      toast.error("You can add only up to 5 channels!");
      return;
    }
    try {
      const res = await apiClient.post(ADD_JTC_CHANNEL_URL(guildInfo.id));
      setConfig(res.data);
      setInitialConfig(res.data);
      toast.success("Channel successfully added!");
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log(error.res?.data || error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <DashboardOutletHeader>
          <DashboardOutletHeader.Title>
            Join To Create
          </DashboardOutletHeader.Title>
          <DashboardOutletHeader.Description>
            Manage temporary voice channels
          </DashboardOutletHeader.Description>
        </DashboardOutletHeader>

        <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-900">
          <div className="flex gap-6 items-center">
            <p className="text-xl font-semibold">Join To Create enabled</p>
            <Switch
              checked={config?.isEnabled}
              onCheckedChange={() => {
                setConfig((prev) => {
                  if (!prev) return undefined;

                  return { ...prev, isEnabled: !prev.isEnabled };
                });
              }}
            />
          </div>

          {config?.isEnabled && (
            <>
              {/* Channels count, add btn */}

              <p className="flex-lg text-white/85">
                Channels count: {config?.channels?.length || 0}/5
              </p>
              <button
                className=" flex items-center w-fit gap-3 px-4 py-2  bg-violet-600 rounded-lg hover:bg-violet-500 transition cursor-pointer"
                onClick={handleAddChannel}
              >
                <Plus size={22} />
                <p>Add new channel</p>
              </button>

              {/* Add content here (map channels) */}
            </>
          )}
        </div>
        {config?.channels && config?.channels?.length > 0 && (
          <div className="flex flex-col gap-3">
            {config?.channels?.map((channel, index) => (
              <JtcChannel index={index} channel={channel} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default JoinToCreate;
