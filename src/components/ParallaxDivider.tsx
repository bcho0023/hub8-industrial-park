"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";

export default function ParallaxDivider() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.3,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[40vh] overflow-hidden lg:h-[50vh]"
    >
      <div ref={imageRef} className="absolute inset-0 -top-[20%] h-[140%]">
        <Image
          src="/images/gallery-aerial.jpg"
          alt="Hub 8 Industrial Park aerial view"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <p className="max-w-2xl text-lg font-medium tracking-wide text-white/90 sm:text-xl lg:text-2xl">
          20 Acres of Freehold Industrial Excellence
        </p>
      </div>
    </section>
  );
}
