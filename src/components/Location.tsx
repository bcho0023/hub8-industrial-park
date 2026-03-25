"use client";

import { useRef } from "react";
import { MapPin } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".animate-fade-up");
    gsap.from(els, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
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
          {/* Map */}
          <div className="animate-fade-up lg:col-span-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-soft-grey">
              <iframe
                src={property.location.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hub 8 Industrial Park Location"
                className="absolute inset-0"
              />
            </div>
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
