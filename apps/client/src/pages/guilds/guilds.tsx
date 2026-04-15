import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GuildCard from "./components/guild-card";
import Header from "../landing/components/header/header";
import { apiClient } from "@/utils/api-client";
import type { GuildResponseDto } from "@astracord/shared";
import { GET_USER_GUILDS_URL } from "@/utils/constants";
import { Skeleton } from "@/components/ui/skeleton";

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
          {loading ? (
            [1, 1, 1].map(() => {
              return (
                <Skeleton className="flex flex-col items-center justify-center w-full h-67 bg-slate-900 p-6 gap-4 rounded-[16px]">
                  <Skeleton className="w-23 h-23 rounded-full bg-slate-800" />
                  <Skeleton className="w-40 h-5 bg-slate-800" />
                  <Skeleton className="w-15 h-4 bg-slate-800 opacity-85" />
                  <Skeleton className="w-full h-10 bg-slate-800 rounded-[14px]" />
                </Skeleton>
              );
            })
          ) : guilds.length > 0 ? (
            guilds.map((guild, i) => (
              <motion.div
                key={guild.name}
                initial="hidden"
                whileInView="visible"
                // custom={i}
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
            ))
          ) : (
            <p className="text-center opacity-85 text-lg col-span-3">
              No servers found. You must be owner or admin to manage bot.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Guilds;
