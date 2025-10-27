"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

interface MousepadSettings {
  model: string;
  size: string;
  surface: string;
  base: string;
  thickness: string;
}

const mousepadData: MousepadSettings = {
  model: "Razer Gigantus V2 3XL",
  size: "1200 x 550mm",
  surface: "Textured Micro-Weave",
  base: "Anti-Slip Rubber",
  thickness: "4mm",
};

export function Mousepad() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="mousepad" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Mousepad</h2>
          </div>
          <Button href="https://www.amazon.es/Razer-Alfombrilla-antideslizante-texturizada-microtejidos/dp/B086RH28FW?th=1">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-2">
            <SettingItem label="Model" value={mousepadData.model} />
          </div>
          <SettingItem label="Size" value={mousepadData.size} />
          <SettingItem label="Thickness" value={mousepadData.thickness} />
          <div className="lg:col-span-2">
            <SettingItem label="Surface" value={mousepadData.surface} />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <SettingItem label="Base" value={mousepadData.base} />
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
