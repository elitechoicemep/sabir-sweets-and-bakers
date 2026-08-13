import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, MessageCircle, Phone, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Ornament, SectionHeading } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, mithaiArt } from "@/data/catalog";
import shopfront from "@/assets/sabir-shopfront.asset.json";

import {
  ADDRESS_EN,
  MAPS_URL,
  MAP_EMBED_URL,
  OPENING_HOURS,
  PHONE_INTL,
  PHONE_TEL,
  whatsappUrl,
} from "@/utils/order";
import { cn } from "@/lib/utils";

/* ---------------------------------- Signatures --------------------------------- */

export function Signatures() {
  const { t, isUrdu } = useLanguage();
  const hidden: string[] = [];
  const shown = categories.filter((c) => !hidden.includes(c.id));

  return (
    <section className="jaali bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sabir Counters"
          title={t("signatures.title")}
          subtitle={t("signatures.subtitle")}
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4">
          {shown.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.05} className={cn("min-h-0", "aspect-square")}>

              <Link
                to="/menu/$category"
                params={{ category: category.id }}
                className="group relative flex size-full min-h-40 items-end overflow-hidden rounded-sm bg-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover opacity-85 transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="relative w-full p-4">
                  <p className="font-display text-lg text-beige sm:text-xl">
                    {isUrdu ? category.nameUr : category.name}
                  </p>
                  <p className={cn("text-sm text-primary", !isUrdu && "font-urdu")}>
                    {isUrdu ? category.name : category.nameUr}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Bestsellers -------------------------------- */

export function BestSellers() {
  const { t } = useLanguage();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <SectionHeading
            eyebrow="Best Sellers"
            title={t("bestsellers.title")}
            subtitle={t("bestsellers.subtitle")}
            align="start"
          />
          <Link
            to="/menu"
            className="eyebrow inline-flex min-h-11 items-center gap-2 self-end text-burnt transition-colors hover:text-foreground"
          >
            {t("common.viewAll")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.06}>
              <ProductCard product={product} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Mithai split -------------------------------- */

export function MithaiArt() {
  const { t } = useLanguage();
  return (
    <section className="bg-brown text-brown-foreground">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 lg:grid-cols-2">
        <Reveal className="relative min-h-[22rem] lg:min-h-[34rem]">
          <img
            src={mithaiArt}
            alt={t("mithaiArt.imageAlt")}
            loading="lazy"
            className="size-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="flex items-center">
          <div className="px-5 py-16 sm:px-12 lg:py-24">
            <p className="eyebrow text-primary">Mithai</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{t("mithaiArt.title")}</h2>
            <Ornament className="mt-6 max-w-[8rem]" tone="light" />
            <p className="mt-6 max-w-lg text-sm text-brown-foreground/75 sm:text-base">
              {t("mithaiArt.body")}
            </p>
            <Link
              to="/menu/$category"
              params={{ category: "mithai" }}
              className="eyebrow mt-9 inline-flex min-h-12 items-center gap-2 rounded-sm bg-primary px-6 text-primary-foreground transition-colors hover:bg-beige"
            >
              {t("mithaiArt.cta")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------ Story ----------------------------------- */

export function Story() {
  const { t } = useLanguage();
  return (
    <section className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="eyebrow text-burnt">Our Story</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{t("story.title")}</h2>
          <Ornament className="mx-auto mt-6 max-w-[10rem]" />
          <img
            src={shopfront.url}
            alt={t("story.imageAlt")}
            loading="lazy"
            className="mt-8 aspect-video w-full rounded-sm object-cover shadow-card"
          />
          <p className="mt-8 text-sm text-muted-foreground sm:text-base">{t("story.body1")}</p>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("story.body2")}</p>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">{t("story.body3")}</p>
          <p className="mt-8 font-display text-lg text-burnt sm:text-xl">{t("story.closing")}</p>
        </Reveal>
      </div>
    </section>
  );
}


/* -------------------------------- Cultural strip ------------------------------ */

export function CulturalStrip() {
  const { t } = useLanguage();
  return (
    <section className="jaali-dark bg-ink py-14 text-center lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="font-urdu text-2xl leading-[2.2] text-primary sm:text-4xl">{t("strip.ur")}</p>
      </div>
    </section>
  );
}


/* ----------------------------------- Reviews ---------------------------------- */

export function Reviews() {
  const { t } = useLanguage();
  const reviews = [0, 1, 2];

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t("reviews.demoNote")}
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-sm border border-border bg-card p-6">
                <Quote className="size-7 text-primary rtl:rotate-180" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm text-foreground sm:text-base">
                  {t(`reviews.items.${i}.quote`)}
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 font-nav text-xs tracking-wider text-muted-foreground uppercase">
                  {t(`reviews.items.${i}.name`)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Location ---------------------------------- */

export function Location() {
  const { t } = useLanguage();
  const wa = whatsappUrl("Assalam o Alaikum, I'd like to place an order with Sabir Sweets & Bakers.");

  return (
    <section className="bg-brown text-brown-foreground">
      <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
        <Reveal className="flex items-center">
          <div className="px-5 py-16 sm:px-12 lg:py-24">
            <p className="eyebrow text-primary">Lahore</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{t("location.title")}</h2>
            <Ornament className="mt-6 max-w-[8rem]" tone="light" />
            <address className="mt-6 text-base not-italic text-brown-foreground/80">
              {ADDRESS_EN}
            </address>
            <a
              href={PHONE_TEL}
              className="mt-4 inline-flex items-center gap-2 text-base text-primary transition-colors hover:text-beige"
            >
              <Phone className="size-4" />
              {PHONE_INTL}
            </a>
            <ul className="mt-4 space-y-1 text-sm text-brown-foreground/70">
              {OPENING_HOURS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-sm bg-primary px-5 text-primary-foreground transition-colors hover:bg-beige"
              >
                <MapPin className="size-4" />
                {t("location.directions")}
              </a>
              <a
                href={PHONE_TEL}
                className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-sm border border-beige/35 px-5 text-beige transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="size-4" />
                {t("location.call")}
              </a>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-sm border border-beige/35 px-5 text-beige transition-colors hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="size-4" />
                  {t("location.whatsapp")}
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-h-[20rem] lg:min-h-[32rem]">
          <iframe
            title={t("location.mapLabel")}
            src={MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full min-h-[20rem] border-0 grayscale-[15%]"
          />
        </Reveal>

      </div>
    </section>
  );
}
