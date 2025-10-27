"use client";

import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="px-3 py-1.5 bg-background border border-border rounded-lg shadow-lg whitespace-nowrap">
            <span className="text-sm font-medium text-foreground">{content}</span>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2">
            <div className="w-3 h-3 bg-background border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}
