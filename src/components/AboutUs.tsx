"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function AboutUs() {
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
      id="aboutus"
      ref={sectionRef}
      className="bg-light-grey py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-fade-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            The Developer
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            About Us
          </h2>
        </div>

        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <p className="text-lg font-medium text-charcoal">
            {property.developer.parent}
          </p>
          <p className="mt-1 text-sm text-charcoal/60">
            Established {property.developer.established}
          </p>

          <p className="mt-6 text-base leading-relaxed text-charcoal/70">
            Hub 8 Industrial Park is developed by {property.developer.name}, a
            member of {property.developer.parent}. With decades of experience in
            property development since {property.developer.established}, the
            group continues to deliver quality developments that meet the
            evolving needs of businesses and communities.
          </p>

          <a
            href={property.developer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-charcoal px-8 py-3 text-sm uppercase tracking-widest text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            Visit Corporate Website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
