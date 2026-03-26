"use client";

import { useCallback } from "react";
import { Maximize2 } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export default function ImageLightbox({
  src,
  alt,
  width = 2400,
  height = 1800,
  children,
}: ImageLightboxProps) {
  const openLightbox = useCallback(async () => {
    const PhotoSwipe = (await import("photoswipe")).default;

    const pswp = new PhotoSwipe({
      dataSource: [{ src, w: width, h: height, alt }],
      index: 0,
      bgOpacity: 0.95,
      showHideAnimationType: "fade",
      zoom: true,
      initialZoomLevel: "fit",
      secondaryZoomLevel: 2,
      maxZoomLevel: 4,
    });

    pswp.init();
  }, [src, alt, width, height]);

  return (
    <button
      onClick={openLightbox}
      className="group relative block w-full cursor-zoom-in text-left"
      aria-label={`Enlarge ${alt}`}
    >
      {children}
      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <Maximize2 className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}
