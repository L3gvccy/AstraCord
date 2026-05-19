import { getRoleColor } from "@/utils/tools";
import type { RoleType, TicketOption } from "@astracord/shared";
import React, { useState } from "react";
import EmojiPicker, { type EmojiClickData, Theme } from "emoji-picker-react";

interface Props {
  option: TicketOption;
  index: number;
  roles?: RoleType[];
}

const TicketOptionComponent = ({ option, index, roles }: Props) => {
  const [optionData, setOptionData] = useState(option);
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);

  const updateOptionData = <K extends keyof TicketOption>(
    key: K,
    value: TicketOption[K],
  ) => {
    const updatedOption: TicketOption = {
      ...optionData,
      [key]: value,
    };

    setOptionData(updatedOption);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    updateOptionData("optionEmoji", emojiData.emoji);
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-950/25">
      <p className="text-lg font-semibold">Option #{index + 1}</p>

      <hr />

      <p className="text-lg font-semibold">Option configuration</p>

      <div className="flex flex-col">
        <p className="text-lg">Option emoji *</p>
        <div className="relative">
          <button
            className="text-3xl p-1 w-fit aspect-square bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setEmojiPickerOpened(true);
            }}
          >
            {optionData.optionEmoji}
          </button>

          {emojiPickerOpened && (
            <div className="absolute left-0 top-14 z-50">
              <EmojiPicker
                className="bg-gray-900"
                onEmojiClick={handleEmojiClick}
                theme={Theme.DARK}
                width={320}
                height={400}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-lg">Option text *</p>
        <input
          value={optionData.optionText || ""}
          onChange={(e) => {
            updateOptionData("optionText", e.target.value);
          }}
          placeholder="Option text..."
          className="rounded-lg mt-2 border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-lg">Option description</p>
        <input
          value={optionData.optionDescription || ""}
          onChange={(e) => {
            updateOptionData("optionDescription", e.target.value);
          }}
          placeholder="Option description..."
          className="rounded-lg mt-2 border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
        />
      </div>

      <hr />

      <p className="text-lg font-semibold">In-ticket message</p>

      <div className="flex flex-col w-fit gap-2">
        <div className="flex rounded-xl border">
          <div
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 ${!optionData.isEmbed && "bg-violet-600"}`}
            onClick={() => {
              updateOptionData("isEmbed", false);
            }}
          >
            <p className="text-md">Text message</p>
          </div>
          <div
            className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 ${optionData.isEmbed && "bg-violet-600"}`}
            onClick={() => {
              updateOptionData("isEmbed", true);
            }}
          >
            <p className="text-md">Embed message</p>
          </div>
        </div>
      </div>
      {/* {roles?.map((role) => (
        <p style={{ color: getRoleColor(role.color) }}>{role.name}</p>
      ))} */}
    </div>
  );
};

export default TicketOptionComponent;
