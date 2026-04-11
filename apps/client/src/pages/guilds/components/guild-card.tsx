import React from "react";

interface Props {
  isBotConnected: boolean;
}

const GuildCard = ({ isBotConnected }: Props) => {
  const btnBg = isBotConnected ? "bg-white" : "bg-black";

  return (
    <div>
      GuildCard
      <button className={`${btnBg} `}>
        {isBotConnected ? "Go to dashboard" : "Add to server"}
      </button>
    </div>
  );
};

export default GuildCard;
