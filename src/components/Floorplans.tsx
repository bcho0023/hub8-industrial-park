"use client";

import { useRef } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

export default function Floorplans() {
  const sectionRef = useRef<HTMLElement>(null);
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


  const renderUnitTable = (compact = false) => (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-soft-grey text-xs uppercase tracking-widest text-medium-grey">
          <th className={`${compact ? "py-2.5 pr-3" : "px-3 py-3"} text-left font-medium`} />
          <th className={`${compact ? "py-2.5 pr-3" : "px-3 py-3"} text-left font-medium`}>Type</th>
          <th className={`${compact ? "px-3 py-2.5" : "px-3 py-3"} text-left font-medium`}>{compact ? "Config" : "Configuration"}</th>
          <th className={`${compact ? "px-3 py-2.5" : "px-3 py-3"} text-left font-medium`}>{compact ? "Lot" : "Lot Size"}</th>
          <th className={`${compact ? "py-2.5 pl-3" : "px-3 py-3"} text-right font-medium`}>Built-up</th>
        </tr>
      </thead>
      <tbody>
        {property.units.map((u) => (
          <tr key={u.type} className="border-b border-soft-grey/50">
            <td className={`${compact ? "py-2.5 pr-2" : "px-3 py-3 pr-2"}`}>
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: u.color }}
              />
            </td>
            <td className={`${compact ? "py-2.5 pr-3" : "px-3 py-3"} font-medium text-charcoal`}>{u.type}</td>
            <td className={`${compact ? "px-3 py-2.5 text-xs" : "px-3 py-3"} text-charcoal/70`}>{u.config}</td>
            <td className={`${compact ? "px-3 py-2.5 text-xs" : "px-3 py-3"} text-charcoal/70`}>{u.lotSize}</td>
            <td className={`${compact ? "py-2.5 pl-3" : "px-3 py-3"} text-right text-charcoal/70`}>
              {u.builtUp.toLocaleString()} sf
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <section
      id="floorplans"
      ref={sectionRef}
      className="relative bg-light-grey py-20 sm:py-28 lg:py-32"
    >
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
            {renderUnitTable()}
          </div>

          <div className="flex flex-col gap-12">
            {property.floorplans.map((plan) => (
              <div key={plan.type} className="floorplan-card">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="inline-block h-4 w-4 shrink-0 rounded-sm"
                    style={{ backgroundColor: plan.color }}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal">{plan.label}</h3>
                    <p className="text-sm text-charcoal/70">{plan.description}</p>
                    <p className="text-xs text-charcoal/50">{plan.specs}</p>
                  </div>
                </div>
                <ZoomableImage
                  src={plan.image}
                  alt={`${plan.label} floorplan`}
                  width={1600}
                  height={1600}
                  fullWidth={1600}
                  fullHeight={1600}
                  aspectRatio="4/3"
                  sizes="100vw"
                  borderColor={plan.color}
                  highlight={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: scrolling blueprints left, sticky specs right */}
        <div className="hidden lg:flex lg:items-stretch lg:gap-20">
          {/* Left — scrolling blueprints */}
          <div ref={blueprintsRef} className="min-w-0 flex-1">
            <div className="flex flex-col gap-16">
              {property.floorplans.map((plan) => (
                <div key={plan.type} className="floorplan-card">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-block h-5 w-5 shrink-0 rounded-sm"
                      style={{ backgroundColor: plan.color }}
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal">{plan.label}</h3>
                      <p className="mt-1 text-sm text-charcoal/70">{plan.description}</p>
                      <p className="text-xs text-charcoal/50">{plan.specs}</p>
                    </div>
                  </div>
                  <ZoomableImage
                    src={plan.image}
                    alt={`${plan.label} floorplan`}
                    width={1600}
                    height={1600}
                    fullWidth={1600}
                    fullHeight={1600}
                    sizes="70vw"
                    borderColor={plan.color}
                  highlight={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — sticky unit specs */}
          <div className="w-[340px] shrink-0">
            <div className="sticky top-[35vh]">
              <div className="animate-fade-up">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal">
                  Unit Specifications
                </h3>
                {renderUnitTable(true)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
