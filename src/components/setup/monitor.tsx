"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

interface MonitorSpecs {
  model: string;
  size: string;
  panel: string;
  resolution: string;
  aspectRatio: string;
  refreshRate: string;
  responseTime: string;
  maxBrightness: string;
  maxContrast: string;
  colorGamut: string;
  hdrSupport: string;
  freesyncSupport: string;
}

interface MonitorSettings {
  brightness: string;
  contrast: string;
  sharpness: string;
  gamma: string;
  colorTemp: string;
  rgbRed: number;
  rgbGreen: number;
  rgbBlue: number;
  adaptiveSync: string;
  hdr: string;
  dasMode: string;
}

const monitorSpecs: MonitorSpecs = {
  model: "LG 27GR95QE-B",
  size: "27\"",
  panel: "OLED",
  resolution: "2560x1440",
  aspectRatio: "16:9",
  refreshRate: "240Hz",
  responseTime: "0.03ms",
  maxBrightness: "200cd/m²",
  maxContrast: "1.5M:1",
  colorGamut: "DCI-P3 >90%",
  hdrSupport: "HDR10",
  freesyncSupport: "FreeSync Premium",
};

const monitorSettings: MonitorSettings = {
  brightness: "100%",
  contrast: "65%",
  sharpness: "90%",
  gamma: "Mode 1",
  colorTemp: "Custom",
  rgbRed: 50,
  rgbGreen: 50,
  rgbBlue: 50,
  adaptiveSync: "Disabled",
  hdr: "Disabled",
  dasMode: "ON",
};

export function Monitor() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="monitor" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Monitor</h2>
          </div>
          <Button href="https://www.amazon.es/dp/B0BRYJQP4Z">
            Buy Now
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Specifications */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <SettingItem label="Model" value={monitorSpecs.model} />
            </div>
            <SettingItem label="Size" value={monitorSpecs.size} />
            <SettingItem label="Panel Type" value={monitorSpecs.panel} />
            <SettingItem label="Resolution" value={monitorSpecs.resolution} />
            <div className="lg:col-span-2">
              <SettingItem label="Aspect Ratio" value={monitorSpecs.aspectRatio} />
            </div>
            <SettingItem label="Refresh Rate" value={monitorSpecs.refreshRate} />
            <SettingItem label="Response Time" value={monitorSpecs.responseTime} />
            <SettingItem label="Max Brightness" value={monitorSpecs.maxBrightness} />
            <SettingItem label="Max Contrast" value={monitorSpecs.maxContrast} />
            <div className="lg:col-span-2">
              <SettingItem label="Color Gamut" value={monitorSpecs.colorGamut} />
            </div>
            <SettingItem label="HDR Support" value={monitorSpecs.hdrSupport} />
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="Adaptive Sync Support" value={monitorSpecs.freesyncSupport} />
            </div>
          </div>
        </div>

        {/* Current Settings */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Current Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <SettingItem label="Brightness" value={monitorSettings.brightness} />
            <SettingItem label="Contrast" value={monitorSettings.contrast} />
            <SettingItem label="Sharpness" value={monitorSettings.sharpness} />
            <SettingItem label="Gamma" value={monitorSettings.gamma} />
            <div className="lg:col-span-2">
              <SettingItem label="Color Temperature" value={monitorSettings.colorTemp} />
            </div>
            <SettingItem label="RGB Red" value={monitorSettings.rgbRed} />
            <SettingItem label="RGB Green" value={monitorSettings.rgbGreen} />
            <SettingItem label="RGB Blue" value={monitorSettings.rgbBlue} />
            <SettingItem label="Adaptive Sync" value={monitorSettings.adaptiveSync} />
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="HDR" value={monitorSettings.hdr} />
            </div>
            <SettingItem label="DAS Mode" value={monitorSettings.dasMode} />
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
