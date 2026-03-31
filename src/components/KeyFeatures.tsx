"use client";

import { useRef } from "react";
import {
  Warehouse,
  Maximize,
  Sun,
  ShieldCheck,
  Building2,
  Zap,
} from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

const iconMap = {
  Warehouse,
  Maximize,
  Sun,
  ShieldCheck,
  Building2,
  Zap,
} as const;

export default function KeyFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!statsRef.current || !featuresRef.current) return;

    // Counter animation for single numeric stats
    const statEls = statsRef.current.querySelectorAll("[data-stat-value]");
    statEls.forEach((el) => {
      const target = Number(el.getAttribute("data-stat-value"));
      if (!target) return;
      gsap.from(el, {
        textContent: 0,
        duration: 1.2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // Counter animation for range stats (from and to)
    const rangeEls = statsRef.current.querySelectorAll("[data-range-value]");
    rangeEls.forEach((el) => {
      const target = Number(el.getAttribute("data-range-value"));
      if (!target) return;

      // Format with commas during animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString();
        },
      });
    });

    // Letter stagger animation for Freehold text
    const freeholdEls = statsRef.current.querySelectorAll(".freehold-letter");
    if (freeholdEls.length > 0) {
      gsap.set(freeholdEls, { opacity: 0, y: 20 });
      gsap.to(freeholdEls, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: freeholdEls[0].parentElement,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }

    // Fade up each stat block individually
    Array.from(statsRef.current.children).forEach((el) => {
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

    // Fade up feature cards one by one
    Array.from(featuresRef.current.children).forEach((el, i) => {
      gsap.set(el, { y: 30, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        delay: i * 0.12,
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
      id="features"
      ref={sectionRef}
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Stats row */}
        <div
          ref={statsRef}
          className="relative mb-20 grid grid-cols-2 gap-8 border-b border-soft-grey pb-10 sm:mb-24 sm:pb-12 lg:grid-cols-4 lg:gap-12"
        >
          {property.stats.map((stat) => {
            // Range stat (e.g. 3,595 - 7,181 ft²)
            if ("rangeFrom" in stat) {
              return (
                <div key={stat.label} className="text-center">
                  <p className="whitespace-nowrap text-xl font-bold text-charcoal sm:text-2xl lg:text-3xl">
                    <span data-range-value={stat.rangeFrom}>0</span>
                    <span className="mx-1 text-medium-grey">-</span>
                    <span data-range-value={stat.rangeTo}>0</span>
                    <span className="ml-1 text-sm font-medium text-medium-grey sm:text-base">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-medium-grey sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            }

            // Display value stat (e.g. Freehold)
            if ("displayValue" in stat && stat.displayValue) {
              return (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-charcoal sm:text-4xl lg:text-5xl">
                    {stat.displayValue.split("").map((letter, i) => (
                      <span key={i} className="freehold-letter inline-block">
                        {letter}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-medium-grey sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            }

            // Numeric counter stat (e.g. 20)
            return (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl font-bold text-charcoal sm:text-4xl lg:text-5xl"
                  data-stat-value={"value" in stat ? stat.value : undefined}
                >
                  {"value" in stat ? stat.value : ""}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-medium-grey sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
          <div className="absolute -bottom-px left-1/2 h-0.5 w-10 -translate-x-1/2 bg-brand" />
        </div>

        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Why Hub 8
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Built for Business
          </h2>
        </div>

        {/* Feature cards */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {property.features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.title}
                className="group rounded-sm border border-soft-grey bg-warm-white p-8 transition-colors hover:border-brand/30"
              >
                <Icon className="mb-4 h-6 w-6 text-brand-dark" strokeWidth={1.5} />
                <h3 className="mb-2 text-base font-medium text-charcoal">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
