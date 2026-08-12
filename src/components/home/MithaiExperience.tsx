import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/BrandButton";
import mithaiArt from "@/assets/mithai-art.jpg";

export function MithaiExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-brand-deep">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-2">
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-[86vh]">
          <motion.img
            src={mithaiArt}
            alt="A confectioner arranging traditional mithai on a large brass platter"
            loading="lazy"
            style={reduced ? {} : { y }}
            className="absolute inset-0 h-[112%] w-full object-cover"
          />
        </div>

        <div className="flex items-center px-5 py-20 sm:px-12 lg:px-16">
          <Reveal className="max-w-lg">
            <p className="label-xs text-brand-orange">The Mithai Experience</p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1] tracking-[-0.02em] text-brand-cream">
              The Art
              <br />
              of Mithai
            </h2>
            <p className="mt-7 text-base leading-relaxed text-brand-cream/80">
              From classic favourites to festive essentials, our sweets are prepared with the warmth
              and familiarity that make every celebration feel complete.
            </p>
            <Link
              to="/menu/$category"
              params={{ category: "mithai" }}
              className={buttonClass("primary", "lg", "mt-10")}
            >
              Explore Mithai
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}