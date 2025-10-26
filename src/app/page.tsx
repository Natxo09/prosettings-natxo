"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Bio } from "@/components/bio";
import { Sidebar } from "@/components/sidebar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("bio");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con Theme Switcher */}
        <div className="flex justify-end items-center mb-8 pl-14 lg:pl-0">
          <ThemeSwitcher
            value={theme as "light" | "dark" | "system"}
            onChange={handleThemeChange}
          />
        </div>

        {/* Layout con Sidebar y Contenido */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <main className="flex-1 w-full lg:w-auto">
            {activeSection === "bio" && <Bio />}
            {/* Aquí irán los demás componentes según la sección activa */}
          </main>
        </div>
      </div>
    </div>
  );
}
