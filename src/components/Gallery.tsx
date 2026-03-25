"use client";

import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<import("photoswipe").default | null>(null);

  useGSAP((gsap) => {
    if (!gridRef.current) return;

    gsap.from(gridRef.current.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      },
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
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
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
              className="group relative aspect-[3/2] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
