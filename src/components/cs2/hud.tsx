"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Icon } from "@/components/icon";

interface HudSettings {
  size: number;
  color: string;
}

const hudData: HudSettings = {
  size: 1.0,
  color: "Bright White",
};

const HUD_COMMANDS = "hud_scaling 1.0; cl_hud_color 2;";

export function Hud() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(HUD_COMMANDS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="hud" size={28} className="text-card-foreground" />
          <h2 className="text-2xl font-bold">HUD</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <SettingItem label="HUD Size" value={hudData.size} />
          <SettingItem label="Color" value={hudData.color} />
        </div>

        {/* Commands */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">
            Console Commands
          </h3>
          <div className="relative bg-background rounded-lg p-4 border border-border">
            <code className="text-foreground break-all select-all font-mono text-sm pr-20">
              {HUD_COMMANDS}
            </code>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200"
              aria-label="Copy HUD commands"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span className="text-xs font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span className="text-xs font-medium">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingItemProps {
  label: string;
  value: string | number;
}

function SettingItem({ label, value }: SettingItemProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-background rounded-lg border border-border">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </div>
  );
}
