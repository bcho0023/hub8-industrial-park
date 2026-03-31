"use client";

import { useRef, useState, useEffect } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

export default function Floorplans() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const blueprintsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!blueprintsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 5000);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(blueprintsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="floorplans"
      ref={sectionRef}
      className="relative bg-light-grey py-20 sm:py-28 lg:py-32"
    >
      {showTooltip && (
        <div className="pointer-events-none fixed inset-x-0 top-24 z-40 flex justify-center">
          <div className="animate-fade-out rounded-lg bg-charcoal/90 px-6 py-3 text-sm tracking-wide text-white/90 shadow-lg backdrop-blur-sm">
            Scroll to zoom · Drag to pan · Click ⤢ to enlarge
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <div className="animate-fade-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Unit Layouts
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Floorplans
          </h2>
        </div>

        {/* Mobile: stacked layout */}
        <div className="lg:hidden">
          <div className="animate-fade-up mb-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-soft-grey text-xs uppercase tracking-widest text-medium-grey">
                  <th className="px-3 py-3 text-left font-medium">Type</th>
                  <th className="px-3 py-3 text-left font-medium">Configuration</th>
                  <th className="px-3 py-3 text-left font-medium">Lot Size</th>
                  <th className="px-3 py-3 text-right font-medium">Built-up</th>
                </tr>
              </thead>
              <tbody>
                {property.units.map((u) => (
                  <tr key={u.type} className="border-b border-soft-grey/50">
                    <td className="px-3 py-3 font-medium text-charcoal">{u.type}</td>
                    <td className="px-3 py-3 text-charcoal/70">{u.config}</td>
                    <td className="px-3 py-3 text-charcoal/70">{u.lotSize}</td>
                    <td className="px-3 py-3 text-right text-charcoal/70">
                      {u.builtUp.toLocaleString()} sf
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-12">
            {property.floorplans.map((plan) => (
              <div key={plan.label} className="floorplan-card">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-charcoal">{plan.label}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{plan.description}</p>
                  <p className="text-xs text-charcoal/50">{plan.sublabel}</p>
                </div>
                <ZoomableImage
                  src={plan.image}
                  alt={`${plan.label} floorplan`}
                  width={plan.image.includes("typeA") ? 3035 : 5242}
                  height={plan.image.includes("typeA") ? 1442 : 3509}
                  fullWidth={plan.image.includes("typeA") ? 3035 : 5242}
                  fullHeight={plan.image.includes("typeA") ? 1442 : 3509}
                  sizes="100vw"
                  highlight={showTooltip}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: sticky table left, scrolling blueprints right */}
        <div className="hidden lg:flex lg:items-stretch lg:gap-20">
          {/* Left — scrolling blueprints */}
          <div ref={blueprintsRef} className="min-w-0 flex-1">
            <div className="flex flex-col gap-16">
              {property.floorplans.map((plan) => (
                <div key={plan.label} className="floorplan-card">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-charcoal">{plan.label}</h3>
                    <p className="mt-1 text-sm text-medium-grey">{plan.description}</p>
                    <p className="text-xs text-medium-grey">{plan.sublabel}</p>
                  </div>
                  <ZoomableImage
                    src={plan.image}
                    alt={`${plan.label} floorplan`}
                    width={plan.image.includes("typeA") ? 3035 : 5242}
                    height={plan.image.includes("typeA") ? 1442 : 3509}
                    fullWidth={plan.image.includes("typeA") ? 3035 : 5242}
                    fullHeight={plan.image.includes("typeA") ? 1442 : 3509}
                    sizes="70vw"
                    highlight={showTooltip}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — sticky unit specs */}
          <div className="w-[320px] shrink-0">
            <div className="sticky top-[35vh]">
              <div className="animate-fade-up">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal">
                  Unit Specifications
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-soft-grey text-xs uppercase tracking-widest text-medium-grey">
                      <th className="py-2.5 pr-3 text-left font-medium">Type</th>
                      <th className="px-3 py-2.5 text-left font-medium">Config</th>
                      <th className="px-3 py-2.5 text-left font-medium">Lot</th>
                      <th className="py-2.5 pl-3 text-right font-medium">Built-up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.units.map((u) => (
                      <tr key={u.type} className="border-b border-soft-grey/50">
                        <td className="py-2.5 pr-3 font-medium text-charcoal">{u.type}</td>
                        <td className="px-3 py-2.5 text-xs text-charcoal/70">{u.config}</td>
                        <td className="px-3 py-2.5 text-xs text-charcoal/70">{u.lotSize}</td>
                        <td className="py-2.5 pl-3 text-right text-charcoal/70">
                          {u.builtUp.toLocaleString()} sf
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
