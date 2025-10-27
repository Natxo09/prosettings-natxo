"use client";

import { Icon } from "@/components/icon";

interface ProcessorSpecs {
  cpu: string;
  motherboard: string;
  ram: string;
  cooling: string;
}

interface GraphicsSpecs {
  gpu: string;
}

interface StorageSpecs {
  nvme1: string;
  nvme2: string;
  ssd1: string;
  hdd1: string;
  hdd2: string;
}

interface SystemSpecs {
  box: string;
  powerSupply: string;
  os: string;
}

const processorSpecs: ProcessorSpecs = {
  cpu: "Ryzen 7 7700X",
  motherboard: "ASUS ROG STRIX B650E-F",
  ram: "64GB DDR5 6000MT/s",
  cooling: "Noctua NH-D15",
};

const graphicsSpecs: GraphicsSpecs = {
  gpu: "RTX 4070 Ti 12GB",
};

const storageSpecs: StorageSpecs = {
  nvme1: "Kingston 2TB",
  nvme2: "Samsung 990 Pro 1TB",
  ssd1: "Samsung 870 QVO 1TB",
  hdd1: "Seagate 2TB (RAID 0)",
  hdd2: "Seagate 2TB (RAID 0)",
};

const systemSpecs: SystemSpecs = {
  box: "Thermaltake Divider 500",
  powerSupply: "Corsair HX1200 1200W",
  os: "Windows 11 Pro",
};

export function PC() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="cpu" size={28} className="text-card-foreground" />
          <h2 className="text-2xl font-bold">PC</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Processor & Memory */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Processor & Memory
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <SettingItem label="CPU" value={processorSpecs.cpu} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="Motherboard" value={processorSpecs.motherboard} />
            </div>
            <div className="lg:col-span-2">
              <SettingItem label="RAM" value={processorSpecs.ram} />
            </div>
            <div className="lg:col-span-2">
              <SettingItem label="Cooling" value={processorSpecs.cooling} />
            </div>
          </div>
        </div>

        {/* Graphics */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Graphics
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <SettingItem label="GPU" value={graphicsSpecs.gpu} />
          </div>
        </div>

        {/* Storage */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            Storage
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <SettingItem label="NVMe 1" value={storageSpecs.nvme1} />
            </div>
            <div className="lg:col-span-2">
              <SettingItem label="NVMe 2" value={storageSpecs.nvme2} />
            </div>
            <div className="lg:col-span-2">
              <SettingItem label="SSD 1" value={storageSpecs.ssd1} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="HDD 1" value={storageSpecs.hdd1} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="HDD 2" value={storageSpecs.hdd2} />
            </div>
          </div>
        </div>

        {/* System */}
        <div>
          <h3 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide">
            System
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <SettingItem label="Box" value={systemSpecs.box} />
            </div>
            <div className="sm:col-span-2 lg:col-span-2">
              <SettingItem label="Power Supply" value={systemSpecs.powerSupply} />
            </div>
            <SettingItem label="OS" value={systemSpecs.os} />
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
