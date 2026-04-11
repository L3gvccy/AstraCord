import React from "react";
import { motion } from "framer-motion";
import GuildCard from "./components/guild-card";
import Header from "../landing/components/header/header";

const servers = [
  {
    avatar: "public/avatar.png",
    name: "Server1",
    role: "Owner",
    isBotConnected: false,
  },
  { avatar: "", name: "Server2", role: "Owner", isBotConnected: false },
  { avatar: "", name: "Server3", role: "Owner", isBotConnected: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const Guilds = () => {
  return (
    <>
      <Header />
      <div className="flex w-full items-center justify-center px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-342 gap-6">
          {servers.map((server, i) => (
            <motion.div
              key={server.name}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <GuildCard
                avatar={server.avatar}
                name={server.name}
                role={server.role}
                isBotConnected={server.isBotConnected}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Guilds;
