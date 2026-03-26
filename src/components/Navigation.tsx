"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { property } from "@/data/property";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = property.navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warm-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scrolled ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
              alt="Hub 8 Industrial Park"
              className="h-12 w-auto transition-opacity lg:h-14"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {property.navItems.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative text-sm uppercase tracking-widest transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-300 after:ease-out ${
                  activeSection === item.href.slice(1)
                    ? `after:w-full ${scrolled ? "text-charcoal" : "text-white"}`
                    : `after:w-0 hover:after:w-full ${
                        scrolled
                          ? "text-medium-grey hover:text-charcoal"
                          : "text-white/70 hover:text-white"
                      }`
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden ${scrolled ? "text-charcoal" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-warm-white/98 backdrop-blur-md shadow-lg lg:hidden">
          <div className="space-y-1 px-6 py-4">
            {property.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`block py-2 text-sm uppercase tracking-widest ${
                  activeSection === item.href.slice(1)
                    ? "text-charcoal"
                    : "text-medium-grey"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
