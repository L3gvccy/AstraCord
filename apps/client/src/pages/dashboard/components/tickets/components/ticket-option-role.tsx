import { getRoleColor } from "@/utils/tools";
import type { RoleType } from "@astracord/shared";
import { XIcon } from "lucide-react";
import React from "react";

interface Props {
  role: RoleType;
  onRemove: (role: RoleType) => void;
}

const TicketOptionRoleItem = ({ role, onRemove }: Props) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border rounded-xl">
      <p
        style={{ color: getRoleColor(role.color) }}
        className="whitespace-nowrap"
      >
        {role.name}
      </p>
      <button
        className="flex items-center justify-center h-full aspect-square opacity-65 hover:opacity-90 transition-all duration-300 cursor-pointer"
        onClick={() => {
          onRemove(role);
        }}
      >
        <XIcon size={18} />
      </button>
    </div>
  );
};

export default TicketOptionRoleItem;
