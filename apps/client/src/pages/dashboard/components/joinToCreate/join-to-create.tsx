import { DashboardOutletHeader } from "@/components/dashboard-outlet-header";
import { Switch } from "@/components/ui/switch";
import type { jtcConfig } from "@astracord/shared";
import React, { useState } from "react";

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
            <p className="text-xl font-semibold">Welcome message enabled</p>
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
        </div>

        {/* Add content here (map channels) */}
      </div>
    </>
  );
};

export default JoinToCreate;
