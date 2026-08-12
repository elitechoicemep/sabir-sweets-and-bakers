import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/BrandButton";
import cakes from "@/assets/cat-cakes.jpg";

const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Corporate", "Custom Design"];

export function CustomCakes() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1fr] lg:items-center">
        <Reveal>
          <img
            src={cakes}
            alt="An elegant fresh cream celebration cake on a marble stand"
            loading="lazy"
            className="aspect-4/5 w-full object-cover"
          />
        </Reveal>

        <Reveal delay={0.08} className="lg:pl-8">
          <p className="label-xs text-brand-deep">Custom Cakes</p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-[-0.02em] text-brand-brown">
            Made for
            <br />
            your moments
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-brand-brown/70">
            Birthdays, anniversaries, weddings, corporate celebrations — make every occasion a
            little sweeter.
          </p>
          <ul className="mt-9 flex flex-wrap gap-2">
            {OCCASIONS.map((o) => (
              <li
                key={o}
                className="label-xs border border-brand-brown/20 px-3.5 py-2 text-[0.5625rem] text-brand-brown/75"
              >
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/cakes" className={buttonClass("primary", "lg")}>
              Explore Cakes
            </Link>
            <Link
              to="/contact"
              className={buttonClass(
                "primary",
                "lg",
                "bg-brand-deep text-brand-cream hover:bg-brand-brown",
              )}
            >
              Request a Custom Cake
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}