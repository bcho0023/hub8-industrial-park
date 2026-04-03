"use client";

import { useRef } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

export default function Floorplans() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="floorplans"
      ref={sectionRef}
      className="relative bg-light-grey py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-fade-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Unit Layouts
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Floorplans
          </h2>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-16">
          {property.floorplans.map((plan) => (
            <div key={plan.type} className="floorplan-card">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="inline-block h-5 w-5 shrink-0 rounded-sm"
                  style={{ backgroundColor: plan.color }}
                />
                <div>
                  <h3 className="text-2xl font-bold text-charcoal">{plan.label}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{plan.description}</p>
                </div>
              </div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-medium-grey">
                Unit Dimensions
              </p>
              <p className="mb-4 text-sm text-charcoal/70">{plan.specs}</p>
              <ZoomableImage
                src={plan.image}
                alt={`${plan.label} floorplan`}
                width={plan.width}
                height={plan.height}
                fullWidth={plan.width}
                fullHeight={plan.height}
                sizes="(max-width: 1024px) 100vw, 896px"
                borderColor={plan.color}
                highlight={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
