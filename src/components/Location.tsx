"use client";

import { useRef } from "react";
import { MapPin } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";
import ZoomableImage from "@/components/ZoomableImage";

export default function Location() {
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
      id="location"
      ref={sectionRef}
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-fade-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Strategic Location
          </p>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
            Location
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Location map */}
          <div className="animate-fade-up lg:col-span-8">
            <ZoomableImage
              src={property.siteMap.image}
              alt="Hub 8 Industrial Park location map"
              width={1600}
              height={1424}
              fullWidth={3199}
              fullHeight={2848}
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Info */}
          <div className="animate-fade-up lg:col-span-4">
            <div className="mb-8">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal">
                Key Highlights
              </h3>
              {property.location.highlights.map((h) => (
                <p key={h} className="mb-2 text-sm leading-relaxed text-medium-grey">
                  {h}
                </p>
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-charcoal">
                Nearby Distances
              </h3>
              <div className="space-y-3">
                {property.distances.map((d) => (
                  <div
                    key={d.place}
                    className="flex items-center justify-between border-b border-soft-grey pb-3"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-brand-dark" />
                      <span className="text-sm text-charcoal">{d.place}</span>
                    </div>
                    <span className="text-sm font-medium text-medium-grey">
                      {d.km} km
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
