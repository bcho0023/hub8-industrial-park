"use client";

import { useRef, useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";
import { property } from "@/data/property";
import { useGSAP } from "@/lib/gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".animate-slide-up");
    gsap.from(els, {
      y: 40,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", phone: "", message: "" });
      }
    } catch {
      // Fallback — just show success for now
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="animate-slide-up mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-medium-grey">
            Get in Touch
          </p>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl">
            Enquire Now
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="animate-slide-up lg:col-span-7">
            {submitted ? (
              <div className="rounded-sm border border-brand/30 bg-brand/5 p-8 text-center">
                <p className="font-display text-2xl text-charcoal">
                  Thank you for your enquiry
                </p>
                <p className="mt-2 text-sm text-medium-grey">
                  We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full border-b border-soft-grey bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-medium-grey focus:border-charcoal"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full border-b border-soft-grey bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-medium-grey focus:border-charcoal"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, phone: e.target.value }))
                  }
                  className="w-full border-b border-soft-grey bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-medium-grey focus:border-charcoal"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full resize-none border-b border-soft-grey bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-medium-grey focus:border-charcoal"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-charcoal px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-charcoal/80"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Agent info */}
          <div className="animate-slide-up lg:col-span-5">
            <div className="rounded-sm border border-soft-grey bg-white p-8">
              <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-charcoal">
                Contact Details
              </h3>

              <div className="space-y-5">
                {property.contact.phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-brand-dark" />
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-sm text-charcoal hover:text-brand-dark"
                    >
                      {phone}
                    </a>
                  </div>
                ))}

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-dark" />
                  <p className="text-sm leading-relaxed text-medium-grey">
                    {property.developer.address}
                  </p>
                </div>
              </div>

              <hr className="my-6 border-soft-grey" />

              <div>
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
        </div>
      </div>
    </section>
  );
}
