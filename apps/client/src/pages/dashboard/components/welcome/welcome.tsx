import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import SaveChangesPopup from "@/components/save-changes-popup";
import ColorPicker from "@/components/ui/color-picker";
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
import {
  GET_WELCOME_CONFIG_URL,
  UPDATE_WELCOME_CONFIG_URL,
} from "@/utils/constants";
import type { UpdateWelcomeCfgDto, WelcomeCfg } from "@astracord/shared";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

const Welcome = () => {
  const { guildInfo, channels, mainRef } =
    useOutletContext<DashboardOutletContext>();
  const textChannels = channels?.filter((channel) => channel.type === 0);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<WelcomeCfg | undefined>();
  const [initialConfig, setInitialConfig] = useState<WelcomeCfg | undefined>();
  const [saving, setSaving] = useState(false);
  const [cfgChanged, setCfgChanged] = useState(false);

  const canSubmit = () => {
    if (!config?.channelId) {
      toast.error("Select a channel first!");
      return false;
    }

    if (!config.message?.trim()) {
      toast.error("Message cannot be empty");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!guildInfo || !config) return;
    if (!canSubmit()) return;
    try {
      setSaving(true);
      const payload: UpdateWelcomeCfgDto = {
        ...config,
        guildId: guildInfo.id,
      };

      const response = await apiClient.post(UPDATE_WELCOME_CONFIG_URL, payload);

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

  const handleCancel = () => {
    if (!initialConfig) return;

    setConfig(initialConfig);
    setCfgChanged(false);
    toast.success("Canceled!");
  };

  const getWelcomeCfg = async () => {
    if (!guildInfo) return;
    try {
      const res = await apiClient.get(GET_WELCOME_CONFIG_URL(guildInfo.id));
      setConfig(res.data);
      setInitialConfig(res.data);
    } catch (error) {
      console.error(error);
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
    <>
      <div className="flex flex-col gap-4">
        <DashboardOutletHeader>
          <DashboardOutletHeader.Title>
            Welcome message
          </DashboardOutletHeader.Title>
          <DashboardOutletHeader.Description>
            Send message when member joins your guild
          </DashboardOutletHeader.Description>
        </DashboardOutletHeader>

        <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-900">
          <div className="flex gap-6 items-center">
            <p className="text-xl font-semibold">Welcome message enabled</p>
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
                  <SelectTrigger className="text-base w-full max-w-64 data-placeholder:text-slate-400 cursor-pointer">
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
                        className="text-slate-200 focus:bg-slate-900 focus:text-white data-highlighted:bg-slate-900 data-highlighted:text-white data-[state=checked]:bg-violet-700 data-[state=checked]:text-violet-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-lg opacity-65">#</p>
                          <p className="text-base">{ch.name}</p>
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

              {config.isEmbed ? (
                <div className="flex gap-3 max-w-156">
                  <div
                    className={`w-1 shrink-0 self-stretch rounded-l-xl`}
                    style={{ backgroundColor: config.color || "#8b5cf6" }}
                  ></div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                      <p className="text-lg">Title</p>
                      <input
                        value={config.title || ""}
                        onChange={(e) => {
                          setConfig((prev) => {
                            if (!prev) return undefined;
                            return { ...prev, title: e.target.value };
                          });
                        }}
                        placeholder="Title..."
                        className="rounded-lg mt-2 border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <p className="text-lg">Description</p>
                      <p className="text-sm opacity-85">{`Use {user} to mention user in message`}</p>
                      <textarea
                        value={config.message}
                        onChange={(e) => {
                          setConfig((prev) => {
                            if (!prev) return undefined;

                            return { ...prev, message: e.target.value };
                          });
                        }}
                        className="mt-3 w-full border-gray-800 bg-gray-800 text-white focus:border-violet-500 border rounded-xl p-3 focus:outline-0 resize-none"
                      />
                    </div>

                    <div className="flex gap-3 items-center">
                      <p className="text-lg">Display user avatar</p>
                      <Switch
                        checked={config.displayAvatar}
                        onCheckedChange={() => {
                          setConfig((prev) => {
                            if (!prev) return undefined;

                            return {
                              ...prev,
                              displayAvatar: !prev.displayAvatar,
                            };
                          });
                        }}
                      />
                    </div>

                    <div className="flex flex-col w-fit gap-3">
                      <p className="text-lg">Color</p>
                      <ColorPicker
                        color={config?.color}
                        onChange={(color) => {
                          setConfig((prev) => {
                            if (!prev) return undefined;
                            return { ...prev, color };
                          });
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-lg">Image URL</p>
                      <input
                        value={config.imageUrl || ""}
                        onChange={(e) => {
                          setConfig((prev) => {
                            if (!prev) return undefined;
                            return { ...prev, imageUrl: e.target.value };
                          });
                        }}
                        placeholder="Image URL..."
                        className="rounded-lg w-full border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-lg">Message</p>
                  <p className="text-sm opacity-85">{`Use {user} to mention user in message`}</p>
                  <textarea
                    value={config.message}
                    onChange={(e) => {
                      setConfig((prev) => {
                        if (!prev) return undefined;

                        return { ...prev, message: e.target.value };
                      });
                    }}
                    className="mt-4 max-w-156 border-gray-800 bg-gray-800 text-white focus:border-violet-500 border rounded-xl p-3 focus:outline-0 resize-none"
                  />
                </div>
              )}
            </>
          )}
        </div>
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

export default Welcome;
