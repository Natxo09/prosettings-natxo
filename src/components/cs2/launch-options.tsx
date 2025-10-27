"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { trackEvent } from "@/lib/analytics";

const LAUNCH_OPTIONS = "-novid -high -threads 9 -mainthreadpriority 2 -nohltv +fps_max 0 -allow_third_party_software";

export function LaunchOptions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(LAUNCH_OPTIONS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Track launch options copy event
      trackEvent("Launch Options Copied");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon name="launch" size={28} className="text-card-foreground" />
          <h2 className="text-2xl font-bold">Launch Options</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="relative bg-background rounded-lg p-4 border border-border">
          <code className="text-foreground break-all select-all font-mono text-sm pr-20">
            {LAUNCH_OPTIONS}
          </code>
          <button
            onClick={handleCopy}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200"
            aria-label="Copy launch options"
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
  );
}
