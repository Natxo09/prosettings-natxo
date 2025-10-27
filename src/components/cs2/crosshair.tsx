"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/icon";
import Image from "next/image";
import gsap from "gsap";

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

// CS2 crosshair color mappings
const CROSSHAIR_COLORS: Record<number, string> = {
  0: "#FF0000", // Red
  1: "#00FF00", // Green
  2: "#FFFF00", // Yellow
  3: "#0000FF", // Blue
  4: "#00FFFF", // Cyan
  5: "#FFFFFF", // White
};

// Map screenshots
const MAP_SCREENSHOTS = [
  { name: "Dust 2", path: "/dust2.avif" },
  { name: "Mirage", path: "/mirage.avif" },
  { name: "Inferno", path: "/inferno.avif" },
  { name: "Nuke", path: "/nuke.avif" },
  { name: "Vertigo", path: "/vertigo.avif" },
  { name: "Ancient", path: "/ancient.avif" },
  { name: "Anubis", path: "/anubis.avif" },
  { name: "Overpass", path: "/overpass.avif" },
];

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
          <h2 className="text-2xl font-bold">Crosshair</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Crosshair Preview */}
        <CrosshairPreview settings={crosshairData} />

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
          <h3 className="text-sm font-semibold text-card-foreground mb-3">
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

interface CrosshairPreviewProps {
  settings: CrosshairSettings;
}

function CrosshairPreview({ settings }: CrosshairPreviewProps) {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  // Crosshair configuration based on tested values
  const CENTER_X = 454.5; // Center of 909 width
  const CENTER_Y = 80; // Center of 160 height

  // Responsive dimensions - larger on mobile
  const scale = isMobile ? 2.5 : 1; // 2.5x bigger on mobile

  const gapFromCenter = 2.5 * scale; // Gap from center to lines
  const lineLengthVertical = 4 * scale; // Line length vertical (arriba/abajo)
  const lineLengthHorizontal = 5 * scale; // Line length horizontal (izq/der)
  const thickness = 1.5 * scale; // Line thickness
  const outlineThickness = settings.outline > 0 ? 1.5 * scale : 0;
  const dotSize = 2 * scale; // Dot size

  // Get color with alpha
  const color = CROSSHAIR_COLORS[settings.color] || CROSSHAIR_COLORS[0];
  const alpha = settings.alpha / 255;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    gsap.to(sliderRef.current, {
      x: -currentMapIndex * containerWidth,
      duration: 0.6,
      ease: "power3.inOut"
    });
  }, [currentMapIndex]);

  const nextMap = () => {
    setCurrentMapIndex((prev) => (prev + 1) % MAP_SCREENSHOTS.length);
  };

  const prevMap = () => {
    setCurrentMapIndex((prev) =>
      prev === 0 ? MAP_SCREENSHOTS.length - 1 : prev - 1
    );
  };

  const goToMap = (index: number) => {
    setCurrentMapIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current || !containerRef.current) return;

    const diff = e.clientX - startXRef.current;
    const containerWidth = containerRef.current.offsetWidth;
    const currentX = -currentMapIndex * containerWidth;

    gsap.set(sliderRef.current, {
      x: currentX + diff
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const diff = e.clientX - startXRef.current;
    isDraggingRef.current = false;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevMap();
      } else {
        nextMap();
      }
    } else if (sliderRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      gsap.to(sliderRef.current, {
        x: -currentMapIndex * containerWidth,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-border bg-black">
      {/* Map screenshot background */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing h-[200px] sm:h-auto"
        style={{ aspectRatio: 'auto sm:909/160' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={sliderRef}
          className="flex h-full"
        >
          {MAP_SCREENSHOTS.map((map, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-full h-full"
            >
              <Image
                src={map.path}
                alt={map.name}
                fill
                className="object-cover sm:object-contain pointer-events-none"
                draggable={false}
                priority={index === currentMapIndex}
              />
            </div>
          ))}
        </div>

        {/* Crosshair overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="909"
            height="160"
            viewBox="0 0 909 160"
            className="w-full h-full"
          >
            {/* Outline (if enabled) */}
            {outlineThickness > 0 && (
              <g opacity={alpha}>
                {/* Top line outline */}
                <line
                  x1={CENTER_X}
                  y1={CENTER_Y - gapFromCenter}
                  x2={CENTER_X}
                  y2={CENTER_Y - gapFromCenter - lineLengthVertical}
                  stroke="black"
                  strokeWidth={thickness + outlineThickness * 2}
                  strokeLinecap="butt"
                />
                {/* Bottom line outline */}
                <line
                  x1={CENTER_X}
                  y1={CENTER_Y + gapFromCenter}
                  x2={CENTER_X}
                  y2={CENTER_Y + gapFromCenter + lineLengthVertical}
                  stroke="black"
                  strokeWidth={thickness + outlineThickness * 2}
                  strokeLinecap="butt"
                />
                {/* Left line outline */}
                <line
                  x1={CENTER_X - gapFromCenter}
                  y1={CENTER_Y}
                  x2={CENTER_X - gapFromCenter - lineLengthHorizontal}
                  y2={CENTER_Y}
                  stroke="black"
                  strokeWidth={thickness + outlineThickness * 2}
                  strokeLinecap="butt"
                />
                {/* Right line outline */}
                <line
                  x1={CENTER_X + gapFromCenter}
                  y1={CENTER_Y}
                  x2={CENTER_X + gapFromCenter + lineLengthHorizontal}
                  y2={CENTER_Y}
                  stroke="black"
                  strokeWidth={thickness + outlineThickness * 2}
                  strokeLinecap="butt"
                />
                {/* Center dot outline */}
                {settings.dot && (
                  <rect
                    x={CENTER_X - dotSize / 2 - outlineThickness}
                    y={CENTER_Y - dotSize / 2 - outlineThickness}
                    width={dotSize + outlineThickness * 2}
                    height={dotSize + outlineThickness * 2}
                    rx={0.25}
                    fill="black"
                  />
                )}
              </g>
            )}

            {/* Main crosshair lines */}
            <g opacity={alpha}>
              {/* Top line - goes from center minus gap, upward */}
              <line
                x1={CENTER_X}
                y1={CENTER_Y - gapFromCenter}
                x2={CENTER_X}
                y2={CENTER_Y - gapFromCenter - lineLengthVertical}
                stroke={color}
                strokeWidth={thickness}
                strokeLinecap="butt"
              />
              {/* Bottom line - goes from center plus gap, downward */}
              <line
                x1={CENTER_X}
                y1={CENTER_Y + gapFromCenter}
                x2={CENTER_X}
                y2={CENTER_Y + gapFromCenter + lineLengthVertical}
                stroke={color}
                strokeWidth={thickness}
                strokeLinecap="butt"
              />
              {/* Left line - goes from center minus gap, leftward */}
              <line
                x1={CENTER_X - gapFromCenter}
                y1={CENTER_Y}
                x2={CENTER_X - gapFromCenter - lineLengthHorizontal}
                y2={CENTER_Y}
                stroke={color}
                strokeWidth={thickness}
                strokeLinecap="butt"
              />
              {/* Right line - goes from center plus gap, rightward */}
              <line
                x1={CENTER_X + gapFromCenter}
                y1={CENTER_Y}
                x2={CENTER_X + gapFromCenter + lineLengthHorizontal}
                y2={CENTER_Y}
                stroke={color}
                strokeWidth={thickness}
                strokeLinecap="butt"
              />

              {/* Center dot - rect with rounded corners */}
              {settings.dot && (
                <rect
                  x={CENTER_X - dotSize / 2}
                  y={CENTER_Y - dotSize / 2}
                  width={dotSize}
                  height={dotSize}
                  rx={0.25}
                  fill={color}
                />
              )}
            </g>
          </svg>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevMap}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors backdrop-blur-sm z-10 pointer-events-auto"
          aria-label="Previous map"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextMap}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors backdrop-blur-sm z-10 pointer-events-auto"
          aria-label="Next map"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 pointer-events-auto">
          {MAP_SCREENSHOTS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToMap(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMapIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to map ${index + 1}`}
            />
          ))}
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
