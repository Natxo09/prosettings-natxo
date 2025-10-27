"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isClickMode, setIsClickMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isVisible || !isClickMode) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setIsClickMode(false);
      }
    };

    // Small delay to prevent the same click that opened the tooltip from closing it
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible, isClickMode]);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    if (isClickMode) return; // Don't trigger hover if in click mode
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (isClickMode) return; // Don't hide on leave if in click mode
    setIsVisible(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsClickMode(true);
    setIsVisible(!isVisible);
  };

  const tooltip = isVisible && isMounted && typeof window !== 'undefined' ? (
    <div
      className="fixed px-3 py-1.5 bg-popover text-popover-foreground rounded-lg shadow-xl whitespace-nowrap border border-border/50 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 8}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
      }}
    >
      <span className="text-xs font-medium">{content}</span>
      {/* Arrow pointing down */}
      <div
        className="absolute left-1/2 top-full -translate-x-1/2"
      >
        <div className="border-[5px] border-transparent border-t-popover -mb-[1px]"></div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-flex cursor-pointer"
        title={content}
      >
        {children}
      </div>
      {isMounted && tooltip && createPortal(tooltip, document.body)}
    </>
  );
}
