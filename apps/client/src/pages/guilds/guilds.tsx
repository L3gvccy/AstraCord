import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GuildCard from "./components/guild-card";
import Header from "../landing/components/header/header";
import { apiClient } from "@/utils/api-client";
import type { GuildResponseDto } from "@astracord/shared";
import { GET_USER_GUILDS_URL } from "@/utils/constants";

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
  const [loading, setLoading] = useState(true);

  const [guilds, setGuilds] = useState<GuildResponseDto[]>([]);

  const fetchGuilds = async () => {
    try {
      const res = await apiClient.get<GuildResponseDto[]>(GET_USER_GUILDS_URL);
      console.log(res.data);
      setGuilds(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-6 py-6 px-4">
        <Header />
        <p className="text-2xl font-semibold tracking-wider uppercase">
          Servers List
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full max-w-342 gap-6">
          {guilds.map((guild, i) => (
            <motion.div
              key={guild.name}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <GuildCard
                id={guild.id}
                icon={guild?.icon}
                name={guild.name}
                role={guild.role}
                isBotConnected={guild.isBotConnected}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Guilds;
