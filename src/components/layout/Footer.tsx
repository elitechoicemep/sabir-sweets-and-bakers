import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Ornament } from "@/components/Ornament";
import { ADDRESS_EN, MAPS_URL, OPENING_HOURS, PHONE_INTL, PHONE_TEL } from "@/utils/order";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="jaali-dark bg-ink text-beige">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-beige">{t("brand.name")}</p>
            <p className="mt-3 max-w-sm text-sm text-beige/65">{t("footer.tagline")}</p>
            <Ornament className="mt-6 max-w-[9rem]" tone="light" />
          </div>

          <nav aria-label={t("footer.explore")}>
            <p className="eyebrow text-primary">{t("footer.explore")}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/menu", label: t("nav.menu") },
                { to: "/about", label: t("nav.about") },
                { to: "/contact", label: t("nav.contact") },
                { to: "/cart", label: t("nav.cart") },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-beige/70 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-primary">{t("footer.visit")}</p>
            <address className="mt-4 text-sm not-italic text-beige/70">
              {ADDRESS_EN}
            </address>
            <a
              href={PHONE_TEL}
              className="mt-3 inline-flex items-center gap-2 text-sm text-beige/70 transition-colors hover:text-primary"
            >
              <Phone className="size-4" />
              {PHONE_INTL}
            </a>
            <ul className="mt-3 space-y-1 text-sm text-beige/55">
              {OPENING_HOURS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-nav text-xs font-semibold tracking-widest uppercase text-primary transition-colors hover:text-beige"
            >
              <MapPin className="size-4" />
              {t("location.directions")}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-beige/15 pt-6 text-xs text-beige/50">
          © {year} {t("brand.name")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
