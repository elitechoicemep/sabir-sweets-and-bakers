import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { heroMithai } from "@/data/catalog";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t, tUr } = useLanguage();
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-ink lg:min-h-[92svh]">
      <motion.img
        src={heroMithai}
        alt={t("hero.imageAlt")}
        width={1600}
        height={1200}
        className="absolute inset-0 size-full object-cover"
        {...(reduce
          ? {}
          : {
              initial: { scale: 1.12 },
              animate: { scale: 1 },
              transition: { duration: 2.4, ease: [0.16, 1, 0.3, 1] as const },
            })}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45" />
      <div className="jaali-dark absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-4 pt-24 pb-16 sm:px-6 lg:min-h-[92svh] lg:pb-24">
        <motion.h1
          {...rise(0.2)}
          className={cn(
            "max-w-3xl font-display text-[2.6rem] leading-[1.05] text-beige sm:text-6xl lg:text-7xl",
          )}
        >
          <span className="block">{t("hero.titleLine1")}</span>
          <span className="block text-primary">{t("hero.titleLine2")}</span>
        </motion.h1>

        <motion.p {...rise(0.32)} className="mt-7 max-w-xl text-sm text-beige/75 sm:text-base">
          {t("hero.description")}
        </motion.p>

        <motion.div {...rise(0.5)} className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            to="/menu"
            className="eyebrow inline-flex min-h-12 items-center gap-2 rounded-sm bg-primary px-6 text-primary-foreground transition-colors hover:bg-beige"
          >
            {t("hero.primary")}
            <span className="font-urdu text-sm tracking-normal normal-case">{tUr("hero.primary")}</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/cart"
            className="eyebrow inline-flex min-h-12 items-center rounded-sm border border-beige/40 px-6 text-beige transition-colors hover:border-primary hover:text-primary"
          >
            {t("hero.secondary")}
            <span className="ms-2 font-urdu text-sm tracking-normal normal-case">
              {tUr("hero.secondary")}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
