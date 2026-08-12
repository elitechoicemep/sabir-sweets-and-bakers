import { motion, useReducedMotion } from "framer-motion";
import { buttonClass } from "@/components/ui/BrandButton";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-mithai.jpg";

const line = {
  hidden: { opacity: 0, y: "0.4em" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-brand-brown">
      <motion.img
        src={heroImage}
        alt="Traditional Pakistani mithai — gulab jamun, jalebi and barfi — on a brass tray"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduced ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-brand-brown/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-brand-deep/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 pt-40 sm:px-8 sm:pb-28">
        <motion.p
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="label-xs text-brand-orange"
        >
          Est. Lahore
        </motion.p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <h1 className="font-display text-[clamp(2.9rem,11vw,8.5rem)] leading-[0.88] tracking-[-0.03em] text-brand-cream">
            {["Sabir", "Sweets &", "Bakers"].map((t, i) => (
              <motion.span
                key={t}
                custom={i + 1}
                variants={line}
                initial="hidden"
                animate="show"
                className="block overflow-hidden"
              >
                {t}
              </motion.span>
            ))}
          </h1>

          <motion.div
            custom={4}
            variants={line}
            initial="hidden"
            animate="show"
            className="max-w-md lg:pb-4"
          >
            <p className="font-display text-[clamp(1.4rem,3.2vw,2.1rem)] leading-[1.08] text-brand-orange">
              Tradition
              <br />
              in every bite.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-brand-cream/75 sm:text-base">
              Authentic sweets, freshly baked favourites, and timeless flavours made for every
              celebration.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/menu" className={buttonClass("primary", "lg")}>
                Explore Menu
              </Link>
              <Link to="/checkout" className={buttonClass("outlineCream", "lg")}>
                Order Now
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex items-center gap-4 text-brand-cream/45"
          aria-hidden="true"
        >
          <span className="label-xs text-[0.5rem]">Scroll</span>
          <motion.span
            animate={reduced ? {} : { scaleX: [0, 1, 0], originX: [0, 0, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-px w-16 bg-brand-orange"
          />
        </motion.div>
      </div>
    </section>
  );
}