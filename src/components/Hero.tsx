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

    // Reveal the container, then animate children in
    gsap.set(contentRef.current, { opacity: 1 });
    gsap.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      delay: 0.3,
    });

    return () => {
      // Ensure content is visible if component re-mounts
      if (contentRef.current) {
        contentRef.current.style.opacity = "1";
      }
    };
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 -top-[10%] h-[120%]">
        {/* Mobile image */}
        <Image
          src="/images/hero-mobile.jpg"
          alt="Hub 8 Industrial Park building"
          fill
          priority
          className="object-cover sm:hidden"
          sizes="100vw"
        />
        {/* Desktop image */}
        <Image
          src="/images/hero.jpg"
          alt="Hub 8 Industrial Park street view"
          fill
          priority
          className="hidden object-cover sm:block"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content — starts invisible, GSAP reveals it */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white opacity-0"
      >
        <h1 className="text-3xl font-bold leading-tight uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-6xl">
          {property.tagline}
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/80 sm:text-base">
          {property.subtitle}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
}
