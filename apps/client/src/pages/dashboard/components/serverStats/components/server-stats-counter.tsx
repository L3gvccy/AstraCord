import type {
  ChannelType,
  counterType,
  serverStatsCounter,
} from "@astracord/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartLine, Trash2, Volume2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { COUNTER_TYPES, counterDisplayNames } from "@/utils/tools";

interface Props {
  index: number;
  counter: serverStatsCounter;
  types: counterType[];
  voiceChannels: ChannelType[];
  onChange: (counter: serverStatsCounter, index: number) => void;
  onRemove: (index: number) => void;
}

const ServerStatsCounter = ({
  index,
  counter,
  types,
  voiceChannels,
  onChange,
  onRemove,
}: Props) => {
  const [counterData, setCounterData] = useState<serverStatsCounter>(counter);

  useEffect(() => {
    setCounterData(counter);
  }, [counter]);

  const updateCounterData = <K extends keyof serverStatsCounter>(
    key: K,
    value: serverStatsCounter[K],
  ) => {
    const updatedCounter: serverStatsCounter = {
      ...counterData,
      [key]: value,
    };

    setCounterData(updatedCounter);
    onChange(updatedCounter, index);
  };
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-white">Counter #{index + 1}</p>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-red-700 px-2 py-1 text-sm text-red-200 transition hover:text-red-50 cursor-pointer"
          onClick={() => onRemove(index)}
        >
          <Trash2 size={18} />
          <p>Remove</p>
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Channel</p>
        <Select
          value={counterData.channelId || ""}
          onValueChange={(value) => {
            updateCounterData("channelId", value);
          }}
        >
          <SelectTrigger className="w-full max-w-64 cursor-pointer text-base data-placeholder:text-slate-400">
            <SelectValue placeholder="Select counter channel" />
          </SelectTrigger>

          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            className="bg-slate-950 p-1"
          >
            {voiceChannels.map((ch) => (
              <SelectItem
                key={ch.id}
                value={ch.id}
                className="cursor-pointer text-slate-200 focus:bg-slate-900 focus:text-white data-highlighted:bg-slate-900 data-highlighted:text-white data-[state=checked]:bg-violet-700 data-[state=checked]:text-violet-200"
              >
                <div className="flex items-center gap-2">
                  <p className="text-lg opacity-65">
                    <Volume2Icon />
                  </p>
                  <p className="text-base">{ch.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Counter type</p>
        <Select
          value={counterData.type || ""}
          onValueChange={(value) => {
            if (COUNTER_TYPES.includes(value as counterType)) {
              updateCounterData("type", value as counterType);
            }
          }}
        >
          <SelectTrigger className="w-full max-w-64 cursor-pointer text-base data-placeholder:text-slate-400">
            <SelectValue placeholder="Select counter channel" />
          </SelectTrigger>

          <SelectContent
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            className="bg-slate-950 p-1"
          >
            {types.map((type) => (
              <SelectItem
                key={type}
                value={type}
                className="cursor-pointer text-slate-200 focus:bg-slate-900 focus:text-white data-highlighted:bg-slate-900 data-highlighted:text-white data-[state=checked]:bg-violet-700 data-[state=checked]:text-violet-200"
              >
                <div className="flex items-center gap-2">
                  <p className="text-lg opacity-65">
                    <ChartLine />
                  </p>
                  <p className="text-base">{counterDisplayNames[type]}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="text-lg">Counter text</p>
          <p className="text-sm opacity-85">{`Use {count} to display counter in voice channel`}</p>
        </div>
        <input
          value={counterData.text || ""}
          onChange={(e) => updateCounterData("text", e.target.value)}
          placeholder="Enter channel name"
          className="w-full max-w-64 rounded-lg border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
        />
      </div>
    </div>
  );
};

export default ServerStatsCounter;
