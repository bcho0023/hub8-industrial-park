"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import { Maximize2 } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<import("photoswipe").default | null>(null);

  useGSAP((gsap) => {
    if (!gridRef.current) return;

    Array.from(gridRef.current.children).forEach((el, i) => {
      gsap.set(el, { y: 40, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        delay: i * 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  });

  const openLightbox = useCallback(async (index: number) => {
    const PhotoSwipe = (await import("photoswipe")).default;

    const items = property.gallery.map((img) => ({
      src: img.src,
      w: 1920,
      h: 1080,
      alt: img.alt,
    }));

    const pswp = new PhotoSwipe({
      dataSource: items,
      index,
      bgOpacity: 0.95,
      showHideAnimationType: "fade",
      initialZoomLevel: "fit",
      secondaryZoomLevel: 2,
      maxZoomLevel: 4,
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
          4
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

      const updateScale = () => {
        const currZoom = pswp.currSlide?.currZoomLevel || 1;
        const fitZoom = pswp.currSlide?.zoomLevels.initial || 1;
        const pct = Math.round((currZoom / fitZoom) * 100);
        scaleLabel.textContent = `${pct}%`;
      };

      pswp.on("zoomPanUpdate", updateScale);
      pswp.on("initialZoomPan", updateScale);
      pswp.on("slideActivate", updateScale);
    });

    pswp.init();
    lightboxRef.current = pswp;
  }, []);

  useEffect(() => {
    return () => {
      lightboxRef.current?.destroy();
    };
  }, []);

  return (
    <section id="gallery" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Visual Tour
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Gallery
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {property.gallery.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(i)}
              className="group relative aspect-[3/2] w-full overflow-hidden rounded-lg shadow-md shadow-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/60 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
