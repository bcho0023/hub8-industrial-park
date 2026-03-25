"use client";

import { useEffect, useRef } from "react";

type GSAPInstance = typeof import("gsap").default;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let gsapPromise: Promise<{
  gsap: GSAPInstance;
  ScrollTrigger: ScrollTriggerType;
}> | null = null;

export function loadGSAP() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, stModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  }
  return gsapPromise;
}

export function useGSAP(
  callback: (
    gsap: GSAPInstance,
    ScrollTrigger: ScrollTriggerType
  ) => (() => void) | void,
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      cleanupRef.current = callback(gsap, ScrollTrigger);
    });

    return () => {
      cleanupRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
