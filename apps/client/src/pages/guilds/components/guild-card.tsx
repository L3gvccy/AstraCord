import React from "react";

interface Server {
  avatar: string;
  name: string;
  role: string;
  isBotConnected: boolean;
}

interface Props {
  server: Server;
}

const GuildCard = ({ server }: Props) => {
  const imageSrc = server.avatar?.trim()
    ? server.avatar
    : "/guild-logo-fallback.png";

  return (
    <div className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[16px] border border-white/10 bg-violet-900/40 shadow-[0_20px_60px_rgba(76,29,149,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(139,92,246,0.35)]">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={server.name}
          className="h-full w-full object-cover opacity-35 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 to-violet-950/85" />
      </div>

      <div className="absolute left-1/2 top-11 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full border-3 border-violet-500/80 shadow-lg shadow-blue-800/50">
        <img
          src={imageSrc}
          alt={server.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex min-h-[320px] flex-col items-center justify-end px-6 pb-6 pt-32 text-center">
        <h3 className="text-[36px] font-semibold leading-none text-white drop-shadow-md">
          {server.name}
        </h3>

        <p className="mt-5 text-[24px] font-normal leading-none text-white/80">
          {server.role}
        </p>

        <button
          className={`mt-6 h-10 w-full rounded-[14px] transition-all duration-300 ${
            server.isBotConnected
              ? "bg-white/90 text-violet-900 hover:bg-white"
              : "bg-violet-500 text-white hover:bg-violet-400"
          }`}
        >
          {server.isBotConnected ? "Go to dashboard" : "Add to server"}
        </button>
      </div>
    </div>
  );
};

export default GuildCard;