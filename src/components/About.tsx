"use client";

import Image from "next/image";
import { useRef } from "react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!textRef.current || !imageRef.current) return;

    Array.from(textRef.current.children).forEach((el) => {
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

    gsap.set(imageRef.current, { opacity: 0, scale: 1.05 });
    gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 85%",
      },
    });
  });

  return (
    <section id="about" className="bg-light-grey py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div ref={imageRef} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md shadow-black/5">
              <Image
                src={property.about.image}
                alt="Hub 8 Industrial Park"
                fill
                loading="eager"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
              About the Development
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-snug text-charcoal sm:text-4xl">
              {property.about.heading}
            </h2>
            {property.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="mt-5 text-base leading-relaxed text-charcoal/70 first:mt-6"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
