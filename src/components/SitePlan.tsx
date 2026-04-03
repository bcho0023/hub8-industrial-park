"use client";

import { useRef } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

function Sidebar() {
  return (
    <>
      {/* Compass */}
      <div className="mb-6 flex items-center gap-2">
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" className="text-charcoal">
          <polygon points="16,0 22,16 16,12 10,16" fill="currentColor" />
          <polygon points="16,40 10,24 16,28 22,24" fill="currentColor" opacity="0.3" />
        </svg>
        <span className="text-sm font-bold tracking-wide text-charcoal">N</span>
      </div>

      {/* Unit Specifications table */}
      <h3 className="mb-3 text-sm font-medium uppercase tracking-widest text-charcoal">
        Unit Specifications
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-soft-grey text-xs uppercase tracking-widest text-medium-grey">
            <th className="py-2 pr-2 text-left font-medium" />
            <th className="py-2 pr-2 text-left font-medium">Type</th>
            <th className="px-2 py-2 text-left font-medium">Config</th>
            <th className="px-2 py-2 text-left font-medium">Lot</th>
            <th className="py-2 pl-2 text-right font-medium">Built-up</th>
          </tr>
        </thead>
        <tbody>
          {property.units.map((u) => (
            <tr key={u.type} className="border-b border-soft-grey/50">
              <td className="py-2 pr-2">
                <span
                  className="inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: u.color }}
                />
              </td>
              <td className="py-2 pr-2 font-medium text-charcoal">{u.type}</td>
              <td className="px-2 py-2 text-xs text-charcoal/70">{u.config}</td>
              <td className="px-2 py-2 text-xs text-charcoal/70">{u.lotSize}</td>
              <td className="py-2 pl-2 text-right text-charcoal/70">
                {u.builtUp.toLocaleString()} s.f.
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Note */}
      <div className="mt-4 border-t border-soft-grey pt-3">
        <p className="text-xs leading-relaxed text-charcoal/80">
          <span className="font-bold">Note:</span>{" "}
          {property.sitePlan.note?.replace(/^Note:\s*/i, "")}
        </p>
      </div>
    </>
  );
}

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

        {/* Mobile: stacked */}
        <div className="animate-fade-up lg:hidden">
          <ZoomableImage
            src={property.sitePlan.image}
            alt="Hub 8 Industrial Park site plan"
            width={1920}
            height={1357}
            fullWidth={9934}
            fullHeight={7017}
            sizes="100vw"
          />
          <div className="mt-6">
            <Sidebar />
          </div>
        </div>

        {/* Desktop: site plan left, sticky specs right */}
        <div className="hidden lg:flex lg:items-stretch lg:gap-12">
          <div className="animate-fade-up min-w-0 flex-1">
            <ZoomableImage
              src={property.sitePlan.image}
              alt="Hub 8 Industrial Park site plan"
              width={1920}
              height={1357}
              fullWidth={9934}
              fullHeight={7017}
              sizes="70vw"
            />
          </div>

          <div className="w-[340px] shrink-0">
            <div className="sticky top-[35vh]">
              <div className="animate-fade-up">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
