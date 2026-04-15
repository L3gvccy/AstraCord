import { AUTHORIZE_BOT_TO_SERVER } from "@/utils/constants";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  icon?: string;
  name: string;
  role: string;
  isBotConnected: boolean;
}

const GuildCard = ({ id, icon, name, role, isBotConnected }: Props) => {
  const naviagate = useNavigate();
  const imageSrc = icon?.trim()
    ? `https://cdn.discordapp.com/icons/${id}/${icon}.png`
    : "/guild-logo-fallback.png";

  return (
    <div className="group relative mx-auto w-full overflow-hidden rounded-[16px] border border-slate-200/35 bg-violet-900/40 shadow-md shadow-violet-700/30 backdrop-blur-xl transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-0 z-10">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover opacity-50 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/50  to-indigo-950" />
      </div>

      <div className="flex flex-col items-center justify-center p-6 gap-4 z-20  relative">
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-violet-400 shadow-lg shadow-violet-800/50 group-hover:scale-105 transition-all duration-300">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold leading-none text-white drop-shadow-md">
          {name}
        </h3>

        <p className="text-md font-normal leading-none text-white/80">{role}</p>

        <button
          className={`h-10 w-full rounded-[14px] transition-all duration-300 cursor-pointer ${
            isBotConnected
              ? "bg-cyan-600/90 text-white-900 hover:bg-cyan-600"
              : "bg-violet-500 text-white hover:bg-violet-400"
          }`}
          onClick={() => {
            if (isBotConnected) {
              naviagate("/");
            } else {
              window.location.href = AUTHORIZE_BOT_TO_SERVER(id);
            }
          }}
        >
          {isBotConnected ? "Go to dashboard" : "Add to server"}
        </button>
      </div>
    </div>
  );
};

export default GuildCard;
