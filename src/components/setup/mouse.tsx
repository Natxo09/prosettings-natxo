"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

interface MouseSettings {
  model: string;
  dpi: number;
  pollingRate: string;
  sensitivity: number;
  zoomSensitivity: number;
  edpi: number;
  windowsAcceleration: string;
}

const mouseData: MouseSettings = {
  model: "Logitech G PRO X Superlight 2",
  dpi: 400,
  pollingRate: "2000Hz",
  sensitivity: 1.4,
  zoomSensitivity: 1,
  edpi: 560,
  windowsAcceleration: "Disabled",
};

export function Mouse() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="mouse" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Mouse</h2>
          </div>
          <Button href="https://www.logitechg.com/es-es/shop/p/pro-x2-superlight-wireless-mouse.910-006631">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <SettingItem label="Model" value={mouseData.model} />
          </div>
          <SettingItem label="DPI" value={mouseData.dpi} />
          <SettingItem label="Polling Rate" value={mouseData.pollingRate} />
          <SettingItem label="In-Game Sensitivity" value={mouseData.sensitivity} />
          <SettingItem label="Zoom Sensitivity" value={mouseData.zoomSensitivity} />
          <SettingItem label="eDPI" value={mouseData.edpi} />
          <SettingItem label="Windows Acceleration" value={mouseData.windowsAcceleration} />
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
