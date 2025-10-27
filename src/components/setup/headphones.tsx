"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

interface HeadphonesSettings {
  model: string;
  type: string;
  connectivity: string;
  drivers: string;
  frequency: string;
  batteryLife: string;
  features: string;
}

const headphonesData: HeadphonesSettings = {
  model: "HyperX Cloud II Wireless",
  type: "Gaming",
  connectivity: "Wireless 2.4GHz",
  drivers: "53mm",
  frequency: "15Hz - 21kHz",
  batteryLife: "30 Hours",
  features: "7.1 Surround Sound",
};

export function Headphones() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="headphones" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Headphones</h2>
          </div>
          <Button href="https://hyperx.com/products/hyperx-cloud-ii-wireless">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-2">
            <SettingItem label="Model" value={headphonesData.model} />
          </div>
          <SettingItem label="Type" value={headphonesData.type} />
          <SettingItem label="Drivers" value={headphonesData.drivers} />
          <SettingItem label="Battery Life" value={headphonesData.batteryLife} />
          <div className="lg:col-span-2">
            <SettingItem label="Connectivity" value={headphonesData.connectivity} />
          </div>
          <SettingItem label="Frequency Response" value={headphonesData.frequency} />
          <div className="sm:col-span-2 lg:col-span-2">
            <SettingItem label="Features" value={headphonesData.features} />
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
