import { property } from "@/data/property";

export default function Footer() {
  return (
    <footer className="border-t border-soft-grey bg-charcoal py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="font-display text-lg text-white">
            {property.name}
          </p>

          <div className="flex gap-4">
            {property.contact.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="text-sm text-white/60 hover:text-white"
              >
                {phone}
              </a>
            ))}
          </div>

          <div className="max-w-xl">
            <p className="text-xs leading-relaxed text-white/40">
              All illustrations and visual representations are intended solely
              for visual reference and artistic interpretation. The developer
              reserves the right to make modifications to the plans and
              specifications without prior notice.
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 text-xs text-white/30">
            <p>
              {property.developer.name} · Co. Reg. No.{" "}
              {property.developer.registration}
            </p>
            <p>
              © {new Date().getFullYear()} {property.developer.parent}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
