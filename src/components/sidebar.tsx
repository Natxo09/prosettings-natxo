"use client";

import { Icon } from "./icon";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type NavItem = {
  id: string;
  label: string;
  icon: "user" | "crosshair" | "viewmodel" | "launch" | "video" | "hud" | "radar" | "knife" | "mouse" | "monitor" | "keyboard" | "headphones" | "mic" | "mousepad" | "cpu" | "gpu";
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navigationSections: NavSection[] = [
  {
    title: "",
    items: [
      { id: "bio", label: "Bio", icon: "user" },
    ],
  },
  {
    title: "CS2 Settings",
    items: [
      { id: "crosshair", label: "Crosshair", icon: "crosshair" },
      { id: "viewmodel", label: "Viewmodel", icon: "viewmodel" },
      { id: "launch-options", label: "Launch Options", icon: "launch" },
      { id: "video-settings", label: "Video Settings", icon: "video" },
      { id: "hud", label: "HUD", icon: "hud" },
      { id: "radar", label: "Radar", icon: "radar" },
      { id: "skins", label: "Skins", icon: "knife" },
    ],
  },
  {
    title: "Setup",
    items: [
      { id: "mouse", label: "Mouse", icon: "mouse" },
      { id: "monitor", label: "Monitor", icon: "monitor" },
      { id: "keyboard", label: "Keyboard", icon: "keyboard" },
      { id: "headphones", label: "Headphones", icon: "headphones" },
      { id: "mic", label: "Microphone", icon: "mic" },
      { id: "mousepad", label: "Mousepad", icon: "mousepad" },
    ],
  },
  {
    title: "PC Specs",
    items: [
      { id: "pc-specs", label: "Specifications", icon: "cpu" },
      { id: "gpu-settings", label: "GPU Settings", icon: "gpu" },
    ],
  },
];

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export function Sidebar({ activeSection = "bio", onSectionChange }: SidebarProps) {
  const [active, setActive] = useState(activeSection);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (itemId: string) => {
    setActive(itemId);
    onSectionChange?.(itemId);

    // Track navigation
    trackEvent("Section Navigation", {
      section: itemId,
    });

    // Scroll suave a la sección
    const element = document.getElementById(itemId);
    if (element) {
      const offset = 80; // Offset para el header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    // Cerrar el sidebar en móvil al hacer click
    setIsOpen(false);
  };

  // Cerrar sidebar al hacer resize a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevenir scroll del body cuando el sidebar móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Detectar sección visible al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.flatMap(section => section.items.map(item => item.id));

      // Detectar si estamos en el fondo de la página
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Si estamos en el fondo (dentro de 10px), activar la última sección
      if (scrollHeight - scrollTop - clientHeight < 10) {
        const lastSectionId = sections[sections.length - 1];
        setActive(lastSectionId);
        onSectionChange?.(lastSectionId);
        return;
      }

      // Lógica normal de detección de sección visible
      let foundSection = false;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si la sección está visible en el viewport (con un margen)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(sectionId);
            onSectionChange?.(sectionId);
            foundSection = true;
            break;
          }
        }
      }

      // Si no se encontró ninguna sección visible, buscar la más cercana al top
      if (!foundSection) {
        let closestSection = sections[0];
        let closestDistance = Infinity;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const distance = Math.abs(rect.top - 150);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = sectionId;
            }
          }
        }

        setActive(closestSection);
        onSectionChange?.(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onSectionChange]);

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-card text-card-foreground shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-card rounded-2xl p-6 shadow-lg h-fit transition-transform duration-300 ease-in-out",
          // Desktop: sticky
          "lg:sticky lg:top-8",
          // Mobile: fixed con transform
          "fixed top-4 left-4 bottom-4 z-50 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)] lg:translate-x-0"
        )}
      >
        <nav className="space-y-6">
          {navigationSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        active === item.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-card-foreground/70 hover:text-card-foreground hover:bg-background/50"
                      )}
                    >
                      <Icon
                        name={item.icon}
                        size={18}
                        className={cn(
                          "transition-colors",
                          active === item.id ? "text-foreground" : "text-card-foreground/60"
                        )}
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
