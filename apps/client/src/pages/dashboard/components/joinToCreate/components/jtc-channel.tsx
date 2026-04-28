import type { jtcChannel } from "@astracord/shared";
import { Trash } from "lucide-react";
import React from "react";

interface Props {
  index: number;
  channel: jtcChannel;
}

// Implement updating logic

const JtcChannel = ({ index, channel }: Props) => {
  return (
    <div key={channel.id} className="flex flex-col gap-3 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="flex-lg font-semibold text-white">
          Temporary channel #{index + 1}
        </p>

        <button className="flex items-center text-sm text-red-500 hover:text-red-300 transition">
          <Trash />
          <p>Remove</p>
        </button>
      </div>
    </div>
  );
};

export default JtcChannel;
