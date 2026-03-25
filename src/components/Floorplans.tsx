"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Floorplans() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const panzoomRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const unit = property.units[activeTab];

  const initPanzoom = useCallback(async () => {
    if (!containerRef.current) return;

    // Destroy previous instance
    panzoomRef.current?.destroy();

    const Panzoom = (await import("@panzoom/panzoom")).default;
    const instance = Panzoom(containerRef.current, {
      maxScale: 4,
      minScale: 0.5,
      contain: "outside",
    });

    containerRef.current.addEventListener("wheel", (e) => {
      instance.zoomWithWheel(e);
    });

    panzoomRef.current = instance;
  }, []);

  useEffect(() => {
    initPanzoom();
    return () => {
      panzoomRef.current?.destroy();
    };
  }, [activeTab, initPanzoom]);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelector(".floorplan-content"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  });

  return (
    <section id="floorplans" ref={sectionRef} className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Unit Layouts
          </p>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
            Floorplans
          </h2>
        </div>

        <div className="floorplan-content">
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {property.units.map((u, i) => (
              <button
                key={u.type}
                onClick={() => setActiveTab(i)}
                className={`rounded-sm px-5 py-2.5 text-sm uppercase tracking-widest transition-colors ${
                  i === activeTab
                    ? "bg-charcoal text-white"
                    : "bg-soft-grey text-medium-grey hover:bg-charcoal/10"
                }`}
              >
                Type {u.type}
              </button>
            ))}
          </div>

          {/* Unit info */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-medium-grey">
            <span>{unit.config}</span>
            <span>Lot: {unit.lotSize} ({unit.lotSf.toLocaleString()} sf)</span>
            <span>Built-up: {unit.builtUp.toLocaleString()} sf</span>
            {unit.hasLift && (
              <span className="rounded-sm bg-brand/20 px-2 py-0.5 text-xs font-medium text-charcoal">
                With Lift
              </span>
            )}
          </div>

          {/* Blueprint viewer */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-sm border border-soft-grey bg-white">
            <div className="flex items-center justify-between border-b border-soft-grey px-4 py-2">
              <p className="text-xs text-medium-grey">
                Scroll to zoom · Drag to pan
              </p>
              <button
                onClick={() => panzoomRef.current?.reset()}
                className="text-xs text-medium-grey hover:text-charcoal"
              >
                Reset view
              </button>
            </div>
            <div className="relative aspect-[4/3] cursor-grab active:cursor-grabbing">
              <div ref={containerRef} className="h-full w-full">
                <Image
                  src={unit.blueprint}
                  alt={`Floorplan Type ${unit.type}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  unoptimized={unit.blueprint.endsWith(".svg")}
                />
              </div>
            </div>
          </div>

          {/* Floor labels */}
          <div className="mt-4 flex justify-center gap-4">
            {unit.floors.map((floor) => (
              <span
                key={floor}
                className="text-xs uppercase tracking-wider text-medium-grey"
              >
                {floor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
