"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Spinner } from "@/components/ui/spinner";
import { ProcessedSkin } from "@/lib/steam-api";

const ITEMS_PER_PAGE = 8; // 2 rows x 4 columns

export function Skins() {
  const [skins, setSkins] = useState<ProcessedSkin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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
            {/* Skins Grid - 2 rows x 4 columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentSkins.map((skin) => (
                <div
                  key={skin.assetid}
                  className={`bg-background rounded-lg border-2 ${getRarityColor(skin.rarity_color)} overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer group`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-background to-muted p-4 flex items-center justify-center">
                    <Image
                      src={skin.image_large}
                      alt={skin.market_name}
                      width={200}
                      height={150}
                      className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-200"
                      unoptimized
                    />
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
                  className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none"
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
                  className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none"
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
