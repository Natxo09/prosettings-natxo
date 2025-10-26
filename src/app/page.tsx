"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Bio } from "@/components/bio";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header con Theme Switcher */}
        <div className="flex justify-end items-center mb-8">
          <ThemeSwitcher
            value={theme as "light" | "dark" | "system"}
            onChange={(newTheme) => setTheme(newTheme)}
          />
        </div>

        {/* Bio Section */}
        <Bio />
      </div>
    </div>
  );
}
