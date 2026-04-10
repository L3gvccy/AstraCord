import React from "react";
import GuildCard from "./components/guild-card";

const servers = [
  { name: "Server", role: "Owner", isBotConnected: false },
  { name: "Server", role: "Owner", isBotConnected: false },
  { name: "Server", role: "Owner", isBotConnected: false },
];

const Guilds = () => {
  return (
    <div>
      {servers.map((s) => (
        <GuildCard isBotConnected={s.isBotConnected} />
      ))}
    </div>
  );
};

export default Guilds;
