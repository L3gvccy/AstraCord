import type { RoleType } from "@astracord/shared";
import { Plus } from "lucide-react";
import React from "react";

interface Props {
  roles?: RoleType[];
}

const TicketOptionRoleAdd = ({ roles }: Props) => {
  return (
    <div className="relative">
      <button className="flex items-center gap-3 px-4 py-2 w-fit bg-violet-600 rounded-xl hover:bg-violet-500 transition-all duration-300 cursor-pointer">
        <Plus size={18} />
        <p>Add role</p>
      </button>
    </div>
  );
};

export default TicketOptionRoleAdd;
