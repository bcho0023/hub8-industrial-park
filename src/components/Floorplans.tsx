"use client";

import { useRef, useState, useEffect } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

export default function Floorplans() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".animate-fade-up, .floorplan-card");
    els.forEach((el) => {
      gsap.set(el, { y: 30, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  });

  // Show tooltip once when floorplan images are 60% into the viewport
  const floorplanGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!floorplanGridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 5000);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(floorplanGridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="floorplans"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32"
    >
      {/* Section-level tooltip — shows once for all zoomable content */}
      {showTooltip && (
        <div className="pointer-events-none fixed inset-x-0 top-24 z-40 flex justify-center">
          <div className="animate-fade-out rounded-lg bg-charcoal/90 px-6 py-3 text-sm tracking-wide text-white/90 shadow-lg backdrop-blur-sm">
            Scroll to zoom · Drag to pan · Click ⤢ to enlarge
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-fade-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Unit Layouts
          </p>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
            Floorplans
          </h2>
        </div>

        {/* Unit specs summary */}
        <div className="animate-fade-up mb-12 overflow-x-auto">
          <table className="mx-auto text-sm">
            <thead>
              <tr className="border-b border-soft-grey text-xs uppercase tracking-widest text-medium-grey">
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">
                  Configuration
                </th>
                <th className="px-4 py-3 text-left font-medium">Lot Size</th>
                <th className="px-4 py-3 text-right font-medium">Built-up</th>
              </tr>
            </thead>
            <tbody>
              {property.units.map((u) => (
                <tr key={u.type} className="border-b border-soft-grey/50">
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {u.type}
                  </td>
                  <td className="px-4 py-3 text-medium-grey">{u.config}</td>
                  <td className="px-4 py-3 text-medium-grey">{u.lotSize}</td>
                  <td className="px-4 py-3 text-right text-medium-grey">
                    {u.builtUp.toLocaleString()} sf
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* All floorplans displayed at once */}
        <div
          ref={floorplanGridRef}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2"
        >
          {property.floorplans.map((plan) => (
            <div key={plan.label} className="floorplan-card">
              <div className="mb-4">
                <h3 className="font-display text-2xl text-charcoal">
                  {plan.label}
                </h3>
                <p className="mt-1 text-sm text-medium-grey">
                  {plan.description}
                </p>
                <p className="text-xs text-medium-grey">{plan.sublabel}</p>
              </div>

              <ZoomableImage
                src={plan.image}
                alt={`${plan.label} floorplan`}
                width={800}
                height={1200}
                fullWidth={3200}
                fullHeight={4800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                highlight={showTooltip}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
