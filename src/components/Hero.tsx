"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current || !imageRef.current || !contentRef.current) return;

    // Parallax on image
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });

    // Content fade in on load
    gsap.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.3,
    });
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 -top-[10%] h-[120%]">
        <Image
          src="/images/hero.jpg"
          alt="Hub 8 Industrial Park street view"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm">
          {property.subtitle}
        </p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {property.name}
        </h1>
        <p className="mt-2 font-display text-xl text-brand sm:text-2xl">
          {property.nameZh}
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/70 sm:text-base">
          {property.tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
}
