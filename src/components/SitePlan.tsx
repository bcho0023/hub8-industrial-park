"use client";

import { useRef } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

export default function SitePlan() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".animate-fade-up");
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
      id="siteplan"
      ref={sectionRef}
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-fade-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Development Layout
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Site Plan
          </h2>
        </div>

        <div className="animate-fade-up mx-auto max-w-4xl">
          <ZoomableImage
            src={property.sitePlan.image}
            alt="Hub 8 Industrial Park site plan"
            width={1920}
            height={1357}
            fullWidth={9934}
            fullHeight={7017}
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <p className="mt-4 text-center text-xs leading-relaxed text-charcoal/80">
            <span className="font-bold">Note:</span>{" "}
            {property.sitePlan.note?.replace(/^Note:\s*/i, "")}
          </p>
        </div>
      </div>
    </section>
  );
}
