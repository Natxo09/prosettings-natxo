"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProcessedSkin } from "@/lib/steam-api";
import { Tooltip } from "@/components/ui/tooltip";
import { WearBar } from "./wear-bar";

interface SkinDetailModalProps {
  skin: ProcessedSkin | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SkinDetailModal({ skin, isOpen, onClose }: SkinDetailModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!skin) return null;

  const getRarityColor = (rarityColor?: string): string => {
    if (!rarityColor) return "border-gray-500";

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
              duration: 0.8
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            style={{ perspective: "1000px" }}
          >
            <div
              className={`bg-background rounded-2xl border-4 ${getRarityColor(skin.rarity_color)} shadow-2xl w-full max-w-xl pointer-events-auto relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Content */}
              <div>
                {/* Image Container - Same style as card but bigger */}
                <div className="relative aspect-square bg-gradient-to-br from-background to-muted p-8 flex items-center justify-center overflow-visible rounded-t-xl">
                  <Image
                    src={skin.image_large}
                    alt={skin.market_name}
                    width={400}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                    unoptimized
                    priority
                  />

                  {/* Stickers - Vertical on left side */}
                  {skin.stickers && skin.stickers.length > 0 && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                      {skin.stickers.map((sticker, idx) => (
                        <Tooltip key={idx} content={sticker.name}>
                          <div className="relative w-20 h-16 hover:scale-110 transition-transform cursor-help">
                            <Image
                              src={sticker.image}
                              alt={sticker.name}
                              fill
                              className="object-contain drop-shadow-lg"
                              unoptimized
                            />
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  )}

                  {/* Charm - Bottom right */}
                  {skin.charm && (
                    <div className="absolute right-4 bottom-4">
                      <Tooltip content={skin.charm.name}>
                        <div className="relative w-24 h-20 hover:scale-110 transition-transform cursor-help">
                          <Image
                            src={skin.charm.image}
                            alt={skin.charm.name}
                            fill
                            className="object-contain drop-shadow-lg"
                            unoptimized
                          />
                        </div>
                      </Tooltip>
                    </div>
                  )}

                  {/* StatTrak/Souvenir Badge */}
                  {(skin.statTrak || skin.souvenir) && (
                    <div className={`absolute top-4 right-4 text-base font-bold px-4 py-2 rounded-lg ${
                      skin.statTrak
                        ? 'bg-orange-500 text-white'
                        : 'bg-yellow-500 text-black'
                    }`}>
                      {skin.statTrak ? 'StatTrak™' : 'Souvenir'}
                    </div>
                  )}
                </div>

                {/* Info - Same style as card */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground" title={skin.market_name}>
                      {skin.name}
                    </h3>
                    <p className="text-base text-muted-foreground">
                      {skin.exterior || '\u00A0'}
                    </p>
                    <p className={`text-base font-medium ${getRarityColor(skin.rarity_color).replace('border-', 'text-')}`}>
                      {skin.rarity}
                    </p>
                  </div>

                  {/* Wear Bar - Only show if skin has float value */}
                  {skin.floatValue !== undefined && (
                    <WearBar floatValue={skin.floatValue} />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
