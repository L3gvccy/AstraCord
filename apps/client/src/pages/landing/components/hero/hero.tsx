import React from "react";
import { motion } from "framer-motion";

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

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-12">
      <motion.p
        initial="hidden"
        whileInView="visible"
        custom={1}
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="text-6xl font-semibold bg-clip-text text-transparent bg-linear-90 to-violet-600 via-cyan-500 from-teal-600"
      >
        AstraCord
      </motion.p>
      <motion.p
        initial="hidden"
        whileInView="visible"
        custom={2}
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="text-3xl font-bold text-center"
      >
        The all-in-one Discord bot for your community
      </motion.p>
      <motion.p
        initial="hidden"
        whileInView="visible"
        custom={3}
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="text-xl text-center w-full max-w-250 opacity-65"
      >
        AstraCord automates moderation, levels, tickets, and server management –
        so you can focus on your community.
      </motion.p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        custom={4}
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="flex gap-4"
      >
        <button className="bg-linear-90 bg-size-[200%_100%] bg-position-[0%] hover:bg-position-[100%] from-violet-600 to-fuchsia-700 text-white rounded-xl  px-6 py-3 cursor-pointer transition-all duration-300">
          Add to Discord
        </button>
        <button className="bg-slate-200/0 border hover:bg-slate-200/20 hover:border-slate-200/50 rounded-xl px-6 py-3 cursor-pointer transition-all duration-300">
          View servers
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
