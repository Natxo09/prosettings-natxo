"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

interface KeyboardSettings {
  model: string;
  type: string;
  switches: string;
  size: string;
  connectivity: string;
  features: string;
  settings: string;
}

const keyboardData: KeyboardSettings = {
  model: "Wooting 60HE",
  type: "Mechanical",
  switches: "Lekker Hall Effect",
  size: "60%",
  connectivity: "USB-C",
  features: "Analog + Rapid Trigger",
  settings: "Default",
};

export function Keyboard() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="keyboard" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Keyboard</h2>
          </div>
          <Button href="https://wooting.io/wooting-60he">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-2">
            <SettingItem label="Model" value={keyboardData.model} />
          </div>
          <SettingItem label="Type" value={keyboardData.type} />
          <SettingItem label="Size" value={keyboardData.size} />
          <div className="lg:col-span-2">
            <SettingItem label="Switches" value={keyboardData.switches} />
          </div>
          <SettingItem label="Connectivity" value={keyboardData.connectivity} />
          <SettingItem label="Settings" value={keyboardData.settings} />
          <div className="sm:col-span-2 lg:col-span-2">
            <SettingItem label="Features" value={keyboardData.features} />
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
