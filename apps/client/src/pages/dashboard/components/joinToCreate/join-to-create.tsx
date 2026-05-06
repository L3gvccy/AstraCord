import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import { Switch } from "@/components/ui/switch";
import type { jtcChannel, jtcConfig, jtcConfigDto } from "@astracord/shared";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import JtcChannel from "./components/jtc-channel";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "@/types/dashboard-outlet-context.type";
import { apiClient } from "@/utils/api-client";
import { GET_JTC_CONFIG_URL, UPDATE_JTC_CONFIG_URL } from "@/utils/constants";
import { toast } from "sonner";
import SaveChangesPopup from "@/components/save-changes-popup";

const JoinToCreate = () => {
  const {
    guildInfo,
    channels: allChannels,
    mainRef,
  } = useOutletContext<DashboardOutletContext>();
  const voiceChannels = allChannels?.filter((channel) => channel.type === 2);
  const categories = allChannels?.filter((channel) => channel.type === 4);
  const [config, setConfig] = useState<jtcConfig>();
  const [initialConfig, setInitialConfig] = useState<jtcConfig>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cfgChanged, setCfgChanged] = useState(false);
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
    console.log(JSON.stringify(config));
    console.log(JSON.stringify(initialConfig));
  }, [config]);

  useEffect(() => {
    if (!config || !initialConfig) return;

    setCfgChanged(JSON.stringify(config) !== JSON.stringify(initialConfig));
  }, [config, initialConfig]);

  const handleAddChannel = () => {
    if (!guildInfo || !config) return;

    if (config.channels.length >= 5) {
      toast.error("You can add only up to 5 channels!");
      return;
    }

    const newChannel: jtcChannel = {
      guildId: guildInfo.id,
      channelName: "{username}'s channel",
      userLimit: 0,
    };

    setConfig((prev) => {
      if (!prev) return undefined;
      return { ...prev, channels: [...prev.channels, newChannel] };
    });
  };

  const handleRemoveChannel = (index: number) => {
    if (!guildInfo || !config) return;

    setConfig((prev) => {
      if (!prev) return undefined;
      return { ...prev, channels: prev.channels.filter((_, i) => i !== index) };
    });
  };

  const canSubmit = () => {
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
      const payload: jtcConfigDto = {
        ...config,
        guildId: guildInfo.id,
      };

      const response = await apiClient.post(UPDATE_JTC_CONFIG_URL, payload);

      setConfig(response.data);
      setInitialConfig(response.data);
      setCfgChanged(false);

      toast.success("Saved!");
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
        {config?.isEnabled &&
          config?.channels &&
          config?.channels?.length > 0 && (
            <div className="flex flex-col gap-3">
              {config?.channels?.map((channel, index) => (
                <JtcChannel
                  index={index}
                  channel={channel}
                  onRemove={handleRemoveChannel}
                />
              ))}
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

export default JoinToCreate;
