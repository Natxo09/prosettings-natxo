"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Icon } from "@/components/icon";

interface CrosshairSettings {
  style: number;
  size: number;
  gap: number;
  thickness: number;
  outline: number;
  color: number;
  alpha: number;
  dot: boolean;
  tStyle?: boolean;
}

const crosshairData: CrosshairSettings = {
  style: 4, // Classic Static
  size: 1.0, // Length
  gap: -2.5, // Gap
  thickness: 0.5, // Thickness
  outline: 0, // No outline
  color: 0, // Red (RGB: 255, 0, 0)
  alpha: 255, // Full opacity
  dot: true, // Center dot enabled
};

const CROSSHAIR_CODE = "CSGO-MnDFF-JJDt7-SnbjV-kYGXe-tuHCF";

export function Crosshair() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CROSSHAIR_CODE);
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
          <Icon name="crosshair" size={28} className="text-card-foreground" />
          <h2 className="text-2xl font-bold">Crosshair Settings</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <SettingItem label="Style" value={crosshairData.style} />
          <SettingItem label="Length" value={crosshairData.size} />
          <SettingItem label="Thickness" value={crosshairData.thickness} />
          <SettingItem label="Gap" value={crosshairData.gap} />
          <SettingItem label="Outline" value="No" />
          <SettingItem label="Center Dot" value="Yes" />
          <SettingItem label="Color" value="Red" />
          <SettingItem label="Alpha" value={crosshairData.alpha} />
        </div>

        {/* Crosshair Code */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Crosshair Code
          </h3>
          <div className="relative bg-background rounded-lg p-4 border border-border">
            <code className="text-foreground break-all select-all font-mono text-sm pr-20">
              {CROSSHAIR_CODE}
            </code>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200"
              aria-label="Copy crosshair code"
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
