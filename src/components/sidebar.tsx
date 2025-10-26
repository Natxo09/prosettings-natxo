"use client";

import { Icon } from "./icon";
import { useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  label: string;
  icon: "user" | "crosshair" | "viewmodel" | "launch" | "video" | "hud" | "radar" | "knife" | "mouse" | "monitor" | "keyboard" | "headphones" | "mic" | "mousepad" | "cpu" | "gpu";
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navigationSections: NavSection[] = [
  {
    title: "",
    items: [
      { id: "bio", label: "Bio", icon: "user" },
    ],
  },
  {
    title: "CS2 Settings",
    items: [
      { id: "crosshair", label: "Crosshair", icon: "crosshair" },
      { id: "viewmodel", label: "Viewmodel", icon: "viewmodel" },
      { id: "launch-options", label: "Launch Options", icon: "launch" },
      { id: "video-settings", label: "Video Settings", icon: "video" },
      { id: "hud", label: "HUD", icon: "hud" },
      { id: "radar", label: "Radar", icon: "radar" },
      { id: "skins", label: "Skins", icon: "knife" },
    ],
  },
  {
    title: "Setup",
    items: [
      { id: "mouse", label: "Mouse", icon: "mouse" },
      { id: "monitor", label: "Monitor", icon: "monitor" },
      { id: "keyboard", label: "Keyboard", icon: "keyboard" },
      { id: "headphones", label: "Headphones", icon: "headphones" },
      { id: "mic", label: "Microphone", icon: "mic" },
      { id: "mousepad", label: "Mousepad", icon: "mousepad" },
    ],
  },
  {
    title: "PC Specs",
    items: [
      { id: "pc-specs", label: "Specifications", icon: "cpu" },
      { id: "gpu-settings", label: "GPU Settings", icon: "gpu" },
    ],
  },
];

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export function Sidebar({ activeSection = "bio", onSectionChange }: SidebarProps) {
  const [active, setActive] = useState(activeSection);

  const handleItemClick = (itemId: string) => {
    setActive(itemId);
    onSectionChange?.(itemId);
  };

  return (
    <aside className="w-64 bg-card rounded-2xl p-6 shadow-lg h-fit sticky top-8">
      <nav className="space-y-6">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      active === item.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-card-foreground/70 hover:text-card-foreground hover:bg-background/50"
                    )}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      className={cn(
                        "transition-colors",
                        active === item.id ? "text-foreground" : "text-card-foreground/60"
                      )}
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
