"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip } from "@/components/ui/tooltip";
import { ProcessedSkin } from "@/lib/steam-api";

export function Skins() {
  const [skins, setSkins] = useState<ProcessedSkin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ITEMS_PER_PAGE = isMobile ? 4 : 8; // Mobile: 2x2=4, Desktop: 2x4=8

  useEffect(() => {
    const fetchSkins = async () => {
      try {
        const response = await fetch('/api/steam');

        if (response.ok) {
          const data = await response.json();
          setSkins(data);
        } else {
          console.error('Failed to fetch Steam inventory');
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Steam inventory:', error);
        setIsLoading(false);
      }
    };

    fetchSkins();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(skins.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSkins = skins.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getRarityColor = (rarityColor?: string): string => {
    if (!rarityColor) return 'border-gray-500';

    const colorMap: { [key: string]: string } = {
      'b0c3d9': 'border-blue-300',
      '5e98d9': 'border-blue-400',
      '4b69ff': 'border-blue-500',
      '8847ff': 'border-purple-500',
      'd32ce6': 'border-pink-500',
      'eb4b4b': 'border-red-500',
      'e4ae39': 'border-yellow-500',
    };

    return colorMap[rarityColor.toLowerCase()] || 'border-gray-400';
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="knife" size={28} className="text-card-foreground" />
            <h2 className="text-2xl font-bold">Skins</h2>
          </div>
          {!isLoading && skins.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {skins.length} total
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner className="size-8" />
          </div>
        ) : skins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-lg">No skins found</p>
            <p className="text-muted-foreground text-sm mt-2">
              Make sure your Steam inventory is set to public
            </p>
          </div>
        ) : (
          <>
            {/* Skins Grid - 2x2 mobile, 2x4 desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentSkins.map((skin) => (
                <div
                  key={skin.assetid}
                  className={`bg-background rounded-lg border-2 ${getRarityColor(skin.rarity_color)} hover:scale-105 transition-transform duration-200 cursor-pointer group overflow-visible`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-background to-muted p-4 flex items-center justify-center overflow-visible rounded-t-lg">
                    <Image
                      src={skin.image_large}
                      alt={skin.market_name}
                      width={200}
                      height={150}
                      className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-200"
                      unoptimized
                    />

                    {/* Stickers - Vertical on left side */}
                    {skin.stickers && skin.stickers.length > 0 && (
                      <div className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        {skin.stickers.map((sticker, idx) => (
                          <Tooltip key={idx} content={sticker.name}>
                            <div className="relative w-6 h-5 sm:w-8 sm:h-6 lg:w-10 lg:h-8 hover:scale-110 transition-transform cursor-help">
                              <Image
                                src={sticker.image}
                                alt={sticker.name}
                                fill
                                className="object-contain drop-shadow-md"
                                unoptimized
                              />
                            </div>
                          </Tooltip>
                        ))}
                      </div>
                    )}

                    {/* Charm - Bottom right */}
                    {skin.charm && (
                      <div className="absolute right-1 sm:right-2 bottom-1 sm:bottom-2">
                        <Tooltip content={skin.charm.name}>
                          <div className="relative w-8 h-6 sm:w-10 sm:h-8 lg:w-12 lg:h-9 hover:scale-110 transition-transform cursor-help">
                            <Image
                              src={skin.charm.image}
                              alt={skin.charm.name}
                              fill
                              className="object-contain drop-shadow-md"
                              unoptimized
                            />
                          </div>
                        </Tooltip>
                      </div>
                    )}

                    {/* StatTrak/Souvenir Badge */}
                    {(skin.statTrak || skin.souvenir) && (
                      <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                        skin.statTrak
                          ? 'bg-orange-500 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}>
                        {skin.statTrak ? 'ST' : 'SV'}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-1 min-h-[80px] flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-foreground truncate" title={skin.market_name}>
                        {skin.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate min-h-[16px]">
                        {skin.exterior || '\u00A0'}
                      </p>
                    </div>
                    <p className={`text-xs font-medium ${getRarityColor(skin.rarity_color).replace('border-', 'text-')}`}>
                      {skin.rarity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
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
          </>
        )}
      </div>
    </div>
  );
}
