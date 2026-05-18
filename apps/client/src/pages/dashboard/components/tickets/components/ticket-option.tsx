import { getRoleColor } from "@/utils/tools";
import type { RoleType, TicketOption } from "@astracord/shared";
import React, { useState } from "react";

interface Props {
  option: TicketOption;
  index: number;
  roles?: RoleType[];
}

const TicketOptionComponent = ({ option, index, roles }: Props) => {
  const [optionData, setOptionData] = useState(option);
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-gray-950/25">
      <p className="text-lg font-semibold">Option #{index + 1}</p>
      {roles?.map((role) => (
        <p style={{ color: getRoleColor(role.color) }}>{role.name}</p>
      ))}
    </div>
  );
};

export default TicketOptionComponent;
