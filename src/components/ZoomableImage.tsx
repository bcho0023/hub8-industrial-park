"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Full-resolution width for lightbox (defaults to width) */
  fullWidth?: number;
  /** Full-resolution height for lightbox (defaults to height) */
  fullHeight?: number;
  sizes?: string;
  /** When true, pulse the border to draw attention */
  highlight?: boolean;
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  fullWidth,
  fullHeight,
  sizes = "100vw",
  highlight = false,
}: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const panzoomRef = useRef<any>(null);
  const [scale, setScale] = useState(1);

  const initPanzoom = useCallback(async () => {
    if (!innerRef.current) return;

    panzoomRef.current?.destroy();

    const Panzoom = (await import("@panzoom/panzoom")).default;
    const instance = Panzoom(innerRef.current, {
      maxScale: 5,
      minScale: 1,
      contain: "outside",
      cursor: "grab",
      panOnlyWhenZoomed: true,
      handleStartEvent: (e: Event) => {
        // On touch devices at 100% scale, don't intercept — let page scroll
        if (e instanceof TouchEvent && instance.getScale() <= 1) {
          return;
        }
        e.preventDefault();
      },
    });

    innerRef.current.addEventListener("panzoomchange", () => {
      const s = instance.getScale();
      setScale(s);
      // Toggle touch-action so browser handles scroll at 100%
      if (containerRef.current) {
        containerRef.current.style.touchAction = s <= 1 ? "pan-y" : "none";
      }
    });

    containerRef.current?.addEventListener(
      "wheel",
      (e) => {
        instance.zoomWithWheel(e);
      },
      { passive: false }
    );

    panzoomRef.current = instance;
  }, []);

  useEffect(() => {
    initPanzoom();
    return () => {
      panzoomRef.current?.destroy();
    };
  }, [initPanzoom]);

  const handleZoomIn = () => panzoomRef.current?.zoomIn();
  const handleZoomOut = () => panzoomRef.current?.zoomOut();
  const handleReset = () => panzoomRef.current?.reset();

  const handleEnlarge = useCallback(async () => {
    const PhotoSwipe = (await import("photoswipe")).default;

    const pswp = new PhotoSwipe({
      dataSource: [
        {
          src,
          w: fullWidth || width * 2,
          h: fullHeight || height * 2,
          alt,
        },
      ],
      index: 0,
      bgOpacity: 0.95,
      showHideAnimationType: "fade",
      initialZoomLevel: "fit",
      secondaryZoomLevel: 2.5,
      maxZoomLevel: 5,
    });

    // Scroll wheel controls zoom
    pswp.on("bindEvents", () => {
      pswp.element?.addEventListener("wheel", (e: WheelEvent) => {
        e.preventDefault();
        const slide = pswp.currSlide;
        if (!slide) return;
        const curr = slide.currZoomLevel || 1;
        const factor = e.deltaY < 0 ? 1.2 : 0.8;
        const newZoom = Math.min(
          Math.max(curr * factor, slide.zoomLevels.initial || 0.5),
          5
        );
        slide.zoomTo(newZoom, { x: e.clientX, y: e.clientY }, 100);
      }, { passive: false });
    });

    // Navigation instructions tooltip
    pswp.on("openingAnimationEnd", () => {
      const tooltip = document.createElement("div");
      tooltip.textContent = "Scroll to zoom · Drag to pan";
      tooltip.style.cssText =
        "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(44,44,44,0.85);backdrop-filter:blur(8px);color:rgba(255,255,255,0.9);font-size:13px;font-family:sans-serif;padding:12px 24px;border-radius:8px;z-index:200;pointer-events:none;transition:opacity 0.5s ease;letter-spacing:0.5px;";
      pswp.element?.appendChild(tooltip);
      setTimeout(() => {
        tooltip.style.opacity = "0";
      }, 2000);
      setTimeout(() => {
        tooltip.remove();
      }, 2500);
    });

    pswp.on("uiRegister", () => {
      // Create zoom controls bar
      const bar = document.createElement("div");
      bar.style.cssText =
        "position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(44,44,44,0.8);backdrop-filter:blur(8px);border-radius:8px;padding:6px 12px;z-index:100;user-select:none;";

      const btnStyle =
        "width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:rgba(255,255,255,0.7);cursor:pointer;border-radius:4px;font-size:16px;";
      const btnHover = "background:rgba(255,255,255,0.1);color:#fff;";

      const scaleLabel = document.createElement("span");
      scaleLabel.style.cssText =
        "color:rgba(255,255,255,0.7);font-size:11px;min-width:40px;text-align:center;font-family:sans-serif;";
      scaleLabel.textContent = "100%";

      const makeBtn = (label: string, ariaLabel: string, onClick: () => void) => {
        const btn = document.createElement("button");
        btn.innerHTML = label;
        btn.style.cssText = btnStyle;
        btn.setAttribute("aria-label", ariaLabel);
        btn.addEventListener("mouseenter", () => (btn.style.cssText = btnStyle + btnHover));
        btn.addEventListener("mouseleave", () => (btn.style.cssText = btnStyle));
        btn.addEventListener("click", onClick);
        return btn;
      };

      const zoomOutBtn = makeBtn("−", "Zoom out", () => {
        const currZoom = pswp.currSlide?.currZoomLevel || 1;
        pswp.currSlide?.zoomTo(currZoom * 0.7, undefined, 200);
      });

      const zoomInBtn = makeBtn("+", "Zoom in", () => {
        const currZoom = pswp.currSlide?.currZoomLevel || 1;
        pswp.currSlide?.zoomTo(currZoom * 1.4, undefined, 200);
      });

      const resetBtn = makeBtn("↺", "Reset zoom", () => {
        const fitZoom = pswp.currSlide?.zoomLevels.initial || 1;
        pswp.currSlide?.zoomTo(fitZoom, undefined, 200);
      });

      bar.appendChild(zoomOutBtn);
      bar.appendChild(scaleLabel);
      bar.appendChild(zoomInBtn);

      const sep = document.createElement("div");
      sep.style.cssText = "width:1px;height:16px;background:rgba(255,255,255,0.2);margin:0 4px;";
      bar.appendChild(sep);
      bar.appendChild(resetBtn);

      pswp.element?.appendChild(bar);

      // Update scale label on zoom
      const updateScale = () => {
        const currZoom = pswp.currSlide?.currZoomLevel || 1;
        const fitZoom = pswp.currSlide?.zoomLevels.initial || 1;
        const pct = Math.round((currZoom / fitZoom) * 100);
        scaleLabel.textContent = `${pct}%`;
      };

      pswp.on("zoomPanUpdate", updateScale);
      pswp.on("initialZoomPan", updateScale);
    });

    pswp.init();
  }, [src, alt, width, height, fullWidth, fullHeight]);

  return (
    <div className={`rounded-sm border bg-white transition-all ${
      highlight ? "animate-highlight-border border-brand shadow-[0_0_12px_rgba(252,207,8,0.3)]" : "border-soft-grey"
    }`}>
      {/* Controls bar */}
      <div className="flex items-center justify-between border-b border-soft-grey px-4 py-2">
        <span className="text-xs text-medium-grey">
          {Math.round(scale * 100)}%
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="flex h-7 w-7 items-center justify-center rounded text-medium-grey transition-colors hover:bg-soft-grey hover:text-charcoal"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="flex h-7 w-7 items-center justify-center rounded text-medium-grey transition-colors hover:bg-soft-grey hover:text-charcoal"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded text-medium-grey transition-colors hover:bg-soft-grey hover:text-charcoal"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <div className="mx-1 h-4 w-px bg-soft-grey" />
          <button
            onClick={handleEnlarge}
            className="flex h-7 w-7 items-center justify-center rounded text-medium-grey transition-colors hover:bg-soft-grey hover:text-charcoal"
            aria-label="Open fullscreen"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Zoomable area */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          cursor: scale > 1 ? "grab" : "zoom-in",
          touchAction: scale <= 1 ? "pan-y" : "none",
        }}
      >
        <div ref={innerRef} className="p-4">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="pointer-events-none h-auto w-full select-none object-contain"
            sizes={sizes}
            draggable={false}
            unoptimized={src.endsWith(".svg")}
          />
        </div>
      </div>
    </div>
  );
}
