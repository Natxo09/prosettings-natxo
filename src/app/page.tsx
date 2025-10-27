"use client";

import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Bio } from "@/components/bio";
import { Sidebar } from "@/components/sidebar";
import { Crosshair } from "@/components/cs2/crosshair";
import { Viewmodel } from "@/components/cs2/viewmodel";
import { LaunchOptions } from "@/components/cs2/launch-options";
import { VideoSettings } from "@/components/cs2/video-settings";
import { Hud } from "@/components/cs2/hud";
import { Radar } from "@/components/cs2/radar";
import { Mouse } from "@/components/setup/mouse";
import { Monitor } from "@/components/setup/monitor";
import { Keyboard } from "@/components/setup/keyboard";
import { Headphones } from "@/components/setup/headphones";
import { Microphone } from "@/components/setup/microphone";
import { Mousepad } from "@/components/setup/mousepad";
import { PC } from "@/components/setup/pc";
import { GPUSettings } from "@/components/setup/gpu-settings";
import { Footer } from "@/components/footer";
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
    <div className="min-h-screen flex flex-col pt-4 px-4 sm:pt-8 sm:px-8">
      <div className="max-w-7xl mx-auto flex-1 w-full">
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

            {/* Viewmodel Section */}
            <section id="viewmodel">
              <Viewmodel />
            </section>

            {/* Launch Options Section */}
            <section id="launch-options">
              <LaunchOptions />
            </section>

            {/* Video Settings Section */}
            <section id="video-settings">
              <VideoSettings />
            </section>

            {/* HUD Section */}
            <section id="hud">
              <Hud />
            </section>

            {/* Radar Section */}
            <section id="radar">
              <Radar />
            </section>

            <section id="skins">
              <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold">Skins</h2>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </section>

            {/* Mouse Section */}
            <section id="mouse">
              <Mouse />
            </section>

            {/* Monitor Section */}
            <section id="monitor">
              <Monitor />
            </section>

            {/* Keyboard Section */}
            <section id="keyboard">
              <Keyboard />
            </section>

            {/* Headphones Section */}
            <section id="headphones">
              <Headphones />
            </section>

            {/* Microphone Section */}
            <section id="mic">
              <Microphone />
            </section>

            {/* Mousepad Section */}
            <section id="mousepad">
              <Mousepad />
            </section>

            {/* PC Specifications Section */}
            <section id="pc-specs">
              <PC />
            </section>

            {/* GPU Settings Section */}
            <section id="gpu-settings">
              <GPUSettings />
            </section>
          </main>
        </div>

      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}
