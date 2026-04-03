"use client";

import { useRef } from "react";
import { Phone, MapPin, Building2 } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".animate-slide-up");
    els.forEach((el) => {
      gsap.set(el, { y: 40, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
        },
      });
    });
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-slide-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Get in Touch
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal sm:text-4xl">
            Enquire Now
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Agent cards */}
          <div className="animate-slide-up grid grid-cols-1 gap-6 sm:grid-cols-2">
            {property.contact.phones.map((phone, i) => (
              <div
                key={phone}
                className="rounded-sm border border-soft-grey bg-white p-8 text-center"
              >
                <p className="mb-1 text-xs uppercase tracking-widest text-medium-grey">
                  Sales Agent {i + 1}
                </p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-charcoal hover:text-brand-dark"
                >
                  <Phone className="h-4 w-4 text-brand-dark" />
                  {phone}
                </a>
                {i === 0 && (
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/${property.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1da851]"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Office details */}
          <div className="animate-slide-up mt-8 rounded-sm border border-soft-grey bg-white p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Building2 className="h-4 w-4 text-brand-dark" />
                  <p className="text-sm font-medium uppercase tracking-widest text-charcoal">
                    Office
                  </p>
                </div>
                <a
                  href={`tel:${property.developer.generalLine.replace(/[\s-]/g, "")}`}
                  className="mt-2 block text-lg font-medium text-charcoal hover:text-brand-dark"
                >
                  {property.developer.generalLine}
                </a>
              </div>

              <div className="h-px w-full bg-soft-grey sm:h-16 sm:w-px" />

              <div className="flex-1">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <MapPin className="h-4 w-4 text-brand-dark" />
                  <p className="text-sm font-medium uppercase tracking-widest text-charcoal">
                    Address
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                  {property.developer.address}
                </p>
              </div>
            </div>
          </div>

          {/* Developer info */}
          <div className="animate-slide-up mt-6 text-center">
            <p className="text-sm font-medium text-charcoal">
              {property.developer.name}
            </p>
            <p className="mt-1 text-xs text-medium-grey">
              Co. Reg. No. {property.developer.registration}
            </p>
            <p className="mt-1 text-xs text-medium-grey">
              A member of {property.developer.parent} (est.{" "}
              {property.developer.established})
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
