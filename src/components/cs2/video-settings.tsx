"use client";

import { Icon } from "@/components/icon";

interface DisplaySettings {
  mode: string;
  resolution: string;
  refreshRate: string;
  aspectRatio: string;
  brightness: string;
}

interface GraphicsSettings {
  msaa: string;
  globalShadowQuality: string;
  dynamicShadows: string;
  modelTextureDetails: string;
  textureFiltering: string;
  shaderDetail: string;
  particleDetail: string;
  ambientOcclusion: string;
  hdr: string;
  fsr: string;
}

const displayData: DisplaySettings = {
  mode: "Fullscreen 4:3",
  resolution: "1600x1200",
  refreshRate: "240Hz",
  aspectRatio: "Stretched",
  brightness: "93%",
};

const graphicsData: GraphicsSettings = {
  msaa: "2X MSAA",
  globalShadowQuality: "High",
  dynamicShadows: "All",
  modelTextureDetails: "High",
  textureFiltering: "Anisotropic 4X",
  shaderDetail: "Low",
  particleDetail: "Low",
  ambientOcclusion: "Medium",
  hdr: "Quality",
  fsr: "Disabled (Maximum Quality)",
};

export function VideoSettings() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="video" size={28} className="text-card-foreground" />
          <h2 className="text-2xl font-bold">Video Settings</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Display Settings */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Display
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <SettingItem label="Mode" value={displayData.mode} />
            <SettingItem label="Resolution" value={displayData.resolution} />
            <SettingItem label="Refresh Rate" value={displayData.refreshRate} />
            <SettingItem label="Aspect Ratio" value={displayData.aspectRatio} />
            <SettingItem label="Brightness" value={displayData.brightness} />
          </div>
        </div>

        {/* Graphics Settings */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Graphics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <SettingItem label="Multisampling Anti-Aliasing" value={graphicsData.msaa} />
            </div>
            <SettingItem label="Global Shadow Quality" value={graphicsData.globalShadowQuality} />
            <SettingItem label="Dynamic Shadows" value={graphicsData.dynamicShadows} />
            <SettingItem label="Model/Texture Details" value={graphicsData.modelTextureDetails} />
            <div className="lg:col-span-2">
              <SettingItem label="Texture Filtering Mode" value={graphicsData.textureFiltering} />
            </div>
            <SettingItem label="Shader Detail" value={graphicsData.shaderDetail} />
            <SettingItem label="Particle Detail" value={graphicsData.particleDetail} />
            <SettingItem label="Ambient Occlusion" value={graphicsData.ambientOcclusion} />
            <SettingItem label="High Dynamic Range" value={graphicsData.hdr} />
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="FidelityFX Super Resolution" value={graphicsData.fsr} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SettingItemProps {
  label: string;
  value: string;
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
