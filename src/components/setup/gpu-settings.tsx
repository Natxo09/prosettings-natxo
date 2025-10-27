"use client";

import { Icon } from "@/components/icon";

interface NvidiaSettings {
  digitalVibrance: string;
  powerManagement: string;
  textureFiltering: string;
  verticalSync: string;
  gsync: string;
  maxFrameRate: string;
}

const nvidiaSettings: NvidiaSettings = {
  digitalVibrance: "90%",
  powerManagement: "Prefer Maximum Performance",
  textureFiltering: "Performance",
  verticalSync: "Off",
  gsync: "Disabled",
  maxFrameRate: "Unlimited",
};

export function GPUSettings() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="gpu" size={28} className="text-card-foreground" />
          <h2 className="text-2xl font-bold">GPU Settings</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* NVIDIA Control Panel */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            NVIDIA Control Panel
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <SettingItem label="Power Management Mode" value={nvidiaSettings.powerManagement} />
            </div>
            <SettingItem label="Digital Vibrance" value={nvidiaSettings.digitalVibrance} />
            <SettingItem label="Vertical Sync" value={nvidiaSettings.verticalSync} />
            <SettingItem label="G-SYNC" value={nvidiaSettings.gsync} />
            <div className="lg:col-span-2">
              <SettingItem label="Texture Filtering - Quality" value={nvidiaSettings.textureFiltering} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="Max Frame Rate" value={nvidiaSettings.maxFrameRate} />
            </div>
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
