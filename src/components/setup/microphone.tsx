"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

interface MicrophoneSettings {
  model: string;
  connectivity: string;
  pattern: string;
  frequency: string;
  bitDepth: string;
  sampleRate: string;
  features: string;
}

const microphoneData: MicrophoneSettings = {
  model: "Rode NT-USB",
  connectivity: "USB",
  pattern: "Cardioid",
  frequency: "20Hz - 20kHz",
  bitDepth: "16-bit",
  sampleRate: "48kHz",
  features: "Zero-Latency Monitor",
};

export function Microphone() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="mic" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Microphone</h2>
          </div>
          <Button href="https://rode.com/es-es/products/nt-usb">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="lg:col-span-2">
            <SettingItem label="Model" value={microphoneData.model} />
          </div>
          <SettingItem label="Connectivity" value={microphoneData.connectivity} />
          <SettingItem label="Polar Pattern" value={microphoneData.pattern} />
          <div className="lg:col-span-2">
            <SettingItem label="Frequency Response" value={microphoneData.frequency} />
          </div>
          <SettingItem label="Bit Depth" value={microphoneData.bitDepth} />
          <SettingItem label="Sample Rate" value={microphoneData.sampleRate} />
          <div className="sm:col-span-2 lg:col-span-2">
            <SettingItem label="Features" value={microphoneData.features} />
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
