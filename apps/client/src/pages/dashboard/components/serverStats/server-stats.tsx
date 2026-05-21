import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import { Switch } from "@/components/ui/switch";
import type { DashboardOutletContext } from "@/types/dashboard-outlet-context.type";
import { apiClient } from "@/utils/api-client";
import {
  GET_SERVER_STATS_CONFIG_URL,
  UPDATE_SERVER_STATS_CONFIG_URL,
} from "@/utils/constants";
import { COUNTER_TYPES } from "@/utils/tools";
import type {
  serverStatsConfig,
  serverStatsConfigDto,
  serverStatsCounter,
} from "@astracord/shared";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import ServerStatsCounter from "./components/server-stats-counter";
import SaveChangesPopup from "@/components/save-changes-popup";

const ServerStats = () => {
  const {
    guildInfo,
    channels: allChannels,
    mainRef,
  } = useOutletContext<DashboardOutletContext>();
  const voiceChannels = allChannels?.filter((channel) => channel.type === 2);
  const [config, setConfig] = useState<serverStatsConfig>();
  const [initialConfig, setInitialConfig] = useState<serverStatsConfig>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cfgChanged, setCfgChanged] = useState(false);
  const unusedTypes = COUNTER_TYPES.filter(
    (type) => !config?.counters.some((counter) => counter.type === type),
  );
  const getServerStatsCfg = async () => {
    if (!guildInfo) return;

    try {
      const res = await apiClient.get(
        GET_SERVER_STATS_CONFIG_URL(guildInfo.id),
      );
      setConfig(res.data);
      setInitialConfig(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServerStatsCfg();
  }, []);

  useEffect(() => {
    if (!config || !initialConfig) return;

    setCfgChanged(JSON.stringify(config) !== JSON.stringify(initialConfig));
  }, [config, initialConfig]);

  //delete nahuy
  useEffect(() => {
    if (!config) return;
    console.log(config);
  }, [config]);

  const handleAddCounter = () => {
    if (!guildInfo || !config) return;

    if (unusedTypes.length === 0) {
      toast.error("No more available counter types");
      return;
    }

    const newCounter: serverStatsCounter = {
      guildId: guildInfo.id,
      text: "Counter: {count}",
      type: unusedTypes[0],
    };

    setConfig((prev) => {
      if (!prev) return undefined;

      return { ...prev, counters: [...prev.counters, newCounter] };
    });
  };

  const handleChangeCounter = (counter: serverStatsCounter, index: number) => {
    setConfig((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        counters: prev.counters.map((prevCounter, i) =>
          i === index ? counter : prevCounter,
        ),
      };
    });
  };

  const handleRemoveCounter = (index: number) => {
    if (!guildInfo || !config) return;

    setConfig((prev) => {
      if (!prev) return undefined;
      return { ...prev, counters: prev.counters.filter((_, i) => i !== index) };
    });
  };

  const canSubmit = () => {
    if (config?.counters.some((counter) => !counter.channelId)) {
      toast.error("Not every counter has channel selected");
      return false;
    }

    if (config?.counters.some((counter) => !counter.type)) {
      toast.error("Not every counter has type selected");
      return false;
    }

    if (
      config?.counters.some((counter) => !counter.text || !counter.text.trim())
    ) {
      toast.error("Not every counter has text");
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    if (!initialConfig) return;

    setConfig(initialConfig);
    setCfgChanged(false);
    toast.success("Canceled!");
  };

  const handleSave = async () => {
    if (!guildInfo || !config) return;
    if (!canSubmit()) return;
    try {
      setSaving(true);
      const payload: serverStatsConfigDto = {
        ...config,
        guildId: guildInfo.id,
      };
      const response = await apiClient.post(
        UPDATE_SERVER_STATS_CONFIG_URL,
        payload,
      );
      setConfig(response.data);
      setInitialConfig(response.data);
      setCfgChanged(false);
      toast.success("Saved successfully!");
    } catch (error: any) {
      console.log("Save error:", error.response?.data || error);
      const status = error.response.status;
      if (status === 404 || status === 400) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Failed to save data!");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config || !voiceChannels) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <DashboardOutletHeader>
          <DashboardOutletHeader.Title>
            Server Stats
          </DashboardOutletHeader.Title>
          <DashboardOutletHeader.Description>
            Manage your server stats
          </DashboardOutletHeader.Description>
        </DashboardOutletHeader>

        <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-900">
          <div className="flex gap-6 items-center">
            <p className="text-xl font-semibold">
              Server Stats Tracker Enabled
            </p>
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
              <p className=" text-white/85">
                Active counters: {config?.counters?.length}
              </p>
              <button
                className=" flex items-center w-fit gap-3 px-4 py-2  bg-violet-600 rounded-lg hover:bg-violet-500 transition cursor-pointer"
                onClick={handleAddCounter}
              >
                <Plus size={22} />
                <p>Add new channel</p>
              </button>
            </>
          )}
        </div>
        {config?.isEnabled &&
          config?.counters &&
          config?.counters.length > 0 && (
            <div className="flex flex-col gap-3">
              {config.counters.map((counter, index) => {
                const avaliableVoiceChannels = voiceChannels.filter(
                  (vc) =>
                    vc.id === counter.channelId ||
                    !config.counters.some(
                      (cfgCounter, cfgIndex) =>
                        cfgIndex !== index && cfgCounter.channelId === vc.id,
                    ),
                );

                const availableTypes = counter.type
                  ? [...unusedTypes, counter.type]
                  : unusedTypes;

                return (
                  <ServerStatsCounter
                    key={counter.id}
                    index={index}
                    types={availableTypes}
                    counter={counter}
                    voiceChannels={avaliableVoiceChannels}
                    onChange={handleChangeCounter}
                    onRemove={handleRemoveCounter}
                  />
                );
              })}
            </div>
          )}
      </div>
      {cfgChanged && (
        <SaveChangesPopup
          container={mainRef.current}
          onCancel={handleCancel}
          onSave={handleSave}
          isLoading={saving}
        />
      )}
    </>
  );
};

export default ServerStats;
