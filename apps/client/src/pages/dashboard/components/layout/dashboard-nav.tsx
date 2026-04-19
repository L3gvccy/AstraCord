import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ChevronDown,
  CircleHelp,
  Shield,
  Users,
  ScrollText,
  Hand,
  PhoneCall,
  Award,
  Code,
  Vote,
  NotebookPen,
  Bot,
  UserStar,
  ShieldBan,
  MessageCircleX,
  TriangleAlert,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import DashboardNavItem from "./dashboard-nav-item";

interface GuildInfo {
  id: string;
  icon?: string;
  name: string;
}

interface DashboardNavProps {
  guild?: GuildInfo;
  isCollapsed: boolean;
}

const DashboardNav = ({ guild, isCollapsed }: DashboardNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const guildId = guild?.id ?? id ?? "";

  const imageSrc = guild?.icon?.trim()
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
    : "/guild-logo-fallback.png";

  const navSections = useMemo(
    () => [
      {
        label: "AUTOMATION",
        icon: Bot,
        items: [
          {
            title: "Welcome",
            href: `/dashboard/${guildId}/welcome`,
            icon: Hand,
          },
          {
            title: "Join To Create",
            href: `/dashboard/${guildId}/join-to-create`,
            icon: PhoneCall,
          },
          {
            title: "Reaction Roles",
            href: `/dashboard/${guildId}/reaction-roles`,
            icon: Award,
          },
          { title: "Embeds", href: `/dashboard/${guildId}/embeds`, icon: Code },
          {
            title: "Ongoing Polls",
            href: `/dashboard/${guildId}/polls/ongoing`,
            icon: Vote,
          },
          {
            title: "Create Poll",
            href: `/dashboard/${guildId}/polls/create`,
            icon: Vote,
          },
        ],
      },
      {
        label: "SUPPORT",
        icon: CircleHelp,
        items: [
          {
            title: "Active Tickets",
            href: `/dashboard/${guildId}/tickets/active`,
            icon: NotebookPen,
          },
          {
            title: "Archived Tickets",
            href: `/dashboard/${guildId}/tickets/archived`,
            icon: NotebookPen,
          },
          {
            title: "SetUp Tickets",
            href: `/dashboard/${guildId}/setup-tickets`,
            icon: CircleHelp,
          },
        ],
      },
      {
        label: "MODERATION",
        icon: Shield,
        items: [
          {
            title: "Bans",
            href: `/dashboard/${guildId}/bans`,
            icon: ShieldBan,
          },
          {
            title: "Mutes",
            href: `/dashboard/${guildId}/mutes`,
            icon: MessageCircleX,
          },
          {
            title: "Warns",
            href: `/dashboard/${guildId}/warns`,
            icon: TriangleAlert,
          },
          {
            title: "AutoMod",
            href: `/dashboard/${guildId}/automod`,
            icon: Bot,
          },
        ],
      },
      {
        label: "COMMUNITY",
        icon: Users,
        items: [
          {
            title: "Levels",
            href: `/dashboard/${guildId}/levels`,
            icon: Users,
          },
          {
            title: "LeaderBoard",
            href: `/dashboard/${guildId}/leaderboard`,
            icon: UserStar,
          },
        ],
      },
      {
        label: "LOGS",
        icon: ScrollText,
        items: [
          {
            title: "Logs Management",
            href: `/dashboard/${guildId}/logs/management`,
            icon: ScrollText,
          },
          {
            title: "Audit Logs",
            href: `/dashboard/${guildId}/logs/audit`,
            icon: ScrollText,
          },
        ],
      },
    ],
    [guildId],
  );

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    AUTOMATION: true,
    SUPPORT: false,
    MODERATION: false,
    COMMUNITY: false,
    LOGS: false,
  });

  const activeSections = useMemo(() => {
    const result: Record<string, boolean> = {};

    navSections.forEach((section) => {
      result[section.label] = section.items.some(
        (item) =>
          location.pathname === item.href ||
          location.pathname.startsWith(`${item.href}/`),
      );
    });

    return result;
  }, [location.pathname, navSections]);

  useEffect(() => {
    setOpenSections((prev) => {
      const next = { ...prev };

      Object.entries(activeSections).forEach(([label, isActive]) => {
        if (isActive) {
          next[label] = true;
        }
      });

      return next;
    });
  }, [activeSections]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside
      className={`shrink-0 rounded-[20px] border border-white/5 bg-[#18243b] p-3 text-white transition-all duration-300 ${
        isCollapsed ? "w-[88px]" : "w-[220px]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/servers")}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="mb-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/10">
            <img
              src={imageSrc}
              alt={guild?.name || "Server"}
              className="h-full w-full object-cover"
            />
          </div>

          {!isCollapsed && (
            <h2 className="max-w-[180px] truncate text-center text-lg font-semibold">
              {guild?.name || "ServerName"}
            </h2>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {navSections.map((section) => {
          const SectionIcon = section.icon;
          const isOpen = openSections[section.label];
          const isSectionActive = activeSections[section.label];

          if (isCollapsed) {
            return (
              <div key={section.label} className="space-y-2">
                <div className="flex justify-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isSectionActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400"
                    }`}
                  >
                    <SectionIcon className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <DashboardNavItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                      isCollapsed={isCollapsed}
                    />
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={section.label} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleSection(section.label)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                  isSectionActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <SectionIcon className="h-4 w-4 shrink-0" />
                  <span>{section.label}</span>
                </span>

                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 space-y-1 pl-2">
                  {section.items.map((item) => (
                    <DashboardNavItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                      icon={item.icon}
                      isCollapsed={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardNav;
