import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/config";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/cakes", label: "Cakes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
] as const;

export function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-none">
              Sabir<span className="text-brand-orange"> Sweets</span> & Bakers
            </p>
            <p className="label-xs mt-5 text-brand-cream/50">Tradition in every bite.</p>
            <address className="mt-8 not-italic text-sm leading-relaxed text-brand-cream/70">
              {BRAND.address.line1},<br />
              {BRAND.address.line2},<br />
              {BRAND.address.city}
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="label-xs mb-6 text-brand-orange">Explore</p>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-brand-cream/70 transition-colors hover:text-brand-orange"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-brand-cream/70 transition-colors hover:text-brand-orange"
                >
                  Order Help
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="label-xs mb-6 text-brand-orange">Find us</p>
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand-cream/70 transition-colors hover:text-brand-orange"
            >
              View on Google Maps
            </a>
            <div className="mt-8 flex gap-3">
              {BRAND.social.instagram ? (
                <a
                  href={BRAND.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-11 w-11 place-items-center border border-brand-cream/20 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ) : null}
              {BRAND.social.facebook ? (
                <a
                  href={BRAND.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid h-11 w-11 place-items-center border border-brand-cream/20 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ) : null}
              {BRAND.whatsapp ? (
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-11 w-11 place-items-center border border-brand-cream/20 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ) : null}
            </div>
            {!BRAND.social.instagram && !BRAND.social.facebook && !BRAND.whatsapp ? (
              <p className="mt-6 max-w-xs text-xs leading-relaxed text-brand-cream/40">
                Social and WhatsApp links appear here once the official accounts are provided.
              </p>
            ) : null}
          </div>
        </div>

        <p className="label-xs mt-20 border-t border-brand-cream/12 pt-8 text-[0.5625rem] text-brand-cream/40">
          © 2026 Sabir Sweets &amp; Bakers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}