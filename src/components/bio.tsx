"use client";

import Image from "next/image";
import { Icon } from "./icon";

const socialLinks = [
  {
    name: "Steam",
    icon: "steam" as const,
    url: "https://steamcommunity.com/id/natxxo",
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
    <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col items-center gap-6">
        {/* Profile Photo */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-border select-none">
          <Image
            src="/Natxo_logo_18.svg"
            alt="Natxo Logo"
            fill
            className="object-cover"
            draggable={false}
            priority
          />
        </div>

        {/* Name */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">Natxo</h2>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-background hover:scale-110 transition-all duration-200 text-foreground/70 hover:text-foreground"
              aria-label={social.name}
            >
              <Icon
                name={social.icon}
                size={20}
                className="transition-all duration-200"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
