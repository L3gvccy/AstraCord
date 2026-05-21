import type {
  RoleType,
  TicketOption,
  TicketOptionRole,
} from "@astracord/shared";
import React, { useEffect, useRef, useState } from "react";
import { type EmojiClickData } from "emoji-picker-react";
import ColorPicker from "@/components/ui/color-picker";
import TicketOptionRoleAdd from "./ticket-option-role-add";
import EmojiPickerComponent from "@/components/emoji-picker/emoji-picker";
import { getRoleColor } from "@/utils/tools";
import TicketOptionRoleItem from "./ticket-option-role";
import { Trash2 } from "lucide-react";

interface Props {
  option: TicketOption;
  index: number;
  roles?: RoleType[];
  canRemove: boolean;
  onChange: (option: TicketOption) => void;
  onRemove: (option: TicketOption) => void;
  onMove: () => void;
}

const TicketOptionComponent = ({
  option,
  index,
  roles,
  canRemove,
  onChange,
  onRemove,
  onMove,
}: Props) => {
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [optionData, setOptionData] = useState(option);
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const availableRoles = roles?.filter(
    (role) => !optionData.roles?.some((r) => r.roleId === role.id),
  );

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

  const handleAddRole = (role: RoleType) => {
    if (!optionData || optionData.roles.some((r) => r.roleId === role.id))
      return;

    setOptionData((prev) => {
      const newRole: TicketOptionRole = {
        roleId: role.id,
        ticketOptionId: option.id as string,
      };
      return {
        ...prev,
        roles: [...prev.roles, newRole],
      };
    });
  };

  const handleRemoveRole = (role: RoleType) => {
    if (!optionData || !optionData.roles.some((r) => r.roleId === role.id))
      return;

    const newRoles = optionData.roles.filter(
      (optDataRole) => optDataRole.roleId !== role.id,
    );

    setOptionData((prev) => {
      return {
        ...prev,
        roles: newRoles,
      };
    });
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    updateOptionData("optionEmoji", emojiData.emoji);
    setEmojiPickerOpened(false);
  };

  // Handle role select close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onChange(optionData);
  }, [optionData]);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-950/25">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Option #{index + 1}</p>
        {canRemove && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-red-700 px-2 py-1 text-sm text-red-200 transition hover:text-red-50 cursor-pointer"
            onClick={() => onRemove(optionData)}
          >
            <Trash2 size={18} />
            <p>Remove</p>
          </button>
        )}
      </div>

      <hr />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Option configuration</p>
        <p className="text-sm text-muted-foreground">
          Configure the options for this ticket
        </p>
      </div>
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
            <div ref={emojiPickerRef} className="absolute left-0 top-14 z-50">
              <EmojiPickerComponent
                onEmojiClick={handleEmojiClick}
                width={320}
                height={400}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col max-w-156">
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
      <div className="flex flex-col max-w-156">
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
      <div className="flex flex-col">
        <p className="text-lg font-semibold">In-ticket message</p>
        <p className="text-sm text-muted-foreground">
          This message will be sent in ticket channel when user clicks on this
          option
        </p>
      </div>
      <div className="flex rounded-xl border w-fit">
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
      {optionData.isEmbed ? (
        <div className="flex gap-3 max-w-156">
          <div
            className={`w-1 shrink-0 self-stretch rounded-l-xl`}
            style={{ backgroundColor: optionData.color || "#8b5cf6" }}
          ></div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <p className="text-lg">Title</p>
              <input
                value={optionData.title || ""}
                onChange={(e) => {
                  updateOptionData("title", e.target.value);
                }}
                placeholder="Title..."
                className="rounded-lg mt-2 border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-lg">Description *</p>
              <textarea
                value={optionData.message || ""}
                onChange={(e) => {
                  updateOptionData("message", e.target.value);
                }}
                className="mt-3 w-full border-gray-800 bg-gray-800 text-white focus:border-violet-500 border rounded-xl p-3 focus:outline-0 resize-none"
              />
            </div>

            <div className="flex flex-col w-fit gap-3">
              <p className="text-lg">Color</p>
              <ColorPicker
                color={optionData.color}
                onChange={(color) => {
                  updateOptionData("color", color);
                }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg">Thumbnail image URL</p>
              <input
                value={optionData.thumbnailImageUrl || ""}
                onChange={(e) => {
                  updateOptionData("thumbnailImageUrl", e.target.value);
                }}
                placeholder="Thumbnail image URL..."
                className="rounded-lg w-full border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-lg">Image URL</p>
              <input
                value={optionData.imageUrl || ""}
                onChange={(e) => {
                  updateOptionData("imageUrl", e.target.value);
                }}
                placeholder="Image URL..."
                className="rounded-lg w-full border border-gray-800 bg-gray-800 p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-w-156">
          <p className="text-lg">Message content *</p>
          <textarea
            value={optionData.message || ""}
            onChange={(e) => {
              updateOptionData("message", e.target.value);
            }}
            className="mt-3 w-full border-gray-800 bg-gray-800 text-white focus:border-violet-500 border rounded-xl p-3 focus:outline-0 resize-none"
          />
        </div>
      )}
      <hr />
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Ticket roles</p>
        <p className="text-sm text-muted-foreground">
          Select roles that could see and manage tickets created with this
          option.
        </p>
      </div>

      <TicketOptionRoleAdd
        roles={availableRoles}
        handleAddRole={handleAddRole}
      />

      <div className="flex flex-wrap gap-2">
        {roles?.filter((role) =>
          optionData.roles.some(
            (optDataRole) => optDataRole.roleId === role.id,
          ),
        ).length == 0 && (
          <p className="text-muted-foreground">No roles added</p>
        )}
        {roles
          ?.filter((role) =>
            optionData.roles.some(
              (optDataRole) => optDataRole.roleId === role.id,
            ),
          )
          .map((role) => (
            <TicketOptionRoleItem role={role} onRemove={handleRemoveRole} />
          ))}
      </div>
    </div>
  );
};

export default TicketOptionComponent;
