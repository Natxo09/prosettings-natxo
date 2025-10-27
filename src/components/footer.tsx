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
  {
    name: "GitHub",
    icon: "github" as const,
    url: "https://github.com/Natxo09",
  },
];

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground p-8 rounded-t-2xl shadow-lg mt-8">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden select-none">
          <Image
            src="/Natxo_logo_18.svg"
            alt="Natxo Logo"
            fill
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
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

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Natxo. Open Source Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
