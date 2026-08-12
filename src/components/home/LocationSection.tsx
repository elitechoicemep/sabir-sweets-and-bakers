import { Phone, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/BrandButton";
import { BRAND } from "@/lib/config";

export function LocationSection() {
  const wa = BRAND.whatsapp ? `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}` : null;

  return (
    <section className="bg-brand-brown py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="label-xs text-brand-orange">Visit Us</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-[-0.02em] text-brand-cream">
            Come say hello
          </h2>
          <address className="mt-8 not-italic font-display text-2xl leading-snug text-brand-cream/85">
            {BRAND.address.line1},<br />
            {BRAND.address.line2},<br />
            {BRAND.address.city}
          </address>

          <p className="label-xs mt-8 text-[0.5625rem] text-brand-cream/45">
            Opening hours will be listed here once confirmed by the shop.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClass("primary", "md")}
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} /> Get Directions
            </a>
            {BRAND.phone ? (
              <a href={`tel:${BRAND.phone}`} className={buttonClass("outlineCream", "md")}>
                <Phone className="h-4 w-4" strokeWidth={1.5} /> Call
              </a>
            ) : (
              <span
                className={buttonClass("outlineCream", "md", "cursor-not-allowed opacity-45")}
                aria-disabled="true"
                title="Phone number pending confirmation"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} /> Call — coming soon
              </span>
            )}
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className={buttonClass("outlineCream", "md")}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp
              </a>
            ) : (
              <span
                className={buttonClass("outlineCream", "md", "cursor-not-allowed opacity-45")}
                aria-disabled="true"
                title="WhatsApp number pending configuration"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp — coming soon
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="aspect-4/3 w-full border border-brand-cream/15">
            <iframe
              title="Map showing Sabir Sweets & Bakers on Outfall Road, Saint Nagar, Lahore"
              src={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.mapsEmbedQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[0.2]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}