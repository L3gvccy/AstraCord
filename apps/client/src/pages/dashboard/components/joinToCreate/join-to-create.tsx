import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import { Switch } from "@/components/ui/switch";
import type { jtcConfig } from "@astracord/shared";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import JtcChannel from "./components/jtc-channel";

const JoinToCreate = () => {
  const [config, setConfig] = useState<jtcConfig>();
  const [initialConfig, setInitialConfig] = useState<jtcConfig>();
  const [loading, setLoading] = useState(false);
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

          {/* Channels count, add btn */}

          <p className="flex-lg text-white/85">
            Channels count: {config?.channels?.length || 0}/5
          </p>
          <button className=" flex items-center w-fit gap-3 px-4 py-2  bg-violet-600 rounded-lg hover:bg-violet-500 transition cursor-pointer">
            <Plus size={22} />
            <p>Add new channel</p>
          </button>
        </div>

        {/* Add content here (map channels) */}

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
