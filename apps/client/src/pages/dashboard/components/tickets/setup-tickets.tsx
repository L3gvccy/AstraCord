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
import { GET_TICKETS_CONFIG_URL } from "@/utils/constants";
import type { TicketConfig, TicketOption } from "@astracord/shared";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TicketOptionComponent from "./components/ticket-option";
import { toast } from "sonner";

const SetupTickets = () => {
  const { guildInfo, channels, roles, mainRef } =
    useOutletContext<DashboardOutletContext>();
  const categories = channels?.filter((ch) => ch.type === 4);
  const filteredRoles = roles?.filter((role) => role.id !== guildInfo?.id);
  const [config, setConfig] = useState<TicketConfig>();
  const [initialConfig, setInitialConfig] = useState<TicketConfig>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cfgChanged, setCfgChanged] = useState(false);

  const getConfig = async () => {
    if (!guildInfo?.id) return;
    try {
      const res = await apiClient.get(GET_TICKETS_CONFIG_URL(guildInfo.id));

      setConfig(res.data);
      setInitialConfig(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {};
  const handleCancel = async () => {
    if (!initialConfig) return;

    setConfig(initialConfig);
    setCfgChanged(false);
    toast.success("Canceled!");
  };

  const handleAddOption = () => {
    if (!config) {
      toast.error("No config provided");
      return;
    }

    const newOption: TicketOption = {
      ticketConfigId: config.id,
      guildId: config.guildId,
      position: config.options?.length || 0,
      optionEmoji: "🎟️",
      optionText: "General ticket",
      isEmbed: true,
      title: "Ticket opened",
      message: "Please describe your situation below",
      color: "#9b59b6",
      roles: [],
    };

    setConfig((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        options: [...(prev.options ?? []), newOption],
      };
    });
  };

  const handleRemoveOption = () => {};

  useEffect(() => {
    getConfig();
  }, []);

  //delete nahuy
  useEffect(() => {
    if (!config) return;
    console.log(config);
  }, [config]);

  useEffect(() => {
    if (!config || !initialConfig) return;

    setCfgChanged(JSON.stringify(config) !== JSON.stringify(initialConfig));
  }, [config, initialConfig]);

  if (loading || !config) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <DashboardOutletHeader>
          <DashboardOutletHeader.Title>Tickets</DashboardOutletHeader.Title>
          <DashboardOutletHeader.Description>
            Manage server's tickets sytem
          </DashboardOutletHeader.Description>
        </DashboardOutletHeader>

        <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-900">
          <div className="flex gap-6 items-center">
            <p className="text-xl font-semibold">Tickets enabled</p>
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

          {config.isEnabled && (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">Tickets category</p>
                  <p className="text-sm text-muted-foreground">
                    Select category where ticket channels will be created
                  </p>
                </div>

                <Select
                  value={config.categoryId || ""}
                  onValueChange={(value) => {
                    setConfig((prev) => {
                      if (!prev) return undefined;

                      return { ...prev, categoryId: value };
                    });
                  }}
                >
                  <SelectTrigger className="w-full max-w-64 cursor-pointer text-base data-placeholder:text-slate-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={6}
                    className="bg-slate-950 p-1"
                  >
                    {categories?.map((ch) => (
                      <SelectItem
                        key={ch.id}
                        value={ch.id}
                        className="cursor-pointer text-slate-200 focus:bg-slate-900 focus:text-white data-highlighted:bg-slate-900 data-highlighted:text-white data-[state=checked]:bg-violet-700 data-[state=checked]:text-violet-200"
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

              <div className="flex flex-col">
                <p className="text-lg font-semibold">Tickets embed message</p>
                <p className="text-sm text-muted-foreground">
                  Configure the embed message for the tickets
                </p>
              </div>

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
                    <textarea
                      value={config.description}
                      onChange={(e) => {
                        setConfig((prev) => {
                          if (!prev) return undefined;

                          return { ...prev, description: e.target.value };
                        });
                      }}
                      className="mt-3 w-full border-gray-800 bg-gray-800 text-white focus:border-violet-500 border rounded-xl p-3 focus:outline-0 resize-none"
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
                    <p className="text-lg">Thumbnail image URL</p>
                    <input
                      value={config.thumbnailImageUrl || ""}
                      onChange={(e) => {
                        setConfig((prev) => {
                          if (!prev) return undefined;
                          return { ...prev, thumbnailImageUrl: e.target.value };
                        });
                      }}
                      placeholder="Thumbnail image URL..."
                      className="rounded-lg w-full border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
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
            </>
          )}
        </div>

        {config.isEnabled && (
          <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-900">
            <p className="text-xl font-semibold">Tickets options</p>
            <button
              className=" flex items-center w-fit gap-3 px-4 py-2  bg-violet-600 rounded-lg hover:bg-violet-500 transition cursor-pointer"
              onClick={handleAddOption}
            >
              <Plus size={22} />
              <p>Add new option</p>
            </button>

            {config?.options
              ?.sort((a, b) => b.position - a.position)
              .map((option, index) => (
                <TicketOptionComponent
                  option={option}
                  index={index}
                  roles={filteredRoles}
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

export default SetupTickets;
