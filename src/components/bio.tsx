"use client";

import Image from "next/image";
import { Icon } from "./icon";
import { Tooltip } from "./ui/tooltip";

const socialLinks = [
  {
    name: "Steam",
    icon: "steam" as const,
    url: "https://steamcommunity.com/id/natxxo",
  },
  {
    name: "FACEIT",
    icon: "faceit" as const,
    url: "https://www.faceit.com/en/players/VGNatxo",
  },
  {
    name: "Twitch",
    icon: "twitch" as const,
    url: "https://twitch.tv/Natxo",
  },
  {
    name: "Twitter",
    icon: "twitter" as const,
    url: "https://twitter.com/NatxoDev",
  },
  {
    name: "YouTube",
    icon: "youtube" as const,
    url: "https://youtube.com/@NatxoNetwork",
  },
];

export function Bio() {
  return (
    <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* Logo - Large on left */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-border select-none">
            <Image
              src="/Natxo_logo_18.svg"
              alt="Natxo Logo"
              fill
              className="object-cover"
              draggable={false}
              priority
            />
          </div>
        </div>

        {/* Right side content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Name and nationality */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h2 className="text-3xl sm:text-4xl font-bold">Natxo</h2>
              <Image
                src="/icons/españa.svg"
                alt="Spain"
                width={32}
                height={32}
                className="select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* ELO Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* CS2 Premier ELO */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="cs2" size={20} className="text-foreground/70" />
              </div>
              <div className="text-2xl font-bold">20,000</div>
              <div className="text-xs text-foreground/50 mt-1">Rating</div>
            </div>

            {/* FACEIT */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Image
                  src="/icons/faceit-pheasant.png"
                  alt="FACEIT"
                  width={20}
                  height={20}
                  className="select-none"
                  draggable={false}
                />
                <span className="text-xs uppercase tracking-wider text-foreground/60 font-medium">
                  FACEIT
                </span>
              </div>
              <div className="text-2xl font-bold">Level 10</div>
              <div className="text-xs text-foreground/50 mt-1">2,500 ELO</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 justify-center sm:justify-start">
            {socialLinks.map((social) => (
              <Tooltip key={social.name} content={social.name}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background hover:scale-110 transition-all duration-200 text-foreground/70 hover:text-foreground"
                  aria-label={social.name}
                >
                  {social.icon === "faceit" ? (
                    <Image
                      src="/icons/faceit-pheasant.png"
                      alt="FACEIT"
                      width={20}
                      height={20}
                      className="select-none transition-all duration-200"
                      draggable={false}
                    />
                  ) : (
                    <Icon
                      name={social.icon}
                      size={20}
                      className="transition-all duration-200"
                    />
                  )}
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
