"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Bio } from "@/components/bio";
import { Sidebar } from "@/components/sidebar";
import { Crosshair } from "@/components/cs2/crosshair";
import { Icon } from "@/components/icon";
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
        {/* Header con Logo CS2 y Theme Switcher */}
        <div className="flex justify-between items-center mb-8 pl-14 lg:pl-0">
          <div className="flex items-center gap-3">
            <Icon name="cs2" size={32} className="text-foreground" />
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>
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

          {/* Main Content - Todas las secciones verticalmente */}
          <main className="flex-1 w-full lg:w-auto space-y-8">
            {/* Bio Section */}
            <section id="bio">
              <Bio />
            </section>

            {/* Crosshair Section */}
            <section id="crosshair">
              <Crosshair />
            </section>

            {/* Placeholder para las demás secciones */}
            <section id="viewmodel">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Viewmodel</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="launch-options">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Launch Options</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="video-settings">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Video Settings</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="hud">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">HUD</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="radar">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Radar</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="skins">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Skins</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="mouse">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Mouse</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="monitor">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Monitor</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="keyboard">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Keyboard</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="headphones">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Headphones</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="mic">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Microphone</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="mousepad">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Mousepad</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="pc-specs">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">PC Specifications</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            <section id="gpu-settings">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">GPU Settings</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
