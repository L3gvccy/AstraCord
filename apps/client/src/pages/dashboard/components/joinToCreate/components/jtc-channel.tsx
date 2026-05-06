import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChannelType, jtcChannel } from "@astracord/shared";
import { ChevronRight, Trash2, Volume2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
  index: number;
  channel: jtcChannel;
  voiceChannels: ChannelType[];
  categories: ChannelType[];
  onChange: (channel: jtcChannel, index: number) => void;
  onRemove: (index: number) => void;
}

const JtcChannel = ({
  index,
  channel,
  voiceChannels,
  categories,
  onChange,
  onRemove,
}: Props) => {
  const [channelData, setChannelData] = useState<jtcChannel>(channel);
  const [userLimitValue, setUserLimitValue] = useState(
    channel.userLimit?.toString() ?? "",
  );

  useEffect(() => {
    setChannelData(channel);
    setUserLimitValue(channel.userLimit?.toString() ?? "");
  }, [channel]);

  const updateChannelData = <K extends keyof jtcChannel>(
    key: K,
    value: jtcChannel[K],
  ) => {
    const updatedChannel: jtcChannel = {
      ...channelData,
      [key]: value,
    };

    setChannelData(updatedChannel);
    onChange(updatedChannel, index);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-white">
          Temporary channel #{index + 1}
        </p>

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
          value={channelData.channelId || ""}
          onValueChange={(value) => {
            updateChannelData("channelId", value);
          }}
        >
          <SelectTrigger className="w-full max-w-64 cursor-pointer text-base data-placeholder:text-slate-400">
            <SelectValue placeholder="Select channel" />
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
        <p className="text-lg font-semibold">Category</p>
        <Select
          value={channelData.categoryId || ""}
          onValueChange={(value) => {
            updateChannelData("categoryId", value);
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
            {categories.map((cat) => (
              <SelectItem
                key={cat.id}
                value={cat.id}
                className="cursor-pointer text-slate-200 focus:bg-slate-900 focus:text-white data-highlighted:bg-slate-900 data-highlighted:text-white data-[state=checked]:bg-violet-700 data-[state=checked]:text-violet-200"
              >
                <div className="flex items-center gap-2">
                  <p className="text-lg opacity-65">
                    <ChevronRight />
                  </p>
                  <p className="text-base">{cat.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="text-lg">Channel name</p>
          <p className="text-sm opacity-85">{`Use {username} to display username in channel name`}</p>
        </div>
        <input
          value={channelData.channelName || ""}
          onChange={(e) => updateChannelData("channelName", e.target.value)}
          placeholder="Enter channel name"
          className="w-full max-w-64 rounded-lg border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg">User limit</p>
        <input
          type="number"
          min={0}
          max={99}
          value={userLimitValue}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              setUserLimitValue("");

              updateChannelData("userLimit", 0);
              return;
            }

            const numericValue = Number(value);

            if (Number.isNaN(numericValue)) return;

            if (numericValue < 0 || numericValue > 99) return;

            setUserLimitValue(value);
            updateChannelData("userLimit", numericValue);
          }}
          placeholder="Enter user limit"
          className="w-full max-w-64 rounded-lg border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
        />
      </div>
    </div>
  );
};

export default JtcChannel;
