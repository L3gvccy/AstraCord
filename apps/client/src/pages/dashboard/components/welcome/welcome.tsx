import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { DashboardOutletContext } from "@/types/dashboard-outlet-context.type";
import { apiClient } from "@/utils/api-client";
import { GET_WELCOME_CONFIG_URL } from "@/utils/constants";
import type { WelcomeCfg } from "@astracord/shared";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Welcome = () => {
  const { guildInfo, channels } = useOutletContext<DashboardOutletContext>();
  const textChannels = channels?.filter((channel) => channel.type === 0);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<WelcomeCfg | undefined>();
  const [initialConfig, setInitialConfig] = useState<WelcomeCfg | undefined>();
  const [cfgChanged, setCfgChanged] = useState(false);

  const getWelcomeCfg = async () => {
    if (!guildInfo) return;
    try {
      const res = await apiClient.get(GET_WELCOME_CONFIG_URL(guildInfo.id));
      setConfig(res.data);
      setInitialConfig(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWelcomeCfg();
  }, []);

  useEffect(() => {
    console.log(config);
  }, [config]);

  useEffect(() => {
    if (!config || !initialConfig) return;

    setCfgChanged(JSON.stringify(config) !== JSON.stringify(initialConfig));
  }, [config, initialConfig]);

  if (loading || !config) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <DashboardOutletHeader>
        <DashboardOutletHeader.Title>
          Welcome message
        </DashboardOutletHeader.Title>
        <DashboardOutletHeader.Description>
          Send message when member joins your guild
        </DashboardOutletHeader.Description>
      </DashboardOutletHeader>

      <div className="flex gap-4 items-center">
        <p className="text-xl">Welcome message enabled</p>
        <Switch
          checked={config.isEnabled}
          onCheckedChange={() => {
            setConfig((prev) => {
              if (!prev) return undefined;

              return { ...prev, isEnabled: !prev.isEnabled };
            });
          }}
        />
      </div>

      {config.isEnabled && (
        <>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Channel</p>
            <Select
              value={config.channelId || ""}
              onValueChange={(value) => {
                if (!value) return;

                setConfig((prev) => {
                  if (!prev) return undefined;

                  return { ...prev, channelId: value };
                });
              }}
            >
              <SelectTrigger className="w-full max-w-64 data-placeholder:text-slate-400">
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>

              <SelectContent
                position="popper"
                side="bottom"
                align="start"
                sideOffset={6}
                className="bg-slate-950 p-1"
              >
                {textChannels?.map((ch) => (
                  <SelectItem
                    key={ch.id}
                    value={ch.id}
                    className="text-slate-200 focus:bg-slate-900 focus:text-white data-highlighted:bg-slate-900 data-highlighted:text-white data-[state=checked]:bg-violet-700 data-[state=checked]:text-violet-200"
                  >
                    <div className="flex items-center gap-2">
                      <p className="text-lg opacity-65">#</p>
                      <p className="text-md">{ch.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col w-fit gap-2">
            <div className="flex rounded-xl border">
              <div
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 ${!config.isEmbed && "bg-violet-600"}`}
                onClick={() => {
                  setConfig((prev) => {
                    if (!prev) return undefined;

                    return { ...prev, isEmbed: false };
                  });
                }}
              >
                <p className="text-md">Text message</p>
              </div>
              <div
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 ${config.isEmbed && "bg-violet-600"}`}
                onClick={() => {
                  setConfig((prev) => {
                    if (!prev) return undefined;

                    return { ...prev, isEmbed: true };
                  });
                }}
              >
                <p className="text-md">Embed message</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Welcome;
