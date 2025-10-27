"use client";

interface WearBarProps {
  floatValue: number;
  className?: string;
}

// Wear ranges with their proportional widths
const WEAR_RANGES = [
  { name: "Factory New", short: "FN", min: 0.00, max: 0.07, color: "#008000", width: 7 },
  { name: "Minimal Wear", short: "MW", min: 0.07, max: 0.15, color: "#18A518", width: 8 },
  { name: "Field-Tested", short: "FT", min: 0.15, max: 0.38, color: "#9ACD32", width: 23 },
  { name: "Well-Worn", short: "WW", min: 0.38, max: 0.45, color: "#CD5C5C", width: 7 },
  { name: "Battle-Scarred", short: "BS", min: 0.45, max: 1.00, color: "#F92525", width: 55 },
];

export function WearBar({ floatValue, className = "" }: WearBarProps) {
  // Clamp float value between 0 and 1
  const clampedFloat = Math.max(0, Math.min(1, floatValue));

  // Calculate position percentage (0-100) for the indicator
  const position = clampedFloat * 100;

  // Get current wear range
  const currentRange = WEAR_RANGES.find(
    range => clampedFloat >= range.min && clampedFloat < range.max
  ) || WEAR_RANGES[WEAR_RANGES.length - 1]; // Default to BS if >= 1.00

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Float value display */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          Float Value: <span style={{ color: currentRange.color }}>{clampedFloat.toFixed(4)}</span>
        </span>
      </div>

      {/* Wear bar */}
      <div className="relative py-2">
        <div className="h-3 rounded-full overflow-hidden flex shadow-inner">
          {WEAR_RANGES.map((range, idx) => (
            <div
              key={idx}
              className="relative transition-all hover:brightness-110"
              style={{
                backgroundColor: range.color,
                width: `${range.width}%`,
              }}
              title={`${range.name} (${range.min.toFixed(2)} - ${range.max.toFixed(2)})`}
            />
          ))}
        </div>

        {/* Float indicator */}
        <div
          className="absolute top-1 bottom-1 w-1 bg-white shadow-lg transition-all rounded-full"
          style={{
            left: `${position}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    </div>
  );
}
