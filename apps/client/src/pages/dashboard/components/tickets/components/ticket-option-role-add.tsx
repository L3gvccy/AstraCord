import { getRoleColor } from "@/utils/tools";
import type { RoleType } from "@astracord/shared";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  roles?: RoleType[];
}

const TicketOptionRoleAdd = ({ roles }: Props) => {
  const roleSelectRef = useRef<HTMLDivElement>(null);
  const [roleSelectOpened, setRoleSelectOpened] = useState(false);

  // Handle role select close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        roleSelectRef.current &&
        !roleSelectRef.current.contains(event.target as Node)
      ) {
        setRoleSelectOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative w-fit">
      <button
        className="flex items-center gap-3 px-4 py-2 w-fit bg-violet-600 rounded-xl hover:bg-violet-500 transition-all duration-300 cursor-pointer"
        onClick={() => {
          setRoleSelectOpened(true);
        }}
      >
        <Plus size={18} />
        <p>Add role</p>
      </button>
      {roleSelectOpened && (
        <div
          ref={roleSelectRef}
          className="absolute bottom-full mb-2 md:bottom-0 md:left-full md:mb-0 md:ml-2 p-1 bg-slate-950 border rounded-xl w-60 max-h-60 overflow-y-auto"
        >
          <div className="flex flex-col text-start w-full truncate">
            {roles?.map((role) => (
              <button
                key={role.id}
                className="px-4 py-2 rounded-xl hover:bg-slate-800 cursor-pointer"
                style={{ color: getRoleColor(role.color) }}
              >
                <p className="text-start">{role.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketOptionRoleAdd;
