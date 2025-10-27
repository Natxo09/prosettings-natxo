"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
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

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Natxo.{" "}
            <a
              href="https://github.com/Natxo09/prosettings-natxo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:opacity-70 transition-opacity underline underline-offset-2"
            >
              Open Source Project
              <ExternalLink className="size-3" />
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
