import { ArrowBigUpDash, Award, Gavel, Hand, NotebookPen, PhoneCall, PhoneOutgoing, Volume2 } from "lucide-react";
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

const LandingBody = () => {
  const features = [
    {
      icon: <Gavel size={24} />,
      title: "Moderation",
      desc: "Keep your server safe and clean",
      items: [
        "Auto moderation",
        "Warns, mutes, bans",
        "Anti-spam & anti-raid",
        "Moderation logs",
      ],
    },
    {
      icon: <NotebookPen size={24} />,
      title: "Tickets",
      desc: "Support system built into Discord",
      items: [
        "Create tickets instantly",
        "Custom categories",
        "Staff roles",
        "Close & archive",
      ],
    },
    {
      icon: <ArrowBigUpDash size={24} />,
      title: "Level System",
      desc: "Engage your community",
      items: [
        "XP & leveling",
        "Leaderboards",
        "Rewards & roles",
        "Custom formulas",
      ],
    },
    {
      icon: <Award size={24} />,
      title: "Reaction Roles",
      desc: "Let users choose roles themselves",
      items: [
        "Click to get roles",
        "Multiple role groups",
        "Custom messages",
      ],
    },
    {
      icon: <Hand size={24} />,
      title: "Welcome System",
      desc: "Make a great first impression",
      items: [
        "Welcome messages",
        "Auto roles",
        "Embedded messages",
      ],
    },
    {
      icon: <Volume2 size={24} />,
      title: "Voice & Join-to-Create",
      desc: "Dynamic voice channels",
      items: [
        "Auto-create channels",
        "Temporary rooms",
        "Full control",
      ],
    },
  ];
  return (
    <div className="flex flex-col w-full gap-12 py-12 items-center">
      <div className="flex flex-col w-full gap-6 items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {features.map((feature, i) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              custom={i + 1}
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="flex flex-col w-full gap-2 p-4 group rounded-2xl border border-slate-700 bg-size-[100%_200%] bg-linear-180 from-slate-950 to-violet-950 shadow-md shadow-violet-400/30 bg-top hover:bg-bottom transition-transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">{feature.title}</p>
                <div className="flex w-fit p-4 rounded-xl border border-violet-400 text-violet-400 group-hover:bg-violet-400/20 transition-all duration-300">
                  {feature.icon}
                </div>
              </div>

              <p className="text-[18px] opacity-75">{feature.desc}</p>

              <div className="flex flex-col">
                {feature.items.map((item) => (
                  <p>- {item}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingBody;
