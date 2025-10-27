"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { trackEvent } from "@/lib/analytics";

interface WorkshopMap {
  name: string;
  description: string;
  imageUrl: string;
  workshopUrl: string;
  tags?: string[];
}

const workshopMaps: WorkshopMap[] = [
  {
    name: "Fast Warmup — Bot Training",
    description: "Practice your aim and warmup with bots in various scenarios",
    imageUrl: "/fast-warmup.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3083320026",
    tags: ["Warmup", "Aim Training", "Bots"],
  },
  {
    name: "Aim_Rush / Aim training map",
    description: "Fast-paced aim training with rush scenarios",
    imageUrl: "/aim-rush.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3105821815",
    tags: ["Aim Training", "Rush", "Training"],
  },
  {
    name: "Aim Botz - Aim Training (CS2)",
    description: "Classic aim training map with bot practice",
    imageUrl: "/aim-botz.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3070244462",
    tags: ["Aim Training", "Bots", "Practice"],
  },
  {
    name: "Recoil Master - Spray Training (CS2)",
    description: "Master weapon spray patterns and recoil control",
    imageUrl: "/recoil-master.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3100869952",
    tags: ["Recoil", "Spray Training", "Practice"],
  },
  {
    name: "Angle Hold Trainer CS2",
    description: "Practice holding angles and crosshair placement",
    imageUrl: "/angle-hold.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3070452391",
    tags: ["Angle Holding", "Training", "Positioning"],
  },
  {
    name: "Bots_Training_sqr_room",
    description: "Bot training in a square room environment",
    imageUrl: "/Bots_Training_sqr_room.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3251006475",
    tags: ["Bots", "Training", "Practice"],
  },
  {
    name: "CS2 FPS BENCHMARK DUST2",
    description: "Test your FPS performance on Dust2",
    imageUrl: "/benchmark.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3240880604",
    tags: ["Benchmark", "FPS", "Testing"],
  },
  {
    name: "Mirage Prefire",
    description: "Practice prefire angles and positions on Mirage",
    imageUrl: "/mirage-prefire.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3267302800",
    tags: ["Prefire", "Mirage", "Practice"],
  },
  {
    name: "Inferno Prefire",
    description: "Practice prefire angles and positions on Inferno",
    imageUrl: "/inferno-prefire.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3289507717",
    tags: ["Prefire", "Inferno", "Practice"],
  },
  {
    name: "Train Prefire",
    description: "Practice prefire angles and positions on Train",
    imageUrl: "/train-prefire.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3562576256",
    tags: ["Prefire", "Train", "Practice"],
  },
  {
    name: "Nuke Prefire",
    description: "Practice prefire angles and positions on Nuke",
    imageUrl: "/nuke-prefire.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3318295422",
    tags: ["Prefire", "Nuke", "Practice"],
  },
  {
    name: "Dust 2 Prefire",
    description: "Practice prefire angles and positions on Dust 2",
    imageUrl: "/dust2-prefire.jpeg",
    workshopUrl: "https://steamcommunity.com/sharedfiles/filedetails/?id=3295650711",
    tags: ["Prefire", "Dust 2", "Practice"],
  },
];

export function Workshop() {
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  // Calculate pagination
  const totalPages = Math.ceil(workshopMaps.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMaps = workshopMaps.slice(startIndex, endIndex);

  const handleMapClick = (map: WorkshopMap) => {
    trackEvent("Workshop Map Click", {
      mapName: map.name,
    });
    window.open(map.workshopUrl, "_blank", "noopener,noreferrer");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      trackEvent("Workshop Pagination", { direction: "next", page: currentPage + 2 });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      trackEvent("Workshop Pagination", { direction: "previous", page: currentPage });
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="workshop" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Workshop Maps</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            {workshopMaps.length} total
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMaps.map((map, index) => (
            <button
              key={index}
              onClick={() => handleMapClick(map)}
              data-rybbit-event="Workshop Map Click"
              data-rybbit-prop-map={map.name}
              className="group relative bg-background rounded-lg border border-border hover:scale-105 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image
                  src={map.imageUrl}
                  alt={map.name}
                  fill
                  className="object-cover scale-110 transition-transform duration-200 group-hover:scale-115"
                  style={{ backfaceVisibility: 'hidden' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* External link icon */}
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 text-left">
                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                  {map.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {map.description}
                </p>

                {/* Tags */}
                {map.tags && map.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {map.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-border">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Previous</span>
            </button>

            <span className="text-sm text-muted-foreground select-none min-w-[120px] text-center">
              Page {currentPage + 1} of {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer"
              aria-label="Next page"
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
