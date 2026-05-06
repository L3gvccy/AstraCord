import type { jtcChannel } from "@astracord/shared";
import { Trash2 } from "lucide-react";
import React from "react";

interface Props {
  index: number;
  channel: jtcChannel;
  onRemove: (index: number) => void;
}

// Implement updating logic

const JtcChannel = ({ index, channel, onRemove }: Props) => {
  return (
    <div
      key={channel.id}
      className="flex flex-col gap-3 rounded-lg bg-slate-900 p-4"
    >
      <div className="flex items-center justify-between">
        <p className="flex-lg font-semibold text-white">
          Temporary channel #{index + 1}
        </p>

        <button
          className="flex items-center text-sm gap-2 px-2 py-1 bg-red-700 text-red-200 hover:text-red-50 rounded-lg transition cursor-pointer"
          onClick={() => {
            onRemove(index);
          }}
        >
          <Trash2 size={18} />
          <p>Remove</p>
        </button>
      </div>
      <p>
        {channel.channelName} {channel?.id}
      </p>
    </div>
  );
};

export default JtcChannel;
